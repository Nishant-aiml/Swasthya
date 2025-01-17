export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team';
  theme: string;
  startDate: string;
  endDate: string;
  progress: number;
  goal: number;
  participants: number;
  rewards: {
    points: number;
    achievements: Achievement[];
  };
}

export interface Game {
  id: string;
  title: string;
  description: string;
  type: 'adventure' | 'ar' | 'quick' | 'puzzle';
  thumbnail: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  rewards: {
    points: number;
    achievements: Achievement[];
  };
  highScore?: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  points: number;
  rank: number;
  achievements: number;
  streak: number;
}

export interface MoodEntry {
  date: string;
  mood: 'happy' | 'good' | 'neutral' | 'sad' | 'stressed';
  notes?: string;
  activities: string[];
}
