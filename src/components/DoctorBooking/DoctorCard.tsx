import React from 'react';
import { Doctor } from '@/types/doctor';
import { Card, CardContent } from '../ui/Card';
import { Star, MapPin, Phone, Video, User, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import DoctorReviews from './DoctorReviews';
import { BookAppointment } from './BookAppointment';

export interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (date: Date) => void;
  onViewDetails: (doctor: Doctor) => void;
  onToggleFavorite?: (doctor: Doctor) => void;
}

export function DoctorCard({
  doctor,
  onBookAppointment,
  onViewDetails,
  onToggleFavorite
}: DoctorCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative">
        <img
          src={doctor.imageUrl}
          alt={doctor.name}
          className="w-full h-48 object-cover"
        />
        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(doctor)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
          >
            <Heart
              className={`w-6 h-6 text-gray-400`}
            />
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{doctor.name}</h3>
        <p className="text-gray-600 mb-2">{doctor.specialization}</p>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-yellow-500">★</span>
          <span>{doctor.rating}</span>
          <span className="text-gray-500">({doctor.reviewCount} reviews)</span>
        </div>

        <div className="mb-3">
          <p className="text-gray-700">
            {doctor.experience} years experience
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {doctor.languages?.map((language, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
            >
              {language}
            </span>
          ))}
        </div>

        <button
          onClick={() => onBookAppointment(new Date())}
          className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600"
        >
          Book Appointment
        </button>

        <button
          onClick={() => onViewDetails(doctor)}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-2"
        >
          View Details
        </button>
      </div>
    </div>
  );
}