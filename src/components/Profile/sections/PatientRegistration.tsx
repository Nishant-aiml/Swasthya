import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { Button } from '../../ui/Button';
import { Textarea } from '../../ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';
import { Plus, Trash2 } from 'lucide-react';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

interface Surgery {
  procedure: string;
  date: string;
  hospital: string;
}

interface Vaccination {
  name: string;
  date: string;
  nextDue: string;
}

export function PatientRegistration() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '' }]);
  };

  const addSurgery = () => {
    setSurgeries([...surgeries, { procedure: '', date: '', hospital: '' }]);
  };

  const addVaccination = () => {
    setVaccinations([...vaccinations, { name: '', date: '', nextDue: '' }]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Registration Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Medical History */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Medical History</Label>
          <Textarea
            placeholder="Please provide your comprehensive medical history..."
            className="min-h-[100px]"
          />
        </div>

        {/* Current Medications */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold">Current Medications</Label>
            <Button variant="outline" size="sm" onClick={addMedication}>
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </div>
          {medications.map((med, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <Input placeholder="Medication Name" />
              <Input placeholder="Dosage" />
              <div className="flex gap-2">
                <Input placeholder="Frequency" />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    const newMeds = [...medications];
                    newMeds.splice(index, 1);
                    setMedications(newMeds);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Allergies and Conditions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Allergies</Label>
            <Textarea placeholder="List any allergies..." />
          </div>
          <div className="space-y-2">
            <Label>Medical Conditions</Label>
            <Textarea placeholder="List any chronic conditions..." />
          </div>
        </div>

        {/* Family Medical History */}
        <div className="space-y-2">
          <Label>Family Medical History</Label>
          <Textarea
            placeholder="Please provide relevant family medical history..."
            className="min-h-[100px]"
          />
        </div>

        {/* Lifestyle Information */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Lifestyle Information</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Smoking Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never Smoked</SelectItem>
                  <SelectItem value="former">Former Smoker</SelectItem>
                  <SelectItem value="current">Current Smoker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Exercise Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Previous Surgeries */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold">Previous Surgeries/Procedures</Label>
            <Button variant="outline" size="sm" onClick={addSurgery}>
              <Plus className="w-4 h-4 mr-2" />
              Add Surgery
            </Button>
          </div>
          {surgeries.map((surgery, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <Input placeholder="Procedure Name" />
              <Input type="date" />
              <div className="flex gap-2">
                <Input placeholder="Hospital" />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    const newSurgeries = [...surgeries];
                    newSurgeries.splice(index, 1);
                    setSurgeries(newSurgeries);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Vaccination Records */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold">Vaccination Records</Label>
            <Button variant="outline" size="sm" onClick={addVaccination}>
              <Plus className="w-4 h-4 mr-2" />
              Add Vaccination
            </Button>
          </div>
          {vaccinations.map((vac, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <Input placeholder="Vaccine Name" />
              <Input type="date" placeholder="Date Received" />
              <div className="flex gap-2">
                <Input type="date" placeholder="Next Due Date" />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    const newVaccinations = [...vaccinations];
                    newVaccinations.splice(index, 1);
                    setVaccinations(newVaccinations);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Emergency Contacts</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Contact Name" />
            <Input placeholder="Relationship" />
            <Input placeholder="Phone Number" />
            <Input placeholder="Alternative Phone" />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Submit Registration</Button>
        </div>
      </CardContent>
    </Card>
  );
}
