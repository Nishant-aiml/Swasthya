import { Doctor, Location } from '../types/doctor';

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Experience {
  hospital: string;
  position: string;
  startYear: number;
  endYear?: number;
  location: string;
}

export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export const specializations = [
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Orthopedic',
  'Pediatrician',
  'Dentist',
  'General Physician',
  'ENT Specialist',
  'Gynecologist',
  'Psychiatrist'
];

export const locations: Location[] = [
  {
    address: "123 Healthcare Ave",
    city: "Hyderabad",
    state: "Telangana",
    coordinates: {
      lat: 17.385044,
      lng: 78.486671
    }
  },
  {
    address: "456 Medical Street",
    city: "Hyderabad",
    state: "Telangana",
    coordinates: {
      lat: 17.375044,
      lng: 78.476671
    }
  }
];

export const treatmentTypes = [
  'General Consultation',
  'Follow-up Visit',
  'Emergency Care',
  'Preventive Care',
  'Specialist Consultation',
  'Video Consultation',
  'Home Visit'
];

export const consultationTypes = [
  'In-Person',
  'Video Consultation',
  'Home Visit'
];

export const sortOptions = [
  { value: 'rating', label: 'Rating: High to Low' },
  { value: 'experience', label: 'Experience: Most to Least' },
  { value: 'fee_low', label: 'Fee: Low to High' },
  { value: 'fee_high', label: 'Fee: High to Low' },
  { value: 'availability', label: 'Earlier Available' }
];

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. John Smith",
    specialty: "Cardiology",
    specialization: "Interventional Cardiology",
    experience: 15,
    rating: 4.8,
    reviewCount: 150,
    qualifications: ["MBBS", "MD", "DM"],
    location: {
      address: "123 Medical Center Blvd",
      city: "New York",
      state: "NY",
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    imageUrl: "/doctors/dr-smith.jpg",
    languages: ["English", "Spanish"],
    fees: {
      consultation: 150,
      followUp: 100
    },
    education: [
      {
        degree: "MBBS",
        institution: "Harvard Medical School",
        year: 2005
      },
      {
        degree: "MD",
        institution: "Johns Hopkins University",
        year: 2010
      }
    ],
    subspecialties: [
      "Interventional Cardiology",
      "Pediatric Cardiology"
    ],
    expertise: [
      "Angioplasty",
      "Cardiac Surgery",
      "Heart Disease Management"
    ],
    consultationFee: 150,
    acceptsAyushman: true,
    acceptsAyushmanCard: true,
    about: "Dr. Smith is a renowned cardiologist with over 15 years of experience...",
    phone: "+1-234-567-8900",
    email: "dr.smith@medical.com",
    website: "www.drsmith.com",
    hospitalName: "City Medical Center",
    isAvailableOnline: true,
    publications: [
      "Recent Advances in Interventional Cardiology",
      "Heart Disease Prevention: A Modern Approach"
    ]
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    specialty: "Pediatrics",
    specialization: "General Pediatrics",
    experience: 10,
    rating: 4.9,
    reviewCount: 120,
    qualifications: ["MBBS", "MD"],
    location: {
      address: "456 Children's Hospital Way",
      city: "Boston",
      state: "MA",
      coordinates: {
        lat: 42.3601,
        lng: -71.0589
      }
    },
    imageUrl: "/doctors/dr-johnson.jpg",
    languages: ["English", "French"],
    fees: {
      consultation: 120,
      followUp: 80
    },
    education: [
      {
        degree: "MBBS",
        institution: "Yale School of Medicine",
        year: 2010
      },
      {
        degree: "MD",
        institution: "Boston Children's Hospital",
        year: 2015
      }
    ],
    subspecialties: [
      "Neonatal Care",
      "Adolescent Medicine"
    ],
    expertise: [
      "Pediatric Care",
      "Vaccination",
      "Child Development"
    ],
    consultationFee: 120,
    acceptsAyushman: true,
    acceptsAyushmanCard: true,
    about: "Dr. Johnson is a compassionate pediatrician specializing in child healthcare...",
    phone: "+1-234-567-8901",
    email: "dr.johnson@medical.com",
    website: "www.drjohnson.com",
    hospitalName: "Children's Medical Center",
    isAvailableOnline: true,
    publications: [
      "Modern Approaches to Pediatric Care",
      "Child Vaccination: A Comprehensive Guide"
    ]
  }
];
