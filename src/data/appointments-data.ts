import { DoctorType, TimeSlot } from "@/components/Appointments/types";

export interface Doctor {
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
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  languages: string[];
  about: string;
  image?: string;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  rating: number;
  image: string;
  facilities: string[];
  doctors: number;
  contact: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  date: string;
  time: string;
  status: 'confirmed' | 'scheduled' | 'cancelled';
  consultationType: 'online' | 'in-person';
  consultationFee: number;
  symptoms: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const dummyDoctors: Doctor[] = [
  {
    id: 'DOC001',
    name: 'Dr. Arun Kumar',
    specialization: 'Cardiologist',
    experience: 15,
    rating: 4.8,
    reviews: 245,
    location: 'Bangalore',
    hospital: 'Apollo Hospitals',
    availableSlots: ['10:00 AM', '2:30 PM', '4:00 PM'],
    consultationFee: 1000,
    education: [
      {
        degree: 'MBBS',
        institution: 'AIIMS Delhi',
        year: '2005',
      },
      {
        degree: 'MD Cardiology',
        institution: 'CMC Vellore',
        year: '2009',
      },
    ],
    languages: ['English', 'Hindi', 'Kannada'],
    about: 'Dr. Arun Kumar is a senior cardiologist with extensive experience in interventional cardiology and heart disease management.',
  },
  {
    id: 'DOC002',
    name: 'Dr. Priya Sharma',
    specialization: 'Pediatrician',
    experience: 12,
    rating: 4.9,
    reviews: 189,
    location: 'Mumbai',
    hospital: 'Fortis Hospital',
    availableSlots: ['9:00 AM', '11:30 AM', '3:00 PM'],
    consultationFee: 800,
    education: [
      {
        degree: 'MBBS',
        institution: 'KEM Hospital',
        year: '2008',
      },
      {
        degree: 'MD Pediatrics',
        institution: 'AIIMS Mumbai',
        year: '2012',
      },
    ],
    languages: ['English', 'Hindi', 'Marathi'],
    about: 'Dr. Priya Sharma is a dedicated pediatrician known for her gentle approach with children and comprehensive care.',
  },
  {
    id: 'DOC003',
    name: 'Dr. Suresh Reddy',
    specialization: 'Orthopedic Surgeon',
    experience: 18,
    rating: 4.7,
    reviews: 312,
    location: 'Hyderabad',
    hospital: 'Care Hospitals',
    availableSlots: ['8:30 AM', '1:00 PM', '5:30 PM'],
    consultationFee: 1200,
    education: [
      {
        degree: 'MBBS',
        institution: 'Osmania Medical College',
        year: '2002',
      },
      {
        degree: 'MS Orthopedics',
        institution: 'JIPMER',
        year: '2006',
      },
    ],
    languages: ['English', 'Telugu', 'Hindi'],
    about: 'Dr. Suresh Reddy is a renowned orthopedic surgeon specializing in joint replacement and sports injuries.',
  },
];

export const dummyHospitals: Hospital[] = [
  {
    id: "HOSP001",
    name: "City Hospital",
    location: "MG Road, Bangalore",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "General Medicine"],
    rating: 4.5,
    image: "https://example.com/hospital1.jpg",
    facilities: ["24/7 Emergency", "ICU", "Pharmacy", "Lab Services"],
    doctors: 50,
    contact: "+91 9876543210"
  },
  {
    id: "HOSP002",
    name: "Heart Care Center",
    location: "Indiranagar, Bangalore",
    specialties: ["Cardiology", "Cardiac Surgery", "Vascular Medicine"],
    rating: 4.8,
    image: "https://example.com/hospital2.jpg",
    facilities: ["Cath Lab", "Cardiac ICU", "Rehabilitation", "Emergency"],
    doctors: 30,
    contact: "+91 9876543211"
  },
  {
    id: "HOSP003",
    name: "Children's Hospital",
    location: "Koramangala, Bangalore",
    specialties: ["Pediatrics", "Child Surgery", "Neonatology"],
    rating: 4.6,
    image: "https://example.com/hospital3.jpg",
    facilities: ["NICU", "Child Emergency", "Vaccination Center"],
    doctors: 25,
    contact: "+91 9876543212"
  }
];

export const dummyAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: 'doc1',
    doctorName: 'Dr. John Smith',
    patientId: 'pat1',
    patientName: 'John Doe',
    patientPhone: '+91 9876543210',
    patientEmail: 'john.doe@example.com',
    date: '2025-01-20',
    time: '10:00 AM',
    status: 'scheduled',
    consultationType: 'online',
    consultationFee: 500,
    symptoms: 'Fever and cold',
    notes: 'Regular checkup',
    createdAt: '2025-01-17T10:00:00Z',
    updatedAt: '2025-01-17T10:00:00Z'
  },
  {
    id: '2',
    doctorId: 'doc2',
    doctorName: 'Dr. Sarah Johnson',
    patientId: 'pat1',
    patientName: 'Jane Smith',
    patientPhone: '+91 9876543211',
    patientEmail: 'jane.smith@example.com',
    date: '2025-01-22',
    time: '2:30 PM',
    status: 'confirmed',
    consultationType: 'in-person',
    consultationFee: 800,
    symptoms: 'Regular checkup',
    notes: 'First consultation',
    createdAt: '2025-01-17T11:00:00Z',
    updatedAt: '2025-01-17T11:00:00Z'
  },
  {
    id: '3',
    doctorId: 'doc3',
    doctorName: 'Dr. Michael Brown',
    patientId: 'pat1',
    patientName: 'John Doe',
    patientPhone: '+91 9876543210',
    patientEmail: 'john.doe@example.com',
    date: '2025-01-25',
    time: '4:00 PM',
    status: 'cancelled',
    consultationType: 'online',
    consultationFee: 500,
    symptoms: 'Back pain',
    notes: 'Regular checkup',
    createdAt: '2025-01-17T12:00:00Z',
    updatedAt: '2025-01-17T13:00:00Z'
  }
];
