import React from 'react';
import { Card } from '@/components/ui/Card';
import { Trophy, Medal, Crown } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  streak: number;
  avatar: string;
}

const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Priya Sharma",
    points: 2500,
    streak: 15,
    avatar: "/images/avatars/avatar1.jpg"
  },
  {
    rank: 2,
    name: "Rahul Verma",
    points: 2350,
    streak: 12,
    avatar: "/images/avatars/avatar2.jpg"
  },
  {
    rank: 3,
    name: "Anita Patel",
    points: 2200,
    streak: 10,
    avatar: "/images/avatars/avatar3.jpg"
  },
  {
    rank: 4,
    name: "Rajesh Kumar",
    points: 2100,
    streak: 8,
    avatar: "/images/avatars/avatar4.jpg"
  },
  {
    rank: 5,
    name: "Sneha Gupta",
    points: 2000,
    streak: 7,
    avatar: "/images/avatars/avatar5.jpg"
  },
  {
    rank: 6,
    name: "Amit Singh",
    points: 1900,
    streak: 6,
    avatar: "/images/avatars/avatar6.jpg"
  },
  {
    rank: 7,
    name: "Meera Reddy",
    points: 1850,
    streak: 5,
    avatar: "/images/avatars/avatar7.jpg"
  },
  {
    rank: 8,
    name: "Vikram Malhotra",
    points: 1800,
    streak: 4,
    avatar: "/images/avatars/avatar8.jpg"
  },
  {
    rank: 9,
    name: "Neha Kapoor",
    points: 1750,
    streak: 3,
    avatar: "/images/avatars/avatar9.jpg"
  },
  {
    rank: 10,
    name: "Arjun Desai",
    points: 1700,
    streak: 2,
    avatar: "/images/avatars/avatar10.jpg"
  }
];

export default function Leaderboard() {
  return (
    <div>
      {/* Top 3 Winners */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Second Place */}
        <div className="order-1">
          <Card className="p-4 text-center bg-gradient-to-b from-gray-100 to-gray-50">
            <div className="relative inline-block">
              <img
                src={leaderboardData[1].avatar}
                alt={leaderboardData[1].name}
                className="w-16 h-16 rounded-full mx-auto border-4 border-gray-300"
              />
              <Medal className="absolute -bottom-2 -right-2 h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-2 font-semibold">{leaderboardData[1].name}</h3>
            <p className="text-sm text-gray-600">{leaderboardData[1].points} pts</p>
          </Card>
        </div>

        {/* First Place */}
        <div className="order-0 -mt-4">
          <Card className="p-4 text-center bg-gradient-to-b from-yellow-100 to-yellow-50">
            <div className="relative inline-block">
              <img
                src={leaderboardData[0].avatar}
                alt={leaderboardData[0].name}
                className="w-20 h-20 rounded-full mx-auto border-4 border-yellow-300"
              />
              <Crown className="absolute -bottom-2 -right-2 h-7 w-7 text-yellow-500" />
            </div>
            <h3 className="mt-2 font-semibold">{leaderboardData[0].name}</h3>
            <p className="text-sm text-gray-600">{leaderboardData[0].points} pts</p>
          </Card>
        </div>

        {/* Third Place */}
        <div className="order-2">
          <Card className="p-4 text-center bg-gradient-to-b from-orange-100 to-orange-50">
            <div className="relative inline-block">
              <img
                src={leaderboardData[2].avatar}
                alt={leaderboardData[2].name}
                className="w-16 h-16 rounded-full mx-auto border-4 border-orange-300"
              />
              <Trophy className="absolute -bottom-2 -right-2 h-6 w-6 text-orange-400" />
            </div>
            <h3 className="mt-2 font-semibold">{leaderboardData[2].name}</h3>
            <p className="text-sm text-gray-600">{leaderboardData[2].points} pts</p>
          </Card>
        </div>
      </div>

      {/* Rest of Leaderboard */}
      <Card className="overflow-hidden">
        <div className="divide-y">
          {leaderboardData.slice(3).map((entry) => (
            <div
              key={entry.rank}
              className="flex items-center p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="w-8 text-center font-medium text-gray-600">
                {entry.rank}
              </span>
              <img
                src={entry.avatar}
                alt={entry.name}
                className="w-10 h-10 rounded-full mx-4"
              />
              <div className="flex-1">
                <h4 className="font-medium">{entry.name}</h4>
                <p className="text-sm text-gray-500">{entry.streak} day streak</p>
              </div>
              <div className="text-right">
                <span className="font-semibold">{entry.points}</span>
                <span className="text-gray-500 text-sm ml-1">pts</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
