import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';

interface DoctorFiltersProps {
  onChange: (filters: {
    specialization: string;
    experience: string;
    rating: string;
    language: string;
  }) => void;
}

export function DoctorFilters({ onChange }: DoctorFiltersProps) {
  const [filters, setFilters] = useState({
    specialization: '',
    experience: '',
    rating: '',
    language: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onChange(newFilters);
  };

  const setSpecialty = (value: string) => handleFilterChange('specialization', value);
  const setExperience = (value: string) => handleFilterChange('experience', value);
  const setRating = (value: string) => handleFilterChange('rating', value);
  const setLanguage = (value: string) => handleFilterChange('language', value);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Specialization
        </label>
        <Select onValueChange={setSpecialty}>
          <SelectTrigger>
            <SelectValue placeholder="Select specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cardiologist">Cardiologist</SelectItem>
            <SelectItem value="dermatologist">Dermatologist</SelectItem>
            <SelectItem value="neurologist">Neurologist</SelectItem>
            <SelectItem value="pediatrician">Pediatrician</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Experience
        </label>
        <Select onValueChange={setExperience}>
          <SelectTrigger>
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-5">0-5 years</SelectItem>
            <SelectItem value="5-10">5-10 years</SelectItem>
            <SelectItem value="10-15">10-15 years</SelectItem>
            <SelectItem value="15+">15+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <Select onValueChange={setRating}>
          <SelectTrigger>
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4+">4+ Stars</SelectItem>
            <SelectItem value="3+">3+ Stars</SelectItem>
            <SelectItem value="2+">2+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Language
        </label>
        <Select onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="hindi">Hindi</SelectItem>
            <SelectItem value="marathi">Marathi</SelectItem>
            <SelectItem value="gujarati">Gujarati</SelectItem>
            <SelectItem value="bengali">Bengali</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}