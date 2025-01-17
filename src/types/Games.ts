export interface Quiz {
  id: string;
  type: 'daily' | 'subject' | 'rapid';
  title: string;
  description: string;
  duration: number;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface SpinReward {
  id: string;
  type: 'points' | 'discount' | 'badge';
  value: number | string;
  probability: number;
  icon: string;
}

export interface ArcadeGame {
  id: string;
  title: string;
  description: string;
  type: 'platformer' | 'memory' | 'catch';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  points: number;
  highScore?: number;
  icon: string;
}

export interface GameProgress {
  userId: string;
  gameId: string;
  score: number;
  completedAt: string;
  rewards: {
    points: number;
    badges: string[];
  };
}
