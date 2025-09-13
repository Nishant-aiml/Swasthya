import { Doctor } from '@/types/doctor';
import { Appointment } from '@/types/appointment';

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Dr. Sarah Smith',
    patientId: 'p1',
    patientName: 'John Smith',
    patientPhone: '+91 98765 43210',
    patientEmail: 'john.smith@example.com',
    date: '2025-01-21',
    time: '10:00 AM',
    status: 'scheduled',
    consultationFee: 1000,
    consultationType: 'in-person',
    symptoms: 'Chest pain and shortness of breath',
    notes: 'Please bring previous ECG reports'
  },
  {
    id: '2',
    doctorId: '2',
    doctorName: 'Dr. Rajesh Kumar',
    patientId: 'p1',
    patientName: 'John Smith',
    patientPhone: '+91 98765 43210',
    patientEmail: 'john.smith@example.com',
    date: '2025-01-20',
    time: '2:30 PM',
    status: 'confirmed',
    consultationFee: 1200,
    consultationType: 'in-person',
    symptoms: 'Frequent headaches and dizziness',
    notes: 'Please bring previous MRI reports'
  },
  {
    id: '3',
    doctorId: '1',
    doctorName: 'Dr. Sarah Smith',
    patientId: 'p1',
    patientName: 'John Smith',
    patientPhone: '+91 98765 43210',
    patientEmail: 'john.smith@example.com',
    date: '2025-01-15',
    time: '11:30 AM',
    status: 'cancelled',
    consultationFee: 1000,
    consultationType: 'online',
    symptoms: 'Follow-up consultation',
    notes: 'Cancelled due to emergency'
  }
];

export const mockDoctors: Doctor[] = [
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
      country: "USA",
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    availableSlots: [
      {
        date: "2024-01-20",
        slots: ["09:00", "10:00", "11:00"]
      },
      {
        date: "2024-01-21",
        slots: ["14:00", "15:00", "16:00"]
      },
      {
        date: "2024-01-22",
        slots: ["11:00", "13:00", "15:00"]
      }
    ],
    imageUrl: "/doctors/dr-smith.jpg",
    languages: ["English", "Spanish"],
    consultationFee: 150,
    acceptsAyushman: true,
    acceptsAyushmanCard: true,
    reviews: [
      {
        id: "r1",
        rating: 4.5,
        comment: "Excellent doctor, very thorough and professional",
        patientName: "Jane Doe",
        date: "2024-01-15",
        metrics: {
          punctuality: 4,
          communication: 5,
          treatment: 4
        },
        verified: true,
        helpful: 12,
        treatmentType: "Regular Checkup"
      }
    ],
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
  }
];
