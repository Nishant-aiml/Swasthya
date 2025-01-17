// Medical Knowledge Base and Disease Information System
export interface Disease {
  icd10Code: string;  // International Classification of Diseases code
  name: string;
  scientificName: string;
  category: string[];
  description: string;
  symptoms: Symptom[];
  riskFactors: string[];
  complications: string[];
  diagnosticTests: string[];
  treatments: Treatment[];
  preventions: string[];
  prognosis: string;
  emergencySigns: string[];
}

export interface Symptom {
  id: string;
  name: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  bodyPart: string[];
  associatedConditions: string[];
  redFlags: string[];
  commonCauses: string[];
}

export interface Treatment {
  name: string;
  type: 'medication' | 'procedure' | 'lifestyle' | 'therapy';
  description: string;
  effectiveness: string;
  sideEffects: string[];
  contraindications: string[];
  evidenceLevel: 'high' | 'moderate' | 'low';
}

// Medical Knowledge Database
export const MedicalKnowledgeBase = {
  // Example of structured medical data
  diseases: new Map<string, Disease>([
    ['COVID-19', {
      icd10Code: 'U07.1',
      name: 'COVID-19',
      scientificName: 'SARS-CoV-2 infection',
      category: ['Infectious Disease', 'Respiratory Disease'],
      description: 'COVID-19 is a respiratory illness caused by the SARS-CoV-2 virus...',
      symptoms: [
        {
          id: 'COVID-FEVER',
          name: 'Fever',
          description: 'Elevated body temperature above 37.8°C (100.04°F)',
          severity: 'moderate',
          bodyPart: ['Systemic'],
          associatedConditions: ['Influenza', 'Bacterial Infections'],
          redFlags: ['Temperature above 39.4°C (103°F)', 'Persistent fever > 3 days'],
          commonCauses: ['Viral infections', 'Bacterial infections']
        },
        // Add more symptoms...
      ],
      riskFactors: ['Age > 65', 'Cardiovascular disease', 'Diabetes'],
      complications: ['Pneumonia', 'ARDS', 'Multi-organ failure'],
      diagnosticTests: ['RT-PCR', 'Antigen test', 'Antibody test'],
      treatments: [
        {
          name: 'Paxlovid',
          type: 'medication',
          description: 'Antiviral medication...',
          effectiveness: 'Reduces risk of hospitalization by 89%',
          sideEffects: ['Altered taste', 'Diarrhea'],
          contraindications: ['Severe liver/kidney disease'],
          evidenceLevel: 'high'
        }
      ],
      preventions: ['Vaccination', 'Mask wearing', 'Social distancing'],
      prognosis: 'Variable, depending on risk factors and vaccination status',
      emergencySigns: ['Difficulty breathing', 'Chest pain', 'Confusion']
    }]
    // Add more diseases...
  ]),

  symptoms: new Map<string, Symptom[]>([
    ['Respiratory', [
      {
        id: 'COUGH',
        name: 'Cough',
        description: 'Sudden expulsion of air from the airways',
        severity: 'moderate',
        bodyPart: ['Lungs', 'Throat'],
        associatedConditions: ['Bronchitis', 'Pneumonia', 'COVID-19'],
        redFlags: ['Blood in sputum', 'Severe chest pain'],
        commonCauses: ['Viral infections', 'Allergies', 'Asthma']
      }
      // Add more respiratory symptoms...
    ]],
    // Add more symptom categories...
  ])
};

// Symptom Checker Logic
export interface SymptomCheckerInput {
  primarySymptoms: string[];
  duration: number; // in days
  severity: 'mild' | 'moderate' | 'severe';
  patientAge: number;
  patientGender: 'male' | 'female' | 'other';
  preExistingConditions: string[];
  medications: string[];
}

export interface SymptomCheckerResult {
  possibleConditions: Array<{
    disease: Disease;
    probability: number;
    matchedSymptoms: string[];
    requiresEmergencyCare: boolean;
  }>;
  redFlags: string[];
  recommendedActions: string[];
  differentialDiagnosis: string[];
}

export class MedicalSymptomChecker {
  static checkSymptoms(input: SymptomCheckerInput): SymptomCheckerResult {
    // Initialize result
    const result: SymptomCheckerResult = {
      possibleConditions: [],
      redFlags: [],
      recommendedActions: [],
      differentialDiagnosis: []
    };

    // Check each disease in the knowledge base
    MedicalKnowledgeBase.diseases.forEach((disease, _) => {
      const matchedSymptoms = disease.symptoms
        .filter(symptom => input.primarySymptoms.includes(symptom.name))
        .map(symptom => symptom.name);

      if (matchedSymptoms.length > 0) {
        // Calculate probability based on multiple factors
        const probability = this.calculateProbability(disease, input, matchedSymptoms);

        // Check for emergency signs
        const requiresEmergencyCare = this.checkEmergencySigns(disease, input);

        result.possibleConditions.push({
          disease,
          probability,
          matchedSymptoms,
          requiresEmergencyCare
        });
      }
    });

    // Sort conditions by probability
    result.possibleConditions.sort((a, b) => b.probability - a.probability);

    // Generate recommendations
    this.generateRecommendations(result, input);

    return result;
  }

  private static calculateProbability(
    disease: Disease,
    input: SymptomCheckerInput,
    matchedSymptoms: string[]
  ): number {
    let probability = 0;

    // Base probability from matched symptoms
    probability += (matchedSymptoms.length / disease.symptoms.length) * 0.4;

    // Adjust for severity
    const severityWeight = input.severity === 'severe' ? 0.2 : 
                          input.severity === 'moderate' ? 0.1 : 0;
    probability += severityWeight;

    // Adjust for pre-existing conditions
    const hasRiskFactors = disease.riskFactors.some(factor => 
      input.preExistingConditions.includes(factor));
    if (hasRiskFactors) probability += 0.2;

    // Age-based adjustment
    if (this.isAgeRelevant(disease, input.patientAge)) {
      probability += 0.2;
    }

    return Math.min(probability, 1);
  }

  private static isAgeRelevant(disease: Disease, age: number): boolean {
    // Age relevance logic based on disease characteristics
    // This would need to be customized based on medical knowledge
    return true; // Placeholder
  }

  private static checkEmergencySigns(disease: Disease, input: SymptomCheckerInput): boolean {
    // Check if any emergency signs are present in symptoms
    return disease.emergencySigns.some(sign => 
      input.primarySymptoms.includes(sign));
  }

  private static generateRecommendations(result: SymptomCheckerResult, input: SymptomCheckerInput): void {
    // Generate appropriate medical recommendations
    if (result.possibleConditions.some(condition => condition.requiresEmergencyCare)) {
      result.recommendedActions.push('Seek immediate medical attention');
      result.redFlags.push('Emergency signs detected');
    } else if (input.severity === 'severe') {
      result.recommendedActions.push('Schedule urgent medical consultation');
    } else {
      result.recommendedActions.push('Schedule routine medical consultation');
    }

    // Add differential diagnosis
    result.differentialDiagnosis = result.possibleConditions
      .slice(0, 3)
      .map(condition => condition.disease.name);
  }
}
