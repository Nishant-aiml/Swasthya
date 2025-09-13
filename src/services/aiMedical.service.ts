// Add interfaces at the top of the file
interface HealthMetrics {
  age?: number;
  weight?: number;
  height?: number;
  bloodPressure?: string;
  bloodSugar?: number;
  cholesterol?: number;
}

interface HealthPlanPreferences {
  dietaryRestrictions?: string[];
  fitnessLevel?: 'beginner' | 'moderate' | 'advanced';
  availableTime?: number; // in minutes
  goals?: string[];
}

export interface SymptomAnalysisResponse {
  possibleConditions: string[];
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
  shouldSeekEmergencyCare: boolean;
}

export interface MedicationAnalysisResponse {
  interactions: string[];
  sideEffects: string[];
  precautions: string[];
  recommendations: string[];
}

export interface HealthQueryResponse {
  answer: string;
  recommendations: string[];
  references?: string[];
}

export class AIMedicalService {
  private static instance: AIMedicalService;

  private constructor() {}

  public static getInstance(): AIMedicalService {
    if (!AIMedicalService.instance) {
      AIMedicalService.instance = new AIMedicalService();
    }
    return AIMedicalService.instance;
  }

  public async analyzeSymptoms(symptoms: string[]): Promise<SymptomAnalysisResponse> {
    // Mock implementation
    return {
      possibleConditions: ['Fever', 'Common Cold'],
      recommendations: ['Rest', 'Stay hydrated'],
      severity: 'low',
      shouldSeekEmergencyCare: false
    };
  }

  public async analyzeMedications(medications: string[]): Promise<MedicationAnalysisResponse> {
    // Mock implementation
    return {
      interactions: ['No known interactions'],
      sideEffects: ['Drowsiness', 'Nausea'],
      precautions: ['Take with food'],
      recommendations: ['Follow prescribed dosage']
    };
  }

  public async askHealthQuery(query: string): Promise<HealthQueryResponse> {
    // Mock implementation
    return {
      answer: 'Please consult with a healthcare professional for accurate medical advice.',
      recommendations: ['Consult a doctor', 'Keep track of symptoms'],
      references: ['Medical guidelines']
    };
  }
}

const MEDICAL_DISCLAIMER = `IMPORTANT: This is an AI assistant providing general medical information. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.`;

function formatResponse(text: string): string {
  // Remove any asterisks or stars
  let formatted = text.replace(/[\*\•]/g, '');
  
  // Split into lines
  const lines = formatted.split('\n');
  
  // Format each line
  const formattedLines = lines.map(line => {
    // Remove any existing numbering or bullet points
    line = line.replace(/^\s*[\d\-\.\)]+\s*/, '').trim();
    
    // Skip empty lines
    if (!line) return '';
    
    return line;
  }).filter(line => line); // Remove empty lines

  // Remove duplicate lines
  const uniqueLines = Array.from(new Set(formattedLines));
  
  // Remove any repeated sections
  formatted = uniqueLines.join('\n')
    .replace(/(\d+\.\s+.*?)(?=\1)/gs, '') // Remove repeated numbered items
    .replace(/\n{3,}/g, '\n\n') // Normalize spacing
    .trim();
  
  return formatted;
}

function calculateConfidence(text: string): number {
  // Implementation of confidence calculation based on AI response
  const confidenceIndicators = [
    'high confidence',
    'moderate confidence',
    'low confidence'
  ];
  
  const matches = confidenceIndicators.map(indicator => 
    text.toLowerCase().includes(indicator)
  );
  
  if (matches[0]) return 0.9;
  if (matches[1]) return 0.6;
  if (matches[2]) return 0.3;
  return 0.5;
}

// General Health AI
export async function getHealthAdvice(query: string): Promise<any> {
  const context = `You are a health information assistant. Provide clear, numbered responses without using any special characters or formatting.`;
  const prompt = `Regarding: ${query}

Please provide:
1. Key Information:
2. Recommendations:
3. Best Practices:
4. Important Notes:`;
  
  const response = await AIMedicalService.getInstance().askHealthQuery(prompt);
  return {
    text: response ? 
      `HEALTH ADVICE:\n\n${formatResponse(response.answer)}\n\n${MEDICAL_DISCLAIMER}` : 
      'Unable to provide health advice at this moment. Please try again later.'
  };
}

// Preliminary Diagnosis
export async function getPreliminaryDiagnosis(symptoms: any[]): Promise<any> {
  const context = `You are a medical assessment tool. Provide clear, numbered responses without using any special characters or formatting.`;
  const prompt = `Based on these symptoms:
${symptoms.map((s, i) => `${i + 1}. ${s.name} (${s.severity}, lasting ${s.duration})`).join('\n')}

Please provide:
1. Potential Conditions:
2. Recommended Tests:
3. Care Level Required:
4. Precautions:`;
  
  const response = await AIMedicalService.getInstance().analyzeSymptoms(symptoms.map(s => s.name));
  return {
    text: response ? 
      `PRELIMINARY ASSESSMENT:\n\n${formatResponse(response.possibleConditions.join('\n'))}\n\n${MEDICAL_DISCLAIMER}` : 
      'Unable to provide assessment at this moment. Please consult a healthcare professional.'
  };
}

// Emergency Assessment
export async function assessEmergency(symptoms: string[]): Promise<any> {
  const context = `You are an emergency assessment tool. Provide clear, numbered responses without using any special characters or formatting.`;
  const prompt = `Emergency Assessment for: ${symptoms.join(', ')}

Please provide:
1. Emergency Level:
2. Immediate Actions:
3. Critical Signs:
4. Next Steps:`;
  
  const response = await AIMedicalService.getInstance().analyzeSymptoms(symptoms);
  return {
    text: response ? 
      `EMERGENCY ASSESSMENT:\n\n${formatResponse(response.recommendations.join('\n'))}\n\nIMMEDIATE ACTION: If this is a medical emergency, call emergency services immediately.\n\n${MEDICAL_DISCLAIMER}` : 
      'IMPORTANT: Unable to assess emergency status. If you believe you are experiencing a medical emergency, call emergency services immediately.'
  };
}

// Mental Health Assessment
export async function getMentalHealthGuidance(description: string): Promise<any> {
  const context = `You are a mental health information resource. Provide clear, numbered responses without using any special characters or formatting.`;
  const prompt = `Regarding: ${description}

Please provide:
1. Understanding:
2. Coping Strategies:
3. Professional Help:
4. Support Resources:`;
  
  const response = await AIMedicalService.getInstance().askHealthQuery(prompt);
  return {
    text: response ? 
      `MENTAL HEALTH GUIDANCE:\n\n${formatResponse(response.answer)}\n\nCRISIS SUPPORT: If you're experiencing a mental health crisis, please contact a mental health professional or crisis helpline immediately.\n\n${MEDICAL_DISCLAIMER}` : 
      'Unable to provide mental health guidance at this moment. If you are in crisis, please contact a mental health professional or crisis helpline immediately.'
  };
}
