import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MapPin, Clock } from 'lucide-react';
import { Doctor } from '@/types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-${i < Math.floor(rating) ? 'yellow' : 'gray'}-400`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-600">({doctor.reviewCount} reviews)</span>
      </div>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-primary font-medium">{doctor.specialization}</p>
            </div>
            <Button 
              onClick={() => onBookAppointment(doctor)}
              className="bg-[#6941C6] hover:bg-[#6941C6]/90"
            >
              Book Now
            </Button>
          </div>

          <div className="mt-4">
            {renderStars(doctor.rating)}
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{doctor.location.address}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <Clock className="h-4 w-4" />
              <span>Consultation Fee: ₹{doctor.consultationFee}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
