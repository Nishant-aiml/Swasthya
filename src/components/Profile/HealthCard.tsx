import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, Badge } from '../ui';
import { Phone, Heart, Activity, AlertTriangle, User, Droplet } from 'lucide-react';

interface HealthInfo {
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

interface HealthCardProps {
  name: string;
  age: number;
  gender: string;
  healthInfo: HealthInfo;
  isEmergencyView?: boolean;
}

export default function HealthCard({ name, age, gender, healthInfo, isEmergencyView = false }: HealthCardProps) {
  return (
    <Card className={`w-full max-w-md ${isEmergencyView ? 'border-red-500 border-2' : ''}`}>
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-sm opacity-90">Age: {age} | Gender: {gender}</p>
          </div>
          {isEmergencyView && (
            <Badge variant="destructive" className="uppercase">
              Emergency Card
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-red-500" />
          <span className="font-medium">Blood Type:</span>
          <span>{healthInfo.bloodType}</span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span className="font-medium">Allergies:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {healthInfo.allergies.map((allergy, index) => (
              <Badge key={index} variant="outline" className="bg-amber-50">
                {allergy}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Medical Conditions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {healthInfo.conditions.map((condition, index) => (
              <Badge key={index} variant="outline" className="bg-blue-50">
                {condition}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-medium">Current Medications:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {healthInfo.medications.map((medication, index) => (
              <Badge key={index} variant="outline" className="bg-red-50">
                {medication}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-5 h-5 text-green-500" />
            <span className="font-medium">Emergency Contact:</span>
          </div>
          <div className="space-y-1">
            <p className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {healthInfo.emergencyContact.name} ({healthInfo.emergencyContact.relation})
            </p>
            <p className="text-green-600 font-medium">
              {healthInfo.emergencyContact.phone}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 text-sm text-gray-500 p-4 rounded-b-lg">
        {isEmergencyView ? (
          <p>In case of emergency, please contact the emergency number provided above.</p>
        ) : (
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        )}
      </CardFooter>
    </Card>
  );
}
