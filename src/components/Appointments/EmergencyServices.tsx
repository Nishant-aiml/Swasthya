import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Phone, Ambulance, MapPin, Heart, AlertTriangle } from 'lucide-react';

export default function EmergencyServices() {
  return (
    <Card className="bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          Emergency Services
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Emergency Contact */}
        <div>
          <Button
            variant="destructive"
            className="w-full gap-2 text-lg font-bold"
            size="lg"
          >
            <Phone className="h-5 w-5" />
            Call 102
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <Ambulance className="h-4 w-4" />
                Ambulance
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book Ambulance</DialogTitle>
                <DialogDescription>
                  Enter your location details for immediate assistance
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Your Location</label>
                  <div className="flex gap-2 mt-1">
                    <Input placeholder="Enter your address" />
                    <Button variant="outline" className="shrink-0">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Emergency Type</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Button variant="outline" className="justify-start gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      Cardiac
                    </Button>
                    <Button variant="outline" className="justify-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      Accident
                    </Button>
                  </div>
                </div>
                <Button className="w-full">Request Ambulance</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <Ambulance className="h-4 w-4" />
                First Aid
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Emergency First Aid Guide</DialogTitle>
                <DialogDescription>
                  Quick reference for common emergencies
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {emergencyGuides.map((guide) => (
                    <div key={guide.title} className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        {guide.icon}
                        {guide.title}
                      </h3>
                      <div className="pl-6 space-y-2">
                        {guide.steps.map((step, index) => (
                          <p key={index} className="text-sm">
                            {index + 1}. {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        {/* Nearby Hospitals */}
        <div>
          <h3 className="text-sm font-medium mb-2">Nearest Emergency Rooms</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {nearbyHospitals.map((hospital) => (
                <Card key={hospital.id}>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{hospital.name}</h4>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {hospital.distance} km away
                        </p>
                      </div>
                      <Badge
                        variant={hospital.bedsAvailable > 0 ? 'success' : 'destructive'}
                      >
                        {hospital.bedsAvailable} beds
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}

const emergencyGuides = [
  {
    title: 'Cardiac Emergency',
    icon: <Heart className="h-4 w-4 text-red-500" />,
    steps: [
      'Call emergency services immediately (102)',
      'Make the person sit or lie down',
      'Loosen any tight clothing',
      'Check if the person is breathing',
      'Be prepared to perform CPR if needed',
    ],
  },
  {
    title: 'Bleeding',
    icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
    steps: [
      'Apply direct pressure to the wound',
      'Elevate the injured area if possible',
      'Use a clean cloth or sterile bandage',
      'Do not remove the cloth if it becomes soaked',
      'Seek immediate medical attention',
    ],
  },
  {
    title: 'Burns',
    icon: <AlertTriangle className="h-4 w-4 text-orange-500" />,
    steps: [
      'Cool the burn under running water',
      'Do not apply ice directly',
      'Cover with a clean, dry cloth',
      'Do not apply creams or butter',
      'Seek medical attention for serious burns',
    ],
  },
];

const nearbyHospitals = [
  {
    id: '1',
    name: 'City Emergency Hospital',
    distance: 1.2,
    bedsAvailable: 5,
  },
  {
    id: '2',
    name: 'General Hospital',
    distance: 2.5,
    bedsAvailable: 0,
  },
  {
    id: '3',
    name: 'Medical Center',
    distance: 3.1,
    bedsAvailable: 8,
  },
];
