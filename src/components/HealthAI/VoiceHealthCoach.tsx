import React, { useState } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { getHealthCoachResponse } from '../../services/healthAI';

export default function VoiceHealthCoach() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await getHealthCoachResponse(query);
      setResponse(response);
      setQuery('');
    } catch (error) {
      console.error('Error getting coach response:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, implement speech recognition here
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900">Swasthya</h3>
        <p className="text-xs text-gray-600">by Shrinu</p>
      </div>

      <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
        <div className="space-y-4">
          {response && (
            <div className="p-4 rounded-lg bg-white">
              <p className="text-gray-700">{response}</p>
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your health question..."
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
            
            <button
              onClick={toggleListening}
              className={`p-2 rounded-lg ${
                isListening
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isListening ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading || !query.trim()}
              className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}