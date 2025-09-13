import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Slider } from '@/components/ui/Slider';
import { Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface WriteReviewProps {
  doctorId: string;
  doctorName: string;
  onReviewSubmitted: () => void;
}

export default function WriteReview({ doctorId, doctorName, onReviewSubmitted }: WriteReviewProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [metrics, setMetrics] = useState({
    punctuality: 5,
    communication: 5,
    treatment: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically make an API call to submit the review
    // For now, we'll just simulate it with a timeout
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });
      
      onReviewSubmitted();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Overall Rating</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className="focus:outline-none"
                onClick={() => setRating(value)}
              >
                <Star
                  className={`h-8 w-8 ${
                    value <= rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Punctuality</label>
          <Slider
            value={[metrics.punctuality]}
            onValueChange={(value) => setMetrics({ ...metrics, punctuality: value[0] })}
            max={5}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Communication</label>
          <Slider
            value={[metrics.communication]}
            onValueChange={(value) => setMetrics({ ...metrics, communication: value[0] })}
            max={5}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Treatment</label>
          <Slider
            value={[metrics.treatment]}
            onValueChange={(value) => setMetrics({ ...metrics, treatment: value[0] })}
            max={5}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Your Review</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with Dr. ${doctorName}..."
            className="min-h-[100px]"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Submit Review
      </Button>
    </form>
  );
}
