import React, { useState, useRef, useEffect } from 'react';
import { AlertTriangle, Send, Bot, User, MessageSquare, Phone, MapPin, Ambulance } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export default function EmergencyAssistant() {
  const navigate = useNavigate();

  const emergencyOptions = [
    {
      title: 'Emergency Chat',
      description: 'Get immediate AI assistance for medical emergencies',
      icon: MessageSquare,
      action: () => navigate('/emergency-chat'),
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600'
    },
    {
      title: 'Call Emergency Services',
      description: 'Directly call 911 for immediate help',
      icon: Phone,
      action: () => window.location.href = 'tel:911',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      title: 'Find Nearby Hospitals',
      description: 'Locate emergency rooms and hospitals near you',
      icon: MapPin,
      action: () => navigate('/sos-locator'),
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      title: 'Request Ambulance',
      description: 'Request emergency medical transport',
      icon: Ambulance,
      action: () => window.location.href = 'tel:911',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    }
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: "Hello! I'm your emergency medical assistant. Please describe your emergency situation or symptoms. Remember, if this is a life-threatening emergency, call emergency services (911) immediately.",
      timestamp: new Date(),
      severity: 'low'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('low');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      // Your existing API call logic here
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const getSeverityColor = (severity?: 'low' | 'medium' | 'high' | 'critical') => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Emergency Warning */}
      <div className="bg-red-50 p-4 rounded-lg mb-6 shadow-sm">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Emergency Warning</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                If you're experiencing a life-threatening emergency, immediately:
                <br />
                1. Call emergency services (911)
                <br />
                2. Seek immediate medical attention
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <button
              key={index}
              onClick={option.action}
              className={`${option.color} ${option.hoverColor} text-white p-6 rounded-lg shadow-sm transition-all duration-200 hover:scale-105 text-left`}
            >
              <div className="flex items-center gap-4">
                <Icon className="h-8 w-8" />
                <div>
                  <h3 className="font-semibold text-lg">{option.title}</h3>
                  <p className="text-sm opacity-90">{option.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 bg-gray-50 rounded-lg mb-4 mt-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role !== 'user' && (
              <div className="flex-shrink-0">
                <Bot className="h-8 w-8 rounded-full bg-emerald-100 p-1.5 text-emerald-600" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-emerald-500 text-white'
                  : message.role === 'system'
                  ? getSeverityColor(message.severity)
                  : 'bg-white shadow-sm'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            {message.role === 'user' && (
              <div className="flex-shrink-0">
                <User className="h-8 w-8 rounded-full bg-emerald-100 p-1.5 text-emerald-600" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe your emergency or symptoms..."
            className="flex-1 min-w-0 rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white ${
              loading || !inputText.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
