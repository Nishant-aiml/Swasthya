import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Navigation } from 'lucide-react';
import EmergencyServicesMap from '../Maps/EmergencyServicesMap';

const SOSLocator: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Map Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h2 className="text-lg font-semibold text-blue-800 flex items-center">
            <Navigation className="h-5 w-5 mr-2" />
            Nearby Emergency Services
          </h2>
          <p className="text-sm text-blue-600 mt-1">
            Find hospitals, clinics, and pharmacies near your location
          </p>
        </div>
        
        <div className="h-[600px]">
          <EmergencyServicesMap />
        </div>
      </div>
    </div>
  );
};

export default SOSLocator;