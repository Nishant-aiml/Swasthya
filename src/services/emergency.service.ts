import { getEmergencyAdvice } from './ai.service';

export interface EmergencyMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface EmergencyContext {
  symptoms: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  age?: number;
  gender?: string;
  medicalHistory?: string[];
}

export interface EmergencyResponse {
  advice: string;
  callEmergency: boolean;
}

export async function getEmergencyResponse(
  messages: EmergencyMessage[],
  context: EmergencyContext
): Promise<string> {
  try {
    const situation = `Emergency situation: ${context.symptoms.join(', ')}`;
    const response = await getEmergencyGuidance(situation, context.symptoms);
    return response.advice;
  } catch (error) {
    console.error('Error getting emergency response:', error);
    return 'Failed to get emergency response. If this is an emergency, please call your local emergency services immediately.';
  }
}

export async function getEmergencyGuidance(
  situation: string,
  symptoms: string[]
): Promise<EmergencyResponse> {
  try {
    const response = await getEmergencyAdvice(situation, symptoms);
    
    // Determine if emergency services should be called based on the response content
    const emergencyKeywords = [
      'emergency',
      'call 911',
      'immediate medical attention',
      'urgent care',
      'life-threatening',
      'severe'
    ];

    const callEmergency = emergencyKeywords.some(keyword => 
      response.toLowerCase().includes(keyword.toLowerCase())
    );

    return {
      advice: `${response}\n\nDISCLAIMER: This is AI-generated guidance for informational purposes only. In case of a medical emergency, immediately call your local emergency services (911 in the US) or go to the nearest emergency room.`,
      callEmergency
    };
  } catch (error) {
    console.error('Emergency service error:', error);
    return {
      advice: 'If you are experiencing a medical emergency, please call emergency services (911) immediately or visit the nearest emergency room.',
      callEmergency: true
    };
  }
}

export async function getFirstAidSteps(injury: string): Promise<string> {
  const symptoms = [injury];
  const situation = `Need first aid steps for: ${injury}`;
  
  try {
    const response = await getEmergencyAdvice(situation, symptoms);
    return response;
  } catch (error) {
    console.error('First aid service error:', error);
    throw error;
  }
}

export function assessEmergencySeverity(symptoms: string[]): 'low' | 'medium' | 'high' | 'critical' {
  const criticalKeywords = ['unconscious', 'breathing', 'heart', 'chest pain', 'stroke', 'severe bleeding'];
  const highKeywords = ['broken', 'fracture', 'deep cut', 'head injury', 'poisoning'];
  const mediumKeywords = ['sprain', 'moderate pain', 'fever', 'vomiting', 'dizziness'];
  
  const symptomsLower = symptoms.map(s => s.toLowerCase());
  
  if (criticalKeywords.some(keyword => symptomsLower.some(s => s.includes(keyword)))) {
    return 'critical';
  }
  if (highKeywords.some(keyword => symptomsLower.some(s => s.includes(keyword)))) {
    return 'high';
  }
  if (mediumKeywords.some(keyword => symptomsLower.some(s => s.includes(keyword)))) {
    return 'medium';
  }
  return 'low';
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return 'red';
    case 'high':
      return 'orange';
    case 'medium':
      return 'yellow';
    default:
      return 'green';
  }
}
