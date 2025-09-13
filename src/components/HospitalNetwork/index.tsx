import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MapPin, Phone, Globe, Clock } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  openingHours: string;
  facilities: string[];
  imageUrl: string;
}

const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    address: '123 Healthcare Street, Medical District',
    phone: '+91 98765 43210',
    website: 'www.citygeneralhospital.com',
    openingHours: '24/7',
    facilities: ['Emergency Care', 'ICU', 'Surgery', 'Pharmacy'],
    imageUrl: '/images/hospital1.jpg'
  },
  {
    id: '2',
    name: 'Apollo Hospitals',
    address: '456 Wellness Road, Health Park',
    phone: '+91 98765 43211',
    website: 'www.apollohospitals.com',
    openingHours: '24/7',
    facilities: ['Multi-Specialty', 'Diagnostics', 'Rehabilitation'],
    imageUrl: '/images/hospital2.jpg'
  }
];

export default function HospitalNetwork() {
  const [selectedFacility, setSelectedFacility] = useState<string>('');

  const filteredHospitals = selectedFacility
    ? hospitals.filter(hospital => hospital.facilities.includes(selectedFacility))
    : hospitals;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Hospital Network</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id} className="overflow-hidden">
            <img
              src={hospital.imageUrl}
              alt={hospital.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">{hospital.name}</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{hospital.address}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{hospital.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="h-4 w-4" />
                  <span>{hospital.website}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{hospital.openingHours}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Facilities</h4>
                <div className="flex flex-wrap gap-2">
                  {hospital.facilities.map((facility) => (
                    <span
                      key={facility}
                      className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
