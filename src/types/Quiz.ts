export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  points: number;
}

export interface UserQuizProgress {
  questionsAnswered: number;
  correctAnswers: number;
  currentStreak: number;
  bestStreak: number;
  totalPoints: number;
  lastQuizDate: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: 'coupon' | 'discount' | 'premium';
  image: string;
  validUntil?: string;
  partnerName?: string;
  code?: string;
}
