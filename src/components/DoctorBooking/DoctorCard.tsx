import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Clock, Star, Video, MapPin, GraduationCap, Calendar, 
  Globe, CreditCard, ChevronDown, ChevronUp, Heart 
} from 'lucide-react';
import { Doctor } from '@/types/doctor';
import DoctorReviews from './DoctorReviews';
import DoctorProfile from './DoctorProfile';
import BookAppointment from './BookAppointment';
import { useToast } from '@/hooks/useToast';

interface DoctorCardProps {
  doctor: Doctor;
  onFavoriteToggle?: (doctorId: string, isFavorite: boolean) => void;
  onAppointmentBooked?: (appointmentDetails: any) => void;
}

export default function DoctorCard({ 
  doctor, 
  onFavoriteToggle,
  onAppointmentBooked 
}: DoctorCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const handleFavoriteToggle = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    onFavoriteToggle?.(doctor.id, newState);
    toast({
      title: newState ? 'Added to Favorites' : 'Removed from Favorites',
      description: newState 
        ? `${doctor.name} has been added to your favorites`
        : `${doctor.name} has been removed from your favorites`,
    });
  };

  const handleAppointmentBooked = (appointmentDetails: any) => {
    onAppointmentBooked?.(appointmentDetails);
    toast({
      title: 'Appointment Booked',
      description: `Your appointment with ${doctor.name} has been confirmed for ${format(
        new Date(appointmentDetails.date),
        'MMMM d, yyyy'
      )} at ${appointmentDetails.time}`,
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl border border-blue-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex gap-6">
          <div className="relative">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-28 h-28 rounded-xl object-cover ring-4 ring-blue-100"
            />
            <button
              onClick={handleFavoriteToggle}
              className={`absolute -top-2 -right-2 p-2 rounded-full transition-colors duration-300
                ${isFavorite ? 'bg-pink-100 text-pink-500' : 'bg-gray-100 text-gray-400'}
                hover:scale-110 transform`}
            >
              <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-xl text-gray-800">{doctor.name}</h3>
                  {doctor.acceptsAyushman && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm">
                      <CreditCard className="w-3.5 h-3.5 mr-1" />
                      Ayushman
                    </span>
                  )}
                </div>
                <p className="text-blue-600 font-medium mt-1">{doctor.specialization}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-gray-600">{doctor.experience} years exp.</span>
                  <button 
                    onClick={() => setShowReviews(!showReviews)}
                    className="flex items-center gap-2 text-sm bg-amber-100 text-amber-700 px-3 py-1 rounded-full hover:bg-amber-200 transition-colors"
                  >
                    <Star className="h-4 w-4 fill-amber-500" />
                    {doctor.rating} ({doctor.reviewCount} reviews)
                    {showReviews ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text">
                  ₹{doctor.consultationFee}
                </div>
                {doctor.acceptsAyushman && (
                  <p className="text-sm text-teal-600 mt-1">Ayushman Card Accepted</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full text-blue-700">
                <MapPin className="h-4 w-4" />
                {doctor.location.address}
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full text-purple-700">
                <Globe className="h-4 w-4" />
                {doctor.languages.join(', ')}
              </div>
            </div>
          </div>
        </div>

        {showReviews && (
          <div className="mt-6 border-t border-blue-100 pt-6">
            <DoctorReviews reviews={doctor.reviews} />
          </div>
        )}

        {showDetails && (
          <div className="mt-6 space-y-6 border-t border-blue-100 pt-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h4 className="font-medium flex items-center gap-2 text-gray-800">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                Education
              </h4>
              <ul className="mt-3 space-y-2">
                {doctor.qualifications.map((qual, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {qual}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h4 className="font-medium flex items-center gap-2 text-gray-800">
                <Clock className="h-5 w-5 text-blue-500" />
                Available Slots
              </h4>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {doctor.availableSlots.map((slot) => (
                  <div
                    key={slot.date}
                    className="px-4 py-2 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 
                    rounded-lg text-blue-700 border border-blue-100"
                  >
                    <div className="font-medium">{format(new Date(slot.date), 'MMM d, yyyy')}</div>
                    <div className="text-blue-600 mt-1">{slot.slots.join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            {showDetails ? (
              <>
                Show less
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show more
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
          
          <div className="flex-1 flex justify-end gap-3">
            <DoctorProfile doctor={doctor} />
            {doctor.isAvailableOnline && (
              <BookAppointment 
                doctor={doctor} 
                onBookAppointment={handleAppointmentBooked}
                defaultType="video"
              />
            )}
            <BookAppointment 
              doctor={doctor} 
              onBookAppointment={handleAppointmentBooked}
              defaultType="in-person"
            />
          </div>
        </div>
      </div>
    </div>
  );
}