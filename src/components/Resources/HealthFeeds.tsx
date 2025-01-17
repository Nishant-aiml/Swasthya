import React, { useState } from 'react';
import { HealthArticle } from '@/types/Resources';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Search,
  Clock,
  ExternalLink,
  BookOpen,
  Tag as TagIcon,
  Filter
} from 'lucide-react';

const articles: HealthArticle[] = [
  {
    id: '1',
    title: 'Understanding the Importance of Mental Health in Modern Life',
    summary: 'Learn about the crucial role mental health plays in our overall well-being and discover practical tips for maintaining good mental health.',
    content: '...',
    author: 'Dr. Sarah Johnson',
    publishDate: '2025-01-01',
    readTime: 5,
    category: 'Mental Health',
    image: '/images/articles/mental-health.jpg',
    source: 'WHO',
    sourceUrl: 'https://who.int',
    tags: ['mental health', 'wellness', 'stress management'],
    likes: 0,
    views: 0,
    type: 'article'
  },
  {
    id: '2',
    title: 'Latest Breakthroughs in Heart Disease Prevention',
    summary: 'Recent research reveals new strategies for preventing heart disease through lifestyle modifications and early detection methods.',
    content: '...',
    author: 'Dr. Michael Chen',
    publishDate: '2024-12-30',
    readTime: 7,
    category: 'Cardiology',
    image: '/images/articles/heart-health.jpg',
    source: 'American Heart Association',
    sourceUrl: 'https://heart.org',
    tags: ['heart health', 'prevention', 'research'],
    likes: 0,
    views: 0,
    type: 'article'
  },
  {
    id: '3',
    title: 'Nutrition Guidelines for a Healthy Immune System',
    summary: 'Discover the essential nutrients and dietary habits that can help strengthen your immune system naturally.',
    content: '...',
    author: 'Dr. Priya Patel',
    publishDate: '2024-12-28',
    readTime: 6,
    category: 'Nutrition',
    image: '/images/articles/nutrition.jpg',
    source: 'National Institute of Nutrition',
    sourceUrl: 'https://nin.res.in',
    tags: ['nutrition', 'immunity', 'health tips'],
    likes: 0,
    views: 0,
    type: 'article'
  },
  {
    id: 'heart-health',
    title: 'Understanding Heart Health',
    summary: 'Learn about heart disease prevention and lifestyle modifications.',
    content: 'Comprehensive guide about maintaining heart health...',
    author: 'Dr. Sarah Smith',
    publishDate: '2024-01-01',
    readTime: 5,
    category: 'Cardiology',
    image: '/images/articles/heart-health.jpg',
    source: 'SwasthyaCare',
    sourceUrl: '',
    tags: ['Heart Health', 'Prevention', 'Lifestyle'],
    likes: 156,
    views: 2500,
    type: 'article'
  },
  {
    id: 'mental-wellness',
    title: 'Mental Wellness in Modern Times',
    summary: 'Strategies for maintaining mental health in today\'s fast-paced world.',
    content: 'In-depth discussion about mental health strategies...',
    author: 'Dr. Raj Patel',
    publishDate: '2024-01-02',
    readTime: 7,
    category: 'Mental Health',
    image: '/images/articles/mental-wellness.jpg',
    source: 'SwasthyaCare',
    sourceUrl: '',
    tags: ['Mental Health', 'Wellness', 'Stress Management'],
    likes: 245,
    views: 3800,
    type: 'article'
  },
  {
    id: 'nutrition-guide',
    title: 'Complete Guide to Nutrition',
    summary: 'Essential nutrition tips for a healthy lifestyle.',
    content: 'Detailed guide about proper nutrition and diet...',
    author: 'Dr. Li Chen',
    publishDate: '2024-01-03',
    readTime: 6,
    category: 'Nutrition',
    image: '/images/articles/nutrition.jpg',
    source: 'SwasthyaCare',
    sourceUrl: '',
    tags: ['Nutrition', 'Diet', 'Health'],
    likes: 189,
    views: 2900,
    type: 'article'
  }
];

const categories = [
  'All',
  'Mental Health',
  'Cardiology',
  'Nutrition',
  'Fitness',
  'Disease Prevention',
  'Government Programs'
];

export default function HealthFeeds() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search articles by title or tags..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map(article => (
          <Card key={article.id} className="overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                  {article.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {article.readTime} min read
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.summary}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full flex items-center"
                  >
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  By {article.author} • {new Date(article.publishDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Read More
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(article.sourceUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
