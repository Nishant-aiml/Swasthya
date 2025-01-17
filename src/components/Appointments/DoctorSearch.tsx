import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, CreditCard, Calendar, Mic, Languages, GraduationCap, IndianRupee, History, BookmarkPlus, Sliders } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Slider } from "@/components/ui/Slider";
import { Badge } from '@/components/ui/Badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { Card } from "@/components/ui/Card";
import { Doctor } from '@/types/doctor';
import { mockDoctors } from '@/data/mockData';

interface DoctorSearchProps {
  doctors?: Doctor[];
  onBookAppointment?: (doctor: Doctor) => void;
}

interface SearchFilters {
  specialization: string;
  location: string;
  rating: number;
  acceptsAyushman: boolean;
  experience: number;
  languages: string[];
  feeRange: [number, number];
}

export default function DoctorSearch({ doctors = mockDoctors, onBookAppointment }: DoctorSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    specialization: '',
    location: '',
    rating: 0,
    acceptsAyushman: false,
    experience: 0,
    languages: [],
    feeRange: [0, 10000],
  });

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialization = !filters.specialization || 
      doctor.specialization === filters.specialization;

    const matchesRating = doctor.rating >= filters.rating;

    const matchesAyushman = !filters.acceptsAyushman || 
      doctor.acceptsAyushman === filters.acceptsAyushman;

    const matchesExperience = doctor.experience >= filters.experience;

    const matchesLanguages = filters.languages.length === 0 || 
      filters.languages.some(lang => doctor.languages.includes(lang));

    const matchesFeeRange = doctor.consultationFee >= filters.feeRange[0] && 
      doctor.consultationFee <= filters.feeRange[1];

    return matchesSearch && matchesSpecialization && matchesRating && 
      matchesAyushman && matchesExperience && matchesLanguages && matchesFeeRange;
  });

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search doctors by name or specialization..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Sliders className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Search Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialization</label>
                <Select
                  value={filters.specialization}
                  onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, specialization: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(new Set(doctors.map(d => d.specialization))).map(spec => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Rating</label>
                <Slider
                  value={[filters.rating]}
                  min={0}
                  max={5}
                  step={0.5}
                  onValueChange={([value]) => 
                    setFilters(prev => ({ ...prev, rating: value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Consultation Fee Range</label>
                <Slider
                  value={filters.feeRange}
                  min={0}
                  max={10000}
                  step={100}
                  onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, feeRange: value as [number, number] }))
                  }
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{filters.feeRange[0]}</span>
                  <span>₹{filters.feeRange[1]}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Experience (Years)</label>
                <Slider
                  value={[filters.experience]}
                  min={0}
                  max={30}
                  step={1}
                  onValueChange={([value]) => 
                    setFilters(prev => ({ ...prev, experience: value }))
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ayushman"
                  checked={filters.acceptsAyushman}
                  onChange={(e) => 
                    setFilters(prev => ({ ...prev, acceptsAyushman: e.target.checked }))
                  }
                />
                <label htmlFor="ayushman" className="text-sm font-medium">
                  Accepts Ayushman Card
                </label>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="p-6">
            <div className="flex gap-4">
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-sm text-gray-600">({doctor.reviewCount})</span>
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{doctor.location.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4" />
                    <span>{doctor.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IndianRupee className="h-4 w-4" />
                    <span>₹{doctor.consultationFee} consultation fee</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {doctor.languages.map((lang) => (
                    <Badge key={lang} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                  {doctor.acceptsAyushman && (
                    <Badge className="bg-green-100 text-green-800">
                      Ayushman Card
                    </Badge>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => onBookAppointment?.(doctor)}
                  >
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
