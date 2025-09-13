import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import DoctorSearch from '@/components/Appointments/DoctorSearch/index';
import DoctorProfiles from '@/components/Appointments/DoctorProfiles';
import AppointmentManagement from '@/components/Appointments/AppointmentManagement';
import HospitalNetwork from '@/components/Appointments/HospitalNetwork';
import HomeNursing from '@/components/Appointments/HomeNursing';
import { Doctor } from '@/types/doctor';

const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const handleDoctorsFound = (foundDoctors: Doctor[]) => {
    setDoctors(foundDoctors);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Healthcare Services</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <TabsTrigger value="search">Doctor Search</TabsTrigger>
          <TabsTrigger value="profiles">Doctor Profiles</TabsTrigger>
          <TabsTrigger value="appointments">My Appointments</TabsTrigger>
          <TabsTrigger value="hospitals">Hospital Network</TabsTrigger>
          <TabsTrigger value="nursing">Home Nursing</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <DoctorSearch onDoctorsFound={handleDoctorsFound} />
        </TabsContent>

        <TabsContent value="profiles">
          <DoctorProfiles 
            doctors={doctors} 
            onClose={() => setActiveTab('search')} 
          />
        </TabsContent>

        <TabsContent value="appointments">
          <AppointmentManagement />
        </TabsContent>

        <TabsContent value="hospitals">
          <HospitalNetwork />
        </TabsContent>

        <TabsContent value="nursing">
          <HomeNursing />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentsPage;
