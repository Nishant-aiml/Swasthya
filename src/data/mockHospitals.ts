import { Hospital } from '@/types/hospital';

export const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    type: 'General Hospital',
    address: '123 Healthcare Ave, Mumbai, Maharashtra 400001',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: '123 Healthcare Ave, Mumbai, Maharashtra 400001'
    },
    contact: {
      phone: ['022-12345678'],
      email: 'info@citygeneral.com'
    },
    ratings: {
      overall: 4.5,
      cleanliness: 4.3,
      staffBehavior: 4.4,
      waitingTime: 4.0,
      facilities: 4.6
    },
    departments: [
      { id: '1', name: 'Cardiology' },
      { id: '2', name: 'Orthopedics' }
    ],
    doctors: [],
    facilities: ['Emergency', 'ICU', 'Pharmacy', 'Laboratory', 'Radiology'],
    specialties: ['Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics'],
    emergencyServices: {
      available24x7: true,
      ambulanceService: true,
      traumaCenter: true
    },
    imageUrl: '/images/hospitals/city-general.jpg',
    reviewCount: 120
  },
  {
    id: '2',
    name: 'Apollo Hospitals',
    type: 'Multi-Specialty Hospital',
    address: '456 Medical Park, Delhi, Delhi 110001',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: '456 Medical Park, Delhi, Delhi 110001'
    },
    contact: {
      phone: ['011-87654321'],
      email: 'info@apollo.com'
    },
    ratings: {
      overall: 4.7,
      cleanliness: 4.6,
      staffBehavior: 4.5,
      waitingTime: 4.2,
      facilities: 4.8
    },
    departments: [
      { id: '1', name: 'Oncology' },
      { id: '2', name: 'Cardiology' },
      { id: '3', name: 'Neurology' }
    ],
    doctors: [],
    facilities: ['Emergency', 'ICU', 'Pharmacy', 'Laboratory', 'Radiology', 'Blood Bank'],
    specialties: ['Oncology', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'],
    emergencyServices: {
      available24x7: true,
      ambulanceService: true,
      traumaCenter: true
    },
    imageUrl: '/images/hospitals/apollo.jpg',
    reviewCount: 250
  }
];
