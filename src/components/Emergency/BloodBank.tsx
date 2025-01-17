import React, { useState } from 'react';
import { Search, Phone, MapPin, Clock, AlertTriangle } from 'lucide-react';

interface BloodBank {
  id: string;
  name: string;
  address: string;
  distance: number;
  hours: string;
  bloodAvailability: {
    'A+': boolean;
    'B+': boolean;
    'O-': boolean;
  };
  services: string[];
}

export default function BloodBank() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodType, setBloodType] = useState('All Blood Types');
  const [distance, setDistance] = useState('Within 10 km');

  const mockBloodBank: BloodBank = {
    id: '1',
    name: 'City Blood Bank Center',
    address: '123 Healthcare Ave, Medical District • 2.5 km away',
    distance: 2.5,
    hours: '8:00 AM - 8:00 PM',
    bloodAvailability: {
      'A+': true,
      'B+': true,
      'O-': false
    },
    services: ['Blood Testing', 'Component Separation', 'Emergency Supply', 'Mobile Collection']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Blood Bank Finder</h1>
        <p className="text-gray-600 mb-6">Find nearby blood banks and donors in real-time</p>

        {/* Search Bar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location or blood bank name..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option>All Blood Types</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
          <select
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option>Within 10 km</option>
            <option>Within 20 km</option>
            <option>Within 50 km</option>
          </select>
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
            Find Donors
          </button>
        </div>

        {/* Blood Bank Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                {mockBloodBank.name}
                <span className="px-2 py-0.5 text-sm bg-green-100 text-green-800 rounded">Open</span>
              </h2>
              <p className="text-gray-600 mt-1">{mockBloodBank.address}</p>
            </div>
            <div className="text-right">
              <Clock className="h-5 w-5 text-gray-400 inline mr-1" />
              <span className="text-gray-600">{mockBloodBank.hours}</span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Blood Availability:</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-600">A+</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                <span className="text-sm text-gray-600">B+</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                <span className="text-sm text-gray-600">O-</span>
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Services:</h3>
            <div className="flex flex-wrap gap-2">
              {mockBloodBank.services.map((service, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <Phone className="h-5 w-5" />
              Call
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <MapPin className="h-5 w-5" />
              Directions
            </button>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Emergency Blood Requirement?</h3>
              <p className="mt-1 text-sm text-red-700">
                Call our 24/7 Emergency Blood Support:<br />
                <strong>1800-RED-CROSS (1800-733-27677)</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
