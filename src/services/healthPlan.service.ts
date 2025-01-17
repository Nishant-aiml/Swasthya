import axios from 'axios';

const API_URL = 'https://api-inference.huggingface.co/models/microsoft/BioGPT-Large-PubMedQA';
const API_KEY = import.meta.env.VITE_HEALTHPLAN_API_KEY;

export interface HealthPlanOptions {
  maxLength?: number;
  temperature?: number;
  topP?: number;
  repetitionPenalty?: number;
}

export interface HealthPlanPreferences {
  goals: string[];
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very active';
  timeAvailable: string;
  diet: 'any' | 'vegetarian' | 'vegan' | 'keto' | 'paleo' | 'mediterranean';
  limitations: string[];
  preferences: string[];
  medicalConditions?: string[];
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
}

const defaultOptions: HealthPlanOptions = {
  maxLength: 800,
  temperature: 0.7,
  topP: 0.9,
  repetitionPenalty: 1.2
};

export async function generateHealthPlan(
  preferences: HealthPlanPreferences,
  options: HealthPlanOptions = defaultOptions
): Promise<string> {
  try {
    const prompt = `As a healthcare AI assistant, create a comprehensive health and wellness plan based on the following information:

User Profile:
${preferences.age ? `- Age: ${preferences.age}` : ''}
${preferences.gender ? `- Gender: ${preferences.gender}` : ''}
${preferences.weight && preferences.height ? `- BMI: ${(preferences.weight / (preferences.height * preferences.height)).toFixed(1)}` : ''}
- Activity Level: ${preferences.activityLevel}
- Available Time: ${preferences.timeAvailable}
- Dietary Preference: ${preferences.diet}
${preferences.medicalConditions?.length ? `- Medical Conditions: ${preferences.medicalConditions.join(', ')}` : ''}

Goals:
${preferences.goals.map(goal => `- ${goal}`).join('\n')}

Limitations:
${preferences.limitations.length ? preferences.limitations.map(limit => `- ${limit}`).join('\n') : '- None specified'}

Additional Preferences:
${preferences.preferences.length ? preferences.preferences.map(pref => `- ${pref}`).join('\n') : '- None specified'}

Please provide a detailed plan including:
1. Exercise Schedule
2. Meal Planning
3. Lifestyle Recommendations
4. Progress Tracking Methods
5. Safety Considerations

Note: This plan should be realistic, sustainable, and adaptable to the user's lifestyle.`;

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
      return formatHealthPlan(result);
    }

    throw new Error('Invalid response format from AI service');
  } catch (error) {
    console.error('Error generating health plan:', error);
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      return 'The health plan generation service is currently busy. Please try again in a few moments.';
    }
    throw new Error('Failed to generate health plan. Please try again later.');
  }
}

function formatHealthPlan(text: string): string {
  return `${text.trim()}\n\nDisclaimer: This health plan is AI-generated and should be reviewed with a healthcare professional before starting any new exercise or diet regimen.`;
}
