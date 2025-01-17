export interface Location {
  lat: number;
  lng: number;
}

export interface EmergencyService {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy';
  location: Location;
  address: string;
  phone: string;
  distance: number;
}

export interface HealthService extends EmergencyService {
  amenities?: string[];
  openingHours?: string;
}
