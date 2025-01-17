export interface Hospital {
  id: string;
  name: string;
  type: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
    country?: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  facilities: {
    name: string;
    doctors: number;
    services: string[];
  }[];
  departments: string[];
  emergencyServices: {
    available24x7: boolean;
    ambulanceNumber: string;
    traumaCenter: boolean;
  };
  acceptsAyushman: boolean;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  doctors: string[];
}
