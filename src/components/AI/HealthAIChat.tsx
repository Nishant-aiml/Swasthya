import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import axios from 'axios';

// API configuration
const HF_API_KEY = import.meta.env.REACT_APP_HUGGING_FACE_KEY;
const HF_API_URL = import.meta.env.VITE_AI_MODEL_ENDPOINT;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  error?: boolean;
}

export default function HealthAIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am your AI health assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string) => {
    try {
      // Use Hugging Face API
      const apiKey = HF_API_KEY;
      const apiUrl = HF_API_URL;

      // Validate API configuration
      if (!apiKey) {
        throw new Error('API key is missing. Please check your configuration.');
      }

      const systemPrompt = `You are a professional AI health assistant. Your responses should be evidence-based, accurate, and include specific recommendations while clearly stating when professional medical attention is needed.`;

      const requestPayload = {
        inputs: `${systemPrompt}\n\nUser: ${userMessage.trim()}\nAssistant:`,
        parameters: {
          max_length: 500,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true
        }
      };

      const response = await axios.post(
        apiUrl,
        requestPayload,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      // Enhanced response validation
      if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
        throw new Error('No response received from the AI service.');
      }

      let aiResponse = response.data[0].generated_text;
      
      // Remove the system prompt and user message from the response
      aiResponse = aiResponse.replace(systemPrompt, '').replace(`User: ${userMessage.trim()}\nAssistant:`, '').trim();
      
      // Format the response for better readability
      aiResponse = aiResponse
        .trim()
        .replace(/\n{3,}/g, '\n\n')
        .replace(/^\s+/gm, '') // Remove leading whitespace from each line
        .replace(/\s+$/gm, ''); // Remove trailing whitespace from each line

      // Add disclaimer if response doesn't already include one
      if (!aiResponse.toLowerCase().includes('medical professional') && 
          !aiResponse.toLowerCase().includes('healthcare provider')) {
        aiResponse += '\n\nNote: This information is for general guidance only. Please consult a healthcare provider for professional medical advice.';
      }

      return aiResponse;
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Enhanced error handling with specific messages
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timed out. Please try again.');
        } else if (error.response?.status === 404) {
          console.error('API Endpoint Error:', error.response?.data);
          throw new Error('API endpoint not found. Please verify the API URL configuration.');
        } else if (error.response?.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        } else if (error.response?.status === 401 || error.response?.status === 403) {
          console.error('API Key Error:', error.response?.data);
          throw new Error('Authentication failed. Please ensure your API key is valid and has sufficient permissions.');
        } else if (error.response?.status === 400) {
          console.error('Request Error:', error.response?.data);
          throw new Error('Invalid request format. Please try again with a different query.');
        } else if (!error.response) {
          throw new Error('Network error. Please check your internet connection.');
        }
      }
      
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please contact support if the issue persists.');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateResponse(inputMessage);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b bg-blue-600 text-white rounded-t-lg">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bot className="h-6 w-6" />
          Health AI Assistant
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  <span className="text-xs">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your health-related question..."
            className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}