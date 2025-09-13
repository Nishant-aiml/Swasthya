import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { MapPin, Phone, Star, Bed, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';

interface Hospital {
  id: string;
  name: string;
  location: string;
  phone: string;
  rating: number;
  specialties: string[];
  acceptsAyushman: boolean;
  bedsAvailable: number;
  totalBeds: number;
  emergencyServices: boolean;
  treatmentPackages: {
    name: string;
    description: string;
    price: number;
  }[];
}

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Apollo Hospital',
    location: 'Jubilee Hills, Hyderabad',
    phone: '+91-40-12345678',
    rating: 4.5,
    specialties: ['Cardiology', 'Neurology', 'Orthopedics'],
    acceptsAyushman: true,
    bedsAvailable: 45,
    totalBeds: 200,
    emergencyServices: true,
    treatmentPackages: [
      {
        name: 'Cardiac Health Package',
        description: 'Complete heart health assessment',
        price: 5000
      },
      {
        name: 'Executive Health Check',
        description: 'Comprehensive health screening',
        price: 7500
      }
    ]
  },
  {
    id: '2',
    name: 'KIMS Hospital',
    location: 'Secunderabad, Hyderabad',
    phone: '+91-40-87654321',
    rating: 4.2,
    specialties: ['Oncology', 'Pediatrics', 'Gynecology'],
    acceptsAyushman: true,
    bedsAvailable: 30,
    totalBeds: 150,
    emergencyServices: true,
    treatmentPackages: [
      {
        name: 'Cancer Screening',
        description: 'Early detection cancer screening',
        price: 8000
      }
    ]
  }
];

const HospitalNetwork = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [showAyushmanOnly, setShowAyushmanOnly] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const filteredHospitals = mockHospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || hospital.specialties.includes(selectedSpecialty);
    const matchesAyushman = !showAyushmanOnly || hospital.acceptsAyushman;
    return matchesSearch && matchesSpecialty && matchesAyushman;
  });

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search hospitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Oncology">Oncology</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="ayushmanFilter"
                checked={showAyushmanOnly}
                onChange={(e) => setShowAyushmanOnly(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="ayushmanFilter">Show Ayushman Card Accepted Only</label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hospital List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHospitals.map(hospital => (
          <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{hospital.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hospital.location}
                  </div>
                </div>
                {hospital.acceptsAyushman && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Ayushman Card Accepted
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Rating and Contact */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    {renderStars(hospital.rating)}
                    <span className="text-sm text-muted-foreground ml-2">
                      {hospital.rating} / 5
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-1" />
                    {hospital.phone}
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map(specialty => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Bed Availability */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {hospital.bedsAvailable} of {hospital.totalBeds} beds available
                    </span>
                  </div>
                  {hospital.emergencyServices && (
                    <Badge variant="destructive" className="bg-red-100 text-red-800">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      24/7 Emergency
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    View Packages
                  </Button>
                  <Button>
                    Book Appointment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Treatment Packages Dialog */}
      <Dialog open={!!selectedHospital} onOpenChange={() => setSelectedHospital(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Treatment Packages - {selectedHospital?.name}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[400px] mt-4">
            <div className="space-y-4">
              {selectedHospital?.treatmentPackages.map((pkg, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{pkg.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {pkg.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{pkg.price}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Book Package
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalNetwork;
