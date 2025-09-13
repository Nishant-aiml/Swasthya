// Base types
export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Contact {
  phone: string;
  email: string;
  website?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type { Doctor } from './doctor';
export type { Hospital } from './hospital';
export type { Appointment } from './appointment';
export type { Review } from './review';

export interface PaginatedResponse<T> extends ApiResponse<T> {
  total: number;
  page: number;
  limit: number;
}

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