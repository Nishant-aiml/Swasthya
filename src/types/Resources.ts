export interface Expert {
  id: string;
  name: string;
  title: string;
  specialization: string;
  qualifications: string[];
  experience: number;
  rating: number;
  reviews: number;
  avatar: string;
  availableSlots: string[];
  consultationFee: number;
  languages: string[];
  about: string;
  webinars?: Webinar[];
  blogs?: HealthArticle[];
  verified: boolean;
}

export interface Webinar {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  expertName: string;
  expertCredentials: string;
  registeredUsers: number;
  isLive: boolean;
  language: string;
  recordingUrl?: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  category: string;
  image: string;
  source: string;
  sourceUrl: string;
  tags: string[];
  likes: number;
  views: number;
  type: 'article' | 'video' | 'podcast';
  mediaUrl?: string;
  transcript?: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    badges?: string[];
    reputation?: number;
  };
  category: string;
  createdAt: string;
  upvotes: number;
  comments: number;
  isAnonymous: boolean;
  tags: string[];
  images?: string[];
  solved?: boolean;
  expertResponses?: number;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    isExpert?: boolean;
    badges?: string[];
  };
  createdAt: string;
  upvotes: number;
  isAnonymous: boolean;
  isVerified?: boolean;
  replies?: Comment[];
}

export interface HealthTool {
  id: string;
  name: string;
  description: string;
  type: 'calculator' | 'tracker' | 'checker';
  icon: string;
  category: string;
  usageCount: number;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  rating: number;
  content: string;
  createdAt: string;
  likes: number;
  verified: boolean;
}

export interface SymptomCheckerResult {
  possibleConditions: {
    name: string;
    probability: number;
    severity: 'low' | 'medium' | 'high';
    description: string;
    recommendations: string[];
  }[];
  urgency: 'non-urgent' | 'moderate' | 'urgent';
  nextSteps: string[];
}

export interface WaterIntakeCalculation {
  dailyIntake: number;
  factors: {
    weight: number;
    activity: 'sedentary' | 'moderate' | 'active';
    climate: 'temperate' | 'hot' | 'cold';
  };
  schedule: {
    time: string;
    amount: number;
    completed?: boolean;
  }[];
}

export interface SleepLog {
  date: string;
  bedTime: string;
  wakeTime: string;
  duration: number;
  quality: number;
  interruptions: number;
  factors: string[];
  recommendations: string[];
}

export interface ProductRecommendation {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  link: string;
  features: string[];
  pros: string[];
  cons: string[];
  verifiedPurchases: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: number;
  language: string;
  category: string;
  expertName?: string;
  uploadedBy: string;
  createdAt: Date;
  likes: number;
  views: number;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  host: string;
  episodeNumber: number;
  series: string;
  thumbnail: string;
  downloadUrl: string;
}

export interface VirtualTour {
  id: string;
  title: string;
  description: string;
  type: 'AR' | 'VR' | '3D';
  contentUrl: string;
  thumbnail: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  upvotes: number;
  downvotes: number;
  replies: number;
  isSolution: boolean;
}

export interface HealthGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
  isPrivate: boolean;
  thumbnail: string;
  activities: {
    id: string;
    title: string;
    type: 'challenge' | 'discussion' | 'event';
    startDate: Date;
    endDate?: Date;
  }[];
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  category: string;
  isAnonymous: boolean;
  participants: number;
  lastActive: Date;
  moderators: string[];
}

export interface UserContent {
  id: string;
  type: 'blog' | 'photo' | 'progress' | 'story';
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  media?: string[];
  likes: number;
  comments: number;
  createdAt: Date;
  tags: string[];
}
