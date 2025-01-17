import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import SOSLocator from '../components/Emergency/SOSLocator';
import EmergencyChatbot from '../components/Emergency/EmergencyChatbot';
import InsuranceAssistance from '../components/Emergency/InsuranceAssistance';
import BloodBankFinder from '../components/Emergency/BloodBankFinder';
import EmergencyKitStore from '../components/Emergency/EmergencyKitStore';
import { AlertTriangle, Phone, MapPin, MessageSquare, Shield, Droplet, Package } from 'lucide-react';

export default function Emergency() {
  const [activeTab, setActiveTab] = React.useState('sos');

  const emergencyNumbers = [
    { number: '112', label: 'Emergency Services' },
    { number: '102', label: 'Ambulance' },
    { number: '101', label: 'Fire' },
    { number: '1075', label: 'COVID-19 Helpline' },
    { number: '1098', label: 'Child Helpline' },
    { number: '181', label: 'Women Helpline' },
  ];

  const tabIcons = {
    sos: <MapPin className="h-5 w-5" />,
    chat: <MessageSquare className="h-5 w-5" />,
    insurance: <Shield className="h-5 w-5" />,
    blood: <Droplet className="h-5 w-5" />,
    store: <Package className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="container mx-auto py-4 sm:py-8 px-4">
        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 text-white">
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="bg-white/20 p-2 sm:p-3 rounded-lg self-center sm:self-start">
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Emergency Contact Numbers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {emergencyNumbers.map((contact) => (
                  <a
                    key={contact.number}
                    href={`tel:${contact.number}`}
                    className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <div className="font-bold text-base sm:text-lg">{contact.number}</div>
                      <div className="text-xs sm:text-sm opacity-90">{contact.label}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Services Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex flex-wrap justify-center gap-2 sm:gap-4 border-b-2 border-gray-200 pb-3 sm:pb-4 mb-4 sm:mb-6 overflow-x-auto">
              {Object.entries(tabIcons).map(([key, icon]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={`flex items-center space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-300 whitespace-nowrap
                    ${activeTab === key 
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                      : 'hover:bg-red-50'
                    }`}
                >
                  {React.cloneElement(icon as React.ReactElement, { className: 'h-4 w-4 sm:h-5 sm:w-5' })}
                  <span className="capitalize">{key === 'sos' ? 'SOS Locator' : key.replace('_', ' ')}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-4 sm:mt-6">
              <TabsContent value="sos">
                <SOSLocator />
              </TabsContent>
              <TabsContent value="chat">
                <EmergencyChatbot />
              </TabsContent>
              <TabsContent value="insurance">
                <InsuranceAssistance />
              </TabsContent>
              <TabsContent value="blood">
                <BloodBankFinder />
              </TabsContent>
              <TabsContent value="store">
                <EmergencyKitStore />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
