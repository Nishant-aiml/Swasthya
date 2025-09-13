import { useState } from 'react';
import { dummyAppointments, dummyDoctors, Appointment, Doctor } from '@/data/appointments-data';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Video, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState<Appointment[]>(dummyAppointments);
  const [activeTab, setActiveTab] = useState<'scheduled' | 'confirmed' | 'cancelled'>('scheduled');

  const filteredAppointments = appointments.filter(apt => apt.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDoctorById = (doctorId: string): Doctor | undefined => {
    return dummyDoctors.find(doc => doc.id === doctorId);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'cancelled' as const, notes: 'Cancelled by patient' }
        : apt
    ));
  };

  const handleReschedule = (appointmentId: string) => {
    // In a real app, this would open a reschedule dialog
    console.log(`Rescheduling appointment ${appointmentId}`);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Appointments</h2>
        <Button>Schedule New Appointment</Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
        <TabsList>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Consultation Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => {
                const doctor = getDoctorById(appointment.doctorId);
                return (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{doctor?.name || 'Unknown Doctor'}</TableCell>
                    <TableCell>{appointment.consultationType}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Appointment Details</DialogTitle>
                              <DialogDescription>
                                Detailed information about your appointment
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Doctor</Label>
                                <Input value={doctor?.name || 'Unknown Doctor'} readOnly />
                              </div>
                              <div>
                                <Label>Specialization</Label>
                                <Input value={doctor?.specialization || 'N/A'} readOnly />
                              </div>
                              <div>
                                <Label>Date & Time</Label>
                                <Input value={`${appointment.date} ${appointment.time}`} readOnly />
                              </div>
                              <div>
                                <Label>Consultation Type</Label>
                                <Input value={appointment.consultationType} readOnly />
                              </div>
                              {appointment.notes && (
                                <div>
                                  <Label>Notes</Label>
                                  <Input value={appointment.notes} readOnly />
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {appointment.status === 'scheduled' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReschedule(appointment.id)}
                            >
                              Reschedule
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
