import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { 
  FileText, Crown, Users, Activity, CreditCard, Settings, 
  Clock, UserPlus, QrCode, Hospital 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import ProfileDashboard from '../components/Profile/ProfileDashboard';
import SwasthyaCard from '../components/Profile/SwasthyaCard';
import { PersonalInformation } from '../components/Profile/sections/PersonalInformation';
import { MedicalRecords } from '../components/Profile/sections/MedicalRecords';
import { SettingsPreferences } from '../components/Profile/sections/SettingsPreferences';
import { HealthTimeline } from '../components/Profile/sections/HealthTimeline';
import { PatientRegistration } from '../components/Profile/sections/PatientRegistration';
import { QRCodeSection } from '../components/Profile/sections/QRCodeSection';
import { MedicalRecordsManagement } from '../components/Profile/sections/MedicalRecordsManagement';
import { AyushmanIntegration } from '../components/Profile/sections/AyushmanIntegration';
import { AyushmanNetwork } from '../components/Profile/sections/AyushmanNetwork';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile & Settings</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            Manage your health records, personal information, and medical history
          </p>
        </div>
      </div>

      <div data-tabs-value={activeTab}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap justify-start sm:justify-center gap-2 mb-6 sm:mb-8 overflow-x-auto">
            <TabsTrigger value="dashboard" className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <Activity className="h-4 w-4 mr-2" />
              <span>Dashboard</span>
            </TabsTrigger>

            <TabsTrigger value="personal" className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'personal'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <Users className="h-4 w-4 mr-2" />
              <span>Personal Info</span>
            </TabsTrigger>

            <TabsTrigger value="medical" className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'medical'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <FileText className="h-4 w-4 mr-2" />
              <span>Medical Records</span>
            </TabsTrigger>

            <TabsTrigger value="settings" className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </TabsTrigger>

            <TabsTrigger value="timeline" className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <Clock className="h-4 w-4 mr-2" />
              <span>Timeline</span>
            </TabsTrigger>

            <TabsTrigger value="registration" className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'registration'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <UserPlus className="h-4 w-4 mr-2" />
              <span>Registration</span>
            </TabsTrigger>

            <TabsTrigger value="swasthya" className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'swasthya'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <QrCode className="h-4 w-4 mr-2" />
              <span>Swasthya Card</span>
            </TabsTrigger>

            <TabsTrigger value="ayushman" className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'ayushman'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <Hospital className="h-4 w-4 mr-2" />
              <span>Ayushman</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 sm:mt-6">
            <TabsContent value="dashboard">
              <div className="focus:outline-none">
                <ProfileDashboard />
              </div>
            </TabsContent>

            <TabsContent value="personal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PersonalInformation />
                <MedicalRecordsManagement />
              </div>
            </TabsContent>

            <TabsContent value="medical">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MedicalRecords />
                <QRCodeSection />
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingsPreferences />
              </div>
            </TabsContent>

            <TabsContent value="timeline">
              <HealthTimeline />
            </TabsContent>

            <TabsContent value="registration">
              <PatientRegistration />
            </TabsContent>

            <TabsContent value="swasthya">
              <SwasthyaCard />
            </TabsContent>

            <TabsContent value="ayushman">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AyushmanIntegration />
                <AyushmanNetwork />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Quick Actions */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-700">
            Our support team is available 24/7 to assist you with any questions.
          </p>
          <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Contact Support
          </button>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-medium text-green-900 mb-2">Privacy Settings</h3>
          <p className="text-sm text-green-700">
            Review and update your privacy preferences and data sharing settings.
          </p>
          <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Manage Settings
          </button>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="font-medium text-purple-900 mb-2">Account Security</h3>
          <p className="text-sm text-purple-700">
            Enable two-factor authentication and manage your security preferences.
          </p>
          <button className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Security Settings
          </button>
        </div>
      </div>
    </div>
  );
}