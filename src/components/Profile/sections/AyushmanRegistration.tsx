import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

interface AyushmanRegistrationProps {
  onSubmit: (data: RegistrationData) => Promise<void>;
}

interface RegistrationData {
  name: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  mobileNumber: string;
  emailId: string;
  familyMembers: number;
  annualIncome: number;
}

export function AyushmanRegistration({ onSubmit }: AyushmanRegistrationProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    mobileNumber: '',
    emailId: '',
    familyMembers: 0,
    annualIncome: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Input
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobileNumber">Mobile Number</Label>
        <Input
          id="mobileNumber"
          name="mobileNumber"
          type="tel"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="emailId">Email ID</Label>
        <Input
          id="emailId"
          name="emailId"
          type="email"
          value={formData.emailId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="familyMembers">Number of Family Members</Label>
        <Input
          id="familyMembers"
          name="familyMembers"
          type="number"
          value={formData.familyMembers}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="annualIncome">Annual Income</Label>
        <Input
          id="annualIncome"
          name="annualIncome"
          type="number"
          value={formData.annualIncome}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Registration
      </Button>
    </form>
  );
}
