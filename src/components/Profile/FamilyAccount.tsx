import React, { useState } from 'react';
import { Users, UserPlus, Edit2, Trash2, Heart, AlertCircle, User } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: number;
  bloodGroup: string;
  allergies: string[];
  medications: string[];
  emergencyContact: string;
  avatar?: string;
}

export default function FamilyAccount() {
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'John Doe',
      relationship: 'Self',
      age: 35,
      bloodGroup: 'O+',
      allergies: ['Peanuts', 'Penicillin'],
      medications: ['Blood Pressure Medicine'],
      emergencyContact: '+91 98765 43210',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    {
      id: '2',
      name: 'Jane Doe',
      relationship: 'Spouse',
      age: 32,
      bloodGroup: 'B+',
      allergies: ['Dairy'],
      medications: [],
      emergencyContact: '+91 98765 43211',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);

  const handleAddMember = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const newMember: FamilyMember = {
      id: editingMember?.id || Date.now().toString(),
      name: formData.get('name') as string,
      relationship: formData.get('relationship') as string,
      age: Number(formData.get('age')),
      bloodGroup: formData.get('bloodGroup') as string,
      allergies: (formData.get('allergies') as string).split(',').filter(Boolean),
      medications: (formData.get('medications') as string).split(',').filter(Boolean),
      emergencyContact: formData.get('emergencyContact') as string,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.get('name')}`
    };

    if (editingMember) {
      setMembers(prev => prev.map(member => 
        member.id === editingMember.id ? newMember : member
      ));
    } else {
      setMembers(prev => [...prev, newMember]);
    }

    setShowAddForm(false);
    setEditingMember(null);
  };

  const handleEdit = (member: FamilyMember) => {
    setEditingMember(member);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Family Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your family members' health profiles
          </p>
        </div>
        <button
          onClick={() => {
            setEditingMember(null);
            setShowAddForm(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="h-5 w-5" />
          <span>Add Member</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <form onSubmit={handleAddMember}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingMember?.name}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Relationship</label>
                <select
                  name="relationship"
                  defaultValue={editingMember?.relationship}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="Self">Self</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  defaultValue={editingMember?.age}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                <select
                  name="bloodGroup"
                  defaultValue={editingMember?.bloodGroup}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  defaultValue={editingMember?.allergies.join(', ')}
                  placeholder="Separate with commas"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Current Medications</label>
                <input
                  type="text"
                  name="medications"
                  defaultValue={editingMember?.medications.join(', ')}
                  placeholder="Separate with commas"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                <input
                  type="tel"
                  name="emergencyContact"
                  defaultValue={editingMember?.emergencyContact}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingMember(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingMember ? 'Update' : 'Add'} Member
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="border rounded-lg p-6 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-12 w-12 rounded-full bg-gray-100"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.relationship}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="p-2 text-gray-400 hover:text-blue-600"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                {member.relationship !== 'Self' && (
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Age</span>
                <p className="font-medium">{member.age} years</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Blood Group</span>
                <p className="font-medium">{member.bloodGroup}</p>
              </div>
            </div>

            {member.allergies.length > 0 && (
              <div className="mt-4">
                <span className="text-sm text-gray-500">Allergies</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {member.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.medications.length > 0 && (
              <div className="mt-4">
                <span className="text-sm text-gray-500">Current Medications</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {member.medications.map((medication, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                    >
                      {medication}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center text-sm text-gray-500">
              <AlertCircle className="h-4 w-4 mr-2" />
              Emergency: {member.emergencyContact}
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No family members</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add your family members to manage their health profiles
          </p>
        </div>
      )}
    </div>
  );
} 