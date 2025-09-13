import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Check, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { Doctor } from '@/types/doctor';
import { Appointment } from '@/types/appointment';
import { QRCodeSVG } from 'qrcode.react';

interface AppointmentConfirmationProps {
  doctor: Doctor;
  appointment: Appointment;
  onClose: () => void;
}

export default function AppointmentConfirmation({
  doctor,
  appointment,
  onClose,
}: AppointmentConfirmationProps) {
  const [showQR, setShowQR] = useState(false);

  const appointmentInfo = {
    doctorName: doctor.name,
    patientName: appointment.patientName,
    date: appointment.date,
    time: appointment.time,
    location: doctor.location.address,
    appointmentId: appointment.id,
  };

  const qrData = JSON.stringify(appointmentInfo);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Appointment Confirmed!</h2>
        <p className="text-gray-600">
          Your appointment has been successfully scheduled
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium">{appointment.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="font-medium">{appointment.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-medium">{doctor.location.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Contact</p>
              <p className="font-medium">{doctor.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{doctor.email}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-center">
        {showQR ? (
          <div className="p-4 bg-white rounded-lg">
            <QRCodeSVG value={qrData} size={200} />
          </div>
        ) : (
          <Button variant="outline" onClick={() => setShowQR(true)}>
            Show QR Code
          </Button>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => window.print()}>Print Details</Button>
      </div>
    </div>
  );
}
