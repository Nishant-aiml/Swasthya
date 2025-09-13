export interface Location {
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
  lat: number;
  lng: number;
  clinic?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
