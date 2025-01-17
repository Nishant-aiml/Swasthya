import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Timer, Zap, Trophy } from 'lucide-react';
import { Quiz, QuizQuestion } from '@/types/Games';
import { toast } from 'sonner';

const mockQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Which organ pumps blood throughout the body?',
    options: ['Brain', 'Heart', 'Lungs', 'Liver'],
    correctAnswer: 'Heart',
    points: 15
  },
  {
    id: '2',
    question: 'What is the largest organ in the human body?',
    options: ['Brain', 'Heart', 'Skin', 'Liver'],
    correctAnswer: 'Skin',
    points: 15
  },
  // Add more questions as needed
];

export function RapidFireQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes total
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
      toast.success('Correct! +15 points');
    } else {
      toast.error('Wrong! Keep going!');
    }

    // Move to next question faster in rapid fire mode
    setTimeout(() => {
      if (currentQuestion < mockQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        handleGameOver();
      }
    }, 500);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    toast.success(`Time's up! Final score: ${score} points`);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(300);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span className="text-xl">Final Score: {score} points</span>
          </div>
          <Button onClick={handleRestart} className="bg-red-500 hover:bg-red-600">
            Play Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-red-500" />
            <span className="font-semibold">Rapid Fire Question {currentQuestion + 1}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-6 w-6 text-red-500" />
            <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>

        <Progress value={(timeLeft / 300) * 100} className="mb-6" />

        <h3 className="text-xl font-semibold mb-6">{mockQuestions[currentQuestion].question}</h3>

        <div className="grid grid-cols-2 gap-4">
          {mockQuestions[currentQuestion].options.map((option) => (
            <Button
              key={option}
              variant={selectedAnswer === option ? 
                (option === mockQuestions[currentQuestion].correctAnswer ? 'default' : 'destructive') 
                : 'outline'}
              className="p-4"
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
