import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { 
  Calendar,
  Clock,
  Video,
  Users,
  Star,
  BookOpen,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { Expert, Webinar, HealthArticle } from '@/types/Resources';

interface ExpertContentProps {
  onRegister?: (webinarId: string) => void;
}

const experts: Expert[] = [
  {
    id: 'dr-smith',
    name: 'Dr. Sarah Smith',
    title: 'Senior Cardiologist',
    specialization: 'Cardiology',
    qualifications: ['MD', 'FACC'],
    experience: 15,
    rating: 4.9,
    reviews: 250,
    avatar: '/images/experts/dr-smith.jpg',
    availableSlots: [],
    consultationFee: 100,
    languages: ['English', 'Spanish'],
    about: 'Experienced cardiologist specializing in preventive cardiology and heart health.',
    verified: true,
    webinars: [
      {
        id: 'heart-health-101',
        title: 'Understanding Heart Health',
        description: 'Learn about heart disease prevention and lifestyle modifications.',
        startTime: new Date('2024-01-15T18:00:00'),
        endTime: new Date('2024-01-15T19:00:00'),
        expertName: 'Dr. Sarah Smith',
        expertCredentials: 'MD, FACC',
        registeredUsers: 45,
        isLive: false,
        language: 'English',
        recordingUrl: undefined
      }
    ]
  },
  // Add more experts...
];

const articles: HealthArticle[] = [
  {
    id: 'heart-health-tips',
    title: '10 Essential Heart Health Tips',
    summary: 'Learn the most important habits for maintaining a healthy heart.',
    content: '',
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
  // Add more articles...
];

export default function ExpertContent({ onRegister }: ExpertContentProps) {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [activeTab, setActiveTab] = useState<'webinars' | 'articles'>('webinars');

  return (
    <div className="space-y-8">
      {/* Featured Experts */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16">
                    <Avatar
                      src={expert.avatar}
                      alt={expert.name}
                      fallback={expert.name[0]}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{expert.name}</h3>
                      {expert.verified && (
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{expert.title}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">{expert.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{expert.reviews} reviews</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {expert.qualifications.map(qual => (
                        <Badge key={qual} variant="secondary">
                          {qual}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Upcoming Webinars</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.flatMap(expert => 
            expert.webinars?.map((webinar, index) => (
              <motion.div
                key={webinar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-2">
                      <Video className="h-4 w-4" />
                      <span>Live Webinar</span>
                    </div>
                    <h3 className="font-semibold mb-2">{webinar.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{webinar.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{webinar.startTime.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{Math.round((webinar.endTime.getTime() - webinar.startTime.getTime()) / 60000)} min</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button 
                        className="w-full"
                        onClick={() => onRegister?.(webinar.id)}
                      >
                        Register Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )) ?? []
          )}
        </div>
      </section>

      {/* Expert Articles */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Expert Articles</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{article.readTime} min read</span>
                  </div>
                  <h3 className="font-semibold mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{article.summary}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">By {article.author}</span>
                    <Button variant="ghost" size="sm">
                      Read More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
