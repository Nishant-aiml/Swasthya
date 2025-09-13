import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import DoctorSearch from './DoctorSearch';
import MyAppointments from './MyAppointments';
import HospitalNetwork from '../HospitalNetwork';

export default function Appointments() {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="search">Find Doctor</TabsTrigger>
          <TabsTrigger value="appointments">My Appointments</TabsTrigger>
          <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="mt-6">
          <DoctorSearch />
        </TabsContent>

        <TabsContent value="appointments" className="mt-6">
          <MyAppointments />
        </TabsContent>

        <TabsContent value="hospitals" className="mt-6">
          <HospitalNetwork />
        </TabsContent>
      </Tabs>
    </div>
  );
}
