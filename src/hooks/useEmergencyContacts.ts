import { create } from 'zustand';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface EmergencyContactState {
  contacts: EmergencyContact[];
  addContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  removeContact: (id: string) => void;
  notifyContacts: (data: {
    userId: string;
    serviceId: string;
    serviceName: string;
    location: [number, number] | null;
    timestamp: string;
  }) => Promise<void>;
}

export const useEmergencyContacts = create<EmergencyContactState>((set, get) => ({
  contacts: [],

  addContact: (contact) => {
    const newContact = {
      ...contact,
      id: Math.random().toString(36).substr(2, 9),
    };
    set((state) => ({
      contacts: [...state.contacts, newContact],
    }));
  },

  removeContact: (id) => {
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  },

  notifyContacts: async (data) => {
    const { contacts } = get();
    
    // In a real app, this would make API calls to send notifications
    // For now, we'll just log the notification
    contacts.forEach((contact) => {
      console.log(`Notifying ${contact.name} about emergency at ${data.serviceName}`);
    });
  },
}));