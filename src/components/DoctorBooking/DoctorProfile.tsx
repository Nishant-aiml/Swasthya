import React from 'react';
import { 
  GraduationCap, Star, MapPin, Globe, CreditCard, 
  Award, Stethoscope, Clock, Users 
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import type { Doctor } from '@/types/doctor';
import DoctorReviews from './DoctorReviews';

interface DoctorProfileProps {
  doctor: Doctor;
}

export default function DoctorProfile({ doctor }: DoctorProfileProps) {
  const calculateRatingPercentage = (rating: number) => {
    return (rating / 5) * 100;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          View Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Doctor Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Basic Info */}
          <div className="flex gap-6">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-32 h-32 rounded-xl object-cover ring-4 ring-blue-100"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{doctor.name}</h2>
              <p className="text-blue-600 font-medium mt-1">{doctor.specialization}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-gray-600">{doctor.experience} years experience</span>
                <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-amber-500" />
                  {doctor.rating} ({doctor.reviewCount} reviews)
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full text-blue-700">
                  <MapPin className="h-4 w-4" />
                  {doctor.location.address}
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full text-purple-700">
                  <Globe className="h-4 w-4" />
                  {doctor.languages.join(', ')}
                </div>
                {doctor.acceptsAyushman && (
                  <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full text-emerald-700">
                    <CreditCard className="h-4 w-4" />
                    Ayushman Card Accepted
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-blue-500" />
              Education & Qualifications
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Qualifications</h4>
                <ul className="space-y-2">
                  {doctor.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Experience</h4>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="h-5 w-5 text-blue-500" />
                  {doctor.experience} years of practice
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Stethoscope className="h-5 w-5 text-blue-500" />
              Consultation Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Consultation Fee</h4>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text">
                  ₹{doctor.consultationFee}
                </div>
                {doctor.acceptsAyushman && (
                  <p className="text-sm text-teal-600 mt-1">Ayushman Card Accepted</p>
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Availability</h4>
                <div className="space-y-2">
                  {doctor.availableSlots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-blue-500" />
                      {slot.date}: {slot.slots.join(', ')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Patient Reviews */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-blue-500" />
              Patient Reviews
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-blue-600">{doctor.rating}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(doctor.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Based on {doctor.reviewCount} reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <DoctorReviews reviews={doctor.reviews} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
