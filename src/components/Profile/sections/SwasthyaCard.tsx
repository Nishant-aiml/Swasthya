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
import { Switch } from '@/components/ui/Switch';
import { QrCode, Share2, Download, Camera, Fingerprint } from 'lucide-react';

export default function SwasthyaCard() {
  const [cardId] = useState('SW' + Math.random().toString().slice(2, 12));
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Digital Card Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Swasthya Card</CardTitle>
          <CardDescription>
            Your digital health identity card
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold mb-4">Swasthya Card</h3>
                <div className="space-y-2">
                  <p className="text-sm opacity-90">Card ID: {cardId}</p>
                  <p className="text-sm opacity-90">Valid Till: 01/2026</p>
                </div>
              </div>
              <div className="w-24 h-24 bg-white rounded-lg overflow-hidden">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6">
              <QrCode className="w-16 h-16" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Information */}
      <Card>
        <CardHeader>
          <CardTitle>Card Information</CardTitle>
          <CardDescription>
            Update your card details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Blood Type</Label>
                <Input placeholder="Enter blood type" />
              </div>
              <div className="space-y-2">
                <Label>Contact Number</Label>
                <Input type="tel" placeholder="Enter contact number" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Permanent Address</Label>
              <Input placeholder="Enter your address" />
            </div>

            <div className="space-y-2">
              <Label>Emergency Contact</Label>
              <Input placeholder="Name and contact number" />
            </div>

            <div className="space-y-2">
              <Label>Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Digital Signature */}
      <Card>
        <CardHeader>
          <CardTitle>Digital Signature</CardTitle>
          <CardDescription>
            Add your digital signature for verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">Biometric Signature</h4>
                  <p className="text-sm text-muted-foreground">
                    Use fingerprint for authentication
                  </p>
                </div>
                <Fingerprint className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
            <Button className="w-full">
              Add Digital Signature
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sharing Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Sharing Settings</CardTitle>
          <CardDescription>
            Control how your card can be shared
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: 'QR Code Sharing',
                description: 'Allow sharing via QR code',
              },
              {
                title: 'Digital Copy',
                description: 'Allow downloading digital copy',
              },
              {
                title: 'Emergency Access',
                description: 'Allow emergency access to card details',
              },
            ].map((setting, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-0.5">
                  <h4 className="font-medium">{setting.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
                <Switch />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="w-full">
          <QrCode className="w-4 h-4 mr-2" />
          View QR Code
        </Button>
        <Button variant="outline" className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Download Card
        </Button>
        <Button variant="outline" className="w-full">
          <Share2 className="w-4 h-4 mr-2" />
          Share Card
        </Button>
      </div>
    </div>
  );
}
