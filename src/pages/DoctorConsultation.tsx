import { useState } from 'react';
import { DoctorList } from '@/components/DoctorBooking/DoctorList';
import { DoctorProfile } from '@/components/DoctorBooking/DoctorProfile';
import { Doctor } from '@/types/doctor';
import { mockDoctors } from '@/data/mockData';

export default function DoctorConsultationPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBookAppointment = (doctor: Doctor, date: Date) => {
    console.log('Booking appointment with:', doctor, 'for date:', date);
  };

  const handleViewDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleToggleFavorite = (doctor: Doctor) => {
    // Implement favorite toggling logic
    console.log('Toggle favorite for:', doctor);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        {selectedDoctor ? (
          <DoctorProfile
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
            onBookAppointment={(date) => handleBookAppointment(selectedDoctor, date)}
          />
        ) : (
          <DoctorList
            doctors={mockDoctors}
            onBookAppointment={(doctor, date) => handleBookAppointment(doctor, date)}
            onViewDetails={handleViewDetails}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </div>
  );
}