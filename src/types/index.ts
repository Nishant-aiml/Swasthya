export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  location: string;
  languages: string[];
  availableSlots: string[];
  consultationFee: number;
  isAvailableOnline: boolean;
  education: string[];
  image: string;
}

export type { EmergencyService } from './emergency';

export interface Medicine {
  id: string;
  brandName: string;
  genericName: string;
  price: number;
  manufacturer: string;
  dosageForm: string;
  strength: string;
  availableAt: string[];
  interactions?: string[];
  sideEffects?: string[];
  usageInstructions?: string;
  requiresPrescription: boolean;
  alternatives?: AlternativeMedicine[];
}

export interface AlternativeMedicine {
  id: string;
  name: string;
  price: number;
  manufacturer: string;
  savingsPercentage: number;
  qualityScore: number;
}

export interface Symptom {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  commonCauses: string[];
  immediateActions: string[];
  requiresEmergencyCare: boolean;
  relatedConditions: string[];
}

export interface AIResponse {
  type: 'normal' | 'emergency';
  recommendations?: string[];
  suggestedMedications?: Medicine[];
}

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr';