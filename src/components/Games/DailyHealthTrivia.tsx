import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Brain, Timer, Trophy } from 'lucide-react';
import { Quiz, QuizQuestion } from '@/types/Games';
import { toast } from 'sonner';

const mockQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the recommended daily water intake for adults?',
    options: ['1-2 liters', '2-3 liters', '3-4 liters', '4-5 liters'],
    correctAnswer: '2-3 liters',
    points: 10
  },
  {
    id: '2',
    question: 'Which vitamin is produced when skin is exposed to sunlight?',
    options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'],
    correctAnswer: 'Vitamin D',
    points: 10
  },
  // Add more questions as needed
];

export function DailyHealthTrivia() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isGameOver) {
      handleGameOver();
    }
  }, [timeLeft, isGameOver]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === mockQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore((prev) => prev + mockQuestions[currentQuestion].points);
      toast.success('Correct answer! +10 points');
    } else {
      toast.error('Wrong answer!');
    }

    setTimeout(() => {
      if (currentQuestion < mockQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(60);
      } else {
        handleGameOver();
      }
    }, 1000);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    toast.success(`Game Over! Final score: ${score} points`);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(60);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span className="text-xl">Final Score: {score} points</span>
          </div>
          <Button onClick={handleRestart}>Play Again</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-500" />
            <span className="font-semibold">Question {currentQuestion + 1}/{mockQuestions.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-6 w-6 text-orange-500" />
            <span>{timeLeft}s</span>
          </div>
        </div>

        <Progress value={(timeLeft / 60) * 100} className="mb-6" />

        <h3 className="text-xl font-semibold mb-6">{mockQuestions[currentQuestion].question}</h3>

        <div className="grid grid-cols-1 gap-4">
          {mockQuestions[currentQuestion].options.map((option) => (
            <Button
              key={option}
              variant={selectedAnswer === option ? 
                (option === mockQuestions[currentQuestion].correctAnswer ? 'default' : 'destructive') 
                : 'outline'}
              className="p-4 text-left"
              onClick={() => !selectedAnswer && handleAnswer(option)}
              disabled={!!selectedAnswer}
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span className="font-semibold">Score: {score}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
