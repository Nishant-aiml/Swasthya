import { useState } from 'react';
import { InsuranceClaim } from '../types/emergency';

export function useInsurance() {
  const [claims, setClaims] = useState<InsuranceClaim[]>([]);
  const [loading, setLoading] = useState(false);

  const submitClaim = async (policyNumber: string, documents: File[]) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newClaim: InsuranceClaim = {
        policyNumber,
        documents,
        status: 'pending',
        timestamp: new Date(),
      };
      
      setClaims(prev => [...prev, newClaim]);
      return true;
    } catch (error) {
      console.error('Error submitting claim:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    claims,
    loading,
    submitClaim,
  };
}