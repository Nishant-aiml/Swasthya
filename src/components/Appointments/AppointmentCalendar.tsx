import React, { useState } from 'react';
import { Calendar } from "@/components/ui/Calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Clock, Video, Phone, User, Calendar as CalendarIcon } from 'lucide-react';
import type { Appointment } from '@/types/doctor';

interface AppointmentCalendarProps {
  appointments?: Appointment[];
  onDateSelect?: (date: Date) => void;
  onAppointmentSelect?: (appointment: Appointment) => void;
}

export default function AppointmentCalendar({
  appointments = [],
  onDateSelect,
  onAppointmentSelect
}: AppointmentCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const appointmentDates = appointments.reduce((acc, apt) => {
    const date = new Date(apt.date).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(apt);
    return acc;
  }, {} as Record<string, Appointment[]>);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointmentDates[dateStr] || [];
  };

  const getAppointmentTypeIcon = (type: 'video' | 'in-person' | 'phone') => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'in-person':
        return <User className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Appointment Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border"
          modifiers={{
            booked: (date) => {
              const dateStr = date.toISOString().split('T')[0];
              return !!appointmentDates[dateStr];
            }
          }}
          modifiersStyles={{
            booked: {
              fontWeight: 'bold',
              backgroundColor: 'rgba(59, 130, 246, 0.1)'
            }
          }}
        />

        {selectedDate && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">
              Appointments for {selectedDate.toLocaleDateString()}
            </h4>
            <div className="space-y-2">
              {getAppointmentsForDate(selectedDate).length > 0 ? (
                getAppointmentsForDate(selectedDate).map((apt) => (
                  <Dialog key={apt.id}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                        onClick={() => setSelectedAppointment(apt)}
                      >
                        <div className="flex items-center gap-2">
                          {getAppointmentTypeIcon(apt.type)}
                          <div className="flex-1">
                            <p className="font-medium">{apt.patientName}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="h-3 w-3" />
                              {apt.time}
                            </div>
                          </div>
                          <Badge className={getStatusColor(apt.status)}>
                            {apt.status}
                          </Badge>
                        </div>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Appointment Details</DialogTitle>
                        <DialogDescription>
                          View the details of this appointment
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Patient Information</h4>
                          <p className="text-sm text-gray-500">
                            Name: {apt.patientName}
                          </p>
                          <p className="text-sm text-gray-500">
                            Phone: {apt.patientPhone}
                          </p>
                          {apt.ayushmanCard && (
                            <p className="text-sm text-gray-500">
                              Ayushman Card: {apt.ayushmanCard}
                            </p>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">Appointment Information</h4>
                          <p className="text-sm text-gray-500">
                            Date: {apt.date}
                          </p>
                          <p className="text-sm text-gray-500">
                            Time: {apt.time}
                          </p>
                          <p className="text-sm text-gray-500">
                            Type: {apt.type}
                          </p>
                          <Badge className={getStatusColor(apt.status)}>
                            {apt.status}
                          </Badge>
                        </div>
                        {apt.specialInstructions && (
                          <div>
                            <h4 className="font-medium">Special Instructions</h4>
                            <p className="text-sm text-gray-500">
                              {apt.specialInstructions}
                            </p>
                          </div>
                        )}
                        {apt.feedback && (
                          <div>
                            <h4 className="font-medium">Feedback</h4>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < apt.feedback!.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {apt.feedback.comment}
                            </p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No appointments scheduled for this date
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
