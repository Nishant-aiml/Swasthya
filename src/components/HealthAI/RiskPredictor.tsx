import React, { useState } from 'react';
import { AlertTriangle, Heart, Activity, Scale, Dna, Loader2, AlertCircle, Send } from 'lucide-react';
import { assessHealthRisks } from '../../services/healthAI';
import type { HealthRiskInput, HealthRiskAssessment } from '../../services/healthAI';

interface HealthMetric {
  id: keyof HealthRiskInput;
  name: string;
  value: string;
  unit?: string;
  normalRange?: string;
  validate?: (value: string) => string | undefined;
  options?: string[];
}

export default function RiskPredictor() {
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    { 
      id: 'age', 
      name: 'Age', 
      value: '', 
      unit: 'years',
      validate: (value) => {
        const age = parseInt(value);
        if (isNaN(age) || age < 0 || age > 120) return 'Please enter a valid age between 0 and 120';
        return undefined;
      }
    },
    { 
      id: 'symptoms', 
      name: 'Symptoms', 
      value: '',
      options: ['Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness', 'Pain'],
      validate: (value) => {
        if (!value.trim()) return 'Please select at least one symptom';
        return undefined;
      }
    },
    { 
      id: 'medicalHistory', 
      name: 'Medical History', 
      value: '',
      options: ['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Cancer', 'None'],
      validate: (value) => value ? undefined : 'Please select your medical history'
    },
    { 
      id: 'lifestyle', 
      name: 'Lifestyle', 
      value: '',
      options: ['Sedentary', 'Moderately Active', 'Active', 'Very Active'],
      validate: (value) => value ? undefined : 'Please select your lifestyle'
    },
    { 
      id: 'medicalConditions', 
      name: 'Current Medical Conditions', 
      value: '',
      options: ['None', 'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Other'],
      validate: (value) => value ? undefined : 'Please select any current medical conditions'
    }
  ]);

  const [assessment, setAssessment] = useState<HealthRiskAssessment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleMetricChange = (id: keyof HealthRiskInput, value: string) => {
    setMetrics(metrics.map(metric => 
      metric.id === id ? { ...metric, value } : metric
    ));

    if (fieldErrors[id]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const validateFields = (): boolean => {
    const errors: Record<string, string> = {};
    
    metrics.forEach(metric => {
      if (!metric.value.trim()) {
        errors[metric.id] = `${metric.name} is required`;
      } else if (metric.validate) {
        const error = metric.validate(metric.value);
        if (error) errors[metric.id] = error;
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateFields()) {
      return;
    }

    setLoading(true);
    setError('');
    setAssessment(null);

    try {
      const healthRiskInput: HealthRiskInput = {
        age: parseInt(metrics.find(m => m.id === 'age')?.value || '0'),
        symptoms: metrics.find(m => m.id === 'symptoms')?.value.split(',') || [],
        medicalHistory: metrics.find(m => m.id === 'medicalHistory')?.value.split(',') || [],
        lifestyle: metrics.find(m => m.id === 'lifestyle')?.value.split(',') || [],
        medicalConditions: metrics.find(m => m.id === 'medicalConditions')?.value.split(',') || []
      };

      const result = await assessHealthRisks(healthRiskInput);
      setAssessment(result);
    } catch (err) {
      setError('Failed to assess health risks. Please try again.');
      console.error('Risk assessment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Health Risk Assessment</h2>
          <p className="text-gray-600">
            Enter your health information below for a personalized risk assessment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric) => (
              <div key={metric.id} className="space-y-2">
                <label htmlFor={metric.id} className="block text-sm font-medium text-gray-700">
                  {metric.name}
                </label>
                <div className="relative">
                  {metric.options ? (
                    <select
                      id={metric.id}
                      value={metric.value}
                      onChange={(e) => handleMetricChange(metric.id, e.target.value)}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ${fieldErrors[metric.id] ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select {metric.name.toLowerCase()}</option>
                      {metric.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      id={metric.id}
                      value={metric.value}
                      onChange={(e) => handleMetricChange(metric.id, e.target.value)}
                      className={`w-full p-2 pr-16 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ${fieldErrors[metric.id] ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={`Enter ${metric.name.toLowerCase()}`}
                    />
                  )}
                  {metric.unit && (
                    <span className="absolute right-3 top-2 text-gray-400 text-sm">
                      {metric.unit}
                    </span>
                  )}
                </div>
                {fieldErrors[metric.id] ? (
                  <p className="text-xs text-red-500">{fieldErrors[metric.id]}</p>
                ) : metric.normalRange && (
                  <p className="text-xs text-gray-500">
                    Normal range: {metric.normalRange}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 
                       disabled:bg-blue-300 flex items-center space-x-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Assess Risks</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2 text-red-700">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {assessment && (
          <div className="mt-8 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Risk Assessment Results</h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center space-x-2 text-yellow-800">
                    <AlertTriangle className="text-yellow-500" />
                    <span>Risk Level</span>
                  </h4>
                  <p className="text-gray-700 whitespace-pre-line">{assessment.risk}</p>
                  <p className="text-sm text-gray-600 mt-1">Probability: {assessment.probability}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center space-x-2 text-green-800">
                    <Heart className="text-green-500" />
                    <span>Recommendations</span>
                  </h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {assessment.recommendations.map((rec, index) => (
                      <li key={index} className="text-gray-700">{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 italic text-center">
              Note: This assessment is for informational purposes only. 
              Always consult with healthcare professionals for medical advice.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}