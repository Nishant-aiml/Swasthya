import React, { useState } from 'react';
import { ForumPost } from '@/types/Resources';
import { MessageSquare, ThumbsUp, ThumbsDown, CheckCircle2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ForumsProps {
  posts: ForumPost[];
  onPostClick: (post: ForumPost) => void;
  onUpvote: (postId: string) => void;
  onDownvote: (postId: string) => void;
}

export function Forums({ posts, onPostClick, onUpvote, onDownvote }: ForumsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'solved'>('recent');

  const categories = ['all', ...new Set(posts.map(p => p.category))];

  const filteredPosts = posts
    .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popular':
          return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        case 'solved':
          return Number(b.isSolution) - Number(a.isSolution);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
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
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular' | 'solved')}
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="solved">Solved First</option>
          </select>
        </div>

        <button
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
          onClick={() => {/* Handle new post */}}
        >
          New Discussion
        </button>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-start gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className="font-semibold text-lg hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer"
                    onClick={() => onPostClick(post)}
                  >
                    {post.title}
                  </h3>
                  {post.isSolution && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                  {post.content}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">{post.author.name}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.replies} replies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpvote(post.id)}
                      className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.upvotes}</span>
                    </button>
                    <button
                      onClick={() => onDownvote(post.id)}
                      className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>{post.downvotes}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
