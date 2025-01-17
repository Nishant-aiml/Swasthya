import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import {
  AlertTriangle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Video,
  Search,
  Building2,
  BarChart2
} from 'lucide-react';
import DoctorSearch from '@/components/Appointments/DoctorSearch';
import AppointmentCalendar from '@/components/Appointments/AppointmentCalendar';
import AppointmentList from '@/components/Appointments/AppointmentList';
import HospitalNetwork from '@/components/Appointments/HospitalNetwork';
import EmergencyServices from '@/components/Appointments/EmergencyServices';
import AppointmentStats from '@/components/Appointments/AppointmentStats';
import { useAppointments } from '@/hooks/useAppointments';
import { mockDoctors, mockHospitals, mockAppointments } from '@/data/mockData';

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('search');
  const {
    appointments,
    cancelAppointment,
    rescheduleAppointment,
    submitFeedback,
    bookAppointment
  } = useAppointments();

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Emergency Services Quick Access */}
      <Alert variant="destructive" className="bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Emergency Services</AlertTitle>
        <AlertDescription className="flex items-center gap-4">
          Need immediate medical attention?
          <Button variant="destructive" className="gap-2">
            <Phone className="h-4 w-4" />
            Call Emergency
          </Button>
          <Button variant="outline" className="gap-2">
            Find Nearest Hospital
          </Button>
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="search" className="gap-2">
            <Search className="h-4 w-4" />
            Find Doctor
          </TabsTrigger>
          <TabsTrigger value="appointments" className="gap-2">
            <Calendar className="h-4 w-4" />
            My Appointments
          </TabsTrigger>
          <TabsTrigger value="hospitals" className="gap-2">
            <Building2 className="h-4 w-4" />
            Hospital Network
          </TabsTrigger>
          <TabsTrigger value="insights" className="gap-2">
            <BarChart2 className="h-4 w-4" />
            Health Insights
          </TabsTrigger>
        </TabsList>

        {/* Doctor Search */}
        <TabsContent value="search" className="mt-6">
          <DoctorSearch 
            doctors={mockDoctors}
            onBookAppointment={bookAppointment}
          />
        </TabsContent>

        {/* My Appointments */}
        <TabsContent value="appointments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AppointmentList
                appointments={mockAppointments}
                onCancelAppointment={cancelAppointment}
                onRescheduleAppointment={rescheduleAppointment}
                onSubmitFeedback={submitFeedback}
              />
            </div>
            <div>
              <AppointmentCalendar
                appointments={mockAppointments}
              />
            </div>
          </div>
        </TabsContent>

        {/* Hospital Network */}
        <TabsContent value="hospitals" className="mt-6">
          <HospitalNetwork
            hospitals={mockHospitals}
          />
        </TabsContent>

        {/* Health Insights */}
        <TabsContent value="insights" className="mt-6">
          <AppointmentStats
            appointments={mockAppointments}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
