import React from 'react';
import { Review } from '@/types/review';
import { Card } from '@/components/ui/Card';
import { Star, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';

interface DoctorReviewsProps {
  reviews: Review[];
}

export default function DoctorReviews({ reviews }: DoctorReviewsProps) {
  if (!reviews.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        No reviews yet
      </div>
    );
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
        <div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= averageRating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">
            Based on {reviews.length} reviews
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(new Date(review.date), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="mt-2">{review.comment}</p>
                {review.treatmentType && (
                  <p className="mt-1 text-sm text-gray-500">
                    Treatment: {review.treatmentType}
                  </p>
                )}
              </div>
              {review.verified && (
                <div className="text-sm text-green-600">Verified Visit</div>
              )}
            </div>
            {review.helpful > 0 && (
              <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                <ThumbsUp className="h-4 w-4" />
                {review.helpful} found this helpful
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
