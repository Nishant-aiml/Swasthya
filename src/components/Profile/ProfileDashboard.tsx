import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { updateProfile } from '@/services/profile.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import PatientRegistration from "./sections/PatientRegistration"
import MedicalRecordsManagement from "./sections/MedicalRecordsManagement"
import AyushmanNetwork from "./sections/AyushmanNetwork"
import SettingsPreferences from "./sections/SettingsPreferences"

export function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState('registration');
  const { toast } = useToast();

  const handleSubmit = async (formData: any) => {
    try {
      const data = {
        name: formData.name,
        gender: formData.gender,
        age: formData.age,
        bloodGroup: formData.bloodGroup,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        medicalHistory: formData.medicalHistory,
        medications: formData.medications,
        surgeries: formData.surgeries,
        allergies: formData.allergies,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        emergencyContactAlternativePhone: formData.emergencyContactAlternativePhone
      };
      
      await updateProfile(data);
      toast({
        title: "Success",
        description: "Profile updated successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="ayushman">Ayushman Network</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="registration">
          <PatientRegistration onSubmit={handleSubmit} />
        </TabsContent>

        <TabsContent value="records">
          <MedicalRecordsManagement />
        </TabsContent>

        <TabsContent value="ayushman">
          <AyushmanNetwork />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPreferences />
        </TabsContent>
      </Tabs>
    </div>
  );
}
