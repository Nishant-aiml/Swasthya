import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Card, CardContent, TextField, Button, Typography, CircularProgress, Box } from '@mui/material';
import { Heart, Sun, Brain, Activity } from 'lucide-react';
import { getHealthAdvice, getSymptomAnalysis, getMentalHealthSupport } from '../services/healthAI';
import type { HealthAdviceResponse, SymptomAnalysisResponse, MentalHealthResponse } from '../services/healthAI';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  error?: boolean;
}

interface ChatFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  handler: (message: string) => Promise<string>;
  category: 'health' | 'wellness' | 'mental' | 'symptoms';
}

const healthFeatures: ChatFeature[] = [
  { 
    icon: Heart, 
    title: 'Health Chat', 
    description: 'Chat about any health concerns',
    category: 'health',
    handler: async (message: string): Promise<string> => {
      const response: HealthAdviceResponse = await getHealthAdvice(message);
      return response.advice || 'Sorry, I could not generate health advice at this time.';
    }
  },
  { 
    icon: Sun, 
    title: 'Wellness Tips', 
    description: 'Get personalized wellness advice',
    category: 'wellness',
    handler: async (message: string): Promise<string> => {
      const response: HealthAdviceResponse = await getHealthAdvice(message);
      return response.advice || 'Sorry, I could not generate wellness advice at this time.';
    }
  },
  { 
    icon: Brain, 
    title: 'Mental Health', 
    description: 'Mental health support and guidance',
    category: 'mental',
    handler: async (message: string): Promise<string> => {
      const response: MentalHealthResponse = await getMentalHealthSupport(message);
      return response.support || 'Sorry, I could not generate mental health support at this time.';
    }
  },
  { 
    icon: Activity, 
    title: 'Symptom Checker', 
    description: 'Check your symptoms',
    category: 'symptoms',
    handler: async (message: string): Promise<string> => {
      const response: SymptomAnalysisResponse = await getSymptomAnalysis([message]);
      return response.possibleConditions[0] || 'Sorry, I could not analyze your symptoms at this time.';
    }
  }
];

export default function HealthAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<ChatFeature>(healthFeatures[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await selectedFeature.handler(inputMessage);
      
      const aiMessage: Message = {
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        text: error instanceof Error ? error.message : 'An error occurred while processing your request.',
        sender: 'ai',
        timestamp: new Date(),
        error: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {healthFeatures.map((feature) => (
          <Card 
            key={feature.title}
            sx={{ 
              flex: 1,
              cursor: 'pointer',
              bgcolor: selectedFeature.title === feature.title ? 'primary.light' : 'background.paper'
            }}
            onClick={() => setSelectedFeature(feature)}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <feature.icon size={24} />
              <Typography variant="h6">{feature.title}</Typography>
              <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card sx={{ flex: 1, mb: 2, overflowY: 'auto' }}>
        <CardContent>
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 2
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: message.error ? 'error.light' :
                          message.sender === 'user' ? 'primary.light' : 'background.paper',
                  color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary'
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {message.text}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={inputMessage}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Ask about ${selectedFeature.title.toLowerCase()}...`}
          disabled={isLoading}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={!inputMessage.trim() || isLoading}
          sx={{ minWidth: 100 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Send'}
        </Button>
      </Box>
    </Box>
  );
}