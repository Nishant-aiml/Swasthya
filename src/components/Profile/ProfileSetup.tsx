import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Heart, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useEmergencyContacts } from '../../hooks/useEmergencyContacts';

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addContact } = useEmergencyContacts();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [currentContact, setCurrentContact] = useState<EmergencyContact>({
    name: '',
    phone: '',
    relationship: ''
  });

  const handleAddContact = () => {
    if (currentContact.name && currentContact.phone && currentContact.relationship) {
      setContacts([...contacts, currentContact]);
      addContact(currentContact);
      setCurrentContact({ name: '', phone: '', relationship: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save profile data to backend
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="h-6 w-6 text-emerald-600" />
          <h2 className="text-xl font-semibold">Complete Your Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Phone className="h-5 w-5 text-emerald-600" />
              Emergency Contacts
            </h3>
            
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                    <p className="text-sm text-gray-500">{contact.relationship}</p>
                  </div>
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
              ))}
            </div>

            <div className="grid gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={currentContact.name}
                  onChange={(e) => setCurrentContact({
                    ...currentContact,
                    name: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={currentContact.phone}
                  onChange={(e) => setCurrentContact({
                    ...currentContact,
                    phone: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Relationship</label>
                <select
                  value={currentContact.relationship}
                  onChange={(e) => setCurrentContact({
                    ...currentContact,
                    relationship: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  <option value="">Select relationship</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleAddContact}
                className="flex items-center justify-center gap-2 w-full bg-emerald-50 text-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-100"
              >
                <Plus className="h-4 w-4" />
                Add Contact
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
            >
              Complete Setup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}