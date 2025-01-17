import React, { useState } from 'react';
import { Users, UserPlus, Edit2, Trash2, Heart } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  bloodGroup: string;
  conditions?: string[];
}

export default function FamilyAccounts() {
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      relation: 'Spouse',
      age: 32,
      bloodGroup: 'B+',
      conditions: ['Asthma']
    },
    {
      id: '2',
      name: 'Alex Johnson',
      relation: 'Child',
      age: 8,
      bloodGroup: 'A+',
      conditions: ['Allergies']
    }
  ]);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-600" />
            Family Members
          </h2>
          <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
            <UserPlus className="h-5 w-5" />
            Add Member
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Heart className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-600">
                      {member.relation} • {member.age} years
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm bg-red-50 text-red-700 px-2 py-1 rounded-full">
                        {member.bloodGroup}
                      </span>
                      {member.conditions?.map((condition, index) => (
                        <span
                          key={index}
                          className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Edit2 className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {members.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900">No family members added</h3>
            <p className="text-sm text-gray-600 mt-1">
              Add your family members to manage their health records
            </p>
          </div>
        )}
      </div>
    </div>
  );
}