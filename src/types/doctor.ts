import { Address, Review } from './index';

export interface Location {
  address: string;
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country?: string;
}

export interface DoctorReview {
  id: string;
  rating: number;
  comment: string;
  patientName: string;
  date: string;
  metrics: {
    punctuality: number;
    communication: number;
    treatment: number;
  };
  verified?: boolean;
  helpful?: number;
  treatmentType?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  specialization: string;
  experience: number;
  rating: number;
  reviewCount: number;
  qualifications: string[];
  reviews?: DoctorReview[];
  education?: {
    degree: string;
    institution: string;
    year: number;
  }[];
  awards?: {
    title: string;
    organization: string;
    year: number;
  }[];
  subspecialties?: string[];
  expertise?: string[];
  location: Location;
  availableSlots?: {
    date: string;
    slots: string[];
  }[];
  imageUrl?: string;
  languages?: string[];
  fees?: {
    consultation: number;
    followUp: number;
  };
  consultationFee?: number;
  about?: string;
  phone?: string;
  email?: string;
  website?: string;
  hospitalName?: string;
  isAvailableOnline?: boolean;
  acceptsAyushman?: boolean;
  acceptsAyushmanCard?: boolean;
  publications?: string[];
}

export interface TimeSlot {
  date: string;
  slots: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  type: 'video' | 'in-person' | 'phone';
  status: 'confirmed' | 'completed' | 'cancelled';
  ayushmanCard?: string;
  specialInstructions?: string;
  feedback?: {
    rating: number;
    comment: string;
    submitted: string;
  };
  cancellationReason?: string;
}

export interface AyushmanApplication {
  id: string;
  patientName: string;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
}

export interface AyushmanCard {
  id: string;
  cardNumber: string;
  patientName: string;
  validFrom: string;
  validUntil: string;
  status: 'active' | 'inactive' | 'expired';
}
