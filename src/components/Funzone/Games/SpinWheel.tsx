import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SpinReward } from '@/types/Games';
import { CircleDollarSign, Gift, Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface SpinWheelProps {
  onComplete: (reward: SpinReward) => void;
  onClose: () => void;
}

const rewards: SpinReward[] = [
  {
    id: 'points-50',
    type: 'points',
    value: 50,
    probability: 0.3,
    icon: '🎯'
  },
  {
    id: 'points-100',
    type: 'points',
    value: 100,
    probability: 0.2,
    icon: '🎯'
  },
  {
    id: 'points-200',
    type: 'points',
    value: 200,
    probability: 0.1,
    icon: '🎯'
  },
  {
    id: 'discount-10',
    type: 'discount',
    value: '10% off',
    probability: 0.2,
    icon: '🎫'
  },
  {
    id: 'badge-star',
    type: 'badge',
    value: 'Star Player',
    probability: 0.1,
    icon: '⭐'
  },
  {
    id: 'badge-champion',
    type: 'badge',
    value: 'Health Champion',
    probability: 0.1,
    icon: '🏆'
  }
];

export default function SpinWheel({ onComplete, onClose }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedReward, setSelectedReward] = useState<SpinReward | null>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spins = 5; // Number of full rotations
    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = spins * 360 + randomDegree;
    
    // Determine reward based on probability
    const rand = Math.random();
    let cumulativeProbability = 0;
    let selectedReward: SpinReward | null = null;
    
    for (const reward of rewards) {
      cumulativeProbability += reward.probability;
      if (rand <= cumulativeProbability) {
        selectedReward = reward;
        break;
      }
    }

    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      if (selectedReward) {
        setSelectedReward(selectedReward);
        onComplete(selectedReward);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 5000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6"
      >
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl font-bold">Wellness Wheel</h2>
          <p className="text-gray-600">Spin to win amazing rewards!</p>
        </div>

        <div className="relative aspect-square max-w-md mx-auto mb-8">
          <motion.div
            className="w-full h-full rounded-full border-8 border-purple-600 relative"
            style={{
              transformOrigin: 'center',
              transform: `rotate(${rotation}deg)`
            }}
            animate={{ rotate: rotation }}
            transition={{ duration: 5, ease: 'easeOut' }}
          >
            {rewards.map((reward, index) => {
              const angle = (360 / rewards.length) * index;
              return (
                <div
                  key={reward.id}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'center',
                  }}
                >
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                    style={{ transform: `rotate(-${angle}deg)` }}
                  >
                    <span className="text-2xl">{reward.icon}</span>
                  </div>
                </div>
              );
            })}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-purple-600" />
            </div>
          </motion.div>
        </div>

        {selectedReward ? (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-bold">Congratulations! 🎉</h3>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl mb-2">{selectedReward.icon}</p>
              <p className="font-medium text-purple-700">
                You won: {
                  selectedReward.type === 'points' 
                    ? `${selectedReward.value} points` 
                    : selectedReward.value
                }
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={onClose}>Close</Button>
              <Button variant="outline" onClick={() => {
                setSelectedReward(null);
                setRotation(0);
              }}>
                Spin Again
              </Button>
            </div>
          </div>
        ) : (
          <Button
            className="w-full"
            size="lg"
            onClick={spinWheel}
            disabled={isSpinning}
          >
            {isSpinning ? 'Spinning...' : 'Spin Now!'}
          </Button>
        )}
      </motion.div>
    </div>
  );
}
