import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Timer, Trophy, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface FoodItem {
  id: number;
  type: 'healthy' | 'unhealthy';
  emoji: string;
  x: number;
  y: number;
  speed: number;
}

const healthyFoods = ['🥗', '🥑', '🥕', '🍎', '🍌', '🥦'];
const unhealthyFoods = ['🍔', '🍟', '🍕', '🌭', '🍪', '🍩'];

export function HealthyFoodCatch() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [basketPosition, setBasketPosition] = useState(50);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const lastSpawnRef = useRef(0);

  const initializeGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setTimeLeft(60);
    setFoods([]);
    lastSpawnRef.current = 0;
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setBasketPosition(Math.max(0, Math.min(100, x)));
      }
    };

    if (gameStarted && !gameOver) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gameStarted, gameOver]);

  const spawnFood = (timestamp: number) => {
    if (timestamp - lastSpawnRef.current >= 1000) { // Spawn every second
      const isHealthy = Math.random() > 0.4;
      const emoji = isHealthy
        ? healthyFoods[Math.floor(Math.random() * healthyFoods.length)]
        : unhealthyFoods[Math.floor(Math.random() * unhealthyFoods.length)];

      setFoods((prev) => [...prev, {
        id: timestamp,
        type: isHealthy ? 'healthy' : 'unhealthy',
        emoji,
        x: Math.random() * 90 + 5,
        y: 0,
        speed: Math.random() * 2 + 2
      }]);

      lastSpawnRef.current = timestamp;
    }
  };

  const updateFoods = () => {
    setFoods((prev) => {
      const newFoods = prev.map((food) => ({
        ...food,
        y: food.y + food.speed
      })).filter((food) => {
        if (food.y > 90) {
          if (food.type === 'healthy') {
            setLives((prev) => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setGameOver(true);
              }
              return newLives;
            });
          }
          return false;
        }

        // Check collision with basket
        if (food.y > 80 && food.y < 90) {
          const basketLeft = basketPosition - 10;
          const basketRight = basketPosition + 10;
          if (food.x >= basketLeft && food.x <= basketRight) {
            if (food.type === 'healthy') {
              setScore((prev) => prev + 10);
              toast.success('+10 points!', { duration: 1000 });
            } else {
              setLives((prev) => {
                const newLives = prev - 1;
                if (newLives <= 0) {
                  setGameOver(true);
                }
                toast.error('Ouch! Lost a life!', { duration: 1000 });
                return newLives;
              });
            }
            return false;
          }
        }
        return true;
      });
      return newFoods;
    });
  };

  const animate = (timestamp: number) => {
    if (gameStarted && !gameOver) {
      spawnFood(timestamp);
      updateFoods();
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameStarted, gameOver]);

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Healthy Food Catch</h2>
          <p className="text-gray-600 mb-6">Catch healthy foods and avoid junk food!</p>
          <Button onClick={initializeGame} className="bg-green-500 hover:bg-green-600">
            Start Game
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="font-semibold">Lives: {lives}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">
              Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        <Progress value={(timeLeft / 60) * 100} className="mb-6" />

        <div 
          ref={gameAreaRef}
          className="relative w-full aspect-[4/3] bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg overflow-hidden"
        >
          {foods.map((food) => (
            <motion.div
              key={food.id}
              className="absolute text-2xl"
              style={{
                left: `${food.x}%`,
                top: `${food.y}%`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {food.emoji}
            </motion.div>
          ))}

          <motion.div
            className="absolute bottom-0 text-4xl"
            style={{ left: `${basketPosition}%`, transform: 'translateX(-50%)' }}
          >
            🧺
          </motion.div>
        </div>

        {gameOver && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold mb-2">
              Game Over! 🎮
            </h3>
            <p className="text-gray-600 mb-4">
              Final Score: {score} points
            </p>
            <Button onClick={initializeGame} className="bg-green-500 hover:bg-green-600">
              Play Again
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
