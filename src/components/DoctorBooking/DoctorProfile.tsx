import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Doctor, DoctorReview } from '@/types/doctor';
import DoctorReviews from './DoctorReviews';
import { doctorImages, defaultImages } from '@/data/image-data';

interface DoctorProfileProps {
  doctor: Doctor;
  onClose: () => void;
  onBookAppointment: (date: Date) => void;
}

export function DoctorProfile({ doctor, onClose, onBookAppointment }: DoctorProfileProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleBookAppointment = () => {
    if (selectedDate) {
      onBookAppointment(selectedDate);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-start gap-4">
          <img
            src={doctor.imageUrl ? doctorImages[doctor.imageUrl.split('/').pop() || ''] || defaultImages['default-doctor'] : defaultImages['default-doctor']}
            alt={doctor.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialization}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{doctor.experience} years exp.</Badge>
              <Badge variant="secondary">⭐ {doctor.rating}</Badge>
              <Badge variant="secondary">{doctor.reviewCount} reviews</Badge>
            </div>
          </div>
        </div>
        <Button onClick={onClose} variant="outline">
          Close
        </Button>
      </div>

      <div className="mt-6 space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-600">{doctor.about}</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          <ul className="list-disc list-inside text-gray-600">
            {doctor.education?.map((edu, index) => (
              <li key={index}>
                {edu.degree} - {edu.institution} ({edu.year})
              </li>
            ))}
          </ul>
        </section>

        {doctor.languages && doctor.languages.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold mb-2">Languages</h3>
            <div className="flex gap-2">
              {doctor.languages.map((lang, index) => (
                <Badge key={index} variant="outline">
                  {lang}
                </Badge>
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="text-lg font-semibold mb-2">Location</h3>
          <p className="text-gray-600">
            {doctor.location.address}, {doctor.location.city}, {doctor.location.state}
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Reviews</h3>
          <DoctorReviews reviews={doctor.reviews || []} />
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">Select Appointment Date</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Fees</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              Consultation: ₹{doctor.consultationFee}
            </p>
            {doctor.acceptsAyushman && (
              <Badge variant="success">Accepts Ayushman Card</Badge>
            )}
          </div>
        </section>

        <div className="flex justify-end">
          <Button onClick={handleBookAppointment} disabled={!selectedDate}>
            Book Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
}
