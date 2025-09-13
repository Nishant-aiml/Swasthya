import * as React from 'react';
import type { SearchFilters as SearchFiltersType } from '@/types/search';
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { specializations } from '@/data/doctor-data';
import { languages } from '@/data/constants';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (filters: SearchFiltersType) => void;
  onSaveFilters: () => void;
}

export default function SearchFilters({
  filters,
  onFilterChange,
  onSaveFilters
}: SearchFiltersProps) {
  const handleChange = (key: keyof SearchFiltersType, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="text-sm font-medium">Specialization</label>
        <Select
          value={filters.specialization || ''}
          onValueChange={(value) => handleChange('specialization', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select specialization" />
          </SelectTrigger>
          <SelectContent>
            {specializations.map((spec) => (
              <SelectItem key={spec} value={spec}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">Location</label>
        <Input
          type="text"
          placeholder="Enter location"
          value={filters.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Minimum Rating</label>
        <Slider
          value={[filters.minRating || 0]}
          onValueChange={([value]) => handleChange('minRating', value)}
          max={5}
          step={0.5}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Consultation Fee Range</label>
        <div className="flex gap-4">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minFee || ''}
            onChange={(e) => handleChange('minFee', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxFee || ''}
            onChange={(e) => handleChange('maxFee', Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Minimum Experience (years)</label>
        <Slider
          value={[filters.minExperience || 0]}
          onValueChange={([value]) => handleChange('minExperience', value)}
          max={30}
          step={1}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Languages</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {languages.map((lang: string) => (
            <Badge
              key={lang}
              variant={filters.languages?.includes(lang) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => {
                const currentLangs = filters.languages || [];
                const newLangs = currentLangs.includes(lang)
                  ? currentLangs.filter((l) => l !== lang)
                  : [...currentLangs, lang];
                handleChange('languages', newLangs);
              }}
            >
              {lang}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Accepts Ayushman Card</label>
        <Switch
          checked={filters.acceptsAyushman || false}
          onCheckedChange={(checked) => handleChange('acceptsAyushman', checked)}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Consultation Type</label>
        <Select
          value={filters.consultationType || ''}
          onValueChange={(value) => handleChange('consultationType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="in-person">In-Person</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={onSaveFilters} className="w-full">
        Save Filters
      </Button>
    </div>
  );
}
