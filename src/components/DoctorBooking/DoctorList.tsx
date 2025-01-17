import React, { useEffect, useState } from 'react';
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
import DoctorCard from './DoctorCard';
import DoctorComparison from './DoctorComparison';

type SortOption = 'rating' | 'experience' | 'fee-low' | 'fee-high';

interface Filters {
  languages: string[];
  acceptsAyushman: boolean;
  maxFee: number;
  specialization: string;
}

export default function DoctorList() {
  const { doctors, loading, error } = useDoctors();
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
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { toast } = useToast();

  // Get unique values for filters
  const allLanguages = Array.from(
    new Set(doctors.flatMap((d) => d.languages))
  ).sort();
  const allSpecializations = Array.from(
    new Set(doctors.map((d) => d.specialization))
  ).sort();
  const maxConsultationFee = Math.max(
    ...doctors.map((d) => d.consultationFee)
  );

  // Filter and sort doctors
  const filteredDoctors = doctors
    .filter((doctor) => {
      const matchesSearch =
        searchQuery === '' ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLanguages =
        filters.languages.length === 0 ||
        filters.languages.every((lang) =>
          doctor.languages.includes(lang)
        );

      const matchesAyushman =
        !filters.acceptsAyushman || doctor.acceptsAyushman;

      const matchesFee = doctor.consultationFee <= filters.maxFee;

      const matchesSpecialization =
        filters.specialization === '' ||
        doctor.specialization === filters.specialization;

      return (
        matchesSearch &&
        matchesLanguages &&
        matchesAyushman &&
        matchesFee &&
        matchesSpecialization
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'fee-low':
          return a.consultationFee - b.consultationFee;
        case 'fee-high':
          return b.consultationFee - a.consultationFee;
        default:
          return 0;
      }
    });

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

          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
              <SelectItem value="fee-low">Lowest Fee</SelectItem>
              <SelectItem value="fee-high">Highest Fee</SelectItem>
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
                        onClick={() =>
                          setFilters({
                            ...filters,
                            languages: filters.languages.includes(lang)
                              ? filters.languages.filter((l) => l !== lang)
                              : [...filters.languages, lang],
                          })
                        }
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
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onFavoriteToggle={(doctorId, isFavorite) => {
                toast({
                  title: isFavorite ? 'Added to Favorites' : 'Removed from Favorites',
                  description: `Dr. ${doctor.name} has been ${
                    isFavorite ? 'added to' : 'removed from'
                  } your favorites`,
                });
              }}
              onAppointmentBooked={(details) => {
                toast({
                  title: 'Appointment Booked',
                  description: `Your appointment with Dr. ${
                    doctor.name
                  } has been confirmed for ${details.date} at ${details.time}`,
                });
              }}
              isSelected={selectedDoctors.some((d) => d.id === doctor.id)}
              onSelect={() => handleDoctorSelect(doctor)}
            />
          ))}
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}
        {error && (
          <div className="text-center py-8 text-red-500">
            Error loading doctors. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}