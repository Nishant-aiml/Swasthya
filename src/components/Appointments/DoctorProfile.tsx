import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { Calendar } from '@/components/ui/Calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { MapPin, Clock, Star, Phone, Mail, Globe, Award, CheckCircle } from 'lucide-react';
import { Doctor } from '@/types/doctor';
import AppointmentBooking from './AppointmentBooking';

interface DoctorProfileProps {
  doctor: Doctor;
  onClose: () => void;
}

export default function DoctorProfile({ doctor, onClose }: DoctorProfileProps) {
  const [showBooking, setShowBooking] = useState(false);

  const handleBookingSubmit = (appointmentData: any) => {
    console.log('Booking appointment:', appointmentData);
    setShowBooking(false);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <img
          src={doctor.imageUrl}
          alt={doctor.name}
          className="w-32 h-32 rounded-lg object-cover"
        />
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialization}</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="font-medium">{doctor.rating}</span>
              <span className="text-gray-600">({doctor.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5 text-gray-400" />
              <span>{doctor.experience} years exp</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => setShowBooking(true)}>Book Appointment</Button>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span>{doctor.location.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-gray-400" />
              <span>{doctor.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-400" />
              <span>{doctor.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-gray-400" />
              <span>{doctor.website}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Professional Details</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-gray-400" />
              <span>{doctor.qualifications.join(', ')}</span>
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
          </div>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">About</h3>
        <p className="text-gray-600">{doctor.about}</p>
      </Card>

      {showBooking && (
        <Dialog open={showBooking} onOpenChange={setShowBooking}>
          <DialogContent className="max-w-2xl">
            <AppointmentBooking
              doctor={doctor}
              onClose={() => setShowBooking(false)}
              onBook={handleBookingSubmit}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
