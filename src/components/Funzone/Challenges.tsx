import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
import { Challenge } from '@/types/Funzone';
import { 
  Target, 
  Users, 
  Calendar,
  Trophy,
  ArrowRight
} from 'lucide-react';

interface ChallengesProps {
  onComplete: () => void;
}

const challenges: Challenge[] = [
  {
    id: 'mental-health-may',
    title: 'Mental Health May',
    description: 'Complete daily meditation sessions and mood tracking.',
    type: 'individual',
    theme: 'Mental Health',
    startDate: '2024-05-01',
    endDate: '2024-05-31',
    progress: 75,
    goal: 100,
    participants: 1250,
    rewards: {
      points: 500,
      achievements: [
        {
          id: 'mindfulness-master',
          title: 'Mindfulness Master',
          description: 'Complete Mental Health May challenge',
          icon: '🧘'
        }
      ]
    }
  },
  {
    id: 'team-fitness',
    title: 'Team Fitness Challenge',
    description: 'Work with your team to achieve 10,000 collective steps daily.',
    type: 'team',
    theme: 'Fitness',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    progress: 45,
    goal: 100,
    participants: 500,
    rewards: {
      points: 1000,
      achievements: [
        {
          id: 'team-player',
          title: 'Team Player',
          description: 'Complete Team Fitness challenge',
          icon: '👥'
        }
      ]
    }
  },
  {
    id: 'healthy-eating',
    title: 'Healthy Eating Challenge',
    description: 'Track your meals and maintain a balanced diet for 30 days.',
    type: 'individual',
    theme: 'Nutrition',
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    progress: 0,
    goal: 100,
    participants: 750,
    rewards: {
      points: 750,
      achievements: [
        {
          id: 'nutrition-expert',
          title: 'Nutrition Expert',
          description: 'Complete Healthy Eating challenge',
          icon: '🥗'
        }
      ]
    }
  }
];

export default function Challenges({ onComplete }: ChallengesProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const getThemeColor = (theme: string) => {
    switch (theme.toLowerCase()) {
      case 'mental health':
        return 'text-purple-600 bg-purple-100';
      case 'fitness':
        return 'text-blue-600 bg-blue-100';
      case 'nutrition':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div>
      <div className="grid gap-6">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getThemeColor(challenge.theme)}`}>
                      {challenge.theme}
                    </span>
                    <span className="text-sm text-gray-500">
                      {challenge.type === 'team' ? (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Team Challenge
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          Individual Challenge
                        </div>
                      )}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-1">{challenge.title}</h3>
                  <p className="text-gray-600 mb-4">{challenge.description}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{challenge.participants.toLocaleString()} participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-yellow-500">{challenge.rewards.points} pts</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                </div>

                <Button
                  className="ml-4"
                  onClick={() => setSelectedChallenge(challenge)}
                >
                  Join Challenge
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Challenge Details Modal - To be implemented */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {/* Add challenge details interface here */}
        </div>
      )}
    </div>
  );
}
