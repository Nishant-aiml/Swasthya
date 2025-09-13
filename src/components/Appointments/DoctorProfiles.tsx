import { useState } from 'react';
import { Card } from "@/components/ui/Card";
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from "@/components/ui/Avatar";
import { DoctorProfile } from './DoctorSearch/DoctorProfile';
import AppointmentBooking from './AppointmentBooking';
import { Doctor } from '@/types/doctor';
import { doctorImages, defaultImages } from '../../data/image-data';
import { toast } from 'sonner';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (doctor: Doctor) => void;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onViewProfile, onBookAppointment }) => {
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
        <Avatar className="h-24 w-24">
          <img
            src={doctor.imageUrl ? doctorImages[doctor.imageUrl.split('/').pop() || ''] || defaultImages['default-doctor'] : defaultImages['default-doctor']}
            alt={doctor.name}
            className="object-cover"
          />
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-primary font-medium">{doctor.specialization}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onViewProfile(doctor)}>
                View Profile
              </Button>
              <Button onClick={() => onBookAppointment(doctor)} className="bg-[#6941C6] hover:bg-[#6941C6]/90">
                Book Appointment
              </Button>
            </div>
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

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Experience</h3>
              <p>{doctor.experience} years</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Languages</h3>
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
          </div>
        </div>
      </div>
    </Card>
  );
};

interface DoctorProfilesProps {
  doctors: Doctor[];
  onClose: () => void;
}

export default function DoctorProfiles({ doctors, onClose }: DoctorProfilesProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const handleViewProfile = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const handleBookingSubmit = (appointmentData: any) => {
    console.log('Booking appointment:', appointmentData);
    toast.success('Appointment booked successfully!');
    setShowBooking(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Doctor Profiles</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onViewProfile={handleViewProfile}
            onBookAppointment={handleBookAppointment}
          />
        ))}
      </div>

      {/* Appointment Booking Dialog */}
      {showBooking && selectedDoctor && (
        <Dialog open={showBooking} onOpenChange={setShowBooking}>
          <DialogContent className="max-w-2xl">
            <AppointmentBooking
              doctor={selectedDoctor}
              onClose={() => setShowBooking(false)}
              onBook={handleBookingSubmit}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
