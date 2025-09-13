import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Mic, MicOff } from 'lucide-react';

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
}

export default function VoiceSearch({ onResult, onError = () => {} }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        
        onResult(transcript);
      };

      recognition.onerror = (event: any) => {
        onError(event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    } else {
      onError('Speech recognition is not supported in this browser.');
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <Button
      variant={isListening ? "default" : "outline"}
      size="icon"
      onClick={toggleListening}
      className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
    >
      {isListening ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
}
