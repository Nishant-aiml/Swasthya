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

import { MedicalSymptomChecker, SymptomCheckerInput, SymptomCheckerResult } from './medicalKnowledge';
import { Medicine, MedicineDatabaseService } from './medicineDatabase.service';

// API Configuration
const API_KEYS = {
  PRIMARY: process.env.REACT_APP_HUGGING_FACE_KEY,
  SECONDARY: process.env.REACT_APP_HUGGING_FACE_KEY_SECONDARY
} as const;

// Define endpoint types
type EndpointKey = 'SYMPTOMS' | 'HEALTH_ASSESSMENT' | 'HEALTH_PLAN';
type SeverityLevel = 'mild' | 'moderate' | 'severe';
type Gender = 'male' | 'female' | 'other';
type UrgencyLevel = 'ROUTINE' | 'SOON' | 'URGENT' | 'EMERGENCY';

interface EndpointConfig {
  model: string;
  apiKey: string;
}

// Use specialized models for different tasks
const ENDPOINTS: Record<EndpointKey, EndpointConfig> = {
  SYMPTOMS: {
    model: 'microsoft/BioGPT-Large-PubMedQA',
    apiKey: API_KEYS.PRIMARY
  },
  HEALTH_ASSESSMENT: {
    model: 'microsoft/BioGPT-Large-PMC',
    apiKey: API_KEYS.SECONDARY
  },
  HEALTH_PLAN: {
    model: 'microsoft/BioGPT-Large-PMC',
    apiKey: API_KEYS.PRIMARY
  }
};

async function makeAIRequest(endpoint: EndpointKey, prompt: string): Promise<string> {
  const config = ENDPOINTS[endpoint];
  
  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${config.model}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 800,
            temperature: 0.3,
            top_p: 0.9,
            do_sample: true,
            return_full_text: false
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${await response.text()}`);
    }

    const data = await response.json();
    return data[0]?.generated_text || '';
  } catch (error) {
    console.error(`Error with ${config.model}:`, error);
    throw error;
  }
}

export async function checkSymptoms(symptoms: string[]): Promise<any> {
  const prompt = `As a medical AI assistant, analyze these symptoms: ${symptoms.join(', ')}

Please provide a structured analysis with:
1. Possible Conditions (list top 3-5 most likely conditions, ordered by probability)
2. Severity Level (Mild/Moderate/Severe)
3. Recommended Actions (immediate steps and when to seek professional care)
4. Warning Signs (specific symptoms that would require immediate medical attention)
5. Additional Questions (important questions to better assess the condition)

Format the response in a clear, structured manner using numbers and bullet points.`;

  try {
    const response = await makeAIRequest('SYMPTOMS', prompt);
    const parsedResponse = parseAIResponse(response);
    
    return {
      diagnosis: parsedResponse.conditions || [],
      severity: parsedResponse.severity || 'moderate',
      recommendations: parsedResponse.recommendations || [],
      warningSigns: parsedResponse.warningSignals || [],
      additionalQuestions: parsedResponse.questions || [],
      needsImmediateAttention: parsedResponse.severity === 'severe'
    };
  } catch (error) {
    console.error('Symptom check error:', error);
    throw new Error('Unable to analyze symptoms at this moment');
  }
}

export async function assessHealthRisk(metrics: HealthMetrics, lifestyle: {
  smoking: boolean;
  alcohol: boolean;
  exercise: 'none' | 'light' | 'moderate' | 'active';
  familyHistory?: string[];
  modifications?: string[];
}): Promise<any> {
  const prompt = `Analyze health risks based on the following data:

Vital Statistics:
- Age: ${metrics.age || 'Not provided'} years
- Weight: ${metrics.weight || 'Not provided'} kg
- Height: ${metrics.height || 'Not provided'} cm
- Blood Pressure: ${metrics.bloodPressure || 'Not provided'} mmHg
- Blood Sugar: ${metrics.bloodSugar || 'Not provided'} mg/dL
- Cholesterol: ${metrics.cholesterol || 'Not provided'} mg/dL

Lifestyle Factors:
- Smoking: ${lifestyle.smoking ? 'Yes' : 'No'}
- Alcohol: ${lifestyle.alcohol ? 'Yes' : 'No'}
- Exercise Level: ${lifestyle.exercise}
- Family History: ${lifestyle.familyHistory?.join(', ') || 'None reported'}
- Desired Lifestyle Modifications: ${lifestyle.modifications?.join(', ') || 'None specified'}

Please provide a comprehensive analysis including:

1. Risk Assessment
- Cardiovascular health risks
- Metabolic health risks
- Lifestyle-related risks
- Age-related considerations

2. Key Recommendations
- Immediate actions needed
- Lifestyle modifications
- Preventive measures
- Monitoring requirements

3. Health Optimization
- Exercise recommendations
- Dietary guidelines
- Stress management
- Sleep optimization

4. Follow-up Care
- Recommended screenings
- Frequency of check-ups
- Warning signs to watch
- When to seek medical attention

Format the response in a clear, structured manner using bullet points.`;

  try {
    const response = await makeAIRequest('HEALTH_ASSESSMENT', prompt);
    const parsedResponse = parseAIResponse(response);
    
    return {
      riskAssessment: parsedResponse.risks || [],
      recommendations: parsedResponse.recommendations || [],
      healthOptimization: parsedResponse.optimization || [],
      followUpCare: parsedResponse.followup || [],
      disclaimer: `IMPORTANT: This is an AI assistant providing general medical information. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.`
    };
  } catch (error) {
    console.error('Health assessment error:', error);
    throw new Error('Unable to complete health assessment at this moment');
  }
}

export async function generateHealthPlan(preferences: HealthPlanPreferences): Promise<any> {
  const prompt = `Create a personalized health and fitness plan with these preferences:
${preferences.dietaryRestrictions ? `Dietary Restrictions: ${preferences.dietaryRestrictions.join(', ')}` : ''}
Fitness Level: ${preferences.fitnessLevel || 'moderate'}
Available Time: ${preferences.availableTime || 30} minutes per day
Goals: ${preferences.goals?.join(', ') || 'General health improvement'}

Please provide a detailed plan including:

1. Exercise Program
- Warm-up routine (5 minutes)
- Main workout (${Math.max(15, (preferences.availableTime || 30) - 10)} minutes)
- Cool-down (5 minutes)
- Weekly progression plan
- Alternative exercises for variety

2. Nutrition Plan
- Daily meal structure
- Recommended foods
- Foods to avoid
- Portion guidelines
- Meal timing
${preferences.dietaryRestrictions ? '- Alternatives for dietary restrictions' : ''}

3. Progress Tracking
- Weekly measurements
- Progress photos
- Performance metrics
- Adjustment guidelines

4. Tips for Success
- Preparation strategies
- Common obstacles and solutions
- Motivation techniques
- Recovery recommendations

Format the response in a clear, structured manner using bullet points.`;

  try {
    const response = await makeAIRequest('HEALTH_PLAN', prompt);
    const parsedResponse = parseAIResponse(response);
    
    return {
      exerciseProgram: parsedResponse.exercise || [],
      nutritionPlan: parsedResponse.nutrition || [],
      progressTracking: parsedResponse.tracking || [],
      tips: parsedResponse.tips || [],
      disclaimer: `IMPORTANT: This is an AI assistant providing general medical information. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.`
    };
  } catch (error) {
    console.error('Health plan generation error:', error);
    throw new Error('Unable to generate health plan at this moment');
  }
}

function parseAIResponse(response: string): any {
  // Split response into sections based on numbered lists
  const sections = response.split(/\d+\./);
  const parsed: any = {};

  sections.forEach(section => {
    if (!section.trim()) return;
    
    // Extract section title and content
    const lines = section.trim().split('\n');
    const title = lines[0].toLowerCase().replace(/[^a-z]/g, '');
    const content = lines.slice(1)
      .map(line => line.trim())
      .filter(line => line.length > 0);

    parsed[title] = content;
  });

  return parsed;
}

interface MedicalResponse {
  diagnosis: string[];
  confidence: number;
  recommendations: string[];
  emergencyLevel: string;
  references: string[];
  needsImmediateAttention: boolean;
  medicationSuggestions?: Medicine[];
  aiAnalysis?: string;
}

interface HealthPlan {
  dailyRoutine: string[];
  exerciseRoutine: string[];
  dietaryGuidelines: string[];
  medications: string[];
  lifestyle: string[];
  monitoring: string[];
  goals: string[];
  timeline: string;
}

interface Symptom {
  name: string;
  severity: SeverityLevel;
  duration: number; // Duration in days
  description?: string;
}

interface PatientInfo {
  age: number;
  gender: Gender;
  symptoms: Symptom[];
  conditions: string[];
  goals: string[];
  preferences: string[];
  limitations: string[];
}

interface AIResponse {
  text: string;
  confidence?: number;
  error?: string;
}

export class MedicalAIService {
  private static retryCount = 3;
  private static retryDelay = 1000;

  private static async queryModel(model: string, prompt: string, attempt = 1): Promise<any> {
    try {
      const response = await fetch('/.netlify/functions/ai-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          prompt,
          context: ''
        })
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Medical AI Error:', error);
      throw new Error('Failed to get AI response. Please try again later.');
    }
  }

  static async generateHealthPlan(
    patientInfo: PatientInfo
  ): Promise<HealthPlan> {
    try {
      const prompt = `
        Create a comprehensive health plan for:
        Patient Profile:
        - Age: ${patientInfo.age}
        - Gender: ${patientInfo.gender}
        - Medical Conditions: ${patientInfo.conditions.join(', ')}
        - Health Goals: ${patientInfo.goals.join(', ')}
        - Preferences: ${patientInfo.preferences.join(', ')}
        - Limitations: ${patientInfo.limitations.join(', ')}

        Please provide a detailed plan including:
        1. Daily routines and habits
        2. Exercise recommendations
        3. Dietary guidelines
        4. Lifestyle modifications
        5. Mental health support
        6. Progress tracking metrics
      `;

      const response = await this.queryModel(ENDPOINTS.HEALTH_PLAN.model, prompt);
      return this.parseHealthPlan(response);
    } catch (error) {
      console.error('Health plan generation error:', error);
      throw new Error('Failed to generate health plan. Please try again later.');
    }
  }

  private static parseHealthPlan(response: string): HealthPlan {
    // Parse the AI response into structured health plan
    const sections = response.split('\n\n');
    return {
      dailyRoutine: this.extractSection(sections, 'Daily Routines'),
      exerciseRoutine: this.extractSection(sections, 'Exercise'),
      dietaryGuidelines: this.extractSection(sections, 'Diet'),
      medications: this.extractSection(sections, 'Medications'),
      lifestyle: this.extractSection(sections, 'Lifestyle'),
      monitoring: this.extractSection(sections, 'Monitoring'),
      goals: this.extractSection(sections, 'Goals'),
      timeline: 'Weekly'
    };
  }

  private static extractSection(sections: string[], sectionName: string): string[] {
    const section = sections.find(s => s.toLowerCase().includes(sectionName.toLowerCase()));
    return section ? section.split('\n').slice(1).map(s => s.trim()) : [];
  }

  static async analyzeSymptomsComprehensive(
    symptoms: string[],
    patientInfo: PatientInfo
  ): Promise<MedicalResponse> {
    try {
      // Get the highest severity from patient symptoms
      const maxSeverity = patientInfo.symptoms.reduce(
        (max, symptom) => {
          const severityMap = { mild: 1, moderate: 2, severe: 3 };
          return severityMap[symptom.severity] > severityMap[max] ? symptom.severity : max;
        },
        'mild' as SeverityLevel
      );

      const [structuredAnalysis, aiAnalysis, medicationSuggestions] = await Promise.all([
        MedicalSymptomChecker.checkSymptoms({
          primarySymptoms: patientInfo.symptoms.map(s => s.name),
          duration: Math.max(...patientInfo.symptoms.map(s => s.duration)),
          severity: maxSeverity,
          patientAge: patientInfo.age,
          patientGender: patientInfo.gender,
          preExistingConditions: patientInfo.conditions,
          medications: []
        }),
        this.queryModel(ENDPOINTS.SYMPTOMS.model, this.generateAnalysisPrompt(patientInfo)),
        this.getMedicationSuggestions(symptoms, [])
      ]);

      // Extract diagnoses from possible conditions
      const diagnosisList = structuredAnalysis.possibleConditions.map(
        condition => condition.disease.name
      );

      // Calculate overall confidence based on highest probability condition
      const highestProbabilityCondition = structuredAnalysis.possibleConditions.reduce(
        (max, current) => current.probability > max.probability ? current : max,
        structuredAnalysis.possibleConditions[0]
      );

      // Determine emergency level based on conditions requiring emergency care
      const hasEmergencyCondition = structuredAnalysis.possibleConditions.some(
        condition => condition.requiresEmergencyCare
      );

      // Determine emergency level based on severity and emergency conditions
      const emergencyLevel = hasEmergencyCondition ? 'EMERGENCY' : 
        maxSeverity === 'severe' ? 'URGENT' :
        maxSeverity === 'moderate' ? 'SOON' : 'ROUTINE';

      // Map emergency level to user-friendly text
      const urgencyMapping = {
        ROUTINE: 'Non-urgent',
        SOON: 'Semi-urgent',
        URGENT: 'Urgent',
        EMERGENCY: 'Emergency'
      } as const;

      return {
        diagnosis: diagnosisList,
        confidence: highestProbabilityCondition?.probability || 0.8,
        recommendations: structuredAnalysis.recommendedActions,
        emergencyLevel: urgencyMapping[emergencyLevel],
        references: [], // Could be populated from medical literature if needed
        needsImmediateAttention: emergencyLevel === 'URGENT' || emergencyLevel === 'EMERGENCY',
        medicationSuggestions,
        aiAnalysis
      };
    } catch (error) {
      console.error('Error in comprehensive symptom analysis:', error);
      throw new Error('Failed to analyze symptoms comprehensively');
    }
  }

  private static async getMedicationSuggestions(
    symptoms: string[],
    currentMedications: string[]
  ): Promise<Medicine[]> {
    try {
      return await MedicineDatabaseService.searchMedicines({
        query: symptoms.join(' '),
        prescriptionRequired: false
      });
    } catch (error) {
      console.error('Medication suggestions error:', error);
      return [];
    }
  }

  private static generateAnalysisPrompt(patientInfo: PatientInfo): string {
    return `
      Medical Analysis Request:
      Patient Information:
      - Age: ${patientInfo.age}
      - Gender: ${patientInfo.gender}
      - Pre-existing Conditions: ${patientInfo.conditions.join(', ')}
      - Current Medications: 

      Symptoms:
      ${patientInfo.symptoms.map(s => 
        `- ${s.name} (Duration: ${s.duration} days, Severity: ${s.severity})`
      ).join('\n')}

      Based on medical literature and clinical guidelines, please provide:
      1. Potential diagnoses with confidence levels
      2. Key risk factors and complications to consider
      3. Recommended diagnostic tests
      4. Immediate actions needed
      5. Whether emergency care is warranted
      
      Please cite relevant medical studies or guidelines.
    `;
  }

  private static extractDiagnosis(response: string): string[] {
    const diagnosisSection = response.split('Potential diagnoses:')[1]?.split('\n') || [];
    return diagnosisSection
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.trim().substring(1).trim());
  }

  private static calculateConfidence(response: string): number {
    // Implementation of confidence calculation based on AI response
    const confidenceIndicators = [
      'high confidence',
      'moderate confidence',
      'low confidence'
    ];
    
    const matches = confidenceIndicators.map(indicator => 
      response.toLowerCase().includes(indicator)
    );
    
    if (matches[0]) return 0.9;
    if (matches[1]) return 0.6;
    if (matches[2]) return 0.3;
    return 0.5;
  }

  private static extractRecommendations(response: string): string[] {
    const recommendationSection = response.split('Recommended actions:')[1]?.split('\n') || [];
    return recommendationSection
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.trim().substring(1).trim());
  }

  private static determineEmergencyLevel(
    structuredAnalysis: SymptomCheckerResult,
    aiAnalysis: string
  ): string {
    const emergencyKeywords = {
      high: ['immediate medical attention', 'emergency', 'call 911', 'urgent care'],
      medium: ['seek medical attention', 'consult doctor', 'concerning'],
      low: ['monitor', 'mild concern', 'follow up']
    };

    const response = aiAnalysis.toLowerCase();
    if (emergencyKeywords.high.some(keyword => response.includes(keyword))) return 'high';
    if (emergencyKeywords.medium.some(keyword => response.includes(keyword))) return 'medium';
    if (emergencyKeywords.low.some(keyword => response.includes(keyword))) return 'low';
    return 'none';
  }

  private static extractReferences(response: string): string[] {
    const referencesSection = response.split('References:')[1]?.split('\n') || [];
    return referencesSection
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.trim().substring(1).trim());
  }

  private static checkEmergencyStatus(response: string): boolean {
    const emergencyKeywords = [
      'immediate medical attention',
      'emergency',
      'call 911',
      'urgent care',
      'life-threatening'
    ];
    return emergencyKeywords.some(keyword => 
      response.toLowerCase().includes(keyword.toLowerCase())
    );
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
  
  const response = await makeAIRequest('HEALTH_ASSESSMENT', prompt);
  return {
    text: response ? 
      `HEALTH ADVICE:\n\n${formatResponse(response)}\n\n${MEDICAL_DISCLAIMER}` : 
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
  
  const response = await makeAIRequest('SYMPTOMS', prompt);
  return {
    text: response ? 
      `PRELIMINARY ASSESSMENT:\n\n${formatResponse(response)}\n\n${MEDICAL_DISCLAIMER}` : 
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
  
  const response = await makeAIRequest('SYMPTOMS', prompt);
  return {
    text: response ? 
      `EMERGENCY ASSESSMENT:\n\n${formatResponse(response)}\n\nIMMEDIATE ACTION: If this is a medical emergency, call emergency services immediately.\n\n${MEDICAL_DISCLAIMER}` : 
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
  
  const response = await makeAIRequest('HEALTH_ASSESSMENT', prompt);
  return {
    text: response ? 
      `MENTAL HEALTH GUIDANCE:\n\n${formatResponse(response)}\n\nCRISIS SUPPORT: If you're experiencing a mental health crisis, please contact a mental health professional or crisis helpline immediately.\n\n${MEDICAL_DISCLAIMER}` : 
      'Unable to provide mental health guidance at this moment. If you are in crisis, please contact a mental health professional or crisis helpline immediately.'
  };
}
