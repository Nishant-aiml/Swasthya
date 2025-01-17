import { Hospital } from '@/types/hospital';

export const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    type: 'General Hospital',
    address: {
      street: '123 Healthcare Avenue',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500001',
      landmark: 'Near Central Park',
      country: 'India',
    },
    location: {
      lat: 17.385044,
      lng: 78.486671,
    },
    contact: {
      phone: '+91 9876543210',
      email: 'info@cityhospital.com',
      website: 'www.cityhospital.com',
    },
    facilities: [
      {
        name: 'Emergency Care',
        doctors: 15,
        services: ['24/7 Emergency', 'Trauma Care', 'Critical Care'],
      },
      {
        name: 'Cardiology',
        doctors: 10,
        services: ['Heart Surgery', 'Cardiac Care', 'ECG'],
      },
      {
        name: 'Orthopedics',
        doctors: 8,
        services: ['Joint Replacement', 'Spine Surgery', 'Sports Medicine'],
      },
    ],
    departments: [
      'Emergency',
      'Cardiology',
      'Orthopedics',
      'Neurology',
      'Pediatrics',
    ],
    emergencyServices: {
      available24x7: true,
      ambulanceNumber: '108',
      traumaCenter: true,
    },
    acceptsAyushman: true,
    rating: 4.5,
    reviewCount: 128,
    imageUrl: '/hospitals/city-general.jpg',
    doctors: ['doc1', 'doc2', 'doc3'],
  },
  {
    id: '2',
    name: 'Apollo Hospitals',
    type: 'Multi-Specialty Hospital',
    address: {
      street: '456 Healthcare Avenue',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500002',
      landmark: 'Near Jubilee Hills',
      country: 'India',
    },
    location: {
      lat: 17.416023,
      lng: 78.446651,
    },
    contact: {
      phone: '+91 9876543211',
      email: 'info@apollohospital.com',
      website: 'www.apollohospital.com',
    },
    facilities: [
      {
        name: 'Emergency Care',
        doctors: 20,
        services: ['24/7 Emergency', 'Trauma Care', 'Critical Care'],
      },
      {
        name: 'Oncology',
        doctors: 12,
        services: ['Cancer Treatment', 'Chemotherapy', 'Radiation Therapy'],
      },
      {
        name: 'Cardiology',
        doctors: 15,
        services: ['Heart Surgery', 'Cardiac Care', 'ECG'],
      },
    ],
    departments: [
      'Emergency',
      'Oncology',
      'Cardiology',
      'Neurology',
      'Orthopedics',
    ],
    emergencyServices: {
      available24x7: true,
      ambulanceNumber: '108',
      traumaCenter: true,
    },
    acceptsAyushman: true,
    rating: 4.7,
    reviewCount: 256,
    imageUrl: '/hospitals/apollo.jpg',
    doctors: ['doc4', 'doc5', 'doc6'],
  },
];
