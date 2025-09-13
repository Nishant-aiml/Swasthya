import React, { useState } from 'react';
import { Doctor } from '@/types/doctor';
import { Dialog, DialogContent } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/Select';
import { format } from 'date-fns';

interface BookAppointmentProps {
  doctor: Doctor;
  onBookAppointment: (appointmentDetails: any) => void;
  onClose: () => void;
  type: 'video' | 'in-person';
}

export function BookAppointment({ doctor, onBookAppointment, onClose, type }: BookAppointmentProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'video' | 'in-person'>('video');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [ayushmanCard, setAyushmanCard] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const availableDates = doctor.availableSlots?.map(slot => slot.date) || [];
  const availableTimes = selectedDate
    ? doctor.availableSlots?.find(slot => slot.date === selectedDate)?.slots || []
    : [];

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !patientName || !patientPhone) return;

    onBookAppointment({
      date: selectedDate,
      time: selectedTime,
      type: consultationType,
      patientName,
      patientPhone,
      ayushmanCard: ayushmanCard || undefined,
      specialInstructions: specialInstructions || undefined,
    });

    onClose();
  };

  const handleConsultationTypeChange = (value: string) => {
    setConsultationType(value as "video" | "in-person");
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Book Appointment</h3>
            <p className="text-sm text-gray-500">
              {type === 'video' ? 'Video Consultation' : 'In-Person Visit'} with Dr. {doctor.name}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Consultation Type
              </label>
              <Select onValueChange={handleConsultationTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Consultation</SelectItem>
                  <SelectItem value="in-person">In-Person Visit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Select Date
              </label>
              <Select onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  {availableDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Select Time
              </label>
              <Select onValueChange={setSelectedTime} disabled={!selectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Patient Name</label>
              <Input
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                required
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ayushman Card (Optional)</label>
              <Input
                value={ayushmanCard}
                onChange={(e) => setAyushmanCard(e.target.value)}
                placeholder="Enter Ayushman card number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Special Instructions (Optional)</label>
              <Textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special instructions or concerns"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedDate || !selectedTime || !patientName || !patientPhone}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
