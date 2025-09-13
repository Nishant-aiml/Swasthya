import { useState } from 'react';
import { AyushmanVerification } from '@/components/Profile/sections/AyushmanVerification';
import { AyushmanRegistration } from '@/components/Profile/sections/AyushmanRegistration';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

interface RegistrationData {
  // Add properties for registration data here
}

export default function AyushmanCardPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [activeTab, setActiveTab] = useState('verification');

  const handleVerification = async (cardNumber: string, cardImage: File) => {
    try {
      // Mock verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsVerified(true);
    } catch (error) {
      console.error('Verification failed:', error);
      throw error;
    }
  };

  const handleRegistration = async (data: RegistrationData) => {
    try {
      // Mock registration process
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration data:', data);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ayushman Card</h1>

      <Tabs 
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="verification">Verify Card</TabsTrigger>
          <TabsTrigger value="registration">Register New Card</TabsTrigger>
        </TabsList>

        <TabsContent value="verification">
          <AyushmanVerification 
            onVerify={handleVerification}
            onSuccess={() => setIsVerified(true)}
            onError={(error) => console.error('Verification error:', error)}
          />
        </TabsContent>

        <TabsContent value="registration">
          <AyushmanRegistration onSubmit={handleRegistration} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
