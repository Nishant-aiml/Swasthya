import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Progress } from "@/components/ui/Progress";
import { Star, CheckCircle, ThumbsUp, Clock, MessageCircle } from 'lucide-react';
import type { Review } from '@/types/appointment';

interface DoctorReviewsProps {
  reviews: Review[];
  metrics: {
    punctuality: number;
    communication: number;
    treatment: number;
  };
  totalReviews: number;
  averageRating: number;
}

export default function DoctorReviews({
  reviews,
  metrics,
  totalReviews,
  averageRating
}: DoctorReviewsProps) {
  const ratingDistribution: Record<number, number> = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Patient Reviews
          <Badge variant="outline" className="ml-2">
            {totalReviews} reviews
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= averageRating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">Overall Rating</div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="w-8 text-sm text-gray-500">{rating}★</div>
                <Progress
                  value={(ratingDistribution[rating] / totalReviews) * 100}
                  className="h-2"
                />
                <div className="w-12 text-sm text-gray-500">
                  {ratingDistribution[rating]}
                </div>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm">
                <span>Punctuality</span>
                <span>{metrics.punctuality.toFixed(1)}/5</span>
              </div>
              <Progress value={(metrics.punctuality / 5) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Communication</span>
                <span>{metrics.communication.toFixed(1)}/5</span>
              </div>
              <Progress value={(metrics.communication / 5) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Treatment</span>
                <span>{metrics.treatment.toFixed(1)}/5</span>
              </div>
              <Progress value={(metrics.treatment / 5) * 100} className="h-2" />
            </div>
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={`/avatars/${review.patientId}.jpg`} />
                    <AvatarFallback>
                      {review.patientName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.patientName}</span>
                          {review.verified && (
                            <Badge variant="outline" className="gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Verified Visit
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                          {review.treatmentType && (
                            <Badge variant="secondary">
                              {review.treatmentType}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-600">{review.comment}</p>

                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Review image ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        Helpful
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        Reply
                      </div>
                    </div>

                    {review.doctorResponse && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200">
                        <div className="text-sm text-gray-500">
                          Doctor's Response • {new Date(review.doctorResponse.date).toLocaleDateString()}
                        </div>
                        <p className="mt-1 text-gray-600">
                          {review.doctorResponse.comment}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
