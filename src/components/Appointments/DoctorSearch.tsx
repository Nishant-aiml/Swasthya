import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { Mic, MicOff, Search, MapPin, Star, Video, Clock, Award, GraduationCap, Stethoscope, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea, ScrollBar } from '@/components/ui/ScrollArea';

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Award {
  title: string;
  year: string;
  organization: string;
}

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  treatmentType?: string;
  verified: boolean;
  helpful: number;
}

interface Doctor {
  id: string;
  name: string;
  imageUrl: string;
  specialization: string;
  subspecialties: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  location: {
    address: string;
    city: string;
    state: string;
  };
  languages: string[];
  consultationFee: number;
  acceptsAyushman: boolean;
  education: Education[];
  awards: Award[];
  reviews: Review[];
  expertise: string[];
  publications?: string[];
  about: string;
  availableSlots: {
    date: string;
    slots: string[];
  }[];
}

interface DoctorSearchResult extends Doctor {
  hospital: string;
  acceptsAyushman: boolean;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    imageUrl: '/doctors/doctor1.jpg',
    specialization: 'Cardiologist',
    subspecialties: ['Interventional Cardiology', 'Electrophysiology'],
    experience: 15,
    rating: 4.8,
    reviewCount: 120,
    location: {
      address: 'Apollo Hospital, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Telugu'],
    consultationFee: 1000,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'AIIMS Delhi',
        year: '2005'
      },
      {
        degree: 'MD (Cardiology)',
        institution: 'PGIMER Chandigarh',
        year: '2008'
      },
      {
        degree: 'DM (Cardiology)',
        institution: 'SGPGI Lucknow',
        year: '2012'
      }
    ],
    awards: [
      {
        title: 'Best Cardiologist Award',
        year: '2020',
        organization: 'Indian Medical Association'
      },
      {
        title: 'Research Excellence in Cardiology',
        year: '2019',
        organization: 'Cardiological Society of India'
      }
    ],
    expertise: [
      'Complex Coronary Interventions',
      'Cardiac Device Implantation',
      'Heart Failure Management',
      'Preventive Cardiology'
    ],
    publications: [
      'Novel approaches in treatment of resistant hypertension (2022)',
      'Long-term outcomes of drug-eluting stents in Indian population (2021)'
    ],
    about: 'Dr. Rajesh Kumar is a renowned cardiologist with over 15 years of experience in treating complex cardiac conditions. He specializes in interventional cardiology and has performed over 5000 successful procedures.',
    reviews: [
      {
        id: '1',
        patientName: 'Amit Sharma',
        rating: 5,
        comment: 'Excellent doctor! Very thorough with his diagnosis and takes time to explain everything.',
        date: '2024-01-15',
        treatmentType: 'Angioplasty',
        verified: true,
        helpful: 45
      },
      {
        id: '2',
        patientName: 'Priya Reddy',
        rating: 4,
        comment: 'Very knowledgeable and patient. Explains everything in detail.',
        date: '2024-01-10',
        treatmentType: 'Consultation',
        verified: true,
        helpful: 32
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['10:00 AM', '11:00 AM', '2:00 PM']
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    imageUrl: '/doctors/doctor2.jpg',
    specialization: 'Dermatologist',
    subspecialties: ['Cosmetic Dermatology', 'Pediatric Dermatology'],
    experience: 10,
    rating: 4.9,
    reviewCount: 95,
    location: {
      address: 'Fortis Hospital, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi'],
    consultationFee: 800,
    acceptsAyushman: false,
    education: [
      {
        degree: 'MBBS',
        institution: 'Kasturba Medical College',
        year: '2010'
      },
      {
        degree: 'MD (Dermatology)',
        institution: 'JIPMER Puducherry',
        year: '2014'
      }
    ],
    awards: [
      {
        title: 'Young Dermatologist Award',
        year: '2018',
        organization: 'Indian Association of Dermatologists'
      }
    ],
    expertise: [
      'Advanced Skin Treatments',
      'Laser Therapy',
      'Hair Transplantation',
      'Acne Treatment'
    ],
    about: 'Dr. Priya Sharma is a skilled dermatologist known for her expertise in both medical and cosmetic dermatology. She has successfully treated thousands of patients with various skin conditions.',
    reviews: [
      {
        id: '1',
        patientName: 'Sneha Patel',
        rating: 5,
        comment: 'Amazing results with my acne treatment. Very happy with the progress!',
        date: '2024-01-16',
        treatmentType: 'Acne Treatment',
        verified: true,
        helpful: 28
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['9:00 AM', '10:00 AM', '3:00 PM']
      }
    ]
  },
  {
    id: '3',
    name: 'Dr. Arun Krishnan',
    imageUrl: '/doctors/doctor3.jpg',
    specialization: 'Neurologist',
    subspecialties: ['Movement Disorders', 'Epilepsy Management'],
    experience: 18,
    rating: 4.7,
    reviewCount: 150,
    location: {
      address: 'Care Hospital, Gachibowli',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Tamil', 'Telugu'],
    consultationFee: 1200,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'Madras Medical College',
        year: '2002'
      },
      {
        degree: 'MD (Neurology)',
        institution: 'NIMHANS Bangalore',
        year: '2006'
      },
      {
        degree: 'Fellowship',
        institution: 'Cleveland Clinic, USA',
        year: '2008'
      }
    ],
    awards: [
      {
        title: 'Lifetime Achievement Award',
        year: '2021',
        organization: 'Neurological Society of India'
      }
    ],
    expertise: [
      'Movement Disorders',
      'Epilepsy Management',
      'Stroke Treatment',
      'Neuromuscular Disorders'
    ],
    publications: [
      'Recent advances in epilepsy management (2023)',
      'Long-term outcomes of deep brain stimulation (2022)'
    ],
    about: 'Dr. Arun Krishnan is a highly experienced neurologist with international training. He is known for his expertise in movement disorders and epilepsy management.',
    reviews: [
      {
        id: '1',
        patientName: 'Rajesh Menon',
        rating: 5,
        comment: 'Dr. Arun\'s treatment helped me significantly with my tremors. Excellent doctor!',
        date: '2024-01-14',
        treatmentType: 'Movement Disorder Treatment',
        verified: true,
        helpful: 56
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['11:00 AM', '2:00 PM', '4:00 PM']
      }
    ]
  },
  {
    id: '4',
    name: 'Dr. Meera Patel',
    imageUrl: '/doctors/doctor4.jpg',
    specialization: 'Gynecologist',
    subspecialties: ['High-Risk Pregnancy', 'Laparoscopic Surgery'],
    experience: 12,
    rating: 4.9,
    reviewCount: 180,
    location: {
      address: 'Rainbow Hospital, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Gujarati'],
    consultationFee: 900,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'BJ Medical College',
        year: '2008'
      },
      {
        degree: 'MS (Obstetrics & Gynecology)',
        institution: 'KEM Hospital Mumbai',
        year: '2012'
      }
    ],
    awards: [
      {
        title: 'Excellence in Minimally Invasive Surgery',
        year: '2019',
        organization: 'Association of Gynecological Surgeons'
      }
    ],
    expertise: [
      'High-Risk Pregnancy Management',
      'Laparoscopic Surgery',
      'Infertility Treatment',
      'Regular Pregnancy Care'
    ],
    about: 'Dr. Meera Patel is a skilled gynecologist with expertise in high-risk pregnancies and minimally invasive surgeries. She has successfully handled over 1000 deliveries.',
    reviews: [
      {
        id: '1',
        patientName: 'Anjali Shah',
        rating: 5,
        comment: 'Excellent doctor for pregnancy care. Very supportive throughout.',
        date: '2024-01-10',
        treatmentType: 'Pregnancy Care',
        verified: true,
        helpful: 42
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['9:30 AM', '11:30 AM', '4:30 PM']
      }
    ]
  },
  {
    id: '5',
    name: 'Dr. Suresh Reddy',
    imageUrl: '/doctors/doctor5.jpg',
    specialization: 'Orthopedic',
    subspecialties: ['Joint Replacement', 'Sports Medicine'],
    experience: 16,
    rating: 4.7,
    reviewCount: 145,
    location: {
      address: 'KIMS Hospital, Minister Road',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Telugu', 'Hindi'],
    consultationFee: 1100,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'Gandhi Medical College',
        year: '2006'
      },
      {
        degree: 'MS (Orthopedics)',
        institution: 'AIIMS Delhi',
        year: '2010'
      }
    ],
    awards: [
      {
        title: 'Best Paper Award',
        year: '2018',
        organization: 'Indian Orthopedic Association'
      }
    ],
    expertise: [
      'Joint Replacement Surgery',
      'Sports Injuries',
      'Arthroscopy',
      'Trauma Care'
    ],
    about: 'Dr. Suresh Reddy is a renowned orthopedic surgeon specializing in joint replacements and sports medicine. He has performed over 2000 successful surgeries.',
    reviews: [
      {
        id: '1',
        patientName: 'Karthik Kumar',
        rating: 5,
        comment: 'Excellent surgeon. My knee replacement surgery was very successful.',
        date: '2024-01-12',
        treatmentType: 'Knee Replacement',
        verified: true,
        helpful: 38
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['10:30 AM', '2:30 PM', '4:30 PM']
      }
    ]
  },
  {
    id: '6',
    name: 'Dr. Sarah Khan',
    imageUrl: '/doctors/doctor6.jpg',
    specialization: 'Pediatrician',
    subspecialties: ['Neonatology', 'Pediatric Allergy'],
    experience: 9,
    rating: 4.9,
    reviewCount: 210,
    location: {
      address: 'Rainbow Children\'s Hospital, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Urdu'],
    consultationFee: 800,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'Osmania Medical College',
        year: '2012'
      },
      {
        degree: 'MD (Pediatrics)',
        institution: 'JIPMER',
        year: '2016'
      }
    ],
    awards: [
      {
        title: 'Young Pediatrician Award',
        year: '2020',
        organization: 'Indian Academy of Pediatrics'
      }
    ],
    expertise: [
      'Newborn Care',
      'Childhood Allergies',
      'Growth and Development',
      'Vaccination'
    ],
    about: 'Dr. Sarah Khan is a compassionate pediatrician who specializes in newborn care and childhood allergies. She is known for her gentle approach with children.',
    reviews: [
      {
        id: '1',
        patientName: 'Riya Sharma',
        rating: 5,
        comment: 'Very good with kids. My son loves visiting her.',
        date: '2024-01-14',
        treatmentType: 'Regular Checkup',
        verified: true,
        helpful: 52
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['9:00 AM', '11:00 AM', '3:00 PM']
      }
    ]
  },
  {
    id: '7',
    name: 'Dr. Vikram Malhotra',
    imageUrl: '/doctors/doctor7.jpg',
    specialization: 'ENT Specialist',
    subspecialties: ['Head and Neck Surgery', 'Sleep Medicine'],
    experience: 14,
    rating: 4.6,
    reviewCount: 165,
    location: {
      address: 'Continental Hospitals, Gachibowli',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Punjabi'],
    consultationFee: 900,
    acceptsAyushman: false,
    education: [
      {
        degree: 'MBBS',
        institution: 'Maulana Azad Medical College',
        year: '2008'
      },
      {
        degree: 'MS (ENT)',
        institution: 'PGIMER Chandigarh',
        year: '2012'
      }
    ],
    awards: [
      {
        title: 'Best ENT Surgeon',
        year: '2021',
        organization: 'Association of Otolaryngologists of India'
      }
    ],
    expertise: [
      'Sinus Surgery',
      'Sleep Apnea Treatment',
      'Hearing Disorders',
      'Voice Disorders'
    ],
    about: 'Dr. Vikram Malhotra is an experienced ENT specialist with expertise in sleep disorders and complex ear surgeries. He has performed over 3000 successful procedures.',
    reviews: [
      {
        id: '1',
        patientName: 'Arun Kumar',
        rating: 5,
        comment: 'Excellent treatment for my sinusitis. Very professional approach.',
        date: '2024-01-13',
        treatmentType: 'Sinus Treatment',
        verified: true,
        helpful: 35
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['10:00 AM', '12:00 PM', '3:30 PM']
      }
    ]
  },
  {
    id: '8',
    name: 'Dr. Anita Desai',
    imageUrl: '/doctors/doctor8.jpg',
    specialization: 'Psychiatrist',
    subspecialties: ['Child Psychiatry', 'Addiction Medicine'],
    experience: 11,
    rating: 4.8,
    reviewCount: 140,
    location: {
      address: 'Mind Care Clinic, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Marathi'],
    consultationFee: 1200,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'Seth GS Medical College',
        year: '2010'
      },
      {
        degree: 'MD (Psychiatry)',
        institution: 'NIMHANS Bangalore',
        year: '2014'
      }
    ],
    awards: [
      {
        title: 'Mental Health Advocacy Award',
        year: '2022',
        organization: 'Indian Psychiatric Society'
      }
    ],
    expertise: [
      'Depression Treatment',
      'Anxiety Disorders',
      'Child Behavioral Issues',
      'Addiction Counseling'
    ],
    about: 'Dr. Anita Desai is a compassionate psychiatrist specializing in child psychiatry and addiction medicine. She follows a holistic approach to mental health treatment.',
    reviews: [
      {
        id: '1',
        patientName: 'Anonymous',
        rating: 5,
        comment: 'Very understanding and helpful. Made me comfortable discussing my issues.',
        date: '2024-01-15',
        treatmentType: 'Counseling',
        verified: true,
        helpful: 48
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['11:00 AM', '2:00 PM', '5:00 PM']
      }
    ]
  },
  {
    id: '9',
    name: 'Dr. Ramesh Iyer',
    imageUrl: '/doctors/doctor9.jpg',
    specialization: 'Dentist',
    subspecialties: ['Orthodontics', 'Cosmetic Dentistry'],
    experience: 13,
    rating: 4.7,
    reviewCount: 175,
    location: {
      address: 'Smile Care Dental Clinic, Himayat Nagar',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Malayalam'],
    consultationFee: 700,
    acceptsAyushman: false,
    education: [
      {
        degree: 'BDS',
        institution: 'Government Dental College Mumbai',
        year: '2009'
      },
      {
        degree: 'MDS (Orthodontics)',
        institution: 'SDM College of Dental Sciences',
        year: '2013'
      }
    ],
    awards: [
      {
        title: 'Best Cosmetic Dentist',
        year: '2021',
        organization: 'Indian Dental Association'
      }
    ],
    expertise: [
      'Braces Treatment',
      'Dental Implants',
      'Smile Design',
      'Root Canal Treatment'
    ],
    about: 'Dr. Ramesh Iyer is a skilled dentist specializing in orthodontics and cosmetic dentistry. He is known for his painless dental procedures and aesthetic results.',
    reviews: [
      {
        id: '1',
        patientName: 'Deepak Menon',
        rating: 5,
        comment: 'Excellent work on my dental implants. Very satisfied with the results.',
        date: '2024-01-16',
        treatmentType: 'Dental Implants',
        verified: true,
        helpful: 39
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['9:30 AM', '11:30 AM', '4:00 PM']
      }
    ]
  },
  {
    id: '10',
    name: 'Dr. Fatima Ahmed',
    imageUrl: '/doctors/doctor10.jpg',
    specialization: 'General Physician',
    subspecialties: ['Diabetology', 'Geriatric Medicine'],
    experience: 8,
    rating: 4.8,
    reviewCount: 190,
    location: {
      address: 'Wellness Clinic, Mehdipatnam',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Urdu'],
    consultationFee: 600,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'Deccan Medical College',
        year: '2014'
      },
      {
        degree: 'MD (General Medicine)',
        institution: 'Osmania Medical College',
        year: '2018'
      }
    ],
    awards: [
      {
        title: 'Best Family Physician',
        year: '2022',
        organization: 'Hyderabad Medical Association'
      }
    ],
    expertise: [
      'Diabetes Management',
      'Elderly Care',
      'Preventive Medicine',
      'Chronic Disease Management'
    ],
    about: 'Dr. Fatima Ahmed is a dedicated general physician with special interest in diabetology and geriatric care. She believes in preventive healthcare and holistic treatment approaches.',
    reviews: [
      {
        id: '1',
        patientName: 'Mohammed Ali',
        rating: 5,
        comment: 'Very thorough with her diagnosis. Explains everything clearly.',
        date: '2024-01-15',
        treatmentType: 'Regular Checkup',
        verified: true,
        helpful: 45
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['10:00 AM', '12:00 PM', '3:00 PM']
      }
    ]
  },
  {
    id: '11',
    name: 'Dr. Rajesh Kumar',
    imageUrl: '/doctors/doctor11.jpg',
    specialization: 'Cardiologist',
    subspecialties: ['Interventional Cardiology', 'Preventive Cardiology'],
    experience: 15,
    rating: 4.9,
    reviewCount: 220,
    location: {
      address: 'Care Hospitals, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Telugu'],
    consultationFee: 1500,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'AIIMS Delhi',
        year: '2006'
      },
      {
        degree: 'DM (Cardiology)',
        institution: 'SGPGI Lucknow',
        year: '2012'
      }
    ],
    awards: [
      {
        title: 'Excellence in Cardiac Care',
        year: '2020',
        organization: 'Indian Heart Association'
      }
    ],
    expertise: [
      'Coronary Interventions',
      'Heart Failure Management',
      'Cardiac Rehabilitation',
      'Preventive Cardiology'
    ],
    about: 'Dr. Rajesh Kumar is a renowned cardiologist with expertise in complex cardiac interventions. He has performed over 5000 cardiac procedures.',
    reviews: [
      {
        id: '1',
        patientName: 'Suresh Patel',
        rating: 5,
        comment: 'Excellent doctor. Saved my life during a heart emergency.',
        date: '2024-01-14',
        treatmentType: 'Emergency Care',
        verified: true,
        helpful: 65
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['9:00 AM', '11:30 AM', '3:30 PM']
      }
    ]
  },
  {
    id: '12',
    name: 'Dr. Priya Sharma',
    imageUrl: '/doctors/doctor12.jpg',
    specialization: 'Dermatologist',
    subspecialties: ['Cosmetic Dermatology', 'Pediatric Dermatology'],
    experience: 10,
    rating: 4.8,
    reviewCount: 185,
    location: {
      address: 'Skin & Beauty Clinic, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Bengali'],
    consultationFee: 1000,
    acceptsAyushman: false,
    education: [
      {
        degree: 'MBBS',
        institution: 'RG Kar Medical College',
        year: '2011'
      },
      {
        degree: 'MD (Dermatology)',
        institution: 'PGIMER Chandigarh',
        year: '2015'
      }
    ],
    awards: [
      {
        title: 'Best Dermatologist',
        year: '2021',
        organization: 'Indian Association of Dermatologists'
      }
    ],
    expertise: [
      'Skin Treatments',
      'Hair Restoration',
      'Laser Procedures',
      'Anti-aging Treatments'
    ],
    about: 'Dr. Priya Sharma is a skilled dermatologist specializing in both medical and cosmetic dermatology. She is known for her expertise in advanced skin treatments.',
    reviews: [
      {
        id: '1',
        patientName: 'Neha Gupta',
        rating: 5,
        comment: 'Amazing results with my skin treatment. Very professional approach.',
        date: '2024-01-15',
        treatmentType: 'Skin Treatment',
        verified: true,
        helpful: 42
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['10:30 AM', '2:30 PM', '4:30 PM']
      }
    ]
  },
  {
    id: '13',
    name: 'Dr. John Abraham',
    imageUrl: '/doctors/doctor13.jpg',
    specialization: 'Neurologist',
    subspecialties: ['Movement Disorders', 'Epilepsy'],
    experience: 18,
    rating: 4.7,
    reviewCount: 160,
    location: {
      address: 'Neurology Center, Secunderabad',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Malayalam'],
    consultationFee: 1300,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'Christian Medical College Vellore',
        year: '2004'
      },
      {
        degree: 'DM (Neurology)',
        institution: 'AIIMS Delhi',
        year: '2010'
      }
    ],
    awards: [
      {
        title: 'Neurological Excellence Award',
        year: '2019',
        organization: 'Indian Academy of Neurology'
      }
    ],
    expertise: [
      'Movement Disorders',
      'Epilepsy Management',
      'Stroke Treatment',
      'Headache Disorders'
    ],
    about: 'Dr. John Abraham is a highly experienced neurologist with expertise in movement disorders and epilepsy. He has treated over 10,000 patients with neurological conditions.',
    reviews: [
      {
        id: '1',
        patientName: 'Thomas George',
        rating: 5,
        comment: 'Excellent treatment for my father\'s Parkinson\'s disease.',
        date: '2024-01-16',
        treatmentType: 'Movement Disorder',
        verified: true,
        helpful: 38
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['9:30 AM', '1:30 PM', '4:00 PM']
      }
    ]
  },
  {
    id: '14',
    name: 'Dr. Aisha Khan',
    imageUrl: '/doctors/doctor14.jpg',
    specialization: 'Oncologist',
    subspecialties: ['Medical Oncology', 'Breast Cancer'],
    experience: 17,
    rating: 4.9,
    reviewCount: 195,
    location: {
      address: 'American Oncology Institute, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Urdu'],
    consultationFee: 1800,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'King George Medical University',
        year: '2005'
      },
      {
        degree: 'DM (Medical Oncology)',
        institution: 'Tata Memorial Hospital',
        year: '2011'
      }
    ],
    awards: [
      {
        title: 'Outstanding Cancer Research',
        year: '2020',
        organization: 'Indian Cancer Society'
      }
    ],
    expertise: [
      'Breast Cancer Treatment',
      'Chemotherapy',
      'Targeted Therapy',
      'Cancer Prevention'
    ],
    about: 'Dr. Aisha Khan is a renowned oncologist specializing in breast cancer treatment. She has helped thousands of patients in their fight against cancer.',
    reviews: [
      {
        id: '1',
        patientName: 'Priya Reddy',
        rating: 5,
        comment: 'Extremely supportive throughout my cancer treatment journey.',
        date: '2024-01-15',
        treatmentType: 'Cancer Treatment',
        verified: true,
        helpful: 58
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['10:00 AM', '2:00 PM', '4:00 PM']
      }
    ]
  },
  {
    id: '15',
    name: 'Dr. Srinivas Rao',
    imageUrl: '/doctors/doctor15.jpg',
    specialization: 'Pulmonologist',
    subspecialties: ['Sleep Medicine', 'Critical Care'],
    experience: 14,
    rating: 4.8,
    reviewCount: 170,
    location: {
      address: 'Chest & Sleep Care Center, Ameerpet',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Telugu', 'Hindi'],
    consultationFee: 1000,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'Osmania Medical College',
        year: '2008'
      },
      {
        degree: 'DM (Pulmonology)',
        institution: 'PGIMER Chandigarh',
        year: '2014'
      }
    ],
    awards: [
      {
        title: 'Best Pulmonologist',
        year: '2021',
        organization: 'Indian Chest Society'
      }
    ],
    expertise: [
      'Sleep Disorders',
      'Respiratory Diseases',
      'Critical Care',
      'Asthma Management'
    ],
    about: 'Dr. Srinivas Rao is an expert in respiratory medicine and sleep disorders. He has extensive experience in treating complex respiratory conditions.',
    reviews: [
      {
        id: '1',
        patientName: 'Ravi Kumar',
        rating: 5,
        comment: 'Great improvement in my sleep apnea condition after treatment.',
        date: '2024-01-16',
        treatmentType: 'Sleep Disorder',
        verified: true,
        helpful: 45
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['9:30 AM', '11:30 AM', '3:30 PM']
      }
    ]
  },
  {
    id: '16',
    name: 'Dr. Maya Verma',
    imageUrl: '/doctors/doctor16.jpg',
    specialization: 'Endocrinologist',
    subspecialties: ['Diabetes Management', 'Thyroid Disorders'],
    experience: 12,
    rating: 4.7,
    reviewCount: 155,
    location: {
      address: 'Endocrine Care Center, Himayat Nagar',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Marathi'],
    consultationFee: 1200,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'Grant Medical College',
        year: '2010'
      },
      {
        degree: 'DM (Endocrinology)',
        institution: 'AIIMS Delhi',
        year: '2016'
      }
    ],
    awards: [
      {
        title: 'Young Scientist Award',
        year: '2019',
        organization: 'Endocrine Society of India'
      }
    ],
    expertise: [
      'Diabetes Management',
      'Thyroid Disorders',
      'Hormonal Imbalances',
      'Metabolic Disorders'
    ],
    about: 'Dr. Maya Verma is a skilled endocrinologist specializing in diabetes and thyroid disorders. She follows a comprehensive approach to hormonal health.',
    reviews: [
      {
        id: '1',
        patientName: 'Sneha Patil',
        rating: 5,
        comment: 'Excellent treatment for my thyroid condition. Very thorough approach.',
        date: '2024-01-14',
        treatmentType: 'Thyroid Treatment',
        verified: true,
        helpful: 42
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['10:30 AM', '1:30 PM', '4:30 PM']
      }
    ]
  },
  {
    id: '17',
    name: 'Dr. Samuel Thomas',
    imageUrl: '/doctors/doctor17.jpg',
    specialization: 'Gastroenterologist',
    subspecialties: ['Hepatology', 'Therapeutic Endoscopy'],
    experience: 16,
    rating: 4.8,
    reviewCount: 180,
    location: {
      address: 'Digestive Health Institute, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Malayalam', 'Hindi'],
    consultationFee: 1400,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'Christian Medical College Vellore',
        year: '2006'
      },
      {
        degree: 'DM (Gastroenterology)',
        institution: 'SGPGI Lucknow',
        year: '2012'
      }
    ],
    awards: [
      {
        title: 'Excellence in Endoscopy',
        year: '2020',
        organization: 'Indian Society of Gastroenterology'
      }
    ],
    expertise: [
      'Advanced Endoscopy',
      'Liver Diseases',
      'IBD Management',
      'Digestive Disorders'
    ],
    about: 'Dr. Samuel Thomas is a leading gastroenterologist with expertise in advanced endoscopic procedures and liver diseases.',
    reviews: [
      {
        id: '1',
        patientName: 'Jacob Mathew',
        rating: 5,
        comment: 'Very professional and knowledgeable. Helped resolve my chronic digestive issues.',
        date: '2024-01-15',
        treatmentType: 'Digestive Treatment',
        verified: true,
        helpful: 48
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['9:00 AM', '12:00 PM', '3:00 PM']
      }
    ]
  },
  {
    id: '18',
    name: 'Dr. Neha Gupta',
    imageUrl: '/doctors/doctor18.jpg',
    specialization: 'Rheumatologist',
    subspecialties: ['Autoimmune Disorders', 'Joint Diseases'],
    experience: 11,
    rating: 4.7,
    reviewCount: 145,
    location: {
      address: 'Arthritis & Rheumatology Center, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Hindi', 'Gujarati'],
    consultationFee: 1300,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'SMS Medical College',
        year: '2011'
      },
      {
        degree: 'DM (Rheumatology)',
        institution: 'PGIMER Chandigarh',
        year: '2017'
      }
    ],
    awards: [
      {
        title: 'Research Excellence',
        year: '2021',
        organization: 'Indian Rheumatology Association'
      }
    ],
    expertise: [
      'Arthritis Treatment',
      'Autoimmune Diseases',
      'Joint Pain Management',
      'Biological Therapy'
    ],
    about: 'Dr. Neha Gupta is a dedicated rheumatologist specializing in autoimmune disorders and joint diseases. She focuses on improving patients\' quality of life.',
    reviews: [
      {
        id: '1',
        patientName: 'Anjali Shah',
        rating: 5,
        comment: 'Finally found relief from my rheumatoid arthritis. Excellent doctor.',
        date: '2024-01-16',
        treatmentType: 'Arthritis Treatment',
        verified: true,
        helpful: 40
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['10:00 AM', '1:00 PM', '4:00 PM']
      }
    ]
  },
  {
    id: '19',
    name: 'Dr. Kiran Kumar',
    imageUrl: '/doctors/doctor19.jpg',
    specialization: 'Urologist',
    subspecialties: ['Uro-Oncology', 'Kidney Stones'],
    experience: 15,
    rating: 4.8,
    reviewCount: 165,
    location: {
      address: 'Urology Care Center, Somajiguda',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Telugu', 'Hindi'],
    consultationFee: 1200,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'Andhra Medical College',
        year: '2007'
      },
      {
        degree: 'MCh (Urology)',
        institution: 'JIPMER',
        year: '2013'
      }
    ],
    awards: [
      {
        title: 'Best Urologist',
        year: '2020',
        organization: 'Urological Society of India'
      }
    ],
    expertise: [
      'Kidney Stone Treatment',
      'Prostate Surgery',
      'Bladder Problems',
      'Urological Cancers'
    ],
    about: 'Dr. Kiran Kumar is an experienced urologist known for his expertise in minimally invasive urological procedures and stone management.',
    reviews: [
      {
        id: '1',
        patientName: 'Ramesh Babu',
        rating: 5,
        comment: 'Very professional and skilled surgeon. Kidney stone removal was smooth.',
        date: '2024-01-15',
        treatmentType: 'Stone Removal',
        verified: true,
        helpful: 44
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['9:30 AM', '12:30 PM', '3:30 PM']
      }
    ]
  },
  {
    id: '20',
    name: 'Dr. Lakshmi Rao',
    imageUrl: '/doctors/doctor20.jpg',
    specialization: 'Ophthalmologist',
    subspecialties: ['Retina Surgery', 'Cataract'],
    experience: 13,
    rating: 4.9,
    reviewCount: 200,
    location: {
      address: 'Eye Care Institute, Panjagutta',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    languages: ['English', 'Telugu', 'Hindi'],
    consultationFee: 800,
    acceptsAyushman: true,
    education: [
      {
        degree: 'MBBS',
        institution: 'Osmania Medical College',
        year: '2009'
      },
      {
        degree: 'MS (Ophthalmology)',
        institution: 'AIIMS Delhi',
        year: '2013'
      }
    ],
    awards: [
      {
        title: 'Best Eye Surgeon',
        year: '2021',
        organization: 'All India Ophthalmological Society'
      }
    ],
    expertise: [
      'Cataract Surgery',
      'Retinal Disorders',
      'Glaucoma Treatment',
      'LASIK Surgery'
    ],
    about: 'Dr. Lakshmi Rao is a skilled ophthalmologist specializing in advanced eye surgeries. She has performed over 5000 successful cataract surgeries.',
    reviews: [
      {
        id: '1',
        patientName: 'Padma Reddy',
        rating: 5,
        comment: 'Excellent results after cataract surgery. Can see clearly now.',
        date: '2024-01-16',
        treatmentType: 'Cataract Surgery',
        verified: true,
        helpful: 52
      }
    ],
    availableSlots: [
      {
        date: '2024-01-18',
        slots: ['10:00 AM', '12:00 PM', '3:00 PM']
      }
    ]
  }
];

const specializations = [
  'General Physician',
  'Cardiologist',
  'Orthopedic',
  'Pediatrician',
  'Gynecologist',
  'ENT Specialist',
  'Psychiatrist',
  'Dentist',
  'Oncologist',
  'Pulmonologist',
  'Endocrinologist',
  'Gastroenterologist',
  'Rheumatologist',
  'Urologist',
  'Ophthalmologist'
];

const locations = [
  'Hyderabad',
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad'
];

export default function DoctorSearch() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [minimumRating, setMinimumRating] = useState(0);
  const [acceptsAyushman, setAcceptsAyushman] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);

  useEffect(() => {
    const filtered = mockDoctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialization = selectedSpecialization === 'all' || doctor.specialization === selectedSpecialization;
      const matchesLocation = selectedLocation === 'all' || doctor.location.city === selectedLocation;
      const matchesRating = doctor.rating >= minimumRating;
      const matchesAyushman = !acceptsAyushman || doctor.acceptsAyushman;

      return matchesSearch && matchesSpecialization && matchesLocation && matchesRating && matchesAyushman;
    });

    setFilteredDoctors(filtered);
  }, [searchQuery, selectedSpecialization, selectedLocation, minimumRating, acceptsAyushman]);

  const toggleVoiceSearch = () => {
    if (!isListening) {
      if ('webkitSpeechRecognition' in window) {
        setIsListening(true);
        // Implement voice search logic here
        toast({
          title: "Voice Search",
          description: "Listening...",
        });
      } else {
        toast({
          title: "Voice Search Not Available",
          description: "Your browser doesn't support voice search.",
          variant: "destructive",
        });
      }
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Doctors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Search doctors by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleVoiceSearch}
              className={isListening ? 'bg-red-100' : ''}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Specialization</Label>
              <Select 
                value={selectedSpecialization} 
                onValueChange={setSelectedSpecialization}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Select 
                value={selectedLocation} 
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Minimum Rating: {minimumRating}</Label>
              <Slider
                value={[minimumRating]}
                onValueChange={(value) => setMinimumRating(value[0])}
                min={0}
                max={5}
                step={0.1}
                className="py-4"
              />
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <Switch
                id="ayushman"
                checked={acceptsAyushman}
                onCheckedChange={setAcceptsAyushman}
              />
              <Label htmlFor="ayushman">Accepts Ayushman Card</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{doctor.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({doctor.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{doctor.location.address}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((lang) => (
                      <Badge key={lang} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                    {doctor.acceptsAyushman && (
                      <Badge variant="success" className="text-xs">
                        Ayushman Card
                      </Badge>
                    )}
                  </div>
                  <p className="font-medium">₹{doctor.consultationFee} Consultation</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full">
                    <Video className="h-4 w-4 mr-2" />
                    Video Consult
                  </Button>
                  <Button className="w-full">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
