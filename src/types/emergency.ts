export type EmergencyServiceType = 'hospital' | 'clinic' | 'pharmacy' | 'ambulance';

export interface EmergencyMessage {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isEmergency?: boolean;
  actions?: {
    label: string;
    handler: () => void;
  }[];
}

export interface EmergencyService {
  id: string;
  name: string;
  type: EmergencyServiceType;
  address: string;
  phone: string;
  distance: number;
  available: boolean;
  rating?: number;
  isOpen24Hours: boolean;
  emergencyServices: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface BloodBank {
  id: string;
  name: string;
  address: string;
  phone: string;
  bloodGroups: string[];
  distance: number;
  availability: Record<string, number>;
}

export interface InsuranceClaim {
  policyNumber: string;
  documents: File[];
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  timestamp: Date;
}

export interface EmergencyKit {
  id: string;
  name: string;
  price: number;
  items: string[];
  image: string;
  inStock: boolean;
}