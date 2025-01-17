import React, { useState, useEffect } from 'react';
import { Droplet, MapPin, Phone, Clock, Search, Filter, AlertTriangle, User } from 'lucide-react';

interface BloodBank {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    distance: number;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  hours: {
    weekday: string;
    weekend: string;
    emergency: string;
  };
  bloodTypes: {
    type: string;
    availability: 'high' | 'medium' | 'low' | 'none';
    lastUpdated: Date;
  }[];
  services: string[];
  isOpen: boolean;
  rating: number;
  reviews: number;
}

interface BloodDonor {
  id: string;
  name: string;
  bloodType: string;
  location: {
    area: string;
    distance: number;
  };
  lastDonation: Date;
  available: boolean;
  donations: number;
}

export default function BloodBankFinder() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [selectedBloodType, setSelectedBloodType] = useState<string>('all');
  const [searchRadius, setSearchRadius] = useState<number>(10);
  const [view, setView] = useState<'banks' | 'donors'>('banks');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          setError('Unable to get your location. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      // Mock data - In real app, fetch from API based on location
      const mockBloodBanks: BloodBank[] = [
        {
          id: '1',
          name: 'City Blood Bank Center',
          location: {
            lat: userLocation.lat + 0.01,
            lng: userLocation.lng + 0.01,
            address: '123 Healthcare Ave, Medical District',
            distance: 2.5
          },
          contact: {
            phone: '+91 98765 43210',
            email: 'info@citybloodbank.com',
            website: 'www.citybloodbank.com'
          },
          hours: {
            weekday: '8:00 AM - 8:00 PM',
            weekend: '9:00 AM - 5:00 PM',
            emergency: '24/7'
          },
          bloodTypes: [
            { type: 'A+', availability: 'high', lastUpdated: new Date() },
            { type: 'B+', availability: 'medium', lastUpdated: new Date() },
            { type: 'O-', availability: 'low', lastUpdated: new Date() }
          ],
          services: [
            'Blood Testing',
            'Component Separation',
            'Emergency Supply',
            'Mobile Collection'
          ],
          isOpen: true,
          rating: 4.8,
          reviews: 156
        }
      ];

      const mockDonors: BloodDonor[] = [
        {
          id: '1',
          name: 'John Doe',
          bloodType: 'O+',
          location: {
            area: 'Downtown',
            distance: 3.2
          },
          lastDonation: new Date('2023-11-15'),
          available: true,
          donations: 8
        }
      ];

      setBloodBanks(mockBloodBanks);
      setDonors(mockDonors);
    }
  }, [userLocation]);

  const getAvailabilityColor = (availability: BloodBank['bloodTypes'][0]['availability']) => {
    switch (availability) {
      case 'high':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleCallBank = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleNavigate = (location: BloodBank['location']) => {
    if (!userLocation) return;
    
    const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Blood Bank Finder</h2>
        <p className="text-sm text-gray-500 mt-1">
          Find nearby blood banks and donors in real-time
        </p>
      </div>

      {/* Search Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by location or blood bank name..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          <button
            onClick={() => setView(view === 'banks' ? 'donors' : 'banks')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            {view === 'banks' ? 'Find Donors' : 'Find Blood Banks'}
          </button>
        </div>

        <div className="flex space-x-4">
          <select
            value={selectedBloodType}
            onChange={(e) => setSelectedBloodType(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Blood Types</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value={5}>Within 5 km</option>
            <option value={10}>Within 10 km</option>
            <option value={20}>Within 20 km</option>
            <option value={50}>Within 50 km</option>
          </select>
        </div>
      </div>

      {/* Blood Banks List */}
      {view === 'banks' && (
        <div className="space-y-4">
          {bloodBanks.map((bank) => (
            <div key={bank.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{bank.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bank.isOpen ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {bank.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {bank.location.address} • {bank.location.distance.toFixed(1)} km away
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{bank.hours.weekday}</span>
                  </div>
                </div>
              </div>

              {/* Blood Types Availability */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Blood Availability:</h4>
                <div className="flex flex-wrap gap-2">
                  {bank.bloodTypes.map((blood) => (
                    <div
                      key={blood.type}
                      className={`flex items-center space-x-1 px-2 py-1 rounded ${getAvailabilityColor(blood.availability)}`}
                    >
                      <Droplet className="h-4 w-4" />
                      <span className="text-sm font-medium">{blood.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Services:</h4>
                <div className="flex flex-wrap gap-2">
                  {bank.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleCallBank(bank.contact.phone)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call</span>
                </button>
                <button
                  onClick={() => handleNavigate(bank.location)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Directions</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Donors List */}
      {view === 'donors' && (
        <div className="space-y-4">
          {donors.map((donor) => (
            <div key={donor.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <h3 className="font-medium text-gray-900">{donor.name}</h3>
                    <span className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                      {donor.bloodType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {donor.location.area} • {donor.location.distance.toFixed(1)} km away
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    donor.available ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {donor.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <div>Last donation: {donor.lastDonation.toLocaleDateString()}</div>
                <div>{donor.donations} donations made</div>
              </div>

              {donor.available && (
                <button
                  className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Contact Donor
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Emergency Notice */}
      <div className="mt-8 bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Emergency Blood Requirement?
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>Call our 24/7 Emergency Blood Support:</p>
              <p className="font-medium mt-1">1800-RED-CROSS (1800-733-27677)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}