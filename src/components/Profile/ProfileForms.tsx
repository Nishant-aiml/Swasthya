import React from 'react';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Button } from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

interface FormProps {
  userData: any;
  setUserData: (data: any) => void;
}

export function BasicInformationForm({ userData, setUserData }: FormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={userData.dateOfBirth}
            onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={userData.gender}
            onValueChange={(value) => setUserData({ ...userData, gender: value })}
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
        </div>
        <div>
          <Label htmlFor="bloodType">Blood Type</Label>
          <Select
            value={userData.bloodType}
            onValueChange={(value) => setUserData({ ...userData, bloodType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={userData.address}
          onChange={(e) => setUserData({ ...userData, address: e.target.value })}
        />
      </div>
    </div>
  );
}

export function MedicalHistoryForm({ userData, setUserData }: FormProps) {
  const addSurgery = () => {
    setUserData({
      ...userData,
      previousSurgeries: [
        ...userData.previousSurgeries,
        { procedure: '', date: '', hospital: '' }
      ]
    });
  };

  const removeSurgery = (index: number) => {
    const surgeries = [...userData.previousSurgeries];
    surgeries.splice(index, 1);
    setUserData({ ...userData, previousSurgeries: surgeries });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Allergies</Label>
        <Textarea
          placeholder="List any allergies..."
          value={userData.allergies.join('\n')}
          onChange={(e) => setUserData({
            ...userData,
            allergies: e.target.value.split('\n').filter(Boolean)
          })}
        />
      </div>

      <div>
        <Label>Current Medications</Label>
        <Textarea
          placeholder="List current medications..."
          value={userData.currentMedications.join('\n')}
          onChange={(e) => setUserData({
            ...userData,
            currentMedications: e.target.value.split('\n').filter(Boolean)
          })}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Previous Surgeries</Label>
          <Button variant="outline" size="sm" onClick={addSurgery}>
            <Plus className="w-4 h-4 mr-2" />
            Add Surgery
          </Button>
        </div>
        {userData.previousSurgeries.map((surgery: any, index: number) => (
          <div key={index} className="grid grid-cols-3 gap-2 mb-2">
            <Input
              placeholder="Procedure"
              value={surgery.procedure}
              onChange={(e) => {
                const surgeries = [...userData.previousSurgeries];
                surgeries[index].procedure = e.target.value;
                setUserData({ ...userData, previousSurgeries: surgeries });
              }}
            />
            <Input
              type="date"
              value={surgery.date}
              onChange={(e) => {
                const surgeries = [...userData.previousSurgeries];
                surgeries[index].date = e.target.value;
                setUserData({ ...userData, previousSurgeries: surgeries });
              }}
            />
            <div className="flex gap-2">
              <Input
                placeholder="Hospital"
                value={surgery.hospital}
                onChange={(e) => {
                  const surgeries = [...userData.previousSurgeries];
                  surgeries[index].hospital = e.target.value;
                  setUserData({ ...userData, previousSurgeries: surgeries });
                }}
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeSurgery(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LifestyleForm({ userData, setUserData }: FormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="smoking">Smoking Status</Label>
        <Select
          value={userData.smoking}
          onValueChange={(value) => setUserData({ ...userData, smoking: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select smoking status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never Smoked</SelectItem>
            <SelectItem value="former">Former Smoker</SelectItem>
            <SelectItem value="current">Current Smoker</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="exercise">Exercise Level</Label>
        <Select
          value={userData.exercise}
          onValueChange={(value) => setUserData({ ...userData, exercise: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select exercise level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentary">Sedentary</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="active">Active</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="diet">Dietary Preferences</Label>
        <Textarea
          id="diet"
          placeholder="Describe your dietary preferences and restrictions..."
          value={userData.diet}
          onChange={(e) => setUserData({ ...userData, diet: e.target.value })}
        />
      </div>
    </div>
  );
}

export function EmergencyContactsForm({ userData, setUserData }: FormProps) {
  const addContact = () => {
    setUserData({
      ...userData,
      emergencyContacts: [
        ...userData.emergencyContacts,
        { name: '', relationship: '', phone: '' }
      ]
    });
  };

  const removeContact = (index: number) => {
    const contacts = [...userData.emergencyContacts];
    contacts.splice(index, 1);
    setUserData({ ...userData, emergencyContacts: contacts });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Label>Emergency Contacts</Label>
        <Button variant="outline" size="sm" onClick={addContact}>
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {userData.emergencyContacts.map((contact: any, index: number) => (
        <div key={index} className="grid grid-cols-3 gap-2 mb-2">
          <Input
            placeholder="Name"
            value={contact.name}
            onChange={(e) => {
              const contacts = [...userData.emergencyContacts];
              contacts[index].name = e.target.value;
              setUserData({ ...userData, emergencyContacts: contacts });
            }}
          />
          <Input
            placeholder="Relationship"
            value={contact.relationship}
            onChange={(e) => {
              const contacts = [...userData.emergencyContacts];
              contacts[index].relationship = e.target.value;
              setUserData({ ...userData, emergencyContacts: contacts });
            }}
          />
          <div className="flex gap-2">
            <Input
              placeholder="Phone"
              value={contact.phone}
              onChange={(e) => {
                const contacts = [...userData.emergencyContacts];
                contacts[index].phone = e.target.value;
                setUserData({ ...userData, emergencyContacts: contacts });
              }}
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeContact(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
