import axios from 'axios';

const API_URL = 'https://api-inference.huggingface.co/models/microsoft/BioGPT-Large-PubMedQA';
const API_KEY = import.meta.env.VITE_HEALTH_ASSESSMENT_API_KEY;

export interface HealthAssessmentOptions {
  maxLength?: number;
  temperature?: number;
  topP?: number;
  repetitionPenalty?: number;
}

export interface HealthData {
  age: number;
  gender: string;
  weight: number; // in kg
  height: number; // in meters
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  lifestyle: {
    smoking: boolean;
    alcohol: 'none' | 'occasional' | 'moderate' | 'heavy';
    exercise: 'sedentary' | 'light' | 'moderate' | 'active' | 'very active';
    diet: 'poor' | 'fair' | 'good' | 'excellent';
    sleep: number; // hours per night
    stress: 'low' | 'moderate' | 'high';
  };
  medicalHistory: string[];
  familyHistory: string[];
  currentMedications: string[];
  symptoms: string[];
  vitals?: {
    heartRate?: number;
    temperature?: number;
    oxygenSaturation?: number;
  };
}

const defaultOptions: HealthAssessmentOptions = {
  maxLength: 1000,
  temperature: 0.7,
  topP: 0.9,
  repetitionPenalty: 1.2
};

export async function performHealthAssessment(
  healthData: HealthData,
  options: HealthAssessmentOptions = defaultOptions
): Promise<string> {
  try {
    const bmi = healthData.weight / (healthData.height * healthData.height);
    const prompt = `As a medical AI assistant, perform a comprehensive health assessment based on the following patient data:

Basic Information:
- Age: ${healthData.age}
- Gender: ${healthData.gender}
- BMI: ${bmi.toFixed(1)} (Weight: ${healthData.weight}kg, Height: ${healthData.height}m)
${healthData.bloodPressure ? `- Blood Pressure: ${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic} mmHg` : ''}

Lifestyle Factors:
- Smoking: ${healthData.lifestyle.smoking ? 'Yes' : 'No'}
- Alcohol Consumption: ${healthData.lifestyle.alcohol}
- Exercise Level: ${healthData.lifestyle.exercise}
- Diet Quality: ${healthData.lifestyle.diet}
- Sleep: ${healthData.lifestyle.sleep} hours/night
- Stress Level: ${healthData.lifestyle.stress}

Medical History:
${healthData.medicalHistory.length > 0 ? healthData.medicalHistory.map(condition => `- ${condition}`).join('\n') : '- None reported'}

Family History:
${healthData.familyHistory.length > 0 ? healthData.familyHistory.map(condition => `- ${condition}`).join('\n') : '- None reported'}

Current Medications:
${healthData.currentMedications.length > 0 ? healthData.currentMedications.map(med => `- ${med}`).join('\n') : '- None'}

Current Symptoms:
${healthData.symptoms.length > 0 ? healthData.symptoms.map(symptom => `- ${symptom}`).join('\n') : '- None reported'}

${healthData.vitals ? `
Vital Signs:
${healthData.vitals.heartRate ? `- Heart Rate: ${healthData.vitals.heartRate} bpm` : ''}
${healthData.vitals.temperature ? `- Temperature: ${healthData.vitals.temperature}°C` : ''}
${healthData.vitals.oxygenSaturation ? `- Oxygen Saturation: ${healthData.vitals.oxygenSaturation}%` : ''}
` : ''}

Please provide a comprehensive health assessment including:
1. Overall Health Status
2. Key Risk Factors
3. Areas of Concern
4. Preventive Recommendations
5. Lifestyle Modification Suggestions
6. Follow-up Recommendations
7. Health Metrics to Monitor

Important: Include specific recommendations based on the patient's age, gender, and current health status.`;

    const response = await axios.post(
      API_URL,
      {
        inputs: prompt,
        parameters: {
          max_length: options.maxLength,
          temperature: options.temperature,
          top_p: options.topP,
          repetition_penalty: options.repetitionPenalty,
          do_sample: true,
          return_full_text: false
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      const result = response.data[0].generated_text;
      return formatHealthAssessment(result);
    }

    throw new Error('Invalid response format from AI service');
  } catch (error) {
    console.error('Error performing health assessment:', error);
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      return 'The health assessment service is currently busy. Please try again in a few moments.';
    }
    throw new Error('Failed to perform health assessment. Please try again later.');
  }
}

function formatHealthAssessment(text: string): string {
  let formatted = text.trim();
  
  // Add disclaimer
  formatted += '\n\nIMPORTANT DISCLAIMER: This AI-generated health assessment is for informational purposes only and should not replace professional medical evaluation. Please consult with a healthcare provider for accurate diagnosis and treatment recommendations.';
  
  return formatted;
}

export async function getQuickAssessment(
  symptoms: string[],
  age: number,
  gender: string,
  options: HealthAssessmentOptions = defaultOptions
): Promise<string> {
  const quickHealthData: HealthData = {
    age,
    gender,
    weight: 0,
    height: 0,
    lifestyle: {
      smoking: false,
      alcohol: 'none',
      exercise: 'moderate',
      diet: 'fair',
      sleep: 7,
      stress: 'moderate'
    },
    medicalHistory: [],
    familyHistory: [],
    currentMedications: [],
    symptoms
  };

  try {
    const result = await performHealthAssessment(quickHealthData, {
      ...options,
      maxLength: 500 // Shorter response for quick assessments
    });
    return result;
  } catch (error) {
    console.error('Error performing quick assessment:', error);
    throw new Error('Failed to perform quick health assessment. Please try again.');
  }
}
