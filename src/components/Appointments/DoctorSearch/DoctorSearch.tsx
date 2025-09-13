import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { doctors, specializations, locations } from '@/data/doctor-data';
import DoctorCard from './DoctorCard';
import { Search, Mic, SlidersHorizontal } from 'lucide-react';
import VoiceSearch from './VoiceSearch';
import SearchHistory from './SearchHistory';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import AppointmentBooking from '../AppointmentBooking';
import { toast } from 'sonner';
import { Doctor } from '@/types/doctor';
import { MapPin } from 'lucide-react';

export default function DoctorSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [minimumRating, setMinimumRating] = useState(0);
  const [acceptsAyushman, setAcceptsAyushman] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filtered = doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialization = !selectedSpecialization || doctor.specialization === selectedSpecialization;
      const matchesLocation = !selectedLocation || `${doctor.location.city}, ${doctor.location.state}` === selectedLocation;
      const matchesRating = doctor.rating >= minimumRating;
      const matchesAyushman = !acceptsAyushman || doctor.acceptsAyushmanCard;

      return matchesSearch && matchesSpecialization && matchesLocation && matchesRating && matchesAyushman;
    });

    setFilteredDoctors(filtered);
  }, [searchQuery, selectedSpecialization, selectedLocation, minimumRating, acceptsAyushman]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev].slice(0, 5));
    }
  };

  const handleVoiceSearch = (transcript: string) => {
    handleSearch(transcript);
  };

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const handleBookingSubmit = (appointmentData: any) => {
    console.log('Booking appointment:', appointmentData);
    toast.success('Appointment booked successfully!');
    setShowBooking(false);
  };

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(`${location.city}, ${location.state}`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search by doctor name or specialization"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
          <VoiceSearch onResult={handleVoiceSearch} />
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Results</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 py-4">
                {/* Specialization Filter */}
                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Select
                    value={selectedSpecialization}
                    onValueChange={setSelectedSpecialization}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Specializations</SelectItem>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="flex flex-col gap-2">
                    {locations.map((location) => (
                      <div
                        key={`${location.city}-${location.state}`}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleLocationSelect(location)}
                      >
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{`${location.city}, ${location.state}`}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-2">
                  <Label>Minimum Rating</Label>
                  <Slider
                    value={[minimumRating]}
                    onValueChange={([value]) => setMinimumRating(value)}
                    min={0}
                    max={5}
                    step={0.5}
                  />
                  <div className="text-sm text-gray-500">
                    {minimumRating} stars and above
                  </div>
                </div>

                {/* Ayushman Card Filter */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ayushman"
                    checked={acceptsAyushman}
                    onCheckedChange={(checked) => setAcceptsAyushman(!!checked)}
                  />
                  <Label
                    htmlFor="ayushman"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accepts Ayushman Card
                  </Label>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <SearchHistory
            history={searchHistory}
            onSelect={handleSearch}
            onClear={() => setSearchHistory([])}
          />
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
      </div>

      {/* Results Grid */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for doctors...</p>
          </div>
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={handleBookAppointment}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No doctors found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Appointment Booking Dialog */}
      {showBooking && selectedDoctor && (
        <Dialog open={showBooking} onOpenChange={setShowBooking}>
          <DialogContent className="max-w-2xl">
            <AppointmentBooking
              doctor={selectedDoctor}
              onClose={() => setShowBooking(false)}
              onBook={handleBookingSubmit}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
