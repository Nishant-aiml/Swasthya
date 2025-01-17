import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Timer, Trophy, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Quiz, QuizQuestion } from '@/types/Games';
import { toast } from 'sonner';

interface QuizGameProps {
  type: 'daily' | 'subject' | 'rapid';
  onComplete: (score: number) => void;
  onClose: () => void;
}

const sampleQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Which vitamin is produced by the body when exposed to sunlight?',
    options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'],
    correctAnswer: 'Vitamin D',
    points: 10
  },
  {
    id: '2',
    question: 'What is the recommended daily water intake for adults?',
    options: ['1-2 liters', '2-3 liters', '3-4 liters', '4-5 liters'],
    correctAnswer: '2-3 liters',
    points: 10
  },
  {
    id: '3',
    question: 'Which of these is not a macronutrient?',
    options: ['Proteins', 'Carbohydrates', 'Vitamins', 'Fats'],
    correctAnswer: 'Vitamins',
    points: 10
  }
];

export default function QuizGame({ type, onComplete, onClose }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(type === 'rapid' ? 30 : 60);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !showResults) {
        setTimeLeft(prev => prev - 1);
      } else if (timeLeft === 0 && !showResults) {
        handleQuizComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResults]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const currentQ = sampleQuestions[currentQuestion];
    if (answer === currentQ.correctAnswer) {
      setScore(prev => prev + currentQ.points);
      toast.success('Correct answer!');
    } else {
      toast.error('Wrong answer!');
    }

    setTimeout(() => {
      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        handleQuizComplete();
      }
    }, 1500);
  };

  const handleQuizComplete = () => {
    setShowResults(true);
    if (score > (sampleQuestions.length * 10) / 2) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    onComplete(score);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6"
      >
        {!showResults ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-blue-600" />
                <span className="font-medium">
                  Time left: {timeLeft}s
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">Score: {score}</span>
              </div>
            </div>

            <Progress 
              value={(currentQuestion + 1) / sampleQuestions.length * 100} 
              className="mb-6"
            />

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">
                {sampleQuestions[currentQuestion].question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleQuestions[currentQuestion].options.map((option) => (
                  <Button
                    key={option}
                    variant={
                      isAnswered
                        ? option === sampleQuestions[currentQuestion].correctAnswer
                          ? 'default'
                          : option === selectedAnswer
                          ? 'destructive'
                          : 'outline'
                        : selectedAnswer === option
                        ? 'default'
                        : 'outline'
                    }
                    className="p-4 h-auto text-left justify-between"
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                  >
                    <span>{option}</span>
                    {isAnswered && (
                      option === sampleQuestions[currentQuestion].correctAnswer ? (
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      ) : option === selectedAnswer ? (
                        <XCircle className="h-5 w-5 text-white" />
                      ) : null
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">Quiz Complete!</h3>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-blue-600">{score} points</p>
              <p className="text-gray-600">
                You got {score / 10} out of {sampleQuestions.length} questions correct!
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={onClose}>Close</Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Play Again
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
