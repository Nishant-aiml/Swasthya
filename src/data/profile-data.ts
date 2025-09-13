export interface PersonalInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  emergencyContact: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  allergies: string[];
  chronicConditions: string[];
}

export interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  doctor: string;
  hospital: string;
  documents: string[];
  status: 'completed' | 'pending' | 'cancelled';
}

export interface HealthTimelineEvent {
  id: string;
  date: string;
  type: 'appointment' | 'prescription' | 'test' | 'vaccination';
  title: string;
  description: string;
  doctor?: string;
  hospital?: string;
  documents?: string[];
}

export interface SwasthyaCard {
  id: string;
  cardNumber: string;
  memberSince: string;
  validThrough: string;
  membershipType: 'basic' | 'premium' | 'family';
  benefits: string[];
  qrCode: string;
}

export const dummyPersonalInfo: PersonalInfo = {
  id: 'USR123456',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '9876543210',
  dateOfBirth: '1990-05-15',
  gender: 'male',
  bloodGroup: 'O+',
  emergencyContact: '9876543211',
  address: '123, Green Park Colony',
  city: 'Bangalore',
  state: 'Karnataka',
  pincode: '560001',
  allergies: ['Peanuts', 'Penicillin'],
  chronicConditions: ['Asthma', 'Hypertension'],
};

export const dummyMedicalRecords: MedicalRecord[] = [
  {
    id: 'REC001',
    date: '2025-01-15',
    type: 'General Checkup',
    description: 'Annual health checkup with comprehensive blood work',
    doctor: 'Dr. Priya Patel',
    hospital: 'Apollo Hospitals',
    documents: ['annual_checkup_report.pdf', 'blood_work_results.pdf'],
    status: 'completed',
  },
  {
    id: 'REC002',
    date: '2024-12-20',
    type: 'Vaccination',
    description: 'COVID-19 Booster Shot',
    doctor: 'Dr. Amit Kumar',
    hospital: 'Manipal Hospital',
    documents: ['vaccination_certificate.pdf'],
    status: 'completed',
  },
  {
    id: 'REC003',
    date: '2024-11-10',
    type: 'Specialist Consultation',
    description: 'Cardiology consultation for routine checkup',
    doctor: 'Dr. Suresh Reddy',
    hospital: 'Fortis Heart Institute',
    documents: ['cardiology_report.pdf', 'ecg_report.pdf'],
    status: 'completed',
  },
  {
    id: 'REC004',
    date: '2025-01-20',
    type: 'Lab Test',
    description: 'Diabetes screening and lipid profile',
    doctor: 'Dr. Meera Singh',
    hospital: 'HealthCare Diagnostics',
    documents: ['lab_requisition.pdf'],
    status: 'pending',
  },
];

export const dummyHealthTimeline: HealthTimelineEvent[] = [
  {
    id: 'EVT001',
    date: '2025-01-15',
    type: 'appointment',
    title: 'Annual Checkup',
    description: 'Completed annual health assessment',
    doctor: 'Dr. Priya Patel',
    hospital: 'Apollo Hospitals',
  },
  {
    id: 'EVT002',
    date: '2024-12-20',
    type: 'vaccination',
    title: 'COVID-19 Booster',
    description: 'Received COVID-19 booster shot',
    doctor: 'Dr. Amit Kumar',
    hospital: 'Manipal Hospital',
    documents: ['vaccination_certificate.pdf'],
  },
  {
    id: 'EVT003',
    date: '2024-11-10',
    type: 'test',
    title: 'Cardiac Assessment',
    description: 'Routine heart checkup and ECG',
    doctor: 'Dr. Suresh Reddy',
    hospital: 'Fortis Heart Institute',
    documents: ['ecg_report.pdf'],
  },
];

export const dummySwasthyaCard: SwasthyaCard = {
  id: 'CRD123456',
  cardNumber: '1234 5678 9012 3456',
  memberSince: '2023-01-01',
  validThrough: '2025-12-31',
  membershipType: 'premium',
  benefits: [
    'Unlimited teleconsultations',
    'Priority appointment booking',
    'Health checkup (yearly)',
    'Emergency assistance 24x7',
    'Pharmacy discount 15%',
  ],
  qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
};
