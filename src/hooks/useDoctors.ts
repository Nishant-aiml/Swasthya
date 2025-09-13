import { useState, useEffect } from 'react';
import { Doctor, Location } from '@/types/doctor';
import { doctors } from '@/data/doctor-data';

interface UseDoctorsProps {
  searchTerm?: string;
  location?: Location;
  specialty?: string;
  rating?: number;
  sortBy?: string;
  priceRange?: [number, number];
  languages?: string[];
  availability?: boolean;
  acceptsAyushman?: boolean;
}

export function useDoctors({
  searchTerm = '',
  location,
  specialty = '',
  rating = 0,
  sortBy = '',
  priceRange,
  languages = [],
  availability = false,
  acceptsAyushman = false
}: UseDoctorsProps = {}) {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      let filtered = [...doctors];

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(doctor => 
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by location
      if (location) {
        filtered = filtered.filter(doctor => 
          doctor.location.city === location.city && 
          doctor.location.state === location.state
        );
      }

      // Filter by specialty
      if (specialty) {
        filtered = filtered.filter(doctor => doctor.specialty.toLowerCase() === specialty.toLowerCase());
      }

      // Filter by rating
      if (rating > 0) {
        filtered = filtered.filter(doctor => doctor.rating >= rating);
      }

      // Filter by price range
      if (priceRange) {
        const [min, max] = priceRange;
        filtered = filtered.filter(doctor => {
          const fee = doctor.consultationFee || 0;
          return fee >= min && fee <= max;
        });
      }

      // Filter by languages
      if (languages.length > 0) {
        filtered = filtered.filter(doctor => 
          doctor.languages?.some(lang => languages.includes(lang))
        );
      }

      // Filter by Ayushman acceptance
      if (acceptsAyushman) {
        filtered = filtered.filter(doctor => doctor.acceptsAyushman);
      }

      // Sort doctors
      if (sortBy) {
        switch (sortBy) {
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case 'experience':
            filtered.sort((a, b) => b.experience - a.experience);
            break;
          case 'price':
            filtered.sort((a, b) => {
              const aFee = a.consultationFee || 0;
              const bFee = b.consultationFee || 0;
              return aFee - bFee;
            });
            break;
          default:
            break;
        }
      }

      setFilteredDoctors(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while filtering doctors');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, location, specialty, rating, sortBy, priceRange, languages, availability, acceptsAyushman]);

  return { doctors: filteredDoctors, loading, error };
}