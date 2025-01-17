import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';
import { Label } from '../../ui/Label';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Eye, History, Share2 } from 'lucide-react';

export function QRCodeSection() {
  const [accessLevel, setAccessLevel] = useState('emergency');
  const [qrData] = useState({
    id: 'SW123456789',
    name: 'John Doe',
    bloodType: 'O+',
    emergency: {
      contact: '+91 9876543210',
      allergies: ['Penicillin'],
      conditions: ['Diabetes']
    }
  });

  const generateQRData = () => {
    switch (accessLevel) {
      case 'emergency':
        return JSON.stringify({
          id: qrData.id,
          name: qrData.name,
          bloodType: qrData.bloodType,
          emergency: qrData.emergency
        });
      case 'basic':
        return JSON.stringify({
          id: qrData.id,
          name: qrData.name,
          bloodType: qrData.bloodType
        });
      case 'full':
        return JSON.stringify(qrData);
      default:
        return JSON.stringify({ error: 'Invalid access level' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-lg shadow">
            <QRCodeSVG
              value={generateQRData()}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Access Level</Label>
            <Select value={accessLevel} onValueChange={setAccessLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="emergency">Emergency Only</SelectItem>
                <SelectItem value="basic">Basic Information</SelectItem>
                <SelectItem value="full">Full Access</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="font-medium">Security Level</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">256-bit Encryption</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Scan Count</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">15 times this month</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Recent Scans</Label>
            <div className="space-y-2">
              {[
                { date: '2025-01-15 14:30', location: 'City Hospital' },
                { date: '2025-01-10 09:15', location: 'Metro Clinic' }
              ].map((scan, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">{scan.location}</span>
                  <span className="text-sm text-gray-500">{scan.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="flex items-center justify-center">
              <History className="w-4 h-4 mr-2" />
              View History
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share QR
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
