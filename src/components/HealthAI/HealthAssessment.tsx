import React, { useState } from 'react';
import { Loader2, Plus, X, AlertCircle } from 'lucide-react';
import {
  performHealthAssessment,
  HealthData,
  getQuickAssessment
} from '../../services/healthAssessment.service';

interface HealthAssessmentProps {
  onAssessmentComplete?: (assessment: string) => void;
}

export default function HealthAssessment({ onAssessmentComplete }: HealthAssessmentProps) {
  const [healthData, setHealthData] = useState<HealthData>({
    age: 0,
    gender: '',
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
    symptoms: []
  });

  const [currentItem, setCurrentItem] = useState({
    medicalHistory: '',
    familyHistory: '',
    medication: '',
    symptom: ''
  });

  const [assessment, setAssessment] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showVitals, setShowVitals] = useState(false);

  const handleAddItem = (
    field: 'medicalHistory' | 'familyHistory' | 'currentMedications' | 'symptoms',
    value: string
  ) => {
    if (value.trim()) {
      setHealthData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setCurrentItem(prev => ({
        ...prev,
        [field.replace('current', '').toLowerCase()]: ''
      }));
    }
  };

  const handleRemoveItem = (
    field: 'medicalHistory' | 'familyHistory' | 'currentMedications' | 'symptoms',
    index: number
  ) => {
    setHealthData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (field: keyof HealthData, value: any) => {
    setHealthData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLifestyleChange = (field: keyof HealthData['lifestyle'], value: any) => {
    setHealthData(prev => ({
      ...prev,
      lifestyle: {
        ...prev.lifestyle,
        [field]: value
      }
    }));
  };

  const handleVitalsChange = (field: keyof NonNullable<HealthData['vitals']>, value: number) => {
    setHealthData(prev => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        [field]: value
      }
    }));
  };

  const validateData = (): boolean => {
    if (healthData.age <= 0) {
      setError('Please enter a valid age');
      return false;
    }
    if (!healthData.gender) {
      setError('Please select a gender');
      return false;
    }
    if (healthData.weight <= 0 || healthData.height <= 0) {
      setError('Please enter valid weight and height');
      return false;
    }
    return true;
  };

  const handleAssessment = async () => {
    if (!validateData()) return;

    setLoading(true);
    setError('');

    try {
      const result = await performHealthAssessment(healthData);
      setAssessment(result);
      if (onAssessmentComplete) {
        onAssessmentComplete(result);
      }
    } catch (err) {
      setError('Failed to perform health assessment. Please try again.');
      console.error('Health assessment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Health Assessment</h2>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            type="number"
            value={healthData.age || ''}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={healthData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            value={healthData.weight || ''}
            onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height (m)
          </label>
          <input
            type="number"
            value={healthData.height || ''}
            onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Lifestyle Factors */}
      <h3 className="text-lg font-medium text-gray-800 mb-4">Lifestyle Factors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Smoking
          </label>
          <select
            value={healthData.lifestyle.smoking.toString()}
            onChange={(e) => handleLifestyleChange('smoking', e.target.value === 'true')}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alcohol Consumption
          </label>
          <select
            value={healthData.lifestyle.alcohol}
            onChange={(e) => handleLifestyleChange('alcohol', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="none">None</option>
            <option value="occasional">Occasional</option>
            <option value="moderate">Moderate</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exercise Level
          </label>
          <select
            value={healthData.lifestyle.exercise}
            onChange={(e) => handleLifestyleChange('exercise', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="very active">Very Active</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diet Quality
          </label>
          <select
            value={healthData.lifestyle.diet}
            onChange={(e) => handleLifestyleChange('diet', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="poor">Poor</option>
            <option value="fair">Fair</option>
            <option value="good">Good</option>
            <option value="excellent">Excellent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sleep (hours/night)
          </label>
          <input
            type="number"
            value={healthData.lifestyle.sleep || ''}
            onChange={(e) => handleLifestyleChange('sleep', parseInt(e.target.value) || 0)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stress Level
          </label>
          <select
            value={healthData.lifestyle.stress}
            onChange={(e) => handleLifestyleChange('stress', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Medical History */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Medical History</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={currentItem.medicalHistory}
            onChange={(e) => setCurrentItem(prev => ({ ...prev, medicalHistory: e.target.value }))}
            placeholder="Enter medical condition..."
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={() => handleAddItem('medicalHistory', currentItem.medicalHistory)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {healthData.medicalHistory.map((condition, index) => (
            <div
              key={index}
              className="inline-flex items-center bg-blue-50 rounded-full px-3 py-1 text-sm text-blue-700"
            >
              <span>{condition}</span>
              <button
                onClick={() => handleRemoveItem('medicalHistory', index)}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Family History */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Family History</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={currentItem.familyHistory}
            onChange={(e) => setCurrentItem(prev => ({ ...prev, familyHistory: e.target.value }))}
            placeholder="Enter family medical history..."
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={() => handleAddItem('familyHistory', currentItem.familyHistory)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {healthData.familyHistory.map((condition, index) => (
            <div
              key={index}
              className="inline-flex items-center bg-purple-50 rounded-full px-3 py-1 text-sm text-purple-700"
            >
              <span>{condition}</span>
              <button
                onClick={() => handleRemoveItem('familyHistory', index)}
                className="ml-2 text-purple-500 hover:text-purple-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Current Medications */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Current Medications</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={currentItem.medication}
            onChange={(e) => setCurrentItem(prev => ({ ...prev, medication: e.target.value }))}
            placeholder="Enter medication..."
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={() => handleAddItem('currentMedications', currentItem.medication)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {healthData.currentMedications.map((medication, index) => (
            <div
              key={index}
              className="inline-flex items-center bg-green-50 rounded-full px-3 py-1 text-sm text-green-700"
            >
              <span>{medication}</span>
              <button
                onClick={() => handleRemoveItem('currentMedications', index)}
                className="ml-2 text-green-500 hover:text-green-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Current Symptoms */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Current Symptoms</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={currentItem.symptom}
            onChange={(e) => setCurrentItem(prev => ({ ...prev, symptom: e.target.value }))}
            placeholder="Enter symptom..."
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={() => handleAddItem('symptoms', currentItem.symptom)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {healthData.symptoms.map((symptom, index) => (
            <div
              key={index}
              className="inline-flex items-center bg-yellow-50 rounded-full px-3 py-1 text-sm text-yellow-700"
            >
              <span>{symptom}</span>
              <button
                onClick={() => handleRemoveItem('symptoms', index)}
                className="ml-2 text-yellow-500 hover:text-yellow-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Vitals (Optional) */}
      <div className="mb-8">
        <button
          onClick={() => setShowVitals(!showVitals)}
          className="text-lg font-medium text-gray-800 flex items-center gap-2 mb-4"
        >
          <span>Vital Signs</span>
          <span className="text-sm text-gray-500">(Optional)</span>
        </button>
        
        {showVitals && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heart Rate (bpm)
              </label>
              <input
                type="number"
                value={healthData.vitals?.heartRate || ''}
                onChange={(e) => handleVitalsChange('heartRate', parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={healthData.vitals?.temperature || ''}
                onChange={(e) => handleVitalsChange('temperature', parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oxygen Saturation (%)
              </label>
              <input
                type="number"
                value={healthData.vitals?.oxygenSaturation || ''}
                onChange={(e) => handleVitalsChange('oxygenSaturation', parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      <button
        onClick={handleAssessment}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
        } transition-colors`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            Performing Assessment...
          </span>
        ) : (
          'Perform Health Assessment'
        )}
      </button>

      {assessment && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Health Assessment Results</h3>
          <div className="prose max-w-none">
            {assessment.split('\n').map((line, index) => (
              <p key={index} className="mb-2">{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
