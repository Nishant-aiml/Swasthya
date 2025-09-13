import React, { useState } from 'react';
import { Appointment } from '@/types/appointment';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Phone, Video } from 'lucide-react';

interface AppointmentConfirmationProps {
  appointment: Appointment;
  onClose: () => void;
  onPrint?: () => void;
}

export function AppointmentConfirmation({
  appointment,
  onClose,
  onPrint,
}: AppointmentConfirmationProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: 'online' | 'in-person') => {
    return type === 'online' ? (
      <Video className="w-5 h-5" />
    ) : (
      <MapPin className="w-5 h-5" />
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Appointment {appointment.status === 'confirmed' ? 'Confirmed!' : 'Details'}
            </h2>
            <p className="text-gray-600 mt-1">
              Here are your appointment details
            </p>
          </div>

          <div className="space-y-6">
            {/* Status */}
            <div className="flex justify-center">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                  appointment.status
                )}`}
              >
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>

            {/* Appointment Details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium text-gray-900">
                    {format(new Date(appointment.date), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium text-gray-900">{appointment.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getTypeIcon(appointment.consultationType)}
                <span className="text-sm">
                  {appointment.consultationType === 'online' ? 'Video Consultation' : 'In-person Visit'}
                </span>
              </div>
            </div>

            {/* Patient Details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-medium text-gray-900">Patient Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{appointment.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{appointment.patientPhone}</p>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            {appointment.notes && (
              <div className="mt-4">
                <h4 className="font-medium text-sm">Special Instructions</h4>
                <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {onPrint && (
                <Button onClick={onPrint}>
                  Print Details
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
