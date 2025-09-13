import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { mockAppointments } from '@/data/mockData';
import { Appointment } from '@/types/appointment';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import AppointmentBooking from './AppointmentBooking';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function MyAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedStatus, setSelectedStatus] = useState<'scheduled' | 'confirmed' | 'cancelled'>('scheduled');
  const [showReschedule, setShowReschedule] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter(app => app.status === selectedStatus);

  const handleCancel = (appointmentId: string) => {
    setAppointments(appointments.map(app =>
      app.id === appointmentId ? { ...app, status: 'cancelled' } : app
    ));
    toast.success('Appointment cancelled successfully');
  };

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowReschedule(true);
  };

  const handleRescheduleSubmit = (appointmentData: any) => {
    if (!selectedAppointment) return;

    setAppointments(appointments.map(app =>
      app.id === selectedAppointment.id
        ? {
            ...app,
            date: appointmentData.date,
            time: appointmentData.time,
            consultationType: appointmentData.type,
            symptoms: appointmentData.symptoms,
            status: 'confirmed'
          }
        : app
    ));
    setShowReschedule(false);
    toast.success('Appointment rescheduled successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Appointments</h1>
        <Button
          onClick={() => navigate('/doctor-search')}
          className="bg-[#6941C6] hover:bg-[#6941C6]/90"
        >
          Schedule New Appointment
        </Button>
      </div>

      <div className="flex gap-2 border-b">
        {(['scheduled', 'confirmed', 'cancelled'] as const).map((status) => (
          <button
            key={status}
            className={`px-4 py-2 font-medium ${
              selectedStatus === status
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Consultation Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.doctorName || 'Unknown Doctor'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">
                  {appointment.consultationType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {appointment.status !== 'cancelled' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReschedule(appointment)}
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showReschedule && selectedAppointment && (
        <Dialog open={showReschedule} onOpenChange={() => setShowReschedule(false)}>
          <DialogContent className="max-w-4xl" aria-describedby="reschedule-dialog-description">
            <DialogHeader>
              <DialogTitle>Reschedule Appointment</DialogTitle>
              <DialogDescription id="reschedule-dialog-description">
                Please select a new date and time for your appointment with {selectedAppointment?.doctorName}
              </DialogDescription>
            </DialogHeader>
            <AppointmentBooking
              doctor={{
                id: selectedAppointment.doctorId,
                name: selectedAppointment.doctorName || "Unknown Doctor",
                consultationFee: selectedAppointment.consultationFee,
                // Add other required doctor fields here
              } as any}
              onClose={() => setShowReschedule(false)}
              onBook={handleRescheduleSubmit}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
