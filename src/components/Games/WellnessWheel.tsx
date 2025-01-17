import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Trophy, Gift } from 'lucide-react';
import { SpinReward } from '@/types/Games';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const rewards: SpinReward[] = [
  {
    id: '1',
    type: 'points',
    value: 50,
    probability: 0.3,
    icon: '🎯'
  },
  {
    id: '2',
    type: 'points',
    value: 100,
    probability: 0.2,
    icon: '⭐'
  },
  {
    id: '3',
    type: 'badge',
    value: 'Health Champion',
    probability: 0.1,
    icon: '🏆'
  },
  {
    id: '4',
    type: 'discount',
    value: '10% off next consultation',
    probability: 0.1,
    icon: '💎'
  },
  {
    id: '5',
    type: 'points',
    value: 25,
    probability: 0.3,
    icon: '🎮'
  }
];

export function WellnessWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedReward, setSelectedReward] = useState<SpinReward | null>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spins = 5; // Number of full rotations
    const degrees = 360;
    const baseRotation = spins * degrees;
    
    // Randomly select a reward based on probability
    const random = Math.random();
    let probabilitySum = 0;
    let selectedReward: SpinReward | null = null;
    
    for (const reward of rewards) {
      probabilitySum += reward.probability;
      if (random <= probabilitySum) {
        selectedReward = reward;
        break;
      }
    }

    if (!selectedReward) {
      selectedReward = rewards[rewards.length - 1];
    }

    // Calculate final rotation to land on the selected reward
    const rewardIndex = rewards.indexOf(selectedReward);
    const segmentSize = degrees / rewards.length;
    const finalRotation = baseRotation + (rewardIndex * segmentSize);

    setRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedReward(selectedReward);
      
      if (selectedReward) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        const message = selectedReward.type === 'points'
          ? `You won ${selectedReward.value} points!`
          : `You won: ${selectedReward.value}`;
        
        toast.success(message);
      }
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Wellness Wheel</h2>
        
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div
            className="absolute inset-0 rounded-full border-4 border-purple-500 bg-gradient-to-r from-purple-500 to-pink-500"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {rewards.map((reward, index) => {
              const angle = (360 / rewards.length) * index;
              return (
                <div
                  key={reward.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-24px)`,
                  }}
                >
                  {reward.icon}
                </div>
              );
            })}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-[16px] border-b-yellow-500 transform -translate-x-1/2 -translate-y-full" />
          </div>
        </div>

        <Button
          onClick={spinWheel}
          disabled={isSpinning}
          className="w-full max-w-xs mx-auto bg-gradient-to-r from-purple-500 to-pink-500"
        >
          {isSpinning ? 'Spinning...' : 'Spin to Win!'}
        </Button>

        {selectedReward && !isSpinning && (
          <div className="mt-6 p-4 bg-purple-100 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              <Gift className="h-6 w-6 text-purple-500" />
              <span className="font-semibold">
                {selectedReward.type === 'points'
                  ? `You won ${selectedReward.value} points!`
                  : `You won: ${selectedReward.value}`}
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
