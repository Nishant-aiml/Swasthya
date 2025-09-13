import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Doctor } from '@/types/doctor';
import { format } from 'date-fns';
import { Input } from '@/components/ui/Input';

interface AppointmentBookingProps {
  doctor: Doctor;
  onClose: () => void;
  onBook: (appointmentData: any) => void;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', 
  '02:00 PM', '03:00 PM', '04:00 PM'
];

export default function AppointmentBooking({ doctor, onClose, onBook }: AppointmentBookingProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consultationType, setConsultationType] = useState<'in-person' | 'video' | 'phone'>('in-person');
  const [symptoms, setSymptoms] = useState('');

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) {
      alert('Please select both date and time slot');
      return;
    }

    onBook({
      doctorId: doctor.id,
      doctorName: doctor.name,
      date: selectedDate,
      time: selectedSlot,
      type: consultationType,
      symptoms,
      consultationFee: doctor.consultationFee
    });
  };

  return (
    <div className="p-6">
      {/* Doctor Info */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">{doctor.name}</h2>
          <p className="text-gray-600">{doctor.specialization}</p>
        </div>
        <div>
          <span className="text-lg">₹{doctor.consultationFee}</span>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Date Selection */}
          <div>
            <h3 className="text-base font-semibold mb-4">Select Date</h3>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              className="w-full"
            />
          </div>

          {/* Time Selection */}
          <div>
            <h3 className="text-base font-semibold mb-4">Select Time Slot</h3>
            <Select value={selectedSlot} onValueChange={setSelectedSlot}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Consultation Type */}
        <div>
          <h3 className="text-base font-semibold mb-4">Consultation Type</h3>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setConsultationType('in-person')}
              className={`flex items-center justify-center gap-2 flex-1 py-2 px-4 rounded-md transition-colors ${
                consultationType === 'in-person'
                  ? 'bg-[#6941C6] text-white'
                  : 'border border-gray-200 hover:border-[#6941C6]'
              }`}
            >
              <span className="text-lg">👤</span>
              <span>In-Person</span>
            </button>
            <button
              type="button"
              onClick={() => setConsultationType('video')}
              className={`flex items-center justify-center gap-2 flex-1 py-2 px-4 rounded-md transition-colors ${
                consultationType === 'video'
                  ? 'bg-[#6941C6] text-white'
                  : 'border border-gray-200 hover:border-[#6941C6]'
              }`}
            >
              <span className="text-lg">📹</span>
              <span>Video</span>
            </button>
            <button
              type="button"
              onClick={() => setConsultationType('phone')}
              className={`flex items-center justify-center gap-2 flex-1 py-2 px-4 rounded-md transition-colors ${
                consultationType === 'phone'
                  ? 'bg-[#6941C6] text-white'
                  : 'border border-gray-200 hover:border-[#6941C6]'
              }`}
            >
              <span className="text-lg">📞</span>
              <span>Phone</span>
            </button>
          </div>
        </div>

        {/* Symptoms */}
        <div>
          <h3 className="text-base font-semibold mb-4">Symptoms/Reason for Visit</h3>
          <Textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Briefly describe your symptoms or reason for visit"
            className="min-h-[100px] resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleBook}
            disabled={!selectedDate || !selectedSlot}
            className="bg-[#6941C6] hover:bg-[#6941C6]/90 px-6"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
