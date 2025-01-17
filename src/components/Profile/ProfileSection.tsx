import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent } from '../ui';
import { Plus, LogOut, Edit, Trash } from 'lucide-react';
import HealthCard from './HealthCard';

interface FamilyMember {
  id: string;
  name: string;
  age: number;
  gender: string;
  relation: string;
  healthInfo: {
    bloodType: string;
    allergies: string[];
    medications: string[];
    conditions: string[];
    emergencyContact: {
      name: string;
      phone: string;
      relation: string;
    };
  };
}

interface ProfileSectionProps {
  user: {
    name: string;
    email: string;
    age: number;
    gender: string;
    healthInfo: {
      bloodType: string;
      allergies: string[];
      medications: string[];
      conditions: string[];
      emergencyContact: {
        name: string;
        phone: string;
        relation: string;
      };
    };
  };
  onLogout: () => void;
}

export default function ProfileSection({ user, onLogout }: ProfileSectionProps) {
  const navigate = useNavigate();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [showAddMember, setShowAddMember] = useState(false);

  const handleLogout = () => {
    // Clear any stored tokens or user data
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    
    // Call the onLogout callback
    onLogout();
    
    // Redirect to login page
    navigate('/login');
  };

  const handleAddFamilyMember = () => {
    setShowAddMember(true);
  };

  const handleRemoveFamilyMember = (id: string) => {
    setFamilyMembers(members => members.filter(member => member.id !== id));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Health Card</h2>
          <HealthCard
            name={user.name}
            age={user.age}
            gender={user.gender}
            healthInfo={user.healthInfo}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Family Members</h2>
            <Button onClick={handleAddFamilyMember} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Member
            </Button>
          </div>

          <div className="space-y-4">
            {familyMembers.map((member) => (
              <Card key={member.id} className="relative">
                <CardContent className="p-4">
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {/* Handle edit */}}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                      onClick={() => handleRemoveFamilyMember(member.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <HealthCard
                    name={member.name}
                    age={member.age}
                    gender={member.gender}
                    healthInfo={member.healthInfo}
                  />
                </CardContent>
              </Card>
            ))}

            {familyMembers.length === 0 && !showAddMember && (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No family members added yet.</p>
                <Button
                  variant="link"
                  onClick={handleAddFamilyMember}
                  className="mt-2"
                >
                  Add a family member
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Family Member Modal would go here */}
    </div>
  );
}
