import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Search, MapPin, Shield, Star, Phone, Globe } from 'lucide-react';
import { hospitalMappingService } from '@/services/hospitalMapping.service';
import Map from '@/components/Map';
import { InsuranceAssistance } from '@/components/Insurance/InsuranceAssistance';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

interface Hospital {
  id: string;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  insuranceAccepted: string[];
  specialties: string[];
  rating: number;
  reviews: {
    userId: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  openingHours: string;
  distance?: number;
}

export default function InsuranceMapping() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user's location for nearby hospital search
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        await loadHospitals('', location);
      },
      (error) => console.error('Error getting location:', error)
    );
  }, []);

  const loadHospitals = async (query: string, location: { lat: number; lng: number }) => {
    setLoading(true);
    try {
      const fetchedHospitals = await hospitalMappingService.searchHospitals(query, location);
      const insuranceProviders = hospitalMappingService.getInsuranceProviders();
      
      // Enhance hospital data with mock insurance information
      const enhancedHospitals = fetchedHospitals.map(hospital => ({
        ...hospital,
        insuranceAccepted: insuranceProviders.map(provider => provider.name),
        specialties: ['General Medicine', 'Emergency Care', 'Surgery']
      }));

      setHospitals(enhancedHospitals);
    } catch (error) {
      console.error('Error loading hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterHospitals = (hospital: Hospital) => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInsurance = !selectedInsurance || hospital.insuranceAccepted.includes(selectedInsurance);
    return matchesSearch && matchesInsurance;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Hospital Mapping</h1>
        <p className="text-gray-600">Find hospitals that accept your insurance</p>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search hospitals by name or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
        <div>
          <InsuranceAssistance />
        </div>
      </div>

      {/* Hospital List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.filter(filterHospitals).map((hospital) => (
          <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{hospital.name}</span>
                <Badge variant="outline">{hospital.rating} ★</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                  <span>{hospital.location}</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Accepted Insurance:</h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.insuranceAccepted.map((insurance) => (
                      <Badge
                        key={insurance}
                        variant={selectedInsurance === insurance ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => setSelectedInsurance(insurance)}
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        {insurance}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">{specialty}</Badge>
                    ))}
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Component */}
      <div className="mt-8 h-[500px] rounded-lg overflow-hidden border border-gray-200">
        {userLocation && (
          <Map
            center={[userLocation.lat, userLocation.lng]}
            zoom={13}
            markers={hospitals.map(hospital => ({
              position: [hospital.coordinates.lat, hospital.coordinates.lng],
              popup: hospital.name
            }))}
          />
        )}
      </div>
    </div>
  );
}