import { Location } from './location';
import { Doctor } from './doctor';

export interface Hospital {
  id: string;
  name: string;
  type: string;
  address: string;
  location: Location;
  contact: {
    phone: string[];
    email: string;
  };
  ratings: {
    overall: number;
    cleanliness: number;
    staffBehavior: number;
    waitingTime: number;
    facilities: number;
  };
  departments: {
    id: string;
    name: string;
  }[];
  doctors: Doctor[];
  facilities: string[];
  specialties: string[];
  emergencyServices: {
    available24x7: boolean;
    ambulanceService: boolean;
    traumaCenter: boolean;
  };
  imageUrl: string;
  reviewCount: number;
}
