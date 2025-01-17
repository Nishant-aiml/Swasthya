import React from 'react';
import type { EmergencyService } from '../../types/emergency';
import { Phone, Clock, Star } from 'lucide-react';

interface ServiceListProps {
  services: EmergencyService[];
  onServiceSelect: (service: EmergencyService | null) => void;
  loading: boolean;
}

export default function ServiceList({ services, onServiceSelect, loading }: ServiceListProps) {
  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No emergency services found in this area
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Nearby Emergency Services</h2>
      <div className="space-y-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onServiceSelect(service)}
            className="w-full text-left bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{service.address}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {service.distance.toFixed(1)} km
              </span>
            </div>
            
            <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {service.phone}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {service.isOpen24Hours ? '24/7' : 'Limited Hours'}
              </div>
              {service.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400" />
                  {service.rating}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}