import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import confetti from 'canvas-confetti';
import {
  Brain,
  Gamepad2,
  Timer,
  Trophy,
  Users,
  Zap,
  Heart,
  Puzzle,
  CircleDollarSign,
  Dices,
  ArrowLeft,
} from 'lucide-react';
import { Quiz, ArcadeGame } from '@/types/Games';
import { toast } from 'sonner';
import { DailyHealthTrivia } from '@/components/Games/DailyHealthTrivia';
import { RapidFireQuiz } from '@/components/Games/RapidFireQuiz';
import { WellnessWheel } from '@/components/Games/WellnessWheel';
import { HealthMemoryMatch } from '@/components/Games/HealthMemoryMatch';
import { HealthyFoodCatch } from '@/components/Games/HealthyFoodCatch';
import { HealthBattle } from '@/components/Games/HealthBattle';

interface HealthGamesProps {
  onAchievement?: () => void;
}

export default function HealthGames({ onAchievement }: HealthGamesProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: 'daily-trivia',
      title: 'Daily Health Trivia',
      description: 'Test your health knowledge with daily questions!',
      icon: <Brain className="h-6 w-6" />,
      difficulty: 'Medium',
      duration: '10-15 min',
      points: 100,
      category: 'quiz',
      bgColor: 'bg-gradient-to-br from-violet-500 to-purple-600',
      textColor: 'text-white'
    },
    {
      id: 'rapid-fire',
      title: 'Rapid Fire Quiz',
      description: 'Quick health questions against the clock!',
      icon: <Timer className="h-6 w-6" />,
      difficulty: 'Hard',
      duration: '5 min',
      points: 150,
      category: 'quiz',
      bgColor: 'bg-gradient-to-br from-red-500 to-pink-600',
      textColor: 'text-white'
    },
    {
      id: 'spin-wheel',
      title: 'Wellness Wheel',
      description: 'Spin to win amazing health rewards!',
      icon: <CircleDollarSign className="h-6 w-6" />,
      difficulty: 'Easy',
      duration: '1 min',
      points: 50,
      category: 'instant',
      bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      textColor: 'text-white'
    },
    {
      id: 'memory-match',
      title: 'Health Memory Match',
      description: 'Match healthy pairs and boost your memory!',
      icon: <Puzzle className="h-6 w-6" />,
      difficulty: 'Medium',
      duration: '5-10 min',
      points: 75,
      category: 'arcade',
      bgColor: 'bg-gradient-to-br from-green-400 to-emerald-600',
      textColor: 'text-white'
    },
    {
      id: 'food-catch',
      title: 'Healthy Food Catch',
      description: 'Catch healthy foods and avoid junk!',
      icon: <Heart className="h-6 w-6" />,
      difficulty: 'Easy',
      duration: '3-5 min',
      points: 50,
      category: 'arcade',
      bgColor: 'bg-gradient-to-br from-blue-400 to-cyan-600',
      textColor: 'text-white'
    },
    {
      id: 'health-battle',
      title: 'Health Battle',
      description: 'Challenge friends in health quizzes!',
      icon: <Users className="h-6 w-6" />,
      difficulty: 'Hard',
      duration: '15 min',
      points: 200,
      category: 'multiplayer',
      bgColor: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      textColor: 'text-white'
    }
  ];

  const handleGameStart = (gameId: string) => {
    setSelectedGame(gameId);
    onAchievement?.();
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  if (selectedGame) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={handleBackToGames}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Button>

        {selectedGame === 'daily-trivia' && <DailyHealthTrivia />}
        {selectedGame === 'rapid-fire' && <RapidFireQuiz />}
        {selectedGame === 'spin-wheel' && <WellnessWheel />}
        {selectedGame === 'memory-match' && <HealthMemoryMatch />}
        {selectedGame === 'food-catch' && <HealthyFoodCatch />}
        {selectedGame === 'health-battle' && <HealthBattle />}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Health Games
        </h2>
        <p className="text-gray-600">Play, learn, and earn rewards!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`group relative overflow-hidden ${game.bgColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/10" />
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${game.textColor} bg-white/20`}>
                    {game.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${game.textColor}`}>{game.title}</h3>
                    <p className={`text-sm ${game.textColor}/80`}>{game.description}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white/20 ${game.textColor}`}>
                      {game.difficulty}
                    </span>
                    <span className={`text-xs ${game.textColor}/80`}>
                      {game.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className={`h-4 w-4 ${game.textColor}`} />
                    <span className={`text-sm font-medium ${game.textColor}`}>
                      {game.points} pts
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white"
                  onClick={() => handleGameStart(game.id)}
                >
                  Play Now
                  <Gamepad2 className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
