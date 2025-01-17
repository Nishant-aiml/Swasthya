export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  subspecialization?: string[];
  experience: number;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    isVerified: boolean;
  }>;
  certifications: Array<{
    name: string;
    institution: string;
    year: string;
    isVerified: boolean;
  }>;
  publications?: Array<{
    title: string;
    journal: string;
    year: string;
    url?: string;
  }>;
  awards?: Array<{
    title: string;
    year: string;
    description?: string;
  }>;
  languages: string[];
  hospitalAffiliations: Array<{
    hospitalId: string;
    hospitalName: string;
    role?: string;
    since: string;
  }>;
  consultationFees: {
    inPerson: number;
    video: number;
    phone: number;
  };
  acceptsAyushman: boolean;
  rating: number;
  totalReviews: number;
  metrics: {
    punctuality: number;
    communication: number;
    treatment: number;
    responseTime: string;
  };
  availability: {
    inPerson: boolean;
    video: boolean;
    phone: boolean;
    nextAvailable: string;
    schedule: Array<{
      day: string;
      slots: Array<{
        start: string;
        end: string;
        type: 'in-person' | 'video' | 'phone';
      }>;
    }>;
  };
  image: string;
  about?: string;
}

export interface Review {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  metrics: {
    punctuality: number;
    communication: number;
    treatment: number;
  };
  treatmentType?: string;
  followUpCount?: number;
  images?: string[];
  doctorResponse?: {
    comment: string;
    date: string;
  };
}

export interface Prescription {
  id: string;
  appointmentId: string;
  doctorId: string;
  patientId: string;
  date: string;
  diagnosis: string;
  medicines: Array<{
    name: string;
    dosage: string;
    duration: string;
    timing: string;
    instructions?: string;
  }>;
  tests?: Array<{
    name: string;
    instructions?: string;
    urgency?: 'routine' | 'urgent' | 'immediate';
  }>;
  advice?: string;
  followUp?: {
    required: boolean;
    date?: string;
    reason?: string;
  };
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  lifestyle?: {
    diet?: string[];
    exercise?: string[];
    restrictions?: string[];
  };
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  patientId: string;
  hospitalId: string;
  date: string;
  time: string;
  duration: number;
  type: 'in-person' | 'video' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  location: string;
  payment: {
    amount: number;
    status: 'pending' | 'completed' | 'refunded';
    method?: 'card' | 'upi' | 'cash' | 'ayushman';
    transactionId?: string;
    refundDetails?: {
      amount: number;
      date: string;
      reason: string;
    };
  };
  bookingDetails: {
    bookedAt: string;
    bookedBy: string;
    source: 'app' | 'web' | 'phone';
    symptoms?: string[];
    notes?: string;
  };
  questionnaire?: {
    symptoms: string[];
    duration: string;
    previousTreatments?: string[];
    allergies?: string[];
    currentMedications?: string[];
    medicalHistory?: string[];
  };
  prescription?: Prescription;
  followUp?: {
    recommended: boolean;
    date?: string;
    type?: 'in-person' | 'video' | 'phone';
    reason?: string;
    status?: 'scheduled' | 'pending' | 'completed';
  };
  feedback?: {
    rating: number;
    comment: string;
    metrics: {
      punctuality: number;
      communication: number;
      effectiveness: number;
    };
    anonymous?: boolean;
    submitted?: string;
  };
  carbonOffset?: {
    saved: number; // in kg CO2
    equivalentTrees: number;
  };
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string[];
    email: string;
    website?: string;
  };
  facilities: string[];
  departments: Array<{
    name: string;
    doctors: number;
    services: string[];
  }>;
  emergency: {
    available: boolean;
    contact: string;
    ambulance: boolean;
  };
  beds: {
    total: number;
    available: number;
    types: Array<{
      type: string;
      total: number;
      available: number;
    }>;
  };
  insurance: {
    acceptsAyushman: boolean;
    networks: string[];
  };
  accreditation: Array<{
    name: string;
    validUntil: string;
    certificate?: string;
  }>;
  ratings: {
    overall: number;
    cleanliness: number;
    staffBehavior: number;
    facilities: number;
    totalReviews: number;
  };
  images: string[];
  specialities: string[];
  emergencyServices: string[];
  acceptsAyushman: boolean;
  bedsAvailable: number;
  totalBeds: number;
  treatments: Array<{
    name: string;
    department: string;
    price: number;
    duration?: string;
    description?: string;
  }>;
  packages: Array<{
    name: string;
    description: string;
    price: number;
    duration: string;
    includes: string[];
    terms?: string[];
  }>;
}
