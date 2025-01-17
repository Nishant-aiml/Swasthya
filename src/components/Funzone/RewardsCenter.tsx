import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Reward } from '@/types/Quiz';
import { Gift, Timer, Tag, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface RewardsCenterProps {
  onClaim?: () => void;
}

const rewards: Reward[] = [
  {
    id: '1',
    title: '15% Off on Health Supplements',
    description: 'Get 15% off on any health supplement purchase above ₹500',
    pointsCost: 500,
    category: 'discount',
    image: '/images/rewards/supplements.jpg',
    validUntil: '2025-02-01',
    partnerName: 'HealthKart'
  },
  {
    id: '2',
    title: 'Free Health Checkup',
    description: 'Comprehensive health checkup worth ₹1999',
    pointsCost: 1000,
    category: 'coupon',
    image: '/images/rewards/checkup.jpg',
    validUntil: '2025-03-01',
    partnerName: 'Apollo Hospitals'
  },
  {
    id: '3',
    title: '1 Month Gym Membership',
    description: 'One month free membership at any branch',
    pointsCost: 2000,
    category: 'coupon',
    image: '/images/rewards/gym.jpg',
    validUntil: '2025-02-15',
    partnerName: "Gold's Gym"
  },
  {
    id: '4',
    title: 'Premium Features Access',
    description: 'Unlock all premium features for 30 days',
    pointsCost: 750,
    category: 'premium',
    image: '/images/rewards/premium.jpg'
  },
  {
    id: '5',
    title: '₹200 Off on Medicines',
    description: 'Get ₹200 off on medicine orders above ₹1000',
    pointsCost: 300,
    category: 'discount',
    image: '/images/rewards/medicines.jpg',
    validUntil: '2025-02-28',
    partnerName: 'PharmEasy'
  }
];

export default function RewardsCenter({ onClaim }: RewardsCenterProps) {
  const userPoints = 1250; // This would come from user's data

  const handleClaimReward = (reward: Reward) => {
    if (userPoints < reward.pointsCost) {
      toast.error("You don't have enough points for this reward");
      return;
    }
    
    // In production, this would make an API call to claim the reward
    toast.success('Reward claimed successfully! Check your email for details.');
    onClaim?.();
  };

  return (
    <div>
      {/* Points Status */}
      <Card className="p-6 mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6" />
            <h3 className="text-xl font-semibold">Your Points</h3>
          </div>
          <span className="text-2xl font-bold">{userPoints}</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Next Milestone: 1500 points</span>
            <span>250 points to go</span>
          </div>
          <Progress value={83} className="h-2 bg-white/20" indicatorClassName="bg-white" />
        </div>
      </Card>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={reward.image}
                alt={reward.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 bg-black/50 text-white rounded-full text-sm backdrop-blur-sm">
                  {reward.pointsCost} points
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold mb-2">{reward.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
              
              <div className="space-y-3">
                {reward.partnerName && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Tag className="h-4 w-4 mr-2" />
                    <span>{reward.partnerName}</span>
                  </div>
                )}
                {reward.validUntil && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Timer className="h-4 w-4 mr-2" />
                    <span>Valid until {new Date(reward.validUntil).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <Button
                className="w-full mt-4"
                variant={userPoints >= reward.pointsCost ? "default" : "outline"}
                onClick={() => handleClaimReward(reward)}
              >
                <Gift className="h-4 w-4 mr-2" />
                {userPoints >= reward.pointsCost ? 'Claim Reward' : 'Not Enough Points'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
