import { useState } from 'react';
import { BloodBank } from '../types/emergency';

export function useBloodBank() {
  const [results, setResults] = useState<BloodBank[]>([]);
  const [loading, setLoading] = useState(false);

  const searchBloodBanks = async (bloodGroup: string, location: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResults: BloodBank[] = [
        {
          id: '1',
          name: 'City Blood Bank',
          address: '123 Healthcare Ave, City',
          phone: '+91-9876543210',
          bloodGroups: ['A+', 'B+', 'O+', 'AB+'],
          distance: 2.5,
          availability: {
            'A+': 10,
            'B+': 15,
            'O+': 8,
            'AB+': 5
          }
        },
        {
          id: '2',
          name: 'Central Blood Center',
          address: '456 Medical Lane, City',
          phone: '+91-9876543211',
          bloodGroups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
          distance: 3.8,
          availability: {
            'A+': 12,
            'A-': 5,
            'B+': 8,
            'B-': 3,
            'O+': 15,
            'O-': 6
          }
        }
      ];

      setResults(mockResults);
    } catch (error) {
      console.error('Error searching blood banks:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    searchBloodBanks,
  };
}