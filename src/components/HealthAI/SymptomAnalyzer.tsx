import React, { useState } from 'react';
import { Stethoscope, AlertCircle, Search, Brain } from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
}

interface Condition {
  name: string;
  probability: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
}

export default function SymptomAnalyzer() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(false);

  const commonSymptoms: Symptom[] = [
    { id: 'fever', name: 'Fever', severity: 'medium' },
    { id: 'cough', name: 'Cough', severity: 'low' },
    { id: 'headache', name: 'Headache', severity: 'medium' },
    { id: 'fatigue', name: 'Fatigue', severity: 'low' },
    { id: 'shortness_of_breath', name: 'Shortness of Breath', severity: 'high' },
  ];

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // Simulate API call to AI model
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResults([
        {
          name: 'Common Cold',
          probability: 0.85,
          severity: 'low',
          description: 'A viral infection of the upper respiratory tract',
          recommendations: [
            'Rest and stay hydrated',
            'Take over-the-counter cold medications',
            'Monitor symptoms for 3-4 days'
          ]
        }
      ]);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-emerald-600" />
          Symptom Analyzer
        </h2>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search symptoms..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {commonSymptoms.map((symptom) => (
            <button
              key={symptom.id}
              onClick={() => setSelectedSymptoms(prev => 
                prev.includes(symptom.id)
                  ? prev.filter(id => id !== symptom.id)
                  : [...prev, symptom.id]
              )}
              className={`p-3 rounded-lg border text-left flex items-center gap-2
                ${selectedSymptoms.includes(symptom.id)
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 hover:border-emerald-500'
                }`}
            >
              <Brain className="h-4 w-4" />
              {symptom.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={selectedSymptoms.length === 0 || loading}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>

        {results.length > 0 && (
          <div className="space-y-4">
            {results.map((condition, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{condition.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-sm
                    ${condition.severity === 'high'
                      ? 'bg-red-100 text-red-700'
                      : condition.severity === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {Math.round(condition.probability * 100)}% Match
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{condition.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Recommendations:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {condition.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}