import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { MapPin, Phone, AlertTriangle, HeartPulse, Stethoscope, Car } from 'lucide-react';

interface EmergencyContact {
  name: string;
  number: string;
  address?: string;
  type: 'hospital' | 'ambulance' | 'police' | 'fire';
}

export default function EmergencyServices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const emergencyContacts: EmergencyContact[] = [
    {
      name: 'City General Hospital',
      number: '108',
      address: '123 Healthcare Street, Medical District',
      type: 'hospital'
    },
    {
      name: 'Emergency Ambulance Service',
      number: '102',
      type: 'ambulance'
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

  const filteredContacts = emergencyContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.number.includes(searchQuery);
    const matchesType = selectedType === 'all' || contact.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'hospital':
        return <HeartPulse className="h-5 w-5" />;
      case 'ambulance':
        return <Car className="h-5 w-5" />;
      case 'police':
        return <AlertTriangle className="h-5 w-5" />;
      case 'fire':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Stethoscope className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Emergency Services</h2>
        <p className="text-gray-600">Quick access to emergency contacts and services</p>
      </div>

      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Search emergency services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />

        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="hospital">Hospitals</TabsTrigger>
            <TabsTrigger value="ambulance">Ambulance</TabsTrigger>
            <TabsTrigger value="police">Police</TabsTrigger>
            <TabsTrigger value="fire">Fire</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getIcon(contact.type)}
                <div>
                  <h3 className="font-semibold">{contact.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{contact.number}</span>
                  </div>
                  {contact.address && (
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{contact.address}</span>
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = `tel:${contact.number}`}
              >
                Call
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
