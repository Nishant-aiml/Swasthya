import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface VoiceSearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function VoiceSearchInput({
  onSearch,
  placeholder = "Search for doctors, specializations, or symptoms...",
  className,
}: VoiceSearchInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Set to Indian English

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcript = result[0].transcript;
        setTranscript(transcript);
        
        if (result.isFinal) {
          handleSearch(transcript);
          stopListening();
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopListening();
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
      setTranscript('');
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  const handleSearch = (query: string) => {
    onSearch(query);
    updateSuggestions(query);
  };

  const updateSuggestions = (query: string) => {
    // Example medical terms and specializations
    const medicalTerms = [
      'cardiologist',
      'pediatrician',
      'orthopedic',
      'dermatologist',
      'neurologist',
      'heart',
      'skin',
      'bones',
      'fever',
      'headache',
      'cough',
    ];

    if (query) {
      const filtered = medicalTerms.filter(term =>
        term.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setTranscript(query);
    updateSuggestions(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(transcript);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <Input
          type="text"
          value={transcript}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="pr-20"
        />
        {isSupported ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? (
              <div className="relative">
                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
              </div>
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            disabled
            title="Voice search is not supported in your browser"
          >
            <MicOff className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Voice Search Instructions */}
      {isListening && (
        <div className="text-center space-y-2 p-4 rounded-lg bg-gray-50">
          <p className="text-sm font-medium">Listening...</p>
          <p className="text-xs text-gray-500">
            Speak clearly and try phrases like:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary">"Find a cardiologist"</Badge>
            <Badge variant="secondary">"Doctors near me"</Badge>
            <Badge variant="secondary">"Heart specialist"</Badge>
          </div>
        </div>
      )}

      {/* Search Suggestions */}
      {!isListening && suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded-lg border mt-1">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setTranscript(suggestion);
                  handleSearch(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
