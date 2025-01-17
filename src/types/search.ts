export interface SearchFilters {
  specialization?: string;
  location?: string;
  minRating?: number;
  acceptsAyushman?: boolean;
  timeSlot?: string;
  minExperience?: number;
  languages?: string[];
  maxFee?: number;
  minFee?: number;
  consultationType?: 'video' | 'in-person' | 'phone';
}

export interface SavedSearch {
  id: string;
  name: string;
  timestamp: string;
  filters: SearchFilters;
}

export interface SearchHistory {
  query: string;
  timestamp: string;
  filters?: SearchFilters;
}

export interface DoctorSearchResult {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  reviews: number;
  location: string;
  hospital: string;
  availableSlots: string[];
  consultationFee: number;
  acceptsAyushman: boolean;
  languages: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    isVerified: boolean;
  }>;
  certifications: Array<{
    name: string;
    issuedBy: string;
    year: string;
    isVerified: boolean;
  }>;
  publications: Array<{
    title: string;
    journal: string;
    year: string;
    link: string;
  }>;
  successRate: number;
  responseTime: string;
  image: string;
  nextAvailable: string;
  consultationTypes: Array<'video' | 'in-person' | 'phone'>;
}
