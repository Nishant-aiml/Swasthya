import React from 'react';
import { Phone, AlertCircle, Navigation, Heart } from 'lucide-react';
import EmergencyGuide from './EmergencySupport/EmergencyGuide';

export default function EmergencyCard() {
  return (
    <div className="bg-red-50 rounded-lg p-6 shadow-sm border border-red-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-red-700 flex items-center">
          <AlertCircle className="mr-2 h-6 w-6" />
          Emergency Support
        </h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
          Get Help Now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
          <Phone className="h-5 w-5 text-red-600" />
          <div>
            <p className="font-medium">Emergency Helpline</p>
            <p className="text-sm text-gray-600">102 / 108</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
          <Navigation className="h-5 w-5 text-red-600" />
          <div>
            <p className="font-medium">Nearest Hospital</p>
            <p className="text-sm text-gray-600">Locate Now</p>
          </div>
        </div>
      </div>

      <EmergencyGuide />
    </div>
  );
}