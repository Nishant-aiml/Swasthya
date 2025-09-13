import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { toast } from '@/components/ui/ToastNotification';
import { dummyPersonalInfo } from '@/data/profile-data';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  emergencyContact: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  allergies: string;
  chronicConditions: string;
}

export default function PersonalInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: dummyPersonalInfo.name,
    email: dummyPersonalInfo.email,
    phone: dummyPersonalInfo.phone,
    dateOfBirth: dummyPersonalInfo.dateOfBirth,
    gender: dummyPersonalInfo.gender,
    bloodGroup: dummyPersonalInfo.bloodGroup,
    emergencyContact: dummyPersonalInfo.emergencyContact,
    address: dummyPersonalInfo.address,
    city: dummyPersonalInfo.city,
    state: dummyPersonalInfo.state,
    pincode: dummyPersonalInfo.pincode,
    allergies: dummyPersonalInfo.allergies.join(', '),
    chronicConditions: dummyPersonalInfo.chronicConditions.join(', '),
  });

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validate required fields
    const requiredFields: (keyof PersonalInfo)[] = ['name', 'email', 'phone', 'emergencyContact'];
    const missingFields = requiredFields.filter(field => !personalInfo[field]);

    if (missingFields.length > 0) {
      toast({
        title: 'Required Fields Missing',
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: 'destructive',
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(personalInfo.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(personalInfo.phone)) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit phone number',
        variant: 'destructive',
      });
      return;
    }

    // In a real app, this would make an API call to save the data
    toast({
      title: 'Profile Updated',
      description: 'Your personal information has been saved successfully.',
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPersonalInfo({
      name: dummyPersonalInfo.name,
      email: dummyPersonalInfo.email,
      phone: dummyPersonalInfo.phone,
      dateOfBirth: dummyPersonalInfo.dateOfBirth,
      gender: dummyPersonalInfo.gender,
      bloodGroup: dummyPersonalInfo.bloodGroup,
      emergencyContact: dummyPersonalInfo.emergencyContact,
      address: dummyPersonalInfo.address,
      city: dummyPersonalInfo.city,
      state: dummyPersonalInfo.state,
      pincode: dummyPersonalInfo.pincode,
      allergies: dummyPersonalInfo.allergies.join(', '),
      chronicConditions: dummyPersonalInfo.chronicConditions.join(', '),
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={personalInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={personalInfo.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            {isEditing ? (
              <Select
                value={personalInfo.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input value={personalInfo.gender} readOnly />
            )}
          </div>

          <div>
            <Label htmlFor="bloodGroup">Blood Group</Label>
            {isEditing ? (
              <Select
                value={personalInfo.bloodGroup}
                onValueChange={(value) => handleInputChange('bloodGroup', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input value={personalInfo.bloodGroup} readOnly />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              value={personalInfo.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={personalInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={personalInfo.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={personalInfo.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="pincode">PIN Code</Label>
            <Input
              id="pincode"
              value={personalInfo.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea
              id="allergies"
              value={personalInfo.allergies}
              onChange={(e) => handleInputChange('allergies', e.target.value)}
              readOnly={!isEditing}
              placeholder={isEditing ? "Enter allergies separated by commas" : undefined}
            />
          </div>

          <div>
            <Label htmlFor="chronicConditions">Chronic Conditions</Label>
            <Textarea
              id="chronicConditions"
              value={personalInfo.chronicConditions}
              onChange={(e) => handleInputChange('chronicConditions', e.target.value)}
              readOnly={!isEditing}
              placeholder={isEditing ? "Enter conditions separated by commas" : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
