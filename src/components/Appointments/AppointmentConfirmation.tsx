import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import dynamic from 'next/dynamic';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Video,
  User,
  Download,
  Share2,
  Calendar as CalendarIcon,
  Plus,
} from 'lucide-react';
import type { Appointment, Doctor, Hospital } from '@/types/appointment';

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

interface AppointmentConfirmationProps {
  appointment: Appointment;
  doctor: Doctor;
  hospital: Hospital;
  onAddToCalendar?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
}

export default function AppointmentConfirmation({
  appointment,
  doctor,
  hospital,
  onAddToCalendar,
  onShare,
  onDownload,
}: AppointmentConfirmationProps) {
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

  const generateCalendarEvent = () => {
    const startDate = new Date(appointment.date + 'T' + appointment.time);
    const endDate = new Date(startDate.getTime() + appointment.duration * 60000);

    const event = {
      title: `Appointment with Dr. ${doctor.name}`,
      description: `${appointment.type} consultation\nLocation: ${hospital.name}\n${hospital.address.street}, ${hospital.address.city}`,
      location: `${hospital.address.street}, ${hospital.address.city}, ${hospital.address.state}`,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    };

    return event;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Appointment Confirmed
            <Badge variant="success">#{appointment.id}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Appointment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Doctor Details</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">Dr. {doctor.name}</p>
                    <p className="text-sm text-gray-500">{doctor.specialization}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getAppointmentTypeIcon(appointment.type)}
                      <span className="text-sm capitalize">{appointment.type} Consultation</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Schedule</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{appointment.time} ({appointment.duration} minutes)</span>
                  </div>
                </div>
              </div>

              {appointment.type === 'in-person' && (
                <div>
                  <h3 className="font-medium mb-2">Location</h3>
                  <div className="space-y-2">
                    <p className="font-medium">{hospital.name}</p>
                    <p className="text-sm text-gray-500">
                      {hospital.address.street}, {hospital.address.city},{' '}
                      {hospital.address.state} - {hospital.address.pincode}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{hospital.contact.phone[0]}</span>
                    </div>
                  </div>
                </div>
              )}

              {appointment.type === 'video' && (
                <div>
                  <h3 className="font-medium mb-2">Video Consultation</h3>
                  <p className="text-sm text-gray-500">
                    A link to join the video consultation will be sent to your email and phone
                    15 minutes before the appointment.
                  </p>
                </div>
              )}
            </div>

            {appointment.type === 'in-person' && (
              <div className="h-[300px] rounded-lg overflow-hidden">
                <Map
                  center={{
                    lat: hospital.location.lat,
                    lng: hospital.location.lng
                  }}
                  zoom={15}
                  markers={[
                    {
                      position: {
                        lat: hospital.location.lat,
                        lng: hospital.location.lng
                      },
                      title: hospital.name,
                    },
                  ]}
                />
              </div>
            )}
          </div>

          {/* Payment Details */}
          <div>
            <h3 className="font-medium mb-2">Payment Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Consultation Fee</p>
                <p className="font-medium">₹{appointment.payment.amount}</p>
              </div>
              <div>
                <p className="text-gray-500">Payment Status</p>
                <Badge
                  variant={
                    appointment.payment.status === 'completed'
                      ? 'success'
                      : appointment.payment.status === 'pending'
                      ? 'warning'
                      : 'destructive'
                  }
                >
                  {appointment.payment.status}
                </Badge>
              </div>
              {appointment.payment.method && (
                <div>
                  <p className="text-gray-500">Payment Method</p>
                  <p className="font-medium capitalize">{appointment.payment.method}</p>
                </div>
              )}
              {appointment.payment.transactionId && (
                <div>
                  <p className="text-gray-500">Transaction ID</p>
                  <p className="font-medium">{appointment.payment.transactionId}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button className="gap-2" onClick={onAddToCalendar}>
              <Plus className="h-4 w-4" />
              Add to Calendar
            </Button>
            <Button variant="outline" className="gap-2" onClick={onDownload}>
              <Download className="h-4 w-4" />
              Download Summary
            </Button>
            <Button variant="outline" className="gap-2" onClick={onShare}>
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Important Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {appointment.type === 'in-person' && (
            <>
              <div>
                <h4 className="font-medium">Before the Visit</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
                  <li>Arrive 15 minutes before your scheduled time</li>
                  <li>Bring all relevant medical records and reports</li>
                  <li>Carry a valid ID proof</li>
                  {appointment.payment.method === 'ayushman' && (
                    <li>Bring your Ayushman card</li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Hospital Guidelines</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
                  <li>Wear a mask at all times</li>
                  <li>Follow social distancing norms</li>
                  <li>Use hand sanitizers provided at the hospital</li>
                </ul>
              </div>
            </>
          )}

          {appointment.type === 'video' && (
            <>
              <div>
                <h4 className="font-medium">Technical Requirements</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
                  <li>Ensure stable internet connection</li>
                  <li>Test your camera and microphone</li>
                  <li>Join from a quiet place</li>
                  <li>Keep your device charged</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">During Consultation</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
                  <li>Join 5 minutes before the scheduled time</li>
                  <li>Keep your medical records ready</li>
                  <li>Ensure good lighting for better visibility</li>
                </ul>
              </div>
            </>
          )}

          <div>
            <h4 className="font-medium">Cancellation Policy</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
              <li>Free cancellation up to 24 hours before the appointment</li>
              <li>50% refund for cancellations within 24 hours</li>
              <li>No refund for no-shows</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
