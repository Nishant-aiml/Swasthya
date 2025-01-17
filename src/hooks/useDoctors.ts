import { create } from 'zustand';
import { Doctor } from '../types';

interface DoctorsState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  filters: {
    specialization: string;
    availability: 'all' | 'today' | 'week';
    consultationType: 'all' | 'in-person' | 'online';
    language: string;
  };
  setFilters: (filters: Partial<DoctorsState['filters']>) => void;
  fetchDoctors: () => Promise<void>;
}

export const useDoctors = create<DoctorsState>((set) => ({
  doctors: [],
  loading: false,
  error: null,
  filters: {
    specialization: 'all',
    availability: 'all',
    consultationType: 'all',
    language: 'all',
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  fetchDoctors: async () => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      const mockDoctors: Doctor[] = [
        {
          id: '1',
          name: 'Dr. Priya Sharma',
          specialization: 'Cardiologist',
          experience: 15,
          rating: 4.8,
          location: 'Apollo Hospital, Mumbai',
          languages: ['en', 'hi', 'mr'],
          availableSlots: [
            '2024-03-20T10:00:00Z',
            '2024-03-20T11:00:00Z',
            '2024-03-21T14:00:00Z'
          ],
          consultationFee: 1000,
          isAvailableOnline: true,
          education: [
            'MBBS - AIIMS Delhi',
            'MD Cardiology - AIIMS Delhi',
            'Fellowship in Interventional Cardiology - UK'
          ],
          image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
        },
        {
          id: '2',
          name: 'Dr. Rajesh Kumar',
          specialization: 'General Physician',
          experience: 10,
          rating: 4.6,
          location: 'Max Healthcare, Delhi',
          languages: ['en', 'hi'],
          availableSlots: [
            '2024-03-20T09:00:00Z',
            '2024-03-20T10:00:00Z',
            '2024-03-20T15:00:00Z'
          ],
          consultationFee: 800,
          isAvailableOnline: true,
          education: [
            'MBBS - Maulana Azad Medical College',
            'MD Internal Medicine - PGIMER'
          ],
          image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200'
        }
      ];

      set({ doctors: mockDoctors, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch doctors',
        loading: false
      });
    }
  },
}));