import { Video, Webinar, Podcast, VirtualTour, ForumPost, HealthGroup, ChatRoom, UserContent } from '@/types/Resources';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Understanding Mental Health',
    description: 'A comprehensive guide to mental health awareness and self-care practices.',
    url: 'https://example.com/video1',
    thumbnail: 'https://source.unsplash.com/random/800x600?mental+health',
    duration: 1800, // 30 minutes
    language: 'English',
    category: 'Mental Health',
    expertName: 'Dr. Sarah Johnson',
    uploadedBy: 'SwasthyaCare',
    createdAt: new Date('2024-12-25'),
    likes: 1250,
    views: 5000
  },
  {
    id: '2',
    title: 'Yoga for Beginners',
    description: 'Start your yoga journey with these basic poses and breathing techniques.',
    url: 'https://example.com/video2',
    thumbnail: 'https://source.unsplash.com/random/800x600?yoga',
    duration: 1200, // 20 minutes
    language: 'Hindi',
    category: 'Fitness',
    expertName: 'Anjali Mehta',
    uploadedBy: 'SwasthyaCare',
    createdAt: new Date('2024-12-26'),
    likes: 980,
    views: 3500
  }
];

export const mockWebinars: Webinar[] = [
  {
    id: '1',
    title: 'Nutrition Myths Debunked',
    description: 'Join our expert nutritionist to learn about common nutrition myths and facts.',
    startTime: new Date('2025-01-15T10:00:00'),
    endTime: new Date('2025-01-15T11:30:00'),
    expertName: 'Dr. Michael Chen',
    expertCredentials: 'PhD in Nutritional Sciences',
    registeredUsers: 150,
    isLive: false,
    language: 'English',
    recordingUrl: undefined
  },
  {
    id: '2',
    title: 'Stress Management Workshop',
    description: 'Interactive session on managing stress in daily life.',
    startTime: new Date('2025-01-02T15:00:00'),
    endTime: new Date('2025-01-02T16:30:00'),
    expertName: 'Dr. Priya Sharma',
    expertCredentials: 'Clinical Psychologist',
    registeredUsers: 200,
    isLive: true,
    language: 'Hindi',
    recordingUrl: undefined
  }
];

export const mockPodcasts: Podcast[] = [
  {
    id: '1',
    title: 'Healthy Living Daily',
    description: 'Daily tips for maintaining a healthy lifestyle.',
    audioUrl: 'https://example.com/podcast1',
    duration: 1800,
    host: 'Dr. James Wilson',
    episodeNumber: 45,
    series: 'Health & Wellness',
    thumbnail: 'https://source.unsplash.com/random/800x800?health',
    downloadUrl: 'https://example.com/podcast1/download'
  },
  {
    id: '2',
    title: 'Mental Wellness Journey',
    description: 'Stories and advice about mental health and wellness.',
    audioUrl: 'https://example.com/podcast2',
    duration: 2400,
    host: 'Dr. Anita Desai',
    episodeNumber: 23,
    series: 'Mental Health',
    thumbnail: 'https://source.unsplash.com/random/800x800?meditation',
    downloadUrl: 'https://example.com/podcast2/download'
  }
];

export const mockTours: VirtualTour[] = [
  {
    id: '1',
    title: 'Human Body Systems',
    description: '3D exploration of major body systems.',
    type: '3D',
    contentUrl: 'https://example.com/tour1',
    thumbnail: 'https://source.unsplash.com/random/800x600?anatomy',
    category: 'Anatomy',
    difficulty: 'intermediate'
  },
  {
    id: '2',
    title: 'Virtual Hospital Tour',
    description: 'Experience a guided tour of a modern hospital facility.',
    type: 'VR',
    contentUrl: 'https://example.com/tour2',
    thumbnail: 'https://source.unsplash.com/random/800x600?hospital',
    category: 'Healthcare',
    difficulty: 'beginner'
  }
];

export const mockPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Tips for Managing Anxiety',
    content: 'Share your experiences and tips for managing anxiety in daily life.',
    author: {
      id: 'user1',
      name: 'John Doe',
      avatar: 'https://source.unsplash.com/random/100x100?person'
    },
    category: 'Mental Health',
    tags: ['anxiety', 'mental health', 'self-care'],
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20'),
    upvotes: 45,
    downvotes: 2,
    replies: 12,
    isSolution: false
  },
  {
    id: '2',
    title: 'Healthy Diet on a Budget',
    content: "Let's discuss how to maintain a healthy diet without breaking the bank.",
    author: {
      id: 'user2',
      name: 'Jane Smith',
      avatar: 'https://source.unsplash.com/random/100x100?woman'
    },
    category: 'Nutrition',
    tags: ['diet', 'budget', 'healthy eating'],
    createdAt: new Date('2024-12-22'),
    updatedAt: new Date('2024-12-23'),
    upvotes: 38,
    downvotes: 1,
    replies: 15,
    isSolution: true
  }
];

export const mockGroups: HealthGroup[] = [
  {
    id: '1',
    name: 'Yoga Enthusiasts',
    description: 'A community for yoga practitioners of all levels.',
    category: 'Fitness',
    members: 250,
    isPrivate: false,
    thumbnail: 'https://source.unsplash.com/random/800x600?yoga+group',
    activities: [
      {
        id: 'activity1',
        title: '30-Day Yoga Challenge',
        type: 'challenge',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-30')
      }
    ]
  },
  {
    id: '2',
    name: 'Mindful Living',
    description: 'Learn and practice mindfulness together.',
    category: 'Mental Health',
    members: 180,
    isPrivate: false,
    thumbnail: 'https://source.unsplash.com/random/800x600?meditation+group',
    activities: [
      {
        id: 'activity2',
        title: 'Weekly Meditation Sessions',
        type: 'event',
        startDate: new Date('2025-01-05')
      }
    ]
  }
];

export const mockChatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Mental Health Support',
    description: 'A safe space to discuss mental health concerns.',
    category: 'Mental Health',
    isAnonymous: true,
    participants: 45,
    lastActive: new Date('2025-01-01T20:00:00'),
    moderators: ['mod1', 'mod2']
  },
  {
    id: '2',
    name: 'Fitness Goals',
    description: 'Share your fitness journey and get motivated.',
    category: 'Fitness',
    isAnonymous: false,
    participants: 78,
    lastActive: new Date('2025-01-01T21:30:00'),
    moderators: ['mod3', 'mod4']
  }
];

export const mockUserContent: UserContent[] = [
  {
    id: '1',
    type: 'blog',
    title: 'My Weight Loss Journey',
    content: 'Sharing my experience and tips for sustainable weight loss.',
    author: {
      id: 'user1',
      name: 'Sarah Wilson',
      avatar: 'https://source.unsplash.com/random/100x100?woman'
    },
    media: ['https://source.unsplash.com/random/800x600?fitness'],
    likes: 125,
    comments: 23,
    createdAt: new Date('2024-12-28'),
    tags: ['weight loss', 'fitness', 'healthy living']
  },
  {
    id: '2',
    type: 'progress',
    title: '6 Months of Meditation',
    content: 'How daily meditation transformed my life.',
    author: {
      id: 'user2',
      name: 'Mike Chen',
      avatar: 'https://source.unsplash.com/random/100x100?man'
    },
    media: ['https://source.unsplash.com/random/800x600?meditation'],
    likes: 89,
    comments: 15,
    createdAt: new Date('2024-12-29'),
    tags: ['meditation', 'mental health', 'mindfulness']
  }
];
