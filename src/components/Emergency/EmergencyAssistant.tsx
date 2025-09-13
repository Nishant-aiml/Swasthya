import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { MapPin, Phone, AlertTriangle, Car, HeartPulse } from 'lucide-react';

interface EmergencyService {
  name: string;
  number: string;
  type: 'ambulance' | 'hospital' | 'police' | 'fire';
}

export default function EmergencyAssistant() {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const emergencyServices: EmergencyService[] = [
    {
      name: 'Emergency Ambulance',
      number: '102',
      type: 'ambulance'
    },
    {
      name: 'Hospital Emergency',
      number: '108',
      type: 'hospital'
    },
    {
      name: 'Police Emergency',
      number: '100',
      type: 'police'
    },
    {
      name: 'Fire Emergency',
      number: '101',
      type: 'fire'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'ambulance':
        return <Car className="h-5 w-5" />;
      case 'hospital':
        return <HeartPulse className="h-5 w-5" />;
      case 'police':
      case 'fire':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Phone className="h-5 w-5" />;
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Emergency Assistance</h2>
        <p className="text-gray-600">Quick access to emergency services</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Your Location</h3>
          <div className="flex gap-2">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location or use GPS"
              className="flex-1"
            />
            <Button variant="outline" onClick={handleGetLocation}>
              <MapPin className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Emergency Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe the emergency situation..."
              rows={4}
            />
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Emergency Contacts</h3>
          <div className="grid gap-3">
            {emergencyServices.map((service) => (
              <Card key={service.name} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getIcon(service.type)}
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-gray-600">{service.number}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = `tel:${service.number}`}
                  >
                    Call
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
