import { useState } from 'react';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isEmergency?: boolean;
  actions?: {
    label: string;
    handler: () => void;
  }[];
}

export function useEmergencyAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Hello! I\'m your emergency assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (content: string) => {
    setLoading(true);
    try {
      // Add user message
      setMessages(prev => [...prev, {
        type: 'user',
        content,
        timestamp: new Date(),
      }]);

      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check for emergency keywords
      const emergencyKeywords = ['emergency', 'help', 'pain', 'accident', 'bleeding', 'chest pain'];
      const isEmergency = emergencyKeywords.some(keyword => 
        content.toLowerCase().includes(keyword)
      );

      // Add bot response
      const botResponse: Message = {
        type: 'bot',
        content: isEmergency 
          ? 'This seems like an emergency situation. I recommend immediate medical attention.'
          : 'I understand your concern. Let me help you with that.',
        timestamp: new Date(),
        isEmergency,
      };

      if (isEmergency) {
        botResponse.actions = [
          {
            label: 'Call Emergency Services (102)',
            handler: () => window.location.href = 'tel:102'
          },
          {
            label: 'Find Nearest Hospital',
            handler: () => window.location.href = '/emergency'
          }
        ];
      }

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'I apologize, but I\'m having trouble processing your request. Please try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
  };
}