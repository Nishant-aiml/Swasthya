import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  Building2,
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  Calendar,
  CreditCard,
  Package,
  CheckCircle,
} from 'lucide-react';

const AyushmanNetwork = () => {
  const [selectedFacilityType, setSelectedFacilityType] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const facilities = [
    {
      id: 1,
      name: 'City General Hospital',
      type: 'Hospital',
      specialty: 'Multi-Specialty',
      location: 'Downtown',
      rating: 4.5,
      waitTime: '20 mins',
      services: ['Emergency', 'Surgery', 'ICU'],
      coverage: '100%',
    },
    {
      id: 2,
      name: 'HealthCare Clinic',
      type: 'Clinic',
      specialty: 'Primary Care',
      location: 'Suburb',
      rating: 4.2,
      waitTime: '15 mins',
      services: ['General Medicine', 'Pediatrics'],
      coverage: '80%',
    },
    {
      id: 3,
      name: 'Dr. Smith\'s Practice',
      type: 'Doctor',
      specialty: 'Cardiology',
      location: 'Midtown',
      rating: 4.8,
      waitTime: '30 mins',
      services: ['Consultation', 'ECG'],
      coverage: '90%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Healthcare Facilities</CardTitle>
          <CardDescription>
            Search Ayushman-accepted facilities near you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search facilities, doctors, or services..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Facility Type</Label>
                <Select
                  value={selectedFacilityType}
                  onValueChange={setSelectedFacilityType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="hospital">Hospitals</SelectItem>
                    <SelectItem value="clinic">Clinics</SelectItem>
                    <SelectItem value="doctor">Doctors</SelectItem>
                    <SelectItem value="diagnostic">Diagnostic Centers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Specialty</Label>
                <Select
                  value={selectedSpecialty}
                  onValueChange={setSelectedSpecialty}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="Enter location or pincode" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Facilities List */}
      <Card>
        <CardHeader>
          <CardTitle>Available Facilities</CardTitle>
          <CardDescription>
            Showing facilities that accept Ayushman card
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="p-4 border rounded-lg space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{facility.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{facility.type}</span>
                      <span>•</span>
                      <MapPin className="w-4 h-4" />
                      <span>{facility.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{facility.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm">Wait Time</Label>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{facility.waitTime}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm">Coverage</Label>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <span>{facility.coverage}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm">Services</Label>
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span>{facility.services.join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button>
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Treatment Packages */}
      <Card>
        <CardHeader>
          <CardTitle>Treatment Packages</CardTitle>
          <CardDescription>
            Available treatment packages and coverage details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: 'Basic Health Checkup',
                coverage: '100%',
                includes: ['Blood Tests', 'ECG', 'Chest X-Ray'],
                cost: '₹5,000',
              },
              {
                name: 'Cardiac Care Package',
                coverage: '90%',
                includes: ['ECG', 'Echo', 'Stress Test'],
                cost: '₹15,000',
              },
              {
                name: 'Maternity Package',
                coverage: '85%',
                includes: ['Prenatal Care', 'Delivery', 'Postnatal Care'],
                cost: '₹50,000',
              },
            ].map((pkg, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg flex items-center justify-between"
              >
                <div className="space-y-2">
                  <h4 className="font-medium">{pkg.name}</h4>
                  <div className="text-sm text-muted-foreground">
                    Includes: {pkg.includes.join(', ')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{pkg.cost}</div>
                  <div className="text-sm text-green-600">
                    {pkg.coverage} covered
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Claim Processing */}
      <Card>
        <CardHeader>
          <CardTitle>Claim Processing Status</CardTitle>
          <CardDescription>
            Track your Ayushman claims
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 'CLM001',
                facility: 'City General Hospital',
                date: '2025-01-15',
                amount: '₹25,000',
                status: 'Approved',
              },
              {
                id: 'CLM002',
                facility: 'HealthCare Clinic',
                date: '2025-01-10',
                amount: '₹8,000',
                status: 'Processing',
              },
            ].map((claim, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="font-medium">Claim #{claim.id}</div>
                  <div className="text-sm text-muted-foreground">
                    {claim.facility} • {claim.date}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-medium">{claim.amount}</div>
                  <div
                    className={`text-sm ${
                      claim.status === 'Approved'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {claim.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AyushmanNetwork;
