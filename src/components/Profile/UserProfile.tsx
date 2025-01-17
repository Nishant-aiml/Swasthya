import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

interface UserData {
  // Basic Information
  name: string;
  age: number;
  gender: string;
  dateOfBirth: string;
  bloodType: string;
  maritalStatus: string;
  occupation: string;

  // Contact Information
  phone: string;
  email: string;
  address: string;

  // Medical Information
  allergies: string[];
  currentMedications: string[];
  chronicConditions: string[];
  previousSurgeries: {
    procedure: string;
    date: string;
    hospital: string;
  }[];
  familyHistory: {
    condition: string;
    relation: string;
  }[];
  
  // Lifestyle Information
  smoking: 'never' | 'former' | 'current';
  alcohol: 'never' | 'occasional' | 'regular';
  exercise: 'sedentary' | 'moderate' | 'active';
  diet: string;

  // Vaccination Records
  vaccinations: {
    name: string;
    date: string;
    nextDue: string;
  }[];

  // Emergency Contacts
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
  }[];

  // Insurance Information
  insurance: {
    provider: string;
    policyNumber: string;
    validUntil: string;
    coverageType: string;
  };
}

const initialUserData: UserData = {
  name: '',
  age: 0,
  gender: '',
  dateOfBirth: '',
  bloodType: '',
  maritalStatus: '',
  occupation: '',
  phone: '',
  email: '',
  address: '',
  allergies: [],
  currentMedications: [],
  chronicConditions: [],
  previousSurgeries: [],
  familyHistory: [],
  smoking: 'never',
  alcohol: 'never',
  exercise: 'sedentary',
  diet: '',
  vaccinations: [],
  emergencyContacts: [],
  insurance: {
    provider: '',
    policyNumber: '',
    validUntil: '',
    coverageType: ''
  }
};

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('basic');
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (field: keyof UserData, value: string | number) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    setSaved(false);
  };

  const handleArrayChange = (field: keyof UserData, value: string[]) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    setSaved(false);
  };

  const handleObjectChange = (field: keyof UserData, value: any) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setSaved(true);
  };

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'basic':
        return 'Basic Information';
      case 'medical':
        return 'Medical History';
      case 'lifestyle':
        return 'Lifestyle';
      case 'emergency':
        return 'Emergency Contacts';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <Button
          variant={activeTab === 'basic' ? 'default' : 'outline'}
          onClick={() => setActiveTab('basic')}
        >
          Basic Information
        </Button>
        <Button
          variant={activeTab === 'medical' ? 'default' : 'outline'}
          onClick={() => setActiveTab('medical')}
        >
          Medical History
        </Button>
        <Button
          variant={activeTab === 'lifestyle' ? 'default' : 'outline'}
          onClick={() => setActiveTab('lifestyle')}
        >
          Lifestyle
        </Button>
        <Button
          variant={activeTab === 'emergency' ? 'default' : 'outline'}
          onClick={() => setActiveTab('emergency')}
        >
          Emergency Contacts
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{getTabTitle(activeTab)}</CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={userData.age}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('age', parseInt(e.target.value))}
                  placeholder="25"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={userData.gender} onValueChange={(value: string) => handleChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={userData.dateOfBirth}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('dateOfBirth', e.target.value)}
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select value={userData.bloodType} onValueChange={(value: string) => handleChange('bloodType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select value={userData.maritalStatus} onValueChange={(value: string) => handleChange('maritalStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={userData.occupation}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('occupation', e.target.value)}
                  placeholder="Occupation"
                />
              </div>
            </div>
          )}
          {activeTab === 'medical' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={userData.allergies.join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleArrayChange('allergies', e.target.value.split(', '))}
                  placeholder="List any allergies..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Textarea
                  id="currentMedications"
                  value={userData.currentMedications.join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleArrayChange('currentMedications', e.target.value.split(', '))}
                  placeholder="List current medications..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                <Textarea
                  id="chronicConditions"
                  value={userData.chronicConditions.join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleArrayChange('chronicConditions', e.target.value.split(', '))}
                  placeholder="List any chronic conditions..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="previousSurgeries">Previous Surgeries</Label>
                <Textarea
                  id="previousSurgeries"
                  value={userData.previousSurgeries.map(surgery => `${surgery.procedure} at ${surgery.hospital} on ${surgery.date}`).join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleObjectChange('previousSurgeries', e.target.value.split(', ').map(surgery => {
                    const [procedure, hospital, date] = surgery.split(' at ');
                    return { procedure, hospital, date };
                  }))}
                  placeholder="List any previous surgeries..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="familyHistory">Family History</Label>
                <Textarea
                  id="familyHistory"
                  value={userData.familyHistory.map(history => `${history.condition} in ${history.relation}`).join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleObjectChange('familyHistory', e.target.value.split(', ').map(history => {
                    const [condition, relation] = history.split(' in ');
                    return { condition, relation };
                  }))}
                  placeholder="List any family history..."
                />
              </div>
            </div>
          )}
          {activeTab === 'lifestyle' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smoking">Smoking Habits</Label>
                <Select value={userData.smoking} onValueChange={(value: string) => handleChange('smoking', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select smoking habits" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="former">Former</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alcohol">Alcohol Consumption</Label>
                <Select value={userData.alcohol} onValueChange={(value: string) => handleChange('alcohol', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select alcohol consumption" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="occasional">Occasional</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="exercise">Exercise Habits</Label>
                <Select value={userData.exercise} onValueChange={(value: string) => handleChange('exercise', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exercise habits" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diet">Diet</Label>
                <Input
                  id="diet"
                  value={userData.diet}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('diet', e.target.value)}
                  placeholder="Diet"
                />
              </div>
            </div>
          )}
          {activeTab === 'emergency' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContacts">Emergency Contacts</Label>
                <Textarea
                  id="emergencyContacts"
                  value={userData.emergencyContacts.map(contact => `${contact.name} (${contact.relationship}) - ${contact.phone}`).join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleObjectChange('emergencyContacts', e.target.value.split(', ').map(contact => {
                    const [name, relationship, phone] = contact.split(' (').join('').split(') - ');
                    return { name, relationship, phone };
                  }))}
                  placeholder="List any emergency contacts..."
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button onClick={handleSave} className="w-32">
          Save Profile
        </Button>
      </div>

      {saved && (
        <div className="text-green-600 text-center">
          Profile saved successfully!
        </div>
      )}
    </div>
  );
}
