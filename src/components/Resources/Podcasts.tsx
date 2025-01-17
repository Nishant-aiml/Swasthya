import React, { useState } from 'react';
import { Podcast } from '@/types/Resources';
import { Play, Pause, Download, Clock, Headphones } from 'lucide-react';

interface PodcastsProps {
  podcasts: Podcast[];
  onPlay: (podcast: Podcast) => void;
  onDownload: (podcast: Podcast) => void;
}

export function Podcasts({ podcasts, onPlay, onDownload }: PodcastsProps) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const handlePlay = (podcast: Podcast) => {
    if (currentlyPlaying === podcast.id) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(podcast.id);
      onPlay(podcast);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="aspect-square relative">
              <img
                src={podcast.thumbnail}
                alt={podcast.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handlePlay(podcast)}
                className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors flex items-center justify-center text-white"
              >
                {currentlyPlaying === podcast.id ? (
                  <Pause className="w-12 h-12" />
                ) : (
                  <Play className="w-12 h-12" />
                )}
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  Episode {podcast.episodeNumber}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {podcast.series}
                </span>
              </div>

              <h3 className="font-semibold text-lg line-clamp-2">{podcast.title}</h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {podcast.description}
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(podcast.duration)}</span>
                  <Headphones className="w-4 h-4 ml-2" />
                  <span>By {podcast.host}</span>
                </div>

                <button
                  onClick={() => onDownload(podcast)}
                  className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  title="Download for offline listening"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
