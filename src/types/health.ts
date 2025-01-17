export interface SymptomCheckerResult {
  condition: string;
  probability: number;
  urgencyLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export interface HealthMetrics {
  steps: number;
  calories: number;
  water: number;
  sleep: number;
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
}

export interface MedicationReminder {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  time: string[];
  startDate: string;
  endDate?: string;
  refillDate?: string;
}

export interface HealthRiskAssessment {
  risk: string;
  probability: string;
  recommendations: string[];
}

export interface DoctorRecommendation {
  doctorId: string;
  name: string;
  specialization: string;
  matchScore: number;
  reasonsForMatch: string[];
}

export interface HealthTask {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'exercise' | 'nutrition' | 'mindfulness' | 'sleep';
  completed: boolean;
}

export interface EmotionalHealth {
  mood: 'happy' | 'sad' | 'anxious' | 'stressed' | 'neutral';
  intensity: number;
  timestamp: string;
  triggers?: string[];
  recommendations: string[];
}

export interface HealthCoachQuery {
  query: string;
  context?: string;
  userProfile?: any;
}

export interface NutritionAnalysis {
  calories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fats: number;
  };
  micronutrients: {
    [key: string]: number;
  };
  recommendations: string[];
}

export interface EmergencyGuidance {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  assessment: string;
  immediateActions: string[];
  doNotDo: string[];
}

export interface HealthRiskInput {
  age: string;  // Changed from number to string to match form input
  symptoms: string[];
  medicalHistory: string[];
  lifestyle: string[];
  medicalConditions: string[];
}

export interface HealthPlanPreferences {
  goals: string[];
  dietaryRestrictions: string[];
  exercisePreferences: string[];
  medicalConditions: string[];
  lifestyle: string[];
}

export interface HealthPlan {
  goals: string[];
  dietPlan: string[];
  exerciseRoutine: string[];
  lifestyleRecommendations: string[];
  progressTracking: string[];
}

export interface MentalHealthResponse {
  status: string;
  support: string;
  recommendations: string[];
  suggestions: string[];
  resources: string[];
}

export interface HealthAdviceResponse {
  advice: string;
  recommendations: string[];
}