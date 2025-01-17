import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CreditCard, MapPin } from 'lucide-react';
import { Calendar } from '@/components/ui/Calendar';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import type { Doctor } from '@/types/doctor';

interface BookAppointmentProps {
  doctor: Doctor;
  onBookAppointment: (appointmentDetails: any) => void;
}

export default function BookAppointment({ doctor, onBookAppointment }: BookAppointmentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>();
  const [consultationType, setConsultationType] = useState<'in-person' | 'video'>('in-person');
  const [useAyushman, setUseAyushman] = useState(false);
  const [step, setStep] = useState(1);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    phone: '',
    email: '',
    ayushmanCard: '',
  });

  // Get available slots for selected date
  const getAvailableSlots = (date: Date) => {
    const slot = doctor.availableSlots.find(
      (s) => s.date === format(date, 'yyyy-MM-dd')
    );
    return slot?.slots || [];
  };

  const handleConfirmBooking = () => {
    const appointmentDetails = {
      doctorId: doctor.id,
      date: format(selectedDate!, 'yyyy-MM-dd'),
      time: selectedSlot,
      type: consultationType,
      patientName: patientDetails.name,
      patientPhone: patientDetails.phone,
      patientEmail: patientDetails.email,
      ayushmanCard: useAyushman ? patientDetails.ayushmanCard : undefined,
    };
    onBookAppointment(appointmentDetails);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 
          text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-colors font-medium shadow-md">
          <CalendarIcon className="h-5 w-5" />
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {step === 1 && (
            <div className="space-y-6">
              {/* Select Consultation Type */}
              <div>
                <h4 className="font-medium mb-3">Select Consultation Type</h4>
                <RadioGroup
                  value={consultationType}
                  onValueChange={(value: 'in-person' | 'video') => setConsultationType(value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-person" id="in-person" />
                    <Label htmlFor="in-person">In-Person Visit</Label>
                  </div>
                  {doctor.isAvailableOnline && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video">Video Consultation</Label>
                    </div>
                  )}
                </RadioGroup>
              </div>

              {/* Calendar */}
              <div>
                <h4 className="font-medium mb-3">Select Date</h4>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    return date < new Date() || date > addDays(new Date(), 30);
                  }}
                  className="rounded-md border"
                />
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <h4 className="font-medium mb-3">Select Time Slot</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {getAvailableSlots(selectedDate).map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                          ${
                            selectedSlot === slot
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                disabled={!selectedDate || !selectedSlot}
                onClick={() => setStep(2)}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Patient Details Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={patientDetails.name}
                    onChange={(e) =>
                      setPatientDetails({ ...patientDetails, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={patientDetails.phone}
                    onChange={(e) =>
                      setPatientDetails({ ...patientDetails, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={patientDetails.email}
                    onChange={(e) =>
                      setPatientDetails({ ...patientDetails, email: e.target.value })
                    }
                  />
                </div>

                {doctor.acceptsAyushman && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ayushman"
                        checked={useAyushman}
                        onCheckedChange={(checked) => setUseAyushman(checked as boolean)}
                      />
                      <label
                        htmlFor="ayushman"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Use Ayushman Card
                      </label>
                    </div>
                    {useAyushman && (
                      <div>
                        <Label htmlFor="ayushmanCard">Ayushman Card Number</Label>
                        <Input
                          id="ayushmanCard"
                          value={patientDetails.ayushmanCard}
                          onChange={(e) =>
                            setPatientDetails({
                              ...patientDetails,
                              ayushmanCard: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Appointment Summary */}
              <div className="rounded-lg bg-blue-50 p-4 space-y-3">
                <h4 className="font-medium">Appointment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-blue-500" />
                    <span>
                      {format(selectedDate!, 'MMMM d, yyyy')} at {selectedSlot}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>{doctor.location.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>{consultationType === 'video' ? 'Video Consultation' : 'In-Person Visit'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-blue-500" />
                    <span>
                      Consultation Fee: ₹{doctor.consultationFee}
                      {useAyushman && ' (Ayushman Card)'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  disabled={!patientDetails.name || !patientDetails.phone}
                  onClick={handleConfirmBooking}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
