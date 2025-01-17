import React, { useState } from 'react';
import { CommunityPost } from '@/types/Resources';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Search,
  MessageSquare,
  ThumbsUp,
  Tag as TagIcon,
  PlusCircle,
  Filter,
  User,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

const posts: CommunityPost[] = [
  {
    id: '1',
    title: 'Tips for Managing Anxiety During Work',
    content: 'I have been struggling with work-related anxiety lately. Here are some techniques that helped me...',
    author: {
      id: '1',
      name: 'Anonymous',
      avatar: '/images/avatars/anonymous.jpg'
    },
    category: 'Mental Health Support',
    createdAt: '2025-01-01T10:00:00Z',
    upvotes: 45,
    comments: 12,
    isAnonymous: true,
    tags: ['anxiety', 'mental health', 'work life']
  },
  {
    id: '2',
    title: 'My Weight Loss Journey - 20kg in 6 months',
    content: 'I want to share my weight loss journey and the sustainable methods that worked for me...',
    author: {
      id: '2',
      name: 'Rahul Mehta',
      avatar: '/images/avatars/user2.jpg'
    },
    category: 'Weight Loss Tips',
    createdAt: '2024-12-31T15:30:00Z',
    upvotes: 89,
    comments: 34,
    isAnonymous: false,
    tags: ['weight loss', 'fitness', 'healthy lifestyle']
  },
  {
    id: '3',
    title: 'Healthy Recipe: High-Protein Breakfast Bowl',
    content: 'Here is my favorite high-protein breakfast recipe that keeps me energized throughout the morning...',
    author: {
      id: '3',
      name: 'Priya Singh',
      avatar: '/images/avatars/user3.jpg'
    },
    category: 'Healthy Recipes',
    createdAt: '2024-12-30T08:15:00Z',
    upvotes: 67,
    comments: 23,
    isAnonymous: false,
    tags: ['recipes', 'nutrition', 'breakfast']
  }
];

const categories = [
  'All',
  'Mental Health Support',
  'Weight Loss Tips',
  'Healthy Recipes',
  'Fitness Goals',
  'Disease Management',
  'Pregnancy & Parenting'
];

export default function Community() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewPost = () => {
    // In production, this would open a modal for creating a new post
    toast.success('Creating a new post...');
  };

  const handleUpvote = (postId: string) => {
    // In production, this would call an API to update the upvote count
    toast.success('Post upvoted!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search posts or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Button onClick={handleNewPost}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {post.isAnonymous ? (
                  <Shield className="h-10 w-10 p-2 bg-gray-100 rounded-full" />
                ) : (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    Posted by {post.isAnonymous ? 'Anonymous' : post.author.name}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <p className="mt-4 text-gray-700">{post.content}</p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  <TagIcon className="mr-1 h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-4 flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUpvote(post.id)}
              >
                <ThumbsUp className="mr-1 h-4 w-4" />
                {post.upvotes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="mr-1 h-4 w-4" />
                {post.comments}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
