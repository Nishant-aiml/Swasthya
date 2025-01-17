import React, { useState } from 'react';
import { Building2, Ambulance, CreditCard, Bed, Package, Star, Phone, MapPin, Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import type { Hospital } from '@/types/hospital';

interface HospitalNetworkProps {
  hospitals: Hospital[];
}

export default function HospitalNetwork({ hospitals }: HospitalNetworkProps) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.departments.some(dept => dept.toLowerCase().includes(searchQuery.toLowerCase())) ||
    hospital.address.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search hospitals by name, department or city..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <Building2 className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Total Hospitals</p>
            <p className="text-2xl font-semibold">{hospitals.length}</p>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center gap-3">
          <CreditCard className="h-8 w-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Ayushman Card Accepted</p>
            <p className="text-2xl font-semibold">
              {hospitals.filter(h => h.acceptsAyushman).length}
            </p>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center gap-3">
          <Ambulance className="h-8 w-8 text-red-500" />
          <div>
            <p className="text-sm text-gray-600">Emergency Services</p>
            <p className="text-2xl font-semibold">
              {hospitals.filter(h => h.emergencyServices.available24x7).length}
            </p>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center gap-3">
          <Package className="h-8 w-8 text-purple-500" />
          <div>
            <p className="text-sm text-gray-600">Departments</p>
            <p className="text-2xl font-semibold">
              {hospitals.reduce((acc, h) => acc + h.departments.length, 0)}
            </p>
          </div>
        </Card>
      </div>

      {/* Hospital List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((hospital) => (
          <Dialog key={hospital.id}>
            <DialogTrigger asChild>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                {/* Hospital Image */}
                <div className="h-48 relative">
                  <img
                    src={hospital.imageUrl}
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                  />
                  {hospital.acceptsAyushman && (
                    <Badge className="absolute top-4 right-4 bg-green-500">
                      Ayushman Card
                    </Badge>
                  )}
                </div>

                {/* Hospital Info */}
                <div className="p-4 space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">{hospital.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{hospital.rating}</span>
                        <span className="text-sm text-gray-500">({hospital.reviewCount})</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{hospital.type}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{hospital.address.street}, {hospital.address.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{hospital.contact.phone}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hospital.departments.slice(0, 3).map((dept, i) => (
                      <Badge key={i} variant="secondary">{dept}</Badge>
                    ))}
                    {hospital.departments.length > 3 && (
                      <Badge variant="secondary">+{hospital.departments.length - 3} more</Badge>
                    )}
                  </div>
                </div>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{hospital.name}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p>Phone: {hospital.contact.phone}</p>
                      <p>Email: {hospital.contact.email}</p>
                      <p>Website: {hospital.contact.website}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Address</h4>
                    <p className="text-sm">
                      {hospital.address.street}, {hospital.address.landmark}<br />
                      {hospital.address.city}, {hospital.address.state} - {hospital.address.pincode}
                    </p>
                  </div>
                </div>

                {/* Facilities & Services */}
                <div>
                  <h4 className="font-medium mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.facilities.map((facility, i) => (
                      <Badge key={i} variant="secondary">{facility}</Badge>
                    ))}
                  </div>
                </div>

                {/* Departments */}
                <div>
                  <h4 className="font-medium mb-2">Departments</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {hospital.departments.map((dept, i) => (
                      <div key={i} className="text-sm">{dept}</div>
                    ))}
                  </div>
                </div>

                {/* Emergency Services */}
                <div>
                  <h4 className="font-medium mb-2">Emergency Services</h4>
                  <div className="space-y-2 text-sm">
                    <p>24x7 Available: {hospital.emergencyServices.available24x7 ? 'Yes' : 'No'}</p>
                    <p>Ambulance: {hospital.emergencyServices.ambulanceNumber}</p>
                    <p>Trauma Center: {hospital.emergencyServices.traumaCenter ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
