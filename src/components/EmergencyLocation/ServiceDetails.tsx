import React from 'react';
import type { EmergencyService } from '../../types/emergency';
import { Phone, Clock, Star, ArrowLeft, Navigation } from 'lucide-react';

interface ServiceDetailsProps {
  service: EmergencyService;
  userLocation: [number, number] | null;
  onBack: () => void;
  loading: boolean;
}

export default function ServiceDetails({ service, userLocation, onBack, loading }: ServiceDetailsProps) {
  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
          <div className="h-32 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  const handleCall = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    window.location.href = `tel:${service.phone}`;
  };

  const handleDirections = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!userLocation) return;
    
    const url = `https://www.google.com/maps/dir/${userLocation[0]},${userLocation[1]}/${service.location.lat},${service.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold">Service Details</h2>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Basic Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
          <p className="text-gray-500 mt-1">{service.address}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {service.isOpen24Hours ? 'Open 24/7' : 'Limited Hours'}
            </div>
            {service.rating && (
              <div className="flex items-center text-sm">
                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                <span>{service.rating} rating</span>
              </div>
            )}
          </div>
        </div>

        {/* Distance and Actions */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-500 mb-3">
            {service.distance.toFixed(1)}km from your location
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleCall}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </button>
            <button
              onClick={handleDirections}
              disabled={!userLocation}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Navigation className="h-4 w-4" />
              <span>Directions</span>
            </button>
          </div>
        </div>

        {/* Services */}
        {service.emergencyServices.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Available Services</h4>
            <div className="flex flex-wrap gap-2">
              {service.emergencyServices.map((item: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}