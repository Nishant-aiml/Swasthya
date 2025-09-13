import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  Search, Mic, MicOff, CreditCard, SlidersHorizontal, 
  ArrowUpDown, Check, X 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { Slider } from '@/components/ui/Slider';
import { Switch } from '@/components/ui/Switch';
import { useToast } from '@/hooks/useToast';
import { useDoctors } from '@/hooks/useDoctors';
import type { Doctor } from '@/types/doctor';
import { DoctorCard } from './DoctorCard';
import DoctorComparison from './DoctorComparison';

export type SortOption = 'rating' | 'experience' | 'fee';

interface Filters {
  languages: string[];
  acceptsAyushman: boolean;
  maxFee: number;
  specialization: string;
}

interface DoctorListProps {
  doctors: Doctor[];
  onBookAppointment: (doctor: Doctor, date: Date) => void;
  onViewDetails: (doctor: Doctor) => void;
  onToggleFavorite?: (doctor: Doctor) => void;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (date: Date) => void;
  onViewDetails: (doctor: Doctor) => void;
  onToggleFavorite?: (doctor: Doctor) => void;
}

export function DoctorList({
  doctors,
  onBookAppointment,
  onViewDetails,
  onToggleFavorite
}: DoctorListProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [filters, setFilters] = useState<Filters>({
    languages: [],
    acceptsAyushman: false,
    maxFee: 5000,
    specialization: '',
  });
  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>([]);
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  // Get unique values for filters
  const allLanguages = Array.from(
    new Set(doctors.flatMap((d) => d.languages || []))
  ).filter(Boolean).sort();
  const allSpecializations = Array.from(
    new Set(doctors.map((d) => d.specialization))
  ).sort();
  const maxConsultationFee = Math.max(
    ...doctors.map((d) => d.consultationFee ?? 0)
  );

  // Filter and sort doctors
  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    let sorted = [...doctors];
    switch (value) {
      case 'rating':
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'experience':
        sorted.sort((a, b) => (b.experience ?? 0) - (a.experience ?? 0));
        break;
      case 'fee':
        sorted.sort((a, b) => (a.consultationFee ?? 0) - (b.consultationFee ?? 0));
        break;
    }
    setFilteredDoctors(sorted);
  };

  const handleLanguageFilter = (selectedLangs: string[]) => {
    setFilters(prev => ({ ...prev, languages: selectedLangs }));
    const filtered = doctors.filter(doctor => {
      if (!selectedLangs.length) return true;
      return doctor.languages?.some(lang => selectedLangs.includes(lang)) || false;
    });
    setFilteredDoctors(filtered);
  };

  const handleLanguageClick = (lang: string) => {
    const newLanguages = filters.languages.includes(lang)
      ? filters.languages.filter(l => l !== lang)
      : [...filters.languages, lang];
    handleLanguageFilter(newLanguages);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctors((prev) => {
      const isSelected = prev.some((d) => d.id === doctor.id);
      if (isSelected) {
        return prev.filter((d) => d.id !== doctor.id);
      }
      if (prev.length >= 3) {
        toast({
          title: 'Maximum Selection Reached',
          description: 'You can compare up to 3 doctors at a time',
        });
        return prev;
      }
      return [...prev, doctor];
    });
  };

  const handleVoiceSearchResult = (transcript: string) => {
    setSearchQuery(transcript);
    setIsVoiceSearchActive(false);
    toast({
      title: "Voice Search",
      description: `Searching for: "${transcript}"`,
    });
  };

  const toggleFavorite = (doctorId: string) => {
    setFavorites(prev =>
      prev.includes(doctorId)
        ? prev.filter(id => id !== doctorId)
        : [...prev, doctorId]
    );
  };

  const handleBookAppointmentForDoctor = (doctor: Doctor) => {
    return (date: Date) => {
      onBookAppointment(doctor, date);
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Header */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search doctors by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              <button
                onClick={() => setIsVoiceSearchActive(!isVoiceSearchActive)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
              >
                {isVoiceSearchActive ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Select
            value={sortBy}
            onValueChange={handleSortChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
              <SelectItem value="fee">Price</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Doctors</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Specialization Filter */}
                <div>
                  <label className="text-sm font-medium">Specialization</label>
                  <Select
                    value={filters.specialization}
                    onValueChange={(value) =>
                      setFilters({ ...filters, specialization: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Specializations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Specializations</SelectItem>
                      {allSpecializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Languages Filter */}
                <div>
                  <label className="text-sm font-medium">Languages</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {allLanguages.map((lang) => (
                      <Badge
                        key={lang}
                        variant={
                          filters.languages.includes(lang)
                            ? 'default'
                            : 'outline'
                        }
                        className="cursor-pointer"
                        onClick={() => handleLanguageClick(lang)}
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Fee Range Filter */}
                <div>
                  <label className="text-sm font-medium">
                    Maximum Consultation Fee: ₹{filters.maxFee}
                  </label>
                  <Slider
                    value={[filters.maxFee]}
                    max={maxConsultationFee}
                    step={100}
                    onValueChange={([value]) =>
                      setFilters({ ...filters, maxFee: value })
                    }
                    className="mt-2"
                  />
                </div>

                {/* Ayushman Card Filter */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Accepts Ayushman Card
                  </label>
                  <Switch
                    checked={filters.acceptsAyushman}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, acceptsAyushman: checked })
                    }
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Selected Doctors Bar */}
        {selectedDoctors.length > 0 && (
          <div className="sticky top-0 z-10 bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-medium">
                  Selected Doctors ({selectedDoctors.length}/3)
                </span>
                <div className="flex gap-2">
                  {selectedDoctors.map((doctor) => (
                    <Badge
                      key={doctor.id}
                      className="gap-2"
                      variant="secondary"
                    >
                      {doctor.name}
                      <button
                        onClick={() => handleDoctorSelect(doctor)}
                        className="hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <DoctorComparison
                doctors={selectedDoctors}
                onClose={() => setSelectedDoctors([])}
              />
            </div>
          </div>
        )}

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 gap-6" ref={ref}>
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id}>
              <div className="flex flex-wrap gap-2">
                {doctor.languages?.map((language, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
                  >
                    {language}
                  </span>
                ))}
              </div>
              <DoctorCard
                doctor={doctor}
                onBookAppointment={handleBookAppointmentForDoctor(doctor)}
                onViewDetails={() => onViewDetails(doctor)}
                onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(doctor) : undefined}
              />
            </div>
          ))}
        </div>

        {/* Loading and Error States */}
        {false && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}
        {false && (
          <div className="text-center py-8 text-red-500">
            Error loading doctors. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}