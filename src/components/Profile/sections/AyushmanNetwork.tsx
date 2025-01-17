import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { Button } from '../../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';
import { Search, MapPin, Star, Clock, Calendar } from 'lucide-react';

interface Facility {
  name: string;
  type: string;
  location: string;
  specialty: string;
  rating: number;
  waitTime: string;
  services: string[];
}

export function AyushmanNetwork() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const facilities: Facility[] = [
    {
      name: 'City General Hospital',
      type: 'hospital',
      location: 'Downtown Medical District',
      specialty: 'Multi-Specialty',
      rating: 4.5,
      waitTime: '20 mins',
      services: ['Emergency', 'Surgery', 'ICU', 'Radiology']
    },
    {
      name: 'Metro Health Clinic',
      type: 'clinic',
      location: 'Suburban Health Center',
      specialty: 'Primary Care',
      rating: 4.2,
      waitTime: '15 mins',
      services: ['General Medicine', 'Pediatrics', 'Vaccination']
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ayushman Network Facilities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search facilities..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Facility Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hospital">Hospitals</SelectItem>
                  <SelectItem value="clinic">Clinics</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic Centers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Specialty</Label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="general">General Medicine</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Facility List */}
        <div className="space-y-4">
          {facilities.map((facility, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{facility.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {facility.location}
                  </p>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{facility.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Wait time: {facility.waitTime}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Next available: Today
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {facility.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Book Appointment</Button>
                <Button variant="outline" className="flex-1">View Details</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline">Load More Facilities</Button>
        </div>
      </CardContent>
    </Card>
  );
}
