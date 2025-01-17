import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { Button } from '../../ui/Button';
import { Textarea } from '../../ui/Textarea';

export function PersonalInformation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Basic Details</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input type="date" placeholder="Date of Birth" />
            <Input placeholder="Blood Type" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Medical History</Label>
          <Textarea placeholder="Brief medical history" />
        </div>

        <div className="space-y-2">
          <Label>Emergency Contacts</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Contact Name" />
            <Input placeholder="Phone Number" />
            <Input placeholder="Relationship" />
            <Input placeholder="Alternate Number" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Insurance Information</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Insurance Provider" />
            <Input placeholder="Policy Number" />
            <Input placeholder="Coverage Type" />
            <Input type="date" placeholder="Valid Until" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Ayushman Card Details</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Ayushman Card Number" />
            <Input placeholder="Beneficiary ID" />
            <Input type="date" placeholder="Issue Date" />
            <Input type="date" placeholder="Expiry Date" />
          </div>
        </div>

        <Button className="w-full">Save Personal Information</Button>
      </CardContent>
    </Card>
  );
}
