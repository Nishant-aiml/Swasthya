import React, { useState } from 'react';
import { assessHealthRisks } from '../../services/healthAI';
import type { HealthRiskInput } from '../../services/healthAI';

interface FormData {
  age: number;
  gender: string;
  height: number;
  weight: number;
  bloodPressure: string;
  medicalHistory: string[];
  familyHistory: string[];
  lifestyle: {
    smoking: string;
    alcohol: string;
    exercise: string;
    diet: string;
    stress: string;
  };
  symptoms: string[];
  medicalConditions: string[];
}

const initialFormData: FormData = {
  age: 0,
  gender: '',
  height: 0,
  weight: 0,
  bloodPressure: '',
  medicalHistory: [],
  familyHistory: [],
  lifestyle: {
    smoking: 'no',
    alcohol: 'none',
    exercise: 'moderate',
    diet: 'balanced',
    stress: 'moderate'
  },
  symptoms: [],
  medicalConditions: []
};

export default function HealthRiskAssessment() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [assessment, setAssessment] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'lifestyle') {
        setFormData(prev => ({
          ...prev,
          lifestyle: {
            ...prev.lifestyle,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayInput = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    const values = e.target.value.split(',').map(v => v.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const input: HealthRiskInput = {
        age: formData.age,
        symptoms: formData.symptoms,
        medicalHistory: formData.medicalHistory,
        lifestyle: [
          formData.lifestyle.smoking,
          formData.lifestyle.alcohol,
          formData.lifestyle.exercise,
          formData.lifestyle.diet,
          formData.lifestyle.stress
        ],
        medicalConditions: formData.medicalConditions
      };

      const result = await assessHealthRisks(input);
      setAssessment(result);
    } catch (err) {
      setError('Failed to assess health risks. Please try again.');
      console.error('Health risk assessment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Health Risk Assessment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Lifestyle Factors */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lifestyle Factors</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Smoking</label>
              <select
                name="lifestyle.smoking"
                value={formData.lifestyle.smoking}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="no">No</option>
                <option value="occasional">Occasional</option>
                <option value="regular">Regular</option>
                <option value="heavy">Heavy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Alcohol Consumption</label>
              <select
                name="lifestyle.alcohol"
                value={formData.lifestyle.alcohol}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="none">None</option>
                <option value="occasional">Occasional</option>
                <option value="moderate">Moderate</option>
                <option value="frequent">Frequent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Exercise Level</label>
              <select
                name="lifestyle.exercise"
                value={formData.lifestyle.exercise}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="very_active">Very Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Medical History</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Medical Conditions (comma-separated)
            </label>
            <input
              type="text"
              value={formData.medicalConditions.join(', ')}
              onChange={(e) => handleArrayInput(e, 'medicalConditions')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., diabetes, hypertension"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Family History (comma-separated)
            </label>
            <input
              type="text"
              value={formData.familyHistory.join(', ')}
              onChange={(e) => handleArrayInput(e, 'familyHistory')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., heart disease, cancer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Symptoms (comma-separated)
            </label>
            <input
              type="text"
              value={formData.symptoms.join(', ')}
              onChange={(e) => handleArrayInput(e, 'symptoms')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., headache, fatigue"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Assessing...' : 'Assess Health Risks'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {assessment && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Assessment Results</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-gray-700">Risk Level</h4>
              <p className="text-gray-600">{assessment.risk}</p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-700">Probability</h4>
              <p className="text-gray-600">{assessment.probability}</p>
            </div>

            {assessment.recommendations?.length > 0 && (
              <div>
                <h4 className="text-lg font-medium text-gray-700">Recommendations</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {assessment.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-gray-600">{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded">
            <p className="text-sm text-blue-800">
              <strong>Important:</strong> This assessment is for informational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
