import { useState, useCallback } from 'react';
import type { EmergencyService } from '../types/emergency';

export type EmergencyServiceType = 'hospital' | 'clinic' | 'pharmacy' | 'ambulance';

// Mock data for demonstration - in a real app, this would come from an API
const MOCK_SERVICES: EmergencyService[] = [
  {
    id: '1',
    name: 'City General Hospital',
    type: 'hospital',
    address: '123 Healthcare Ave, Medical District',
    phone: '+1-555-0123',
    distance: 0,
    available: true,
    isOpen24Hours: true,
    rating: 4.5,
    emergencyServices: ['ICU', 'Trauma Care', 'Emergency Surgery', '24/7 Emergency', 'Ambulance Service'],
    location: {
      lat: 28.6129,
      lng: 77.2295,
      address: '123 Healthcare Ave, Medical District'
    }
  },
  {
    id: '2',
    name: 'Rapid Response Ambulance',
    type: 'ambulance',
    address: '456 Emergency Blvd, City Center',
    phone: '+1-555-0124',
    distance: 0,
    available: true,
    isOpen24Hours: true,
    rating: 4.8,
    emergencyServices: ['Basic Life Support', 'Advanced Life Support', 'Critical Care Transport', 'Neonatal Transport'],
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: '456 Emergency Blvd, City Center'
    }
  },
  {
    id: '3',
    name: 'LifeCare Medical Center',
    type: 'hospital',
    address: '789 Health Street, North City',
    phone: '+1-555-0125',
    distance: 0,
    available: true,
    isOpen24Hours: true,
    rating: 4.3,
    emergencyServices: ['Emergency Room', 'Pediatric Emergency', 'Cardiac Care', 'Stroke Center'],
    location: {
      lat: 28.6159,
      lng: 77.2190,
      address: '789 Health Street, North City'
    }
  },
  {
    id: '4',
    name: '24/7 Emergency Clinic',
    type: 'clinic',
    address: '321 Care Lane, East District',
    phone: '+1-555-0126',
    distance: 0,
    available: true,
    isOpen24Hours: true,
    rating: 4.0,
    emergencyServices: ['Urgent Care', 'Minor Surgery', 'X-Ray Services', 'Lab Services'],
    location: {
      lat: 28.6119,
      lng: 77.2390,
      address: '321 Care Lane, East District'
    }
  },
  {
    id: '5',
    name: 'MediQuick Pharmacy',
    type: 'pharmacy',
    address: '567 Health Ave, West District',
    phone: '+1-555-0127',
    distance: 0,
    available: true,
    isOpen24Hours: true,
    rating: 4.2,
    emergencyServices: ['24/7 Pharmacy', 'Emergency Medications', 'Medical Supplies', 'Home Delivery'],
    location: {
      lat: 28.6145,
      lng: 77.2180,
      address: '567 Health Ave, West District'
    }
  }
];

interface Coordinates {
  lat: number;
  lng: number;
}

interface ServiceFetchParams extends Coordinates {
  serviceTypes?: EmergencyServiceType[];
  radius?: number; // in kilometers
}

export function useEmergencyServices() {
  const [services, setServices] = useState<EmergencyService[]>([]);
  const [selectedService, setSelectedService] = useState<EmergencyService | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Haversine formula for accurate distance calculation
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  }, []);

  const fetchNearbyServices = useCallback(async ({ lat, lng, serviceTypes, radius = 10 }: ServiceFetchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay for realistic behavior
      await new Promise(resolve => setTimeout(resolve, 500));

      // Calculate distances and update services
      const updatedServices = MOCK_SERVICES.map(service => ({
        ...service,
        distance: calculateDistance(lat, lng, service.location.lat, service.location.lng)
      }));
      
      // Filter services by type and radius
      const filteredServices = updatedServices.filter(service => {
        const withinRadius = service.distance <= radius;
        const matchesType = !serviceTypes?.length || serviceTypes.includes(service.type);
        return withinRadius && matchesType;
      });
      
      // Sort by distance and availability
      filteredServices.sort((a, b) => {
        // Prioritize available services
        if (a.available && !b.available) return -1;
        if (!a.available && b.available) return 1;
        // Then sort by distance
        return a.distance - b.distance;
      });
      
      if (filteredServices.length === 0) {
        setError(`No ${serviceTypes?.join(' or ')} services found within ${radius}km of your location.`);
      }
      
      setServices(filteredServices);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch services';
      setError(errorMessage);
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }, [calculateDistance]);

  const selectService = useCallback((service: EmergencyService | null) => {
    setSelectedService(service);
  }, []);

  return {
    services,
    loading,
    error,
    selectedService,
    selectService,
    fetchNearbyServices
  };
}

