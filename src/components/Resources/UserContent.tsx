import React, { useState } from 'react';
import { UserContent } from '@/types/Resources';
import { Heart, MessageSquare, Image as ImageIcon, FileText, TrendingUp, Award } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface UserContentProps {
  contents: UserContent[];
  onLike: (contentId: string) => void;
  onComment: (contentId: string) => void;
  onShare: (contentId: string) => void;
}

export function UserContentSharing({ contents, onLike, onComment, onShare }: UserContentProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const types = ['all', 'blog', 'photo', 'progress', 'story'];

  const filteredContents = contents.filter(
    content => selectedType === 'all' || content.type === selectedType
  );

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return <FileText className="w-5 h-5" />;
      case 'photo':
        return <ImageIcon className="w-5 h-5" />;
      case 'progress':
        return <TrendingUp className="w-5 h-5" />;
      case 'story':
        return <Award className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === type
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <button
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
          onClick={() => {/* Handle create content */}}
        >
          Share Content
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredContents.map((content) => (
          <div
            key={content.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
            {content.media && content.media.length > 0 && (
              <div className="aspect-video relative">
                <img
                  src={content.media[0]}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={content.author.avatar}
                    alt={content.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{content.author.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(content.createdAt))} ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                  {getContentIcon(content.type)}
                  <span className="text-sm font-medium">
                    {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                  </span>
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-2">{content.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                {content.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {content.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t dark:border-gray-700">
                <button
                  onClick={() => onLike(content.id)}
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <Heart className="w-5 h-5" />
                  <span>{content.likes}</span>
                </button>
                <button
                  onClick={() => onComment(content.id)}
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{content.comments}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
