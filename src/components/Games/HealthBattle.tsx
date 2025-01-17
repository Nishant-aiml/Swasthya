import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Timer, Trophy, Users, Brain, Swords } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Avatar } from '@/components/ui/Avatar';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'Which of these foods is highest in protein?',
    options: ['Chicken Breast', 'White Rice', 'Apple', 'Lettuce'],
    correctAnswer: 'Chicken Breast',
    points: 20
  },
  {
    id: '2',
    question: 'What is the recommended duration of daily exercise?',
    options: ['15 minutes', '30 minutes', '45 minutes', '60 minutes'],
    correctAnswer: '30 minutes',
    points: 20
  },
  {
    id: '3',
    question: 'Which vitamin helps in blood clotting?',
    options: ['Vitamin A', 'Vitamin K', 'Vitamin C', 'Vitamin D'],
    correctAnswer: 'Vitamin K',
    points: 20
  },
  // Add more questions as needed
];

interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  answered: boolean;
}

export function HealthBattle() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      name: 'You',
      avatar: '👤',
      score: 0,
      answered: false
    },
    {
      id: '2',
      name: 'AI Player 1',
      avatar: '🤖',
      score: 0,
      answered: false
    },
    {
      id: '3',
      name: 'AI Player 2',
      avatar: '🤖',
      score: 0,
      answered: false
    }
  ]);

  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver, timeLeft]);

  const initializeGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setCurrentQuestion(0);
    setTimeLeft(15);
    setPlayers(players.map(player => ({ ...player, score: 0, answered: false })));
  };

  const handleTimeUp = () => {
    // Simulate AI players answering
    const correctAnswer = mockQuestions[currentQuestion].correctAnswer;
    const updatedPlayers = players.map(player => {
      if (player.id !== '1' && !player.answered) {
        const isCorrect = Math.random() > 0.5;
        return {
          ...player,
          score: isCorrect ? player.score + mockQuestions[currentQuestion].points : player.score,
          answered: true
        };
      }
      return player;
    });
    setPlayers(updatedPlayers);
    moveToNextQuestion();
  };

  const handleAnswer = (answer: string) => {
    const correctAnswer = mockQuestions[currentQuestion].correctAnswer;
    const isCorrect = answer === correctAnswer;
    
    // Update player score
    const updatedPlayers = players.map(player => {
      if (player.id === '1') {
        return {
          ...player,
          score: isCorrect ? player.score + mockQuestions[currentQuestion].points : player.score,
          answered: true
        };
      }
      return player;
    });
    setPlayers(updatedPlayers);

    if (isCorrect) {
      toast.success('Correct answer! +20 points');
    } else {
      toast.error('Wrong answer!');
    }

    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(15);
      setPlayers(players.map(player => ({ ...player, answered: false })));
    } else {
      setGameOver(true);
    }
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Health Battle</h2>
          <p className="text-gray-600 mb-6">Compete with other players in a health quiz battle!</p>
          <Button onClick={initializeGame} className="bg-purple-500 hover:bg-purple-600">
            Start Battle
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6">
        {!gameOver ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                <span className="font-semibold">Question {currentQuestion + 1}/{mockQuestions.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">{timeLeft}s</span>
              </div>
            </div>

            <Progress value={(timeLeft / 15) * 100} className="mb-6" />

            <div className="grid grid-cols-3 gap-4 mb-6">
              {players.map((player) => (
                <Card key={player.id} className="p-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar src={player.avatar} />
                    <span className="font-semibold">{player.name}</span>
                    <span className="text-sm text-gray-600">{player.score} pts</span>
                  </div>
                </Card>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-6">{mockQuestions[currentQuestion].question}</h3>

            <div className="grid grid-cols-2 gap-4">
              {mockQuestions[currentQuestion].options.map((option) => (
                <Button
                  key={option}
                  onClick={() => !players[0].answered && handleAnswer(option)}
                  disabled={players[0].answered}
                  className="p-4 h-auto text-left"
                >
                  {option}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Battle Results! 🏆</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {players
                .sort((a, b) => b.score - a.score)
                .map((player, index) => (
                  <Card key={player.id} className={`p-4 ${index === 0 ? 'bg-yellow-100' : ''}`}>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar src={player.avatar} />
                      <span className="font-semibold">{player.name}</span>
                      <span className="text-lg font-bold">{player.score} pts</span>
                      {index === 0 && <Trophy className="h-6 w-6 text-yellow-500" />}
                    </div>
                  </Card>
                ))}
            </div>
            <Button onClick={initializeGame} className="bg-purple-500 hover:bg-purple-600">
              Play Again
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
