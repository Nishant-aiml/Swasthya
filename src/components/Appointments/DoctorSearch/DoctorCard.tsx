import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Star, Video, Phone, User, Award, Clock, MapPin, IndianRupee, CheckCircle } from 'lucide-react';
import type { DoctorSearchResult } from '@/types/search';
import Link from 'next/link';

interface DoctorCardProps {
  doctor: DoctorSearchResult;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <CardTitle className="text-lg">
              {doctor.name}
              {doctor.education.some(e => e.isVerified) && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CheckCircle className="inline-block ml-2 h-4 w-4 text-blue-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Verified Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </CardTitle>
            <CardDescription>{doctor.specialization}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Rating and Experience */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{doctor.rating} ({doctor.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>{doctor.experience} years exp.</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{doctor.location}</span>
        </div>

        {/* Next Available & Fee */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Next: {doctor.nextAvailable}</span>
          </div>
          <div className="flex items-center gap-1">
            <IndianRupee className="h-4 w-4" />
            <span>₹{doctor.consultationFee}</span>
          </div>
        </div>

        {/* Consultation Types */}
        <div className="flex gap-2">
          {doctor.consultationTypes.map((type) => (
            <Badge key={type} variant="outline">
              {type === 'video' && <Video className="h-3 w-3 mr-1" />}
              {type === 'phone' && <Phone className="h-3 w-3 mr-1" />}
              {type === 'in-person' && <User className="h-3 w-3 mr-1" />}
              {type}
            </Badge>
          ))}
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-1">
          {doctor.languages.map((lang) => (
            <Badge key={lang} variant="secondary" className="text-xs">
              {lang}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/doctor/${doctor.id}`}>View Profile</Link>
        </Button>
        <Button>Book Appointment</Button>
      </CardFooter>
    </Card>
  );
}
