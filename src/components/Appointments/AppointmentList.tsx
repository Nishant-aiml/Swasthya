import { FC, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Clock, Video, User, Calendar, MapPin } from 'lucide-react';
import type { Appointment } from '@/types/appointment';
import { format } from 'date-fns';

interface AppointmentListProps {
  appointments: Appointment[];
  onCancelAppointment?: (id: string) => void;
  onRescheduleAppointment?: (id: string) => void;
  onAppointmentSelect: (appointment: Appointment) => void;
}

const AppointmentList: FC<AppointmentListProps> = ({
  appointments,
  onCancelAppointment,
  onRescheduleAppointment,
  onAppointmentSelect
}) => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointmentId(appointment.id);
    onAppointmentSelect(appointment);
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No appointments found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card
          key={appointment.id}
          className={`p-6 cursor-pointer transition-colors ${
            selectedAppointmentId === appointment.id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => handleAppointmentClick(appointment)}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                <p className="text-sm text-gray-500">{appointment.patientEmail}</p>
              </div>
              <Badge className={getStatusBadgeClass(appointment.status)}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(appointment.date), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {appointment.consultationType === 'online' ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span>
                  {appointment.consultationType === 'online'
                    ? 'Video Consultation'
                    : 'In-person Visit'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>₹{appointment.consultationFee}</span>
              </div>
            </div>

            {selectedAppointmentId === appointment.id && appointment.status !== 'cancelled' && (
              <div className="flex gap-3 mt-4">
                {appointment.status === 'confirmed' && onRescheduleAppointment && (
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRescheduleAppointment(appointment.id);
                    }}
                  >
                    Reschedule
                  </Button>
                )}
                {appointment.status === 'confirmed' && onCancelAppointment && (
                  <Button
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCancelAppointment(appointment.id);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            )}

            {appointment.symptoms && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Symptoms:</span> {appointment.symptoms}
                </p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentList;
