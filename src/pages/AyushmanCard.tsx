import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import AyushmanApplication from '../components/AyushmanCard/AyushmanApplication';
import AyushmanVerification from '../components/AyushmanCard/AyushmanVerification';

export default function AyushmanCard() {
  const [activeTab, setActiveTab] = useState('verify');

  const handleVerification = async (cardNumber: string, cardImage: File) => {
    // TODO: Implement actual verification logic
    return new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 2000);
    });
  };

  const handleApplication = async (formData: FormData) => {
    // TODO: Implement actual application submission logic
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Ayushman Card Services</h1>
        <p className="text-gray-600">
          Apply for a new Ayushman card or verify your existing card for seamless healthcare access
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
          <TabsTrigger value="verify">Verify Card</TabsTrigger>
          <TabsTrigger value="apply">Apply for Card</TabsTrigger>
        </TabsList>

        <TabsContent value="verify" className="mt-6">
          <AyushmanVerification
            onVerify={handleVerification}
            onSuccess={() => {
              // Handle successful verification
              console.log('Card verified successfully');
            }}
          />
        </TabsContent>

        <TabsContent value="apply" className="mt-6">
          <AyushmanApplication
            onSubmit={handleApplication}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-8 bg-emerald-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">About Ayushman Card</h3>
        <p className="text-sm text-gray-700 mb-4">
          The Ayushman Card provides healthcare coverage to eligible beneficiaries for secondary and tertiary care hospitalization. 
          It offers a health cover of Rs. 5 lakhs per family per year for medical treatment in empanelled hospitals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">Benefits:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Cashless and paperless treatment</li>
              <li>Coverage for pre and post hospitalization expenses</li>
              <li>No restriction on family size or age</li>
              <li>All pre-existing conditions covered</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Required Documents:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Aadhaar Card</li>
              <li>Proof of residence</li>
              <li>Recent passport size photograph</li>
              <li>Mobile number for OTP verification</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
