import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import PersonalInformation from '@/components/Profile/sections/PersonalInformation';
import MedicalRecords from '@/components/Profile/sections/MedicalRecords';
import SettingsPreferences from '@/components/Profile/sections/SettingsPreferences';
import HealthTimeline from '@/components/Profile/sections/HealthTimeline';
import PatientRegistration from '@/components/Profile/sections/PatientRegistration';
import SwasthyaCard from '@/components/Profile/sections/SwasthyaCard';
import QRCodeManager from '@/components/Profile/sections/QRCodeManager';
import AyushmanNetwork from '@/components/Profile/sections/AyushmanNetwork';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Profile Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="timeline">Health Timeline</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="swasthya-card">Swasthya Card</TabsTrigger>
          <TabsTrigger value="qr-code">QR Code</TabsTrigger>
          <TabsTrigger value="ayushman">Ayushman Network</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInformation />
        </TabsContent>

        <TabsContent value="medical-records">
          <MedicalRecords />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPreferences />
        </TabsContent>

        <TabsContent value="timeline">
          <HealthTimeline />
        </TabsContent>

        <TabsContent value="registration">
          <PatientRegistration />
        </TabsContent>

        <TabsContent value="swasthya-card">
          <SwasthyaCard />
        </TabsContent>

        <TabsContent value="qr-code">
          <QRCodeManager />
        </TabsContent>

        <TabsContent value="ayushman">
          <AyushmanNetwork />
        </TabsContent>
      </Tabs>
    </div>
  );
}