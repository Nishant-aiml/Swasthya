export interface Review {
  id: string;
  doctorId: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  isVerified?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  qualifications: string[];
  hospitalName: string;
  location: {
    address: string;
    lat: number;
    lng: number;
    landmark: string;
  };
  languages: string[];
  consultationFee: number;
  availableSlots: Array<{
    date: string;
    slots: string[];
  }>;
  acceptsAyushman: boolean;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isAvailableOnline: boolean;
  reviews?: Review[];
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
