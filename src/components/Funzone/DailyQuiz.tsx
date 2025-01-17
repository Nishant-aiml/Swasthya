import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { QuizQuestion } from '@/types/Quiz';
import { CheckCircle2, XCircle, ChevronRight, Award, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

// Sample quiz questions (in production, these would come from an API)
const sampleQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Which vitamin is produced by our body when exposed to sunlight?',
    options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'],
    correctAnswer: 3,
    explanation: 'Vitamin D is produced by our body when UVB rays from sunlight hit the skin.',
    category: 'Nutrition',
    points: 10
  },
  {
    id: '2',
    question: 'How many hours of sleep does an average adult need per night?',
    options: ['4-5 hours', '6-7 hours', '7-9 hours', '10-12 hours'],
    correctAnswer: 2,
    explanation: 'Most adults need 7-9 hours of quality sleep per night for optimal health.',
    category: 'Health',
    points: 10
  },
  {
    id: '3',
    question: 'Which of these is NOT a benefit of regular exercise?',
    options: [
      'Improved mood',
      'Better sleep',
      'Increased energy',
      'Immediate weight loss'
    ],
    correctAnswer: 3,
    explanation: 'While exercise has many benefits, immediate weight loss is not one of them. Weight loss is a gradual process.',
    category: 'Fitness',
    points: 10
  },
  {
    id: '4',
    question: 'What percentage of the human body is water?',
    options: ['40-50%', '50-60%', '60-70%', '70-80%'],
    correctAnswer: 2,
    explanation: 'The human body is composed of approximately 60-70% water.',
    category: 'Biology',
    points: 10
  },
  {
    id: '5',
    question: 'Which food is the best source of protein?',
    options: ['Rice', 'Chicken breast', 'Lettuce', 'Bread'],
    correctAnswer: 1,
    explanation: 'Chicken breast is an excellent source of lean protein, containing about 31g of protein per 100g.',
    category: 'Nutrition',
    points: 10
  }
];

export default function DailyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + sampleQuestions[currentQuestion].points);
      setStreak(streak + 1);
      if (streak === 2) { // Trigger confetti on 3rd correct answer in a row
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Question {currentQuestion + 1}/{sampleQuestions.length}</span>
          <span className="text-sm text-gray-600">Score: {score}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">
          {sampleQuestions[currentQuestion].question}
        </h3>

        <div className="space-y-3">
          {sampleQuestions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full justify-start text-left ${
                isAnswered
                  ? index === sampleQuestions[currentQuestion].correctAnswer
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : selectedAnswer === index
                    ? 'bg-red-50 border-red-500 text-red-700'
                    : ''
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
            >
              <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
              {isAnswered && index === sampleQuestions[currentQuestion].correctAnswer && (
                <CheckCircle2 className="ml-auto h-5 w-5 text-green-500" />
              )}
              {isAnswered && selectedAnswer === index && index !== sampleQuestions[currentQuestion].correctAnswer && (
                <XCircle className="ml-auto h-5 w-5 text-red-500" />
              )}
            </Button>
          ))}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className={`mt-4 p-4 rounded-lg ${
            selectedAnswer === sampleQuestions[currentQuestion].correctAnswer
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className="text-sm">
              {sampleQuestions[currentQuestion].explanation}
            </p>
          </div>
        )}
      </Card>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Award className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-sm font-medium">
            Streak: {streak} 🔥
          </span>
        </div>
        {isAnswered && currentQuestion < sampleQuestions.length - 1 && (
          <Button onClick={nextQuestion} className="ml-auto">
            Next Question
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        {isAnswered && currentQuestion === sampleQuestions.length - 1 && (
          <Button className="ml-auto bg-green-600 hover:bg-green-700">
            Complete Quiz
            <Trophy className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
