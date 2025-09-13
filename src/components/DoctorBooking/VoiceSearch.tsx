import React, { useEffect, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
  onError: (error: string) => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onResult, onError }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-IN';

      const handleResult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };

      recognitionInstance.onstart = () => setIsListening(true);
      recognitionInstance.onend = () => setIsListening(false);
      recognitionInstance.onresult = handleResult;
      recognitionInstance.onerror = (event: Event) => {
        const speechEvent = event as SpeechRecognitionErrorEvent;
        onError(speechEvent.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      onError('Speech recognition is not supported in this browser');
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [onResult, onError]);

  const toggleListening = () => {
    if (!recognition) {
      onError('Speech recognition is not supported');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        onError('Error starting voice recognition');
      }
    }
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
      <div className="text-center space-y-3">
        <div className="relative">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
              isListening
                ? 'bg-blue-500 shadow-lg scale-110'
                : 'bg-white shadow-md hover:shadow-lg hover:scale-105'
            }`}
            onClick={toggleListening}
          >
            {isListening ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className={`h-6 w-6 ${isListening ? 'text-white' : 'text-blue-500'}`} />
            )}
          </div>
          {isListening && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600">
          {isListening ? 'Listening...' : 'Click to start voice search'}
        </p>
      </div>
    </div>
  );
};

export default VoiceSearch;
