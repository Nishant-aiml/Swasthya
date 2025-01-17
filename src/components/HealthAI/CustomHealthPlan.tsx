import React, { useState } from 'react';
import { Activity, Send } from 'lucide-react';
import { generateHealthPlan } from '../../services/healthAI';
import type { HealthPlanPreferences } from '../../services/healthAI';

interface HealthGoal {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const HEALTH_GOALS: HealthGoal[] = [
  {
    id: 'weight-loss',
    name: 'Weight Loss',
    description: 'Achieve healthy weight through diet and exercise',
    icon: Activity,
    color: 'bg-blue-500'
  },
  {
    id: 'nutrition',
    name: 'Better Nutrition',
    description: 'Improve eating habits and diet quality',
    icon: Send,
    color: 'bg-green-500'
  },
  {
    id: 'mental-health',
    name: 'Mental Wellness',
    description: 'Enhance mental health and reduce stress',
    icon: Activity,
    color: 'bg-purple-500'
  }
];

interface UserPreferences {
  dietaryRestrictions: string[];
  exercisePreferences: string[];
  medicalConditions: string[];
  lifestyle: string[];
  fitnessLevel: string;
  timeCommitment: string;
}

export default function CustomHealthPlan() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    dietaryRestrictions: [],
    exercisePreferences: [],
    medicalConditions: [],
    lifestyle: [],
    fitnessLevel: 'moderate',
    timeCommitment: '30',
  });
  const [plan, setPlan] = useState<{ plan: string[]; recommendations: string[]; } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedGoal) {
      setError('Please select a health goal');
      return;
    }

    setLoading(true);
    setError('');
    setPlan(null);
    
    try {
      const planPreferences: HealthPlanPreferences = {
        goals: [selectedGoal],
        dietaryRestrictions: userPreferences.dietaryRestrictions,
        exercisePreferences: [userPreferences.fitnessLevel, `${userPreferences.timeCommitment} minutes per day`, ...userPreferences.exercisePreferences],
        medicalConditions: userPreferences.medicalConditions,
        lifestyle: userPreferences.lifestyle
      };
      
      const response = await generateHealthPlan(planPreferences);
      setPlan({
        plan: response.goals.concat(
          response.dietPlan,
          response.exerciseRoutine,
          response.progressTracking
        ),
        recommendations: response.lifestyleRecommendations
      });
    } catch (error) {
      setError('Failed to generate health plan. Please try again.');
      console.error('Health plan error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = (field: keyof UserPreferences, value: string) => {
    if (field === 'fitnessLevel' || field === 'timeCommitment') {
      setUserPreferences(prev => ({ ...prev, [field]: value }));
    } else {
      setUserPreferences(prev => ({
        ...prev,
        [field]: value.split(',').map(item => item.trim()).filter(Boolean)
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">AI Health Plan Generator</h2>
      </div>

      {/* Health Goals */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Your Goal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {HEALTH_GOALS.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`p-4 rounded-lg border-2 transition-colors text-left
                ${selectedGoal === goal.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-200'
                }`}
            >
              <div className={`${goal.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                <goal.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-gray-900">{goal.name}</h4>
              <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Preferences Form */}
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dietary Restrictions
          </label>
          <input
            type="text"
            value={userPreferences.dietaryRestrictions.join(', ')}
            onChange={(e) => handlePreferenceChange('dietaryRestrictions', e.target.value)}
            placeholder="e.g., vegetarian, gluten-free (comma-separated)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exercise Preferences
          </label>
          <input
            type="text"
            value={userPreferences.exercisePreferences.join(', ')}
            onChange={(e) => handlePreferenceChange('exercisePreferences', e.target.value)}
            placeholder="e.g., yoga, running, swimming (comma-separated)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medical Conditions
          </label>
          <input
            type="text"
            value={userPreferences.medicalConditions.join(', ')}
            onChange={(e) => handlePreferenceChange('medicalConditions', e.target.value)}
            placeholder="e.g., asthma, diabetes (comma-separated)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lifestyle Factors
          </label>
          <input
            type="text"
            value={userPreferences.lifestyle.join(', ')}
            onChange={(e) => handlePreferenceChange('lifestyle', e.target.value)}
            placeholder="e.g., desk job, frequent travel (comma-separated)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fitness Level
          </label>
          <select
            value={userPreferences.fitnessLevel}
            onChange={(e) => handlePreferenceChange('fitnessLevel', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="beginner">Beginner</option>
            <option value="moderate">Moderate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Available (minutes per day)
          </label>
          <input
            type="number"
            value={userPreferences.timeCommitment}
            onChange={(e) => handlePreferenceChange('timeCommitment', e.target.value)}
            min="15"
            max="180"
            step="15"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={loading || !selectedGoal}
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Activity className="h-5 w-5 animate-spin" />
              <span>Generating your plan...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Generate Custom Plan</span>
            </>
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-2">
          <Activity className="h-5 w-5 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Generated Plan */}
      {plan && !error && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Your Personalized Plan</h3>
          <div className="prose prose-indigo max-w-none">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Plan Details</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {plan.plan.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {plan.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-700">{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-2 text-sm text-gray-500">
            <Activity className="h-5 w-5 flex-shrink-0" />
            <p>
              This plan is customized based on your preferences. Adjust your daily routine gradually
              and consult with healthcare professionals before starting any new exercise program.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}