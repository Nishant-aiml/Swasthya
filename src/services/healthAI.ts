import axios from 'axios';

const GOOGLE_AI_API_KEY = 'AIzaSyCD5oDaMB4u1JUostP6xuHUBjt2GZh9n8M';
const GOOGLE_AI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Helper function for Google AI API calls
async function callGoogleAI(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      `${GOOGLE_AI_API_URL}?key=${GOOGLE_AI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    );

    return response.data.candidates[0].content.parts[0].text || '';
  } catch (error) {
    console.error('Error calling Google AI:', error);
    throw error;
  }
}

// Fallback responses for when API is not available
const FALLBACK_ENABLED = true;

// Medical symptom database for fallback
const commonSymptomMap: Record<string, {
  possibleConditions: string[];
  severityLevels: Record<string, string>;
  recommendations: Record<string, string[]>;
}> = {
  'nose block': {
    possibleConditions: ['Common Cold', 'Allergic Rhinitis', 'Sinusitis', 'Nasal Polyps'],
    severityLevels: {
      'Common Cold': 'LOW',
      'Allergic Rhinitis': 'LOW',
      'Sinusitis': 'MEDIUM',
      'Nasal Polyps': 'MEDIUM'
    },
    recommendations: {
      'Common Cold': [
        'Rest and stay hydrated',
        'Use saline nasal spray',
        'Try over-the-counter decongestants'
      ],
      'Allergic Rhinitis': [
        'Avoid allergen triggers',
        'Use antihistamines',
        'Consider nasal corticosteroids'
      ],
      'Sinusitis': [
        'Use warm compresses',
        'Try nasal irrigation',
        'Consult doctor if symptoms persist'
      ],
      'Nasal Polyps': [
        'Use nasal corticosteroids',
        'Avoid irritants',
        'Consult an ENT specialist'
      ]
    }
  }
  // Add more symptoms as needed
};

// Common symptoms database for fallback
const commonSymptoms = {
  headache: 'Headaches can be caused by various factors including stress, dehydration, or tension. Recommend rest, hydration, and over-the-counter pain relievers if needed.',
  fever: 'Fever is often a sign that your body is fighting an infection. Rest, stay hydrated, and monitor temperature. Seek medical attention if fever is high or persistent.',
  cough: 'Coughs can be due to viral infections, allergies, or irritants. Stay hydrated, use honey for soothing, and consider over-the-counter cough medicine.',
  fatigue: 'Fatigue can be caused by lack of sleep, stress, or underlying medical conditions. Ensure proper rest, balanced diet, and regular exercise.',
  nausea: 'Nausea might be due to digestive issues, motion sickness, or other conditions. Try small, light meals and stay hydrated.',
} as const;

// Response interfaces
export interface HealthAdviceResponse {
  advice: string;
  recommendations?: string[];
  disclaimer?: string;
}

export interface SymptomAnalysisResponse {
  possibleConditions: string[];
  severityLevel: string;
  recommendations: string[];
  urgency: string;
}

export interface MentalHealthResponse extends EmotionalHealth {
  support: string;
  resources?: string[];
  suggestions: string[];
}

// Base interfaces
export interface HealthAssessment {
  risk: string;
  probability: string;
  recommendations: string[];
}

export interface NutritionAnalysis {
  calories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fats: number;
  };
  recommendations: string[];
}

export interface EmotionalHealth {
  status: string;
  recommendations: string[];
  suggestions: string[];
  resources?: string[];
}

export interface HealthMetrics {
  age: number;
  weight: number;
  height: number;
  bloodPressure: string;
  bloodSugar?: number;
  cholesterol?: number;
  familyHistory: string[];
}

export interface HealthRiskInput {
  age: number;  // Keep as number for internal processing
  symptoms: string[];
  medicalHistory: string[];
  lifestyle: string[];
  medicalConditions: string[];
}

export interface HealthRiskAssessment {
  risk: string;
  probability: string;
  recommendations: string[];
}

export interface HealthPlanPreferences {
  goals: string[];
  dietaryRestrictions: string[];
  exercisePreferences: string[];
  medicalConditions: string[];
  lifestyle: string[];
}

export interface EmergencyInput {
  situation: string;
  symptoms: string[];
}

export interface EmergencyGuidance {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  assessment: string;
  immediateActions: string[];
  doNotDo: string[];
}

export interface HealthPlan {
  goals: string[];
  dietPlan: string[];
  exerciseRoutine: string[];
  lifestyleRecommendations: string[];
  progressTracking: string[];
}

// Helper function to handle API errors
function handleApiError(error: unknown): never {
  if (error instanceof Error) {
    throw new Error(`API Error: ${error.message}`);
  }
  throw new Error('An unknown error occurred');
}

// Main functions
export async function getSymptomAnalysis(symptoms: string[]): Promise<SymptomAnalysisResponse> {
  try {
    const prompt = `As a medical professional, analyze these symptoms: ${symptoms.join(', ')}

Provide a detailed medical assessment in this exact format:
{
  "possibleConditions": [
    "List specific conditions with brief medical explanations"
  ],
  "severityLevel": "LOW/MEDIUM/HIGH",
  "recommendations": [
    "Specific medical recommendations",
    "Treatment options",
    "Preventive measures",
    "Required medications or care"
  ],
  "urgency": "Clear guidance on when to seek medical attention"
}

Important: Respond with valid JSON only. No markdown or additional text.`;

    const response = await callGoogleAI(prompt);
    
    // Clean up the response to ensure valid JSON
    const jsonStr = response.replace(/```json|```/g, '').trim();
    
    try {
      const parsedResponse = JSON.parse(jsonStr);
      return {
        possibleConditions: parsedResponse.possibleConditions,
        severityLevel: parsedResponse.severityLevel.toUpperCase(),
        recommendations: parsedResponse.recommendations,
        urgency: parsedResponse.urgency
      };
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return {
        possibleConditions: ['Please consult a healthcare provider for accurate diagnosis'],
        severityLevel: 'MEDIUM',
        recommendations: [
          'Schedule an appointment with your healthcare provider',
          'Monitor your symptoms and their frequency',
          'Keep a record of any triggers or patterns',
          'If symptoms worsen, seek immediate medical attention'
        ],
        urgency: 'Please consult a healthcare professional for proper evaluation'
      };
    }
  } catch (error) {
    console.error('Error in symptom analysis:', error);
    return {
      possibleConditions: ['Unable to analyze symptoms'],
      severityLevel: 'MEDIUM',
      recommendations: [
        'Consult with a healthcare professional',
        'Monitor your symptoms',
        'Keep a symptom diary',
        'Seek immediate care if symptoms worsen'
      ],
      urgency: 'Please consult a healthcare provider for proper evaluation'
    };
  }
}

export async function generateHealthPlan(preferences: HealthPlanPreferences): Promise<HealthPlan> {
  try {
    const prompt = `As a healthcare professional, create a detailed health plan based on:
Goals: ${preferences.goals.join(', ')}
Dietary Restrictions: ${preferences.dietaryRestrictions.join(', ')}
Exercise Preferences: ${preferences.exercisePreferences.join(', ')}
Medical Conditions: ${preferences.medicalConditions.join(', ')}
Lifestyle: ${preferences.lifestyle.join(', ')}

Provide a comprehensive plan in this format:
{
  "goals": [
    "Specific, measurable health objectives"
  ],
  "dietPlan": [
    "Detailed meal plans",
    "Specific food recommendations",
    "Nutritional guidelines",
    "Dietary restrictions management"
  ],
  "exerciseRoutine": [
    "Specific exercises with frequency",
    "Duration and intensity",
    "Weekly schedule",
    "Progress guidelines"
  ],
  "lifestyleRecommendations": [
    "Daily routine adjustments",
    "Health habits",
    "Stress management",
    "Sleep recommendations"
  ],
  "progressTracking": [
    "Specific metrics to track",
    "Measurement methods",
    "Progress indicators",
    "Success criteria"
  ]
}

Important: Provide only valid JSON response. No additional text or formatting.`;

    const response = await callGoogleAI(prompt);
    
    // Clean up the response
    const jsonStr = response.replace(/```json|```/g, '').trim();
    
    try {
      const parsedResponse = JSON.parse(jsonStr);
      return {
        goals: parsedResponse.goals,
        dietPlan: parsedResponse.dietPlan,
        exerciseRoutine: parsedResponse.exerciseRoutine,
        lifestyleRecommendations: parsedResponse.lifestyleRecommendations,
        progressTracking: parsedResponse.progressTracking
      };
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return {
        goals: [
          'Achieve optimal health through balanced nutrition',
          'Develop sustainable exercise routine',
          'Improve overall fitness and well-being'
        ],
        dietPlan: [
          'Balanced meals with proper macronutrient distribution',
          'Regular meal timing for optimal metabolism',
          'Adequate hydration throughout the day',
          'Healthy snack options between meals'
        ],
        exerciseRoutine: [
          'Cardio exercises 3-5 times per week',
          'Strength training 2-3 times per week',
          'Flexibility work daily',
          'Active recovery days'
        ],
        lifestyleRecommendations: [
          'Consistent sleep schedule (7-9 hours)',
          'Regular stress management practices',
          'Work-life balance optimization',
          'Regular health check-ups'
        ],
        progressTracking: [
          'Weekly weight and measurements',
          'Monthly fitness assessments',
          'Progress photos every 4 weeks',
          'Regular health markers monitoring'
        ]
      };
    }
  } catch (error) {
    console.error('Error generating health plan:', error);
    return {
      goals: [
        'Improve overall health',
        'Maintain healthy weight',
        'Increase physical activity'
      ],
      dietPlan: [
        'Regular balanced meals',
        'Proper portion control',
        'Adequate hydration',
        'Healthy snack choices'
      ],
      exerciseRoutine: [
        'Regular cardio exercises',
        'Basic strength training',
        'Daily stretching',
        'Active lifestyle habits'
      ],
      lifestyleRecommendations: [
        'Adequate sleep',
        'Stress management',
        'Regular breaks',
        'Healthy daily routine'
      ],
      progressTracking: [
        'Regular weight monitoring',
        'Body measurements',
        'Fitness progress',
        'Energy levels'
      ]
    };
  }
}

export async function assessHealthRisks(input: HealthRiskInput): Promise<HealthRiskAssessment> {
  try {
    const prompt = `As a health risk assessment AI, evaluate these health factors:
Age: ${input.age}
Symptoms: ${input.symptoms.join(', ')}
Medical History: ${input.medicalHistory.join(', ')}
Lifestyle: ${input.lifestyle.join(', ')}
Medical Conditions: ${input.medicalConditions.join(', ')}

Please provide a structured risk assessment with:
1. Overall risk level
2. Probability of serious conditions
3. Specific recommendations

Format your response exactly like this:
Risk Level:
[State risk level]

Probability:
[State probability assessment]

Recommendations:
[List specific recommendations]`;

    const response = await callGoogleAI(prompt);

    const riskMatch = response.match(/Risk Level:\n([\s\S]*?)(?=\n\nProbability:|$)/);
    const probabilityMatch = response.match(/Probability:\n([\s\S]*?)(?=\n\nRecommendations:|$)/);
    const recommendationsMatch = response.match(/Recommendations:\n([\s\S]*?)$/);

    return {
      risk: riskMatch?.[1]?.trim() || 'Unknown',
      probability: probabilityMatch?.[1]?.trim() || 'Unable to determine',
      recommendations: recommendationsMatch?.[1]
        ?.split('\n')
        .map(line => line.replace(/^[•\-\*]\s*/, '').trim())
        .filter(Boolean) || ['Consult healthcare provider for detailed assessment']
    };
  } catch (error) {
    console.error('Error assessing health risks:', error);
    return {
      risk: 'Unable to assess',
      probability: 'Unknown',
      recommendations: ['Please consult a healthcare professional for proper assessment']
    };
  }
}

export async function getEmergencyGuidance(description: string): Promise<EmergencyGuidance> {
  try {
    const prompt = `As an emergency medical AI assistant, assess this situation and provide immediate guidance:
${description}

Please provide a structured emergency response with:
1. Severity assessment (HIGH, MEDIUM, LOW)
2. Immediate situation assessment
3. Step-by-step actions to take
4. Important things to avoid

Format your response exactly like this:
Severity:
[State severity level]

Assessment:
[Provide situation assessment]

Immediate Actions:
[List immediate steps to take]

Do Not:
[List actions to avoid]`;

    const response = await callGoogleAI(prompt);

    const severityMatch = response.match(/Severity:\n([\s\S]*?)(?=\n\nAssessment:|$)/);
    const assessmentMatch = response.match(/Assessment:\n([\s\S]*?)(?=\n\nImmediate Actions:|$)/);
    const actionsMatch = response.match(/Immediate Actions:\n([\s\S]*?)(?=\n\nDo Not:|$)/);
    const doNotMatch = response.match(/Do Not:\n([\s\S]*?)$/);

    const parseList = (match: RegExpMatchArray | null): string[] => {
      if (!match?.[1]) return [];
      return match[1].split('\n')
        .map(line => line.replace(/^[•\-\*]\s*/, '').trim())
        .filter(Boolean);
    };

    const severity = severityMatch?.[1]?.trim().toUpperCase();
    return {
      severity: (severity === 'HIGH' || severity === 'MEDIUM' || severity === 'LOW') ? severity : 'HIGH',
      assessment: assessmentMatch?.[1]?.trim() || 'Immediate medical attention recommended',
      immediateActions: parseList(actionsMatch),
      doNotDo: parseList(doNotMatch)
    };
  } catch (error) {
    console.error('Error getting emergency guidance:', error);
    return {
      severity: 'HIGH',
      assessment: 'Unable to assess - seek immediate medical attention',
      immediateActions: ['Call emergency services', 'Stay calm', 'Follow emergency operator instructions'],
      doNotDo: ['Do not delay seeking help', 'Do not move if seriously injured', 'Do not ignore symptoms']
    };
  }
}

export async function getHealthCoachResponse(query: string): Promise<string> {
  try {
    const prompt = `As a health coach AI assistant, provide helpful guidance for this query:
${query}

Please provide clear, actionable advice while being mindful of medical limitations. Include:
1. Direct response to the query
2. Practical recommendations
3. Important considerations
4. When to seek professional help`;

    const response = await callGoogleAI(prompt);
    return response || 'I apologize, but I am unable to provide specific guidance at this moment. Please consult a healthcare professional for accurate advice.';
  } catch (error) {
    console.error('Error getting health coach response:', error);
    return 'I apologize, but I am unable to provide specific guidance at this moment. Please consult a healthcare professional for accurate advice.';
  }
}

export async function getMentalHealthSupport(input: string): Promise<MentalHealthResponse> {
  try {
    const prompt = `As a mental health AI assistant, provide support and recommendations for the following situation: ${input}. 
    Provide a structured response with:
    1. A brief support message
    2. General recommendations
    3. Resources for further help
    
    Format the response in a clear, supportive tone.`;

    const response = await callGoogleAI(prompt);

    let supportText = '';
    if (response) {
      supportText = response;
    }

    if (!supportText.trim()) {
      throw new Error('Failed to generate mental health support response');
    }

    // Parse the response into structured format
    const sections = supportText.split('\n').filter(line => line.trim());
    const result: MentalHealthResponse = {
      status: 'Success',
      support: sections[0] || '',
      recommendations: [],
      suggestions: [],
      resources: []
    };

    sections.forEach(section => {
      if (section.toLowerCase().includes('recommend')) {
        result.recommendations = [section];
      } else if (section.toLowerCase().includes('suggest')) {
        result.suggestions = [section];
      } else if (section.toLowerCase().includes('resource')) {
        result.resources = [section];
      }
    });

    return result;
  } catch (error) {
    console.error('Mental Health Support Error:', error);
    throw handleApiError(error);
  }
}

export async function getHealthAdvice(query: string): Promise<HealthAdviceResponse> {
  try {
    // Create a more comprehensive prompt for better context
    const prompt = `As a knowledgeable healthcare AI assistant, provide a detailed but concise response to the following health question. Include specific recommendations when relevant. Consider both immediate advice and preventive measures. Question: ${query}

    Format the response to include:
    1. A clear, direct answer
    2. Key points or explanations
    3. Specific recommendations or action items
    4. Any relevant warnings or precautions
    5. When to seek professional medical help

    Remember to maintain a professional tone while being accessible and clear.`;

    const response = await callGoogleAI(prompt);

    // Parse the response to extract recommendations
    const lines = response.split('\n').filter(line => line.trim());
    const recommendations = lines
      .filter(line => line.startsWith('-') || line.startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '').trim());

    return {
      advice: response,
      recommendations: recommendations.length > 0 ? recommendations : undefined,
      disclaimer: "This information is for educational purposes only and should not replace professional medical advice. If you have serious concerns, please consult a healthcare provider."
    };
  } catch (error) {
    if (FALLBACK_ENABLED) {
      // Enhanced fallback response system
      const keywords = query.toLowerCase().split(' ');
      
      // Check for common symptoms first
      for (const [symptom, advice] of Object.entries(commonSymptoms)) {
        if (keywords.includes(symptom)) {
          return {
            advice,
            recommendations: [
              'Monitor your symptoms',
              'Stay hydrated and get adequate rest',
              'Consider over-the-counter remedies if appropriate',
              'Consult a healthcare provider if symptoms worsen or persist'
            ],
            disclaimer: "This is a fallback response. For accurate medical advice, please consult a healthcare provider."
          };
        }
      }

      // General fallback response
      return {
        advice: "I apologize, but I'm unable to provide specific advice at the moment. For accurate medical guidance, please consult with a qualified healthcare provider.",
        recommendations: [
          'Document your symptoms',
          'Consider scheduling a check-up with your healthcare provider',
          'Keep track of when symptoms started and any changes',
          'Maintain general health practices like proper rest and hydration'
        ],
        disclaimer: "This is a fallback response. For accurate medical advice, please consult a healthcare provider."
      };
    }
    throw handleApiError(error);
  }
}

// Re-export renamed functions for backward compatibility
export const analyzeSymptoms = getSymptomAnalysis;

// Emergency severity assessment
export const assessEmergencySeverity = (symptoms: string[]): 'low' | 'medium' | 'high' | 'critical' => {
  const criticalSymptoms = [
    'chest pain', 'difficulty breathing', 'severe bleeding',
    'unconscious', 'stroke', 'heart attack'
  ];
  const highSymptoms = [
    'head injury', 'broken bone', 'severe burn',
    'deep cut', 'poisoning', 'allergic reaction'
  ];
  const mediumSymptoms = [
    'moderate pain', 'fever', 'dizziness',
    'vomiting', 'dehydration', 'infection'
  ];

  if (symptoms.some(s => criticalSymptoms.some(cs => s.includes(cs)))) {
    return 'critical';
  }
  if (symptoms.some(s => highSymptoms.some(hs => s.includes(hs)))) {
    return 'high';
  }
  if (symptoms.some(s => mediumSymptoms.some(ms => s.includes(ms)))) {
    return 'medium';
  }
  return 'low';
};

// Get emergency response based on symptoms and severity
export const getEmergencyResponse = async (
  messages: any[],
  context: {
    symptoms: string[];
    severity: string;
    location: string;
  }
): Promise<string> => {
  const { symptoms, severity, location } = context;
  const lastMessage = messages[messages.length - 1];

  // Prepare prompt for AI
  const prompt = `
Emergency Medical Assistant:
User Message: ${lastMessage.content}
Detected Symptoms: ${symptoms.join(', ')}
Assessed Severity: ${severity}
Location: ${location}

Please provide:
1. Immediate assessment
2. First aid instructions
3. Next steps
4. Warning signs to watch for
5. When to call emergency services

Response:`;

  try {
    // Call AI service for response
    const aiResponse = await callGoogleAI(prompt);
    return aiResponse;
  } catch (error) {
    console.error('Error getting emergency response:', error);
    return 'I apologize, but I am having trouble processing your request. If this is an emergency, please call emergency services immediately.';
  }
};

// Get nearby emergency services
export const getNearbyEmergencyServices = async (
  location: { lat: number; lng: number },
  type: 'all' | 'hospital' | 'ambulance' = 'all',
  radius: number = 5000
): Promise<any[]> => {
  try {
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="hospital"](around:${radius},${location.lat},${location.lng});
        node["emergency"="ambulance_station"](around:${radius},${location.lat},${location.lng});
        way["amenity"="hospital"](around:${radius},${location.lat},${location.lng});
      );
      out body;
      >;
      out skel qt;
    `;

    const response = await axios.get('https://overpass-api.de/api/interpreter', {
      params: { data: query }
    });

    const services: any[] = response.data.elements
      .filter((element: any) => element.type === 'node' && element.tags)
      .map((element: any) => ({
        id: element.id.toString(),
        name: element.tags.name || 'Unnamed Service',
        type: element.tags.emergency === 'ambulance_station' ? 'ambulance' : 'hospital',
        location: {
          lat: element.lat,
          lng: element.lon
        },
        distance: calculateDistance(
          location,
          { lat: element.lat, lng: element.lon }
        ),
        estimatedTime: Math.round(calculateDistance(
          location,
          { lat: element.lat, lng: element.lon }
        ) * 2), // Rough estimate: 2 minutes per km
        phone: element.tags.phone || element.tags['contact:phone'] || 'Not available',
        address: element.tags['addr:full'] || 
                `${element.tags['addr:street'] || ''} ${element.tags['addr:housenumber'] || ''}`.trim() ||
                'Address not available',
        available: true,
        services: getServicesList(element.tags),
        rating: element.tags.rating ? parseFloat(element.tags.rating) : undefined
      }));

    return type === 'all' 
      ? services 
      : services.filter(service => service.type === type);
  } catch (error) {
    console.error('Error fetching emergency services:', error);
    return [];
  }
};

// Helper function to calculate distance between two points
const calculateDistance = (
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Helper function to extract services from tags
const getServicesList = (tags: any): string[] => {
  const services: string[] = [];
  
  if (tags.emergency === 'yes') services.push('Emergency Care');
  if (tags.healthcare === 'hospital') services.push('Hospital Care');
  if (tags.emergency === 'ambulance_station') services.push('Ambulance Service');
  if (tags.healthcare === 'intensive') services.push('Intensive Care');
  if (tags.healthcare === 'trauma') services.push('Trauma Center');
  
  return services.length ? services : ['General Medical Services'];
};

export async function analyzeNutrition(meals: string[]): Promise<NutritionAnalysis> {
  try {
    const prompt = `As a nutrition AI assistant, analyze the nutritional content of these meals: ${meals.join('\n')}. 
    Provide a structured response with:
    1. A brief nutritional analysis
    2. General recommendations
    
    Format the response in a clear, supportive tone.`;

    const response = await callGoogleAI(prompt);

    let analysisText = '';
    if (response) {
      analysisText = response;
    }

    if (!analysisText.trim()) {
      throw new Error('Failed to generate nutrition analysis response');
    }

    // Parse the response into structured format
    const sections = analysisText.split('\n').filter(line => line.trim());
    const result: NutritionAnalysis = {
      calories: 2000, // Default values, should be calculated based on AI response
      macronutrients: {
        protein: 50,
        carbs: 250,
        fats: 70
      },
      recommendations: []
    };

    sections.forEach(section => {
      if (section.toLowerCase().includes('recommend')) {
        result.recommendations = [section];
      }
    });

    return result;
  } catch (error) {
    console.error('Nutrition Analysis Error:', error);
    throw handleApiError(error);
  }
};

function mapTriageToSeverity(triage: string): string {
  const map: { [key: string]: string } = {
    'emergency': 'HIGH',
    'consultation_24': 'MEDIUM',
    'consultation_72': 'LOW',
    'self_care': 'LOW'
  };
  return map[triage] || 'Unknown';
}

function mapTriageToUrgency(triage: string): string {
  const map: { [key: string]: string } = {
    'emergency': 'Immediate medical attention needed',
    'consultation_24': 'Consult doctor within 24 hours',
    'consultation_72': 'Consult doctor within 72 hours',
    'self_care': 'Self-care appropriate'
  };
  return map[triage] || 'Unknown';
}

function getRecommendations(condition: string): string[] {
  // Add condition-specific recommendations
  const defaultRecommendations = [
    'Monitor your symptoms',
    'Stay hydrated and get adequate rest',
    'If symptoms worsen, seek immediate medical attention',
    'Keep a symptom diary to share with your healthcare provider'
  ];

  // Add more specific recommendations based on condition
  return defaultRecommendations;
}

function fallbackAnalysis(symptoms: string[]): string {
  const analysis = symptoms.map(symptom => {
    const key = Object.keys(commonSymptoms).find(k => 
      symptom.toLowerCase().includes(k.toLowerCase())
    );
    return key ? commonSymptoms[key as keyof typeof commonSymptoms] : null;
  }).filter(Boolean);

  if (analysis.length === 0) {
    return 'Please consult with a healthcare provider for a proper evaluation of your symptoms.';
  }

  return analysis.join('\n\n');
}
