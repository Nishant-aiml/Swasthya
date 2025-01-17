import React, { useState } from 'react';
import { Video } from '@/types/Resources';
import { Play, Clock, Globe, Heart, Eye } from 'lucide-react';

interface VideoLibraryProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

export function VideoLibrary({ videos, onVideoSelect }: VideoLibraryProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredVideos = videos.filter(video => {
    const languageMatch = selectedLanguage === 'all' || video.language === selectedLanguage;
    const categoryMatch = selectedCategory === 'all' || video.category === selectedCategory;
    return languageMatch && categoryMatch;
  });

  const languages = ['all', ...new Set(videos.map(v => v.language))];
  const categories = ['all', ...new Set(videos.map(v => v.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
        >
          {languages.map(lang => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            onClick={() => onVideoSelect(video)}
          >
            <div className="aspect-video relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {video.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor(video.duration / 60)}m</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>{video.language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{video.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{video.views}</span>
                </div>
              </div>
              {video.expertName && (
                <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  By {video.expertName}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
