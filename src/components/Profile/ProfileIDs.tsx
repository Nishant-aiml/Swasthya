import React from 'react';
import { User, Phone, Mail, MapPin, Heart, AlertCircle, Activity, Thermometer } from 'lucide-react';

interface HealthInfo {
  bloodType: string;
  age: number;
  height: string;
  weight: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  lastCheckup: string;
  emergencyContact: string;
  insuranceProvider: string;
  policyNumber: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  health: HealthInfo;
  contact: ContactInfo;
}

const ProfileIDs: React.FC = () => {
  const userProfile: FamilyMember = {
    id: "USER001",
    name: "John Doe",
    relation: "Self",
    health: {
      bloodType: "O+",
      age: 35,
      height: "5'10\"",
      weight: "75kg",
      allergies: ["Penicillin", "Peanuts"],
      conditions: ["Asthma"],
      medications: ["Albuterol Inhaler"],
      lastCheckup: "2023-11-15",
      emergencyContact: "+1 (555) 123-4567",
      insuranceProvider: "HealthCare Plus",
      policyNumber: "HC123456789"
    },
    contact: {
      phone: "+1 (555) 987-6543",
      email: "john.doe@email.com",
      address: "123 Health Street, Medical City, MC 12345"
    }
  };

  const familyMembers: FamilyMember[] = [
    {
      id: "FAM001",
      name: "Sarah Doe",
      relation: "Spouse",
      health: {
        bloodType: "A+",
        age: 32,
        height: "5'6\"",
        weight: "62kg",
        allergies: ["None"],
        conditions: ["None"],
        medications: ["Vitamin D"],
        lastCheckup: "2023-12-01",
        emergencyContact: "+1 (555) 123-4567",
        insuranceProvider: "HealthCare Plus",
        policyNumber: "HC987654321"
      },
      contact: {
        phone: "+1 (555) 987-6544",
        email: "sarah.doe@email.com",
        address: "123 Health Street, Medical City, MC 12345"
      }
    },
    {
      id: "FAM002",
      name: "Emma Doe",
      relation: "Daughter",
      health: {
        bloodType: "O+",
        age: 8,
        height: "4'2\"",
        weight: "28kg",
        allergies: ["Dust"],
        conditions: ["None"],
        medications: ["None"],
        lastCheckup: "2023-11-30",
        emergencyContact: "+1 (555) 123-4567",
        insuranceProvider: "HealthCare Plus",
        policyNumber: "HC123789456"
      },
      contact: {
        phone: "N/A",
        email: "N/A",
        address: "123 Health Street, Medical City, MC 12345"
      }
    }
  ];

  const HealthCard: React.FC<{ member: FamilyMember }> = ({ member }) => (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            {member.name}
          </h3>
          <p className="text-gray-600">{member.relation} - ID: {member.id}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {member.health.bloodType}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            Health Information
          </h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Age:</span> {member.health.age}</p>
            <p><span className="font-medium">Height:</span> {member.health.height}</p>
            <p><span className="font-medium">Weight:</span> {member.health.weight}</p>
            <p><span className="font-medium">Last Checkup:</span> {member.health.lastCheckup}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            Medical Details
          </h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Allergies:</span> {member.health.allergies.join(", ") || "None"}</p>
            <p><span className="font-medium">Conditions:</span> {member.health.conditions.join(", ") || "None"}</p>
            <p><span className="font-medium">Medications:</span> {member.health.medications.join(", ") || "None"}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-500" />
            Insurance
          </h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Provider:</span> {member.health.insuranceProvider}</p>
            <p><span className="font-medium">Policy Number:</span> {member.health.policyNumber}</p>
            <p><span className="font-medium">Emergency Contact:</span> {member.health.emergencyContact}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Phone className="h-4 w-4 text-purple-500" />
            Contact Information
          </h4>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Phone className="h-3 w-3" /> {member.contact.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-3 w-3" /> {member.contact.email}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-3 w-3" /> {member.contact.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Health Profile IDs</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Add Family Member
        </button>
      </div>

      <div className="space-y-6">
        {/* User's Profile */}
        <HealthCard member={userProfile} />

        {/* Family Members */}
        {familyMembers.map((member) => (
          <HealthCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default ProfileIDs;
