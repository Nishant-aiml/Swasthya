import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import DailyQuiz from '@/components/Funzone/DailyQuiz';
import RewardsCenter from '@/components/Funzone/RewardsCenter';
import Leaderboard from '@/components/Funzone/Leaderboard';
import HealthGames from '@/components/Funzone/HealthGames';
import Challenges from '@/components/Funzone/Challenges';
import MoodTracker from '@/components/Funzone/MoodTracker';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { 
  Brain, 
  Gift, 
  Trophy, 
  Gamepad2, 
  Target, 
  Smile,
  Sparkles,
  Users,
  Medal,
  Flame
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export default function Funzone() {
  const [activeTab, setActiveTab] = useState('games');
  const [userStats, setUserStats] = useState({
    dailyStreak: 7,
    totalPoints: 1250,
    rank: 42,
    completedChallenges: 15,
    activeChallenges: 3,
    moodStreak: 5
  });

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Function to trigger confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Funzone
          </motion.h1>
          <motion.p 
            className="text-gray-600 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Play, Learn, and Earn Rewards!
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Flame className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Daily Streak</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-purple-600">{userStats.dailyStreak} Days</p>
                    {userStats.dailyStreak >= 7 && (
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Global Rank</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-pink-600">#{userStats.rank}</p>
                    <Medal className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Active Challenges</h3>
                  <p className="text-2xl font-bold text-red-600">{userStats.activeChallenges}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex justify-center mb-8 bg-white/50 backdrop-blur-sm p-1 rounded-lg">
            <TabsTrigger
              value="games"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === 'games'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-white/80'
              }`}
            >
              <Gamepad2 className="h-4 w-4" />
              <span>Games</span>
            </TabsTrigger>

            <TabsTrigger
              value="challenges"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === 'challenges'
                  ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-white/80'
              }`}
            >
              <Target className="h-4 w-4" />
              <span>Challenges</span>
            </TabsTrigger>

            <TabsTrigger
              value="rewards"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === 'rewards'
                  ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-white/80'
              }`}
            >
              <Gift className="h-4 w-4" />
              <span>Rewards</span>
            </TabsTrigger>

            <TabsTrigger
              value="leaderboard"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-white/80'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </TabsTrigger>

            <TabsTrigger
              value="mood"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === 'mood'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-white/80'
              }`}
            >
              <Smile className="h-4 w-4" />
              <span>Mood</span>
            </TabsTrigger>
          </TabsList>

          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="games">
              <HealthGames onAchievement={triggerConfetti} />
            </TabsContent>

            <TabsContent value="challenges">
              <Challenges onComplete={triggerConfetti} />
            </TabsContent>

            <TabsContent value="rewards">
              <RewardsCenter onClaim={triggerConfetti} />
            </TabsContent>

            <TabsContent value="leaderboard">
              <Leaderboard />
            </TabsContent>

            <TabsContent value="mood">
              <MoodTracker onStreak={triggerConfetti} />
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
}
