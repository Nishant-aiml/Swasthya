import { create } from 'zustand';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
}

interface EmergencyContactState {
  contacts: EmergencyContact[];
  selectedContact: EmergencyContact | null;
  isLoading: boolean;
  error: string | null;
  addContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  updateContact: (id: string, contact: Partial<EmergencyContact>) => void;
  deleteContact: (id: string) => void;
  selectContact: (contact: EmergencyContact) => void;
  loadContacts: () => Promise<void>;
}

const useEmergencyContacts = create<EmergencyContactState>((set, get) => ({
  contacts: [],
  selectedContact: null,
  isLoading: false,
  error: null,

  addContact: (contact) => {
    const newContact = {
      ...contact,
      id: Math.random().toString(36).substr(2, 9),
    };
    set((state) => ({
      contacts: [...state.contacts, newContact],
    }));
  },

  updateContact: (id: string, contact: Partial<EmergencyContact>) => {
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c.id === id ? { ...c, ...contact } : c
      ),
    }));
  },

  deleteContact: (id: string) => {
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  },

  selectContact: (contact: EmergencyContact) => {
    set({ selectedContact: contact });
  },

  loadContacts: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      const mockContacts: EmergencyContact[] = [
        {
          id: '1',
          name: 'John Doe',
          relationship: 'Father',
          phone: '+1234567890',
          email: 'john@example.com',
        },
        {
          id: '2',
          name: 'Jane Doe',
          relationship: 'Mother',
          phone: '+0987654321',
          email: 'jane@example.com',
        },
      ];
      set({ contacts: mockContacts, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load contacts', isLoading: false });
    }
  },
}));

export default useEmergencyContacts;