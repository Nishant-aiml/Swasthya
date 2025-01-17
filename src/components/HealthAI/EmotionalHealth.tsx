import React, { useState } from 'react';
import { getMentalHealthSupport } from '../../services/healthAI';
import type { EmotionalHealth as EmotionalHealthType } from '../../services/healthAI';

export default function EmotionalHealth() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<EmotionalHealthType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!input.trim()) {
      setError('Please describe how you are feeling');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const result = await getMentalHealthSupport(input);
      setAnalysis(result);
    } catch (err) {
      console.error('Error:', err);
      setError('Unable to analyze emotional health. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl shadow-lg">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Swasthya</h2>
            <p className="text-sm text-gray-600">by Shrinu</p>
          </div>
          <p className="text-gray-600 mt-4">
            Share how you're feeling, and let us help support your emotional well-being
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <div>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              placeholder="How are you feeling today? Share your thoughts and emotions..."
              className="w-full min-h-[120px] p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !input.trim()}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center transition-all ${
              loading || !input.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            {loading ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Analyzing...
              </>
            ) : (
              'Analyze Feelings'
            )}
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {analysis && !error && (
            <div className="mt-6 space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis & Support</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-2">Status</h4>
                    <p className="text-gray-600">{analysis.status}</p>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-2">Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {analysis.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="text-gray-600">{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-2">Suggestions</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {analysis.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-gray-600">{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}