import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ArrowRight, Info, Activity, Brain, Thermometer, Stethoscope } from 'lucide-react';
import { Symptom } from '../../types';

const commonSymptoms: Symptom[] = [
  {
    id: 'fever',
    name: 'Fever',
    severity: 'medium',
    description: 'Elevated body temperature above normal',
    commonCauses: ['Infection', 'Inflammation', 'Heat exhaustion'],
    immediateActions: [
      'Rest and stay hydrated',
      'Take temperature regularly',
      'Use fever reducer if above 102°F'
    ],
    requiresEmergencyCare: false,
    relatedConditions: ['Flu', 'COVID-19', 'Malaria']
  },
  {
    id: 'chestPain',
    name: 'Chest Pain',
    severity: 'high',
    description: 'Pain or discomfort in the chest area',
    commonCauses: ['Heart attack', 'Angina', 'Muscle strain'],
    immediateActions: [
      'Sit down and rest',
      'Take aspirin if prescribed',
      'Call emergency services'
    ],
    requiresEmergencyCare: true,
    relatedConditions: ['Heart attack', 'Angina', 'Anxiety']
  },
  {
    id: 'breathlessness',
    name: 'Difficulty Breathing',
    severity: 'high',
    description: 'Shortness of breath or difficulty breathing',
    commonCauses: ['Asthma', 'Anxiety', 'Heart conditions'],
    immediateActions: [
      'Sit upright',
      'Use inhaler if prescribed',
      'Practice deep breathing'
    ],
    requiresEmergencyCare: true,
    relatedConditions: ['Asthma', 'Panic attack', 'Heart failure']
  }
];

const severityIcons = {
  low: Activity,
  medium: Thermometer,
  high: AlertCircle
};

const severityColors = {
  low: 'blue',
  medium: 'yellow',
  high: 'red'
};

interface SymptomCheckerProps {
  onEmergencyDetected?: (symptoms: Symptom[]) => void;
  onComplete?: (symptoms: Symptom[], answers: Record<string, string>) => void;
}

export default function SymptomChecker({ onEmergencyDetected, onComplete }: SymptomCheckerProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState<Symptom | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const handleSymptomToggle = (symptomId: string) => {
    const symptom = commonSymptoms.find(s => s.id === symptomId);
    if (!symptom) return;

    const newSelected = selectedSymptoms.includes(symptomId)
      ? selectedSymptoms.filter(id => id !== symptomId)
      : [...selectedSymptoms, symptomId];
    
    setSelectedSymptoms(newSelected);

    // Check for emergency symptoms
    const selectedEmergencySymptoms = commonSymptoms.filter(
      s => newSelected.includes(s.id) && s.requiresEmergencyCare
    );
    
    if (selectedEmergencySymptoms.length > 0) {
      onEmergencyDetected?.(selectedEmergencySymptoms);
    }
  };

  const handleComplete = () => {
    const selectedSymptomObjects = commonSymptoms.filter(s => 
      selectedSymptoms.includes(s.id)
    );
    onComplete?.(selectedSymptomObjects, answers);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-gray-700">
        <Stethoscope className="h-5 w-5" />
        <span className="font-medium">Select your symptoms</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {commonSymptoms.map(symptom => {
          const SeverityIcon = severityIcons[symptom.severity];
          const color = severityColors[symptom.severity];
          const isSelected = selectedSymptoms.includes(symptom.id);

          return (
            <div key={symptom.id} className="space-y-2">
              <button
                onClick={() => handleSymptomToggle(symptom.id)}
                className={`w-full p-3 rounded-lg border transition-colors flex items-center gap-2
                  ${isSelected 
                    ? `bg-${color}-50 border-${color}-200 text-${color}-700` 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
              >
                <SeverityIcon className={`h-5 w-5 ${isSelected ? `text-${color}-500` : 'text-gray-400'}`} />
                <span className="font-medium">{symptom.name}</span>
                {isSelected && <CheckCircle2 className={`h-4 w-4 ml-auto text-${color}-500`} />}
              </button>

              {isSelected && (
                <div className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm">
                  <p className="text-gray-600">{symptom.description}</p>
                  <button
                    onClick={() => setShowDetails(showDetails === symptom.id ? null : symptom.id)}
                    className="mt-1 text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <Info className="h-4 w-4" />
                    <span>{showDetails === symptom.id ? 'Hide details' : 'Show details'}</span>
                  </button>

                  {showDetails === symptom.id && (
                    <div className="mt-2 space-y-2">
                      {symptom.commonCauses && (
                        <div>
                          <p className="font-medium">Common Causes:</p>
                          <ul className="list-disc list-inside">
                            {symptom.commonCauses.map((cause, idx) => (
                              <li key={idx}>{cause}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {symptom.immediateActions && (
                        <div>
                          <p className="font-medium">Immediate Actions:</p>
                          <ul className="list-disc list-inside">
                            {symptom.immediateActions.map((action, idx) => (
                              <li key={idx}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedSymptoms.length > 0 && (
        <button
          onClick={handleComplete}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          Get Assessment
        </button>
      )}
    </div>
  );
}