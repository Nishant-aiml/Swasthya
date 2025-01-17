import { Doctor, Review, Appointment, AyushmanApplication, AyushmanCard } from '../types/doctor';
import { Hospital } from '../types/hospital';

export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Priya Sharma',
    specialization: 'Cardiologist',
    experience: 15,
    qualifications: ['MBBS', 'MD', 'DM Cardiology'],
    hospitalName: 'Apollo Hospitals',
    location: {
      address: '1-1-123, Jubilee Hills, Hyderabad, Telangana 500033',
      lat: 17.4315,
      lng: 78.4324,
      landmark: 'Near Jubilee Hills Check Post'
    },
    languages: ['English', 'Hindi', 'Telugu'],
    consultationFee: 1000,
    availableSlots: [
      { date: '2025-01-17', slots: ['10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
      { date: '2025-01-18', slots: ['9:00 AM', '11:30 AM', '3:00 PM'] },
    ],
    acceptsAyushman: true,
    rating: 4.8,
    reviewCount: 245,
    imageUrl: 'https://example.com/doctor1.jpg',
    isAvailableOnline: true,
    reviews: [
      {
        id: 'r1',
        doctorId: 'd1',
        patientName: 'Rahul Mehta',
        rating: 5,
        comment: 'Excellent doctor! Very thorough and professional.',
        date: '2025-01-15',
        isVerified: true,
      },
      {
        id: 'r2',
        doctorId: 'd1',
        patientName: 'Priya Singh',
        rating: 4,
        comment: 'Good experience overall. Waiting time was a bit long.',
        date: '2025-01-14',
        isVerified: true,
      }
    ]
  },
  {
    id: 'd2',
    name: 'Dr. Rajesh Kumar',
    specialization: 'Pediatrician',
    experience: 12,
    qualifications: ['MBBS', 'MD Pediatrics', 'Fellowship in Neonatology'],
    hospitalName: 'Rainbow Children\'s Hospital',
    location: {
      address: '2-2-456, Banjara Hills, Hyderabad, Telangana 500034',
      lat: 17.4275,
      lng: 78.4375,
      landmark: 'Opposite GVK One Mall'
    },
    languages: ['English', 'Hindi', 'Telugu', 'Tamil'],
    consultationFee: 800,
    availableSlots: [
      { date: '2025-01-17', slots: ['9:30 AM', '10:30 AM', '3:00 PM', '5:00 PM'] },
      { date: '2025-01-18', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
    ],
    acceptsAyushman: true,
    rating: 4.9,
    reviewCount: 189,
    imageUrl: 'https://example.com/doctor2.jpg',
    isAvailableOnline: true,
    reviews: []
  },
  {
    id: 'd3',
    name: 'Dr. Meera Reddy',
    specialization: 'Dermatologist',
    experience: 8,
    qualifications: ['MBBS', 'MD Dermatology'],
    hospitalName: 'Care Hospitals',
    location: {
      address: '3-3-789, Ameerpet, Hyderabad, Telangana 500016',
      lat: 17.4375,
      lng: 78.4482,
      landmark: 'Near Metro Station'
    },
    languages: ['English', 'Telugu', 'Hindi'],
    consultationFee: 700,
    availableSlots: [
      { date: '2025-01-17', slots: ['11:00 AM', '2:30 PM', '4:30 PM'] },
      { date: '2025-01-18', slots: ['10:30 AM', '1:00 PM', '3:30 PM'] },
    ],
    acceptsAyushman: false,
    rating: 4.7,
    reviewCount: 156,
    imageUrl: 'https://example.com/doctor3.jpg',
    isAvailableOnline: false,
    reviews: []
  }
];

export const mockHospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'Apollo Hospitals',
    type: 'Multi-Specialty',
    address: {
      street: '1-1-123, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033',
      landmark: 'Near Jubilee Hills Check Post'
    },
    location: {
      lat: 17.4315,
      lng: 78.4324
    },
    contact: {
      phone: '+91-40-12345678',
      email: 'info@apollohospitals.com',
      website: 'https://www.apollohospitals.com'
    },
    facilities: [
      'Emergency Services',
      'ICU',
      'Operation Theaters',
      'Laboratory',
      'Pharmacy',
      'Radiology',
      'Blood Bank'
    ],
    departments: [
      'Cardiology',
      'Neurology',
      'Orthopedics',
      'Pediatrics',
      'Oncology',
      'Gynecology'
    ],
    emergencyServices: {
      available24x7: true,
      ambulanceNumber: '108',
      traumaCenter: true
    },
    acceptsAyushman: true,
    rating: 4.5,
    reviewCount: 1250,
    imageUrl: 'https://example.com/hospital1.jpg',
    doctors: ['d1']
  },
  {
    id: 'h2',
    name: 'Rainbow Children\'s Hospital',
    type: 'Pediatric Specialty',
    address: {
      street: '2-2-456, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034',
      landmark: 'Opposite GVK One Mall'
    },
    location: {
      lat: 17.4275,
      lng: 78.4375
    },
    contact: {
      phone: '+91-40-23456789',
      email: 'info@rainbowhospitals.com',
      website: 'https://www.rainbowhospitals.com'
    },
    facilities: [
      'Pediatric Emergency',
      'NICU',
      'PICU',
      'Child Development Center',
      'Pediatric Pharmacy',
      'Pediatric Laboratory'
    ],
    departments: [
      'General Pediatrics',
      'Pediatric Cardiology',
      'Pediatric Neurology',
      'Pediatric Surgery',
      'Neonatology'
    ],
    emergencyServices: {
      available24x7: true,
      ambulanceNumber: '1098',
      traumaCenter: false
    },
    acceptsAyushman: true,
    rating: 4.7,
    reviewCount: 890,
    imageUrl: 'https://example.com/hospital2.jpg',
    doctors: ['d2']
  },
  {
    id: 'h3',
    name: 'Care Hospitals',
    type: 'Multi-Specialty',
    address: {
      street: '3-3-789, Ameerpet',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500016',
      landmark: 'Near Metro Station'
    },
    location: {
      lat: 17.4375,
      lng: 78.4482
    },
    contact: {
      phone: '+91-40-34567890',
      email: 'info@carehospitals.com',
      website: 'https://www.carehospitals.com'
    },
    facilities: [
      'Emergency Services',
      'ICU',
      'Operation Theaters',
      'Laboratory',
      'Pharmacy',
      'Diagnostic Center'
    ],
    departments: [
      'Internal Medicine',
      'Dermatology',
      'ENT',
      'Ophthalmology',
      'Psychiatry',
      'Dental'
    ],
    emergencyServices: {
      available24x7: true,
      ambulanceNumber: '102',
      traumaCenter: false
    },
    acceptsAyushman: false,
    rating: 4.3,
    reviewCount: 675,
    imageUrl: 'https://example.com/hospital3.jpg',
    doctors: ['d3']
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    doctorId: 'd1',
    patientName: 'Rahul Mehta',
    patientPhone: '+91-9876543210',
    date: '2025-01-17',
    time: '10:00 AM',
    type: 'in-person',
    status: 'confirmed',
    ayushmanCard: 'AYU123456',
    specialInstructions: 'Fasting required for 8 hours before appointment'
  },
  {
    id: 'a2',
    doctorId: 'd2',
    patientName: 'Priya Singh',
    patientPhone: '+91-9876543211',
    date: '2025-01-17',
    time: '2:30 PM',
    type: 'video',
    status: 'completed',
    feedback: {
      rating: 5,
      comment: 'Very helpful and patient doctor. Explained everything clearly.',
      submitted: '2025-01-16'
    }
  },
  {
    id: 'a3',
    doctorId: 'd3',
    patientName: 'Amit Kumar',
    patientPhone: '+91-9876543212',
    date: '2025-01-18',
    time: '11:30 AM',
    type: 'in-person',
    status: 'cancelled',
    cancellationReason: 'Personal emergency'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    doctorId: 'd1',
    patientName: 'Rahul Mehta',
    rating: 5,
    comment: 'Excellent doctor! Very thorough and professional.',
    date: '2025-01-15'
  },
  {
    id: 'r2',
    doctorId: 'd1',
    patientName: 'Priya Singh',
    rating: 4,
    comment: 'Good experience overall. Waiting time was a bit long.',
    date: '2025-01-14'
  }
];

export const mockAyushmanApplications: AyushmanApplication[] = [
  {
    id: 'app1',
    patientName: 'Rahul Mehta',
    applicationDate: '2025-01-10',
    status: 'pending',
    documents: ['aadhar.pdf', 'income_certificate.pdf']
  }
];

export const mockAyushmanCards: AyushmanCard[] = [
  {
    id: 'card1',
    cardNumber: 'AYU123456',
    patientName: 'Rahul Mehta',
    validFrom: '2025-01-01',
    validUntil: '2025-12-31',
    status: 'active'
  }
];
