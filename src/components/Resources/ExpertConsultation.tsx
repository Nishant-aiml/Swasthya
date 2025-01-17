import React, { useState } from 'react';
import { Expert } from '@/types/Resources';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Calendar,
  Clock,
  Search,
  Star,
  Video,
  MessageSquare,
  Award,
  Languages,
  IndianRupee
} from 'lucide-react';
import { toast } from 'sonner';

const experts: Expert[] = [
  {
    id: '1',
    name: 'Dr. Arun Kumar',
    title: 'Senior Cardiologist',
    specialization: 'Cardiology',
    qualifications: ['MBBS', 'MD', 'DM'],
    experience: 15,
    rating: 4.8,
    reviews: 128,
    avatar: '/images/experts/doctor1.jpg',
    availableSlots: ['10:00 AM', '2:00 PM', '4:00 PM'],
    consultationFee: 1000,
    languages: ['English', 'Hindi', 'Telugu'],
    about: 'Dr. Arun Kumar is a renowned cardiologist with over 15 years of experience in treating heart diseases.',
    verified: true
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    title: 'Clinical Nutritionist',
    specialization: 'Nutrition',
    qualifications: ['BSc', 'MSc', 'PhD'],
    experience: 8,
    rating: 4.9,
    reviews: 95,
    avatar: '/images/experts/doctor2.jpg',
    availableSlots: ['11:00 AM', '3:00 PM', '5:00 PM'],
    consultationFee: 800,
    languages: ['English', 'Hindi'],
    about: 'Dr. Priya Sharma specializes in clinical nutrition and weight management.',
    verified: true
  },
  {
    id: '3',
    name: 'Dr. Rajesh Verma',
    title: 'Mental Health Specialist',
    specialization: 'Psychiatry',
    qualifications: ['MBBS', 'MD'],
    experience: 12,
    rating: 4.7,
    reviews: 156,
    avatar: '/images/experts/doctor3.jpg',
    availableSlots: ['9:00 AM', '1:00 PM', '6:00 PM'],
    consultationFee: 1200,
    languages: ['English', 'Hindi', 'Punjabi'],
    about: 'Dr. Rajesh Verma is an experienced psychiatrist specializing in anxiety and depression treatment.',
    verified: true
  },
  {
    id: 'dr-smith',
    name: 'Dr. Sarah Smith',
    title: 'Senior Cardiologist',
    specialization: 'Cardiology',
    qualifications: ['MD', 'FACC'],
    experience: 15,
    rating: 4.9,
    reviews: 250,
    avatar: '/images/experts/dr-smith.jpg',
    availableSlots: [],
    consultationFee: 100,
    languages: ['English', 'Spanish'],
    about: 'Experienced cardiologist specializing in preventive cardiology and heart health.',
    verified: true
  },
  {
    id: 'dr-patel',
    name: 'Dr. Raj Patel',
    title: 'Pediatrician',
    specialization: 'Pediatrics',
    qualifications: ['MD', 'FAAP'],
    experience: 12,
    rating: 4.8,
    reviews: 180,
    avatar: '/images/experts/dr-patel.jpg',
    availableSlots: [],
    consultationFee: 80,
    languages: ['English', 'Hindi'],
    about: 'Dedicated pediatrician with expertise in child development and preventive care.',
    verified: true
  },
  {
    id: 'dr-chen',
    name: 'Dr. Li Chen',
    title: 'Dermatologist',
    specialization: 'Dermatology',
    qualifications: ['MD', 'FAAD'],
    experience: 10,
    rating: 4.7,
    reviews: 150,
    avatar: '/images/experts/dr-chen.jpg',
    availableSlots: [],
    consultationFee: 90,
    languages: ['English', 'Mandarin'],
    about: 'Board-certified dermatologist specializing in skin health and cosmetic procedures.',
    verified: true
  }
];

const specializations = [
  'All',
  'Cardiology',
  'Nutrition',
  'Psychiatry',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'General Medicine'
];

export default function ExpertConsultation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'All' || 
                                 expert.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  const handleBooking = (expert: Expert, slot: string) => {
    // In production, this would open a booking modal or redirect to a booking page
    toast.success(`Consultation booked with ${expert.name} for ${slot}`);
  };

  return (
    <div>
      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search doctors by name or specialization..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {specializations.map(specialization => (
            <Button
              key={specialization}
              variant={selectedSpecialization === specialization ? 'default' : 'outline'}
              onClick={() => setSelectedSpecialization(specialization)}
              className="rounded-full"
            >
              {specialization}
            </Button>
          ))}
        </div>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperts.map(expert => (
          <Card key={expert.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{expert.name}</h3>
                  <p className="text-gray-600">{expert.title}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{expert.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({expert.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="h-4 w-4 mr-2" />
                  <span>{expert.experience} years experience</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Languages className="h-4 w-4 mr-2" />
                  <span>{expert.languages.join(', ')}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <IndianRupee className="h-4 w-4 mr-2" />
                  <span>₹{expert.consultationFee} per consultation</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600">{expert.about}</p>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Available Slots Today</h4>
                <div className="flex flex-wrap gap-2">
                  {expert.availableSlots.map(slot => (
                    <Button
                      key={slot}
                      variant="outline"
                      size="sm"
                      onClick={() => handleBooking(expert, slot)}
                      className="flex items-center"
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => handleBooking(expert, expert.availableSlots[0])}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Video Consult
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleBooking(expert, expert.availableSlots[0])}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat Consult
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
