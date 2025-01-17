import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Camera, Download, Share2, Lock, History, QrCode } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

interface SwasthyaCardData {
  id: string;
  name: string;
  photo: string;
  dateOfBirth: string;
  bloodType: string;
  contactNumber: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  digitalSignature: string;
  medicalHistory: {
    allergies: string[];
    conditions: string[];
    medications: string[];
  };
}

export default function SwasthyaCard() {
  const [accessLevel, setAccessLevel] = useState('basic');
  const [cardData, setCardData] = useState<SwasthyaCardData>({
    id: generateSwasthyaId(),
    name: 'John Doe',
    photo: '/placeholder-photo.jpg',
    dateOfBirth: '1990-01-01',
    bloodType: 'O+',
    contactNumber: '+91 9876543210',
    address: '123 Health Street, Medical District, City - 500001',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+91 9876543211',
      relationship: 'Spouse'
    },
    digitalSignature: 'signature-placeholder',
    medicalHistory: {
      allergies: ['Penicillin'],
      conditions: ['Hypertension'],
      medications: ['Amlodipine']
    }
  });

  const [scanHistory] = useState([
    { date: '2025-01-15', location: 'City Hospital', accessLevel: 'Emergency' },
    { date: '2025-01-10', location: 'Metro Clinic', accessLevel: 'Basic' }
  ]);

  function generateSwasthyaId() {
    const prefix = 'SW';
    const randomNum = Math.floor(Math.random() * 10000000000).toString().padStart(8, '0');
    return `${prefix}${randomNum}`;
  }

  function generateQRData() {
    const baseData = {
      id: cardData.id,
      name: cardData.name,
      bloodType: cardData.bloodType,
    };

    switch (accessLevel) {
      case 'emergency':
        return JSON.stringify({
          ...baseData,
          emergencyContact: cardData.emergencyContact,
          allergies: cardData.medicalHistory.allergies,
          conditions: cardData.medicalHistory.conditions,
          medications: cardData.medicalHistory.medications
        });
      case 'basic':
        return JSON.stringify(baseData);
      case 'full':
        return JSON.stringify(cardData);
      default:
        return JSON.stringify(baseData);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Swasthya Digital Health Card</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="space-y-4">
                {/* Photo and Basic Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={cardData.photo}
                      alt="Profile"
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{cardData.name}</h3>
                    <p className="text-sm text-gray-500">ID: {cardData.id}</p>
                    <p className="text-sm">Blood Type: {cardData.bloodType}</p>
                  </div>
                </div>

                {/* Contact and Address */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Contact Number</Label>
                    <Input value={cardData.contactNumber} readOnly />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input value={cardData.dateOfBirth} readOnly />
                  </div>
                </div>

                <div>
                  <Label>Permanent Address</Label>
                  <Input value={cardData.address} readOnly />
                </div>

                {/* Emergency Contact */}
                <div>
                  <Label>Emergency Contact</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={cardData.emergencyContact.name} readOnly />
                    <Input value={cardData.emergencyContact.phone} readOnly />
                  </div>
                </div>

                {/* Digital Signature */}
                <div>
                  <Label>Digital Signature</Label>
                  <div className="border rounded p-2 mt-1">
                    <img
                      src={cardData.digitalSignature}
                      alt="Digital Signature"
                      className="h-12"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <QRCodeSVG
                  value={generateQRData()}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <div>
                <Label>Access Level</Label>
                <Select value={accessLevel} onValueChange={setAccessLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Info Only</SelectItem>
                    <SelectItem value="emergency">Emergency Info</SelectItem>
                    <SelectItem value="full">Full Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Security and History */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                <span>Encryption Status</span>
              </div>
              <span className="text-green-600">Active (256-bit)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <QrCode className="w-4 h-4 mr-2" />
                <span>Access Control</span>
              </div>
              <span>Permission-based</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scan History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {scanHistory.map((scan, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">{scan.location}</p>
                    <p className="text-sm text-gray-500">{scan.date}</p>
                  </div>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {scan.accessLevel}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
