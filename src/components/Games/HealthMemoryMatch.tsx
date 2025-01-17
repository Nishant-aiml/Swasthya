import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Timer, Trophy, Brain } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface MemoryCard {
  id: number;
  type: string;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const healthPairs = [
  { type: 'fruit', content: '🍎' },
  { type: 'fruit', content: '🍎' },
  { type: 'vegetable', content: '🥕' },
  { type: 'vegetable', content: '🥕' },
  { type: 'exercise', content: '🏃' },
  { type: 'exercise', content: '🏃' },
  { type: 'water', content: '💧' },
  { type: 'water', content: '💧' },
  { type: 'sleep', content: '😴' },
  { type: 'sleep', content: '😴' },
  { type: 'heart', content: '❤️' },
  { type: 'heart', content: '❤️' },
];

export function HealthMemoryMatch() {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes
  const [gameOver, setGameOver] = useState<boolean>(false);

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

  const initializeGame = () => {
    const shuffledCards = [...healthPairs]
      .sort(() => Math.random() - 0.5)
      .map((pair, index) => ({
        id: index,
        type: pair.type,
        content: pair.content,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimeLeft(120);
    setGameOver(false);
    setGameStarted(true);
  };

  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length === 2 ||
      cards[cardId].isFlipped ||
      cards[cardId].isMatched ||
      gameOver
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstCard, secondCard] = newFlippedCards;

      if (cards[firstCard].type === cards[secondCard].type) {
        // Match found
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstCard].isMatched = true;
          newCards[secondCard].isMatched = true;
          setCards(newCards);
          setFlippedCards([]);
          setMatchedPairs((prev) => {
            const newMatchedPairs = prev + 1;
            if (newMatchedPairs === healthPairs.length / 2) {
              setGameOver(true);
              toast.success('Congratulations! You won! 🎉');
            }
            return newMatchedPairs;
          });
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstCard].isFlipped = false;
          newCards[secondCard].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Health Memory Match</h2>
          <p className="text-gray-600 mb-6">Match pairs of health-related cards before time runs out!</p>
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
              <span className="font-semibold">Pairs: {matchedPairs}/{healthPairs.length / 2}</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <span className="font-semibold">Moves: {moves}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">
              Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        <Progress value={(timeLeft / 120) * 100} className="mb-6" />

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className={`aspect-square cursor-pointer transition-all duration-300 ${
                  card.isFlipped || card.isMatched
                    ? 'bg-white'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                }`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {(card.isFlipped || card.isMatched) ? (
                    <span className="text-4xl">{card.content}</span>
                  ) : (
                    <span className="text-2xl text-white">?</span>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {gameOver && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold mb-2">
              {matchedPairs === healthPairs.length / 2 ? 'Congratulations! 🎉' : 'Time\'s Up! ⏰'}
            </h3>
            <p className="text-gray-600 mb-4">
              You found {matchedPairs} pairs in {moves} moves
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
