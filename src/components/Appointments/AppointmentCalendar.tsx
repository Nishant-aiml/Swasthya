import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { toast } from '@/components/ui/ToastNotification';
import { dummyAppointments } from '@/data/appointments-data';
import { format, isSameDay } from 'date-fns';
import { Badge } from '@/components/ui/Badge';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Card } from '@/components/ui/Card';
import { Video, User, MapPin, IndianRupee, Clock, CheckCircle, XCircle, Calendar as CalendarIcon } from 'lucide-react';
import { Appointment, AppointmentStatus } from '@/types/appointment';

interface AppointmentCalendarProps {
  className?: string;
}

const statusColors: Record<AppointmentStatus, string> = {
  scheduled: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800'
};

export default function AppointmentCalendar({ className }: AppointmentCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'scheduled':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAppointmentsForDate = (selectedDate: Date) => {
    return dummyAppointments.filter((appointment) =>
      isSameDay(new Date(appointment.date), selectedDate)
    );
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowDetails(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      <div className="md:w-1/2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-md border shadow"
        />
      </div>

      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">
          {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
        </h2>
        
        <ScrollArea className="h-[500px] rounded-md border p-4">
          {date && getAppointmentsForDate(date).length > 0 ? (
            getAppointmentsForDate(date).map((appointment) => (
              <Card
                key={appointment.id}
                className="mb-4 p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleAppointmentClick(appointment)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{appointment.time}</span>
                  </div>
                  <Badge className={statusColors[appointment.status as AppointmentStatus]}>
                    {appointment.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-semibold">{appointment.patientName}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {format(new Date(appointment.date), 'MMMM d, yyyy')} at {appointment.time}
                  </div>
                  <div className="flex items-center gap-2">
                    {appointment.consultationType === 'online' ? (
                      <Video className="h-4 w-4 text-blue-500" />
                    ) : (
                      <MapPin className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm">
                      {appointment.consultationType === 'online'
                        ? 'Video Consultation'
                        : 'In-person Visit'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" />
                    <span>₹{appointment.consultationFee}</span>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No appointments for this date
            </div>
          )}
        </ScrollArea>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedAppointment && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <DialogDescription>
                Complete information about your appointment
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    {selectedAppointment.patientName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {format(new Date(selectedAppointment.date), 'MMMM d, yyyy')} at{' '}
                    {selectedAppointment.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedAppointment.consultationType === 'online' ? 'Video Consultation' : 'In-person Visit'}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className={statusColors[selectedAppointment.status]}
                >
                  {selectedAppointment.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Phone:</span>{' '}
                  {selectedAppointment.patientPhone}
                </p>
                <p className="text-sm text-gray-600">
                  Fee: ₹{selectedAppointment.consultationFee}
                </p>
              </div>
            </div>

            <DialogFooter>
              {selectedAppointment.status !== 'cancelled' && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      toast({
                        title: "Appointment Cancelled",
                        description: "The appointment has been cancelled successfully.",
                        variant: "destructive",
                      });
                      closeDialog();
                    }}
                  >
                    Cancel Appointment
                  </Button>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Appointment Rescheduled",
                        description: "Please check your email for the new appointment details.",
                      });
                      closeDialog();
                    }}
                  >
                    Reschedule
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={closeDialog}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
