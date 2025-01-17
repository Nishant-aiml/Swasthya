import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { PersonalInformation } from './sections/PersonalInformation';
import { MedicalRecords } from './sections/MedicalRecords';
import { SettingsPreferences } from './sections/SettingsPreferences';
import { HealthTimeline } from './sections/HealthTimeline';
import { PatientRegistration } from './sections/PatientRegistration';
import { SwasthyaCardSection } from './sections/SwasthyaCardSection';

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="medical">Medical Records</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInformation />
        </TabsContent>

        <TabsContent value="medical">
          <MedicalRecords />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPreferences />
        </TabsContent>

        <TabsContent value="timeline">
          <HealthTimeline />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PatientRegistration />
        <SwasthyaCardSection />
      </div>
    </div>
  );
}
