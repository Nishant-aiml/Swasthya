import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, Loader2 } from 'lucide-react';
import { getEmergencyGuidance } from '../../services/healthAI';
import { EmergencyGuidance } from '../../types/health';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export default function EmergencyChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your emergency medical assistant. Please describe your emergency situation or symptoms. Remember, if this is a life-threatening emergency, call emergency services immediately!',
      timestamp: new Date(),
      severity: 'low'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
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
      const guidance = await getEmergencyGuidance(inputText);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: `${guidance.assessment}\n\n${guidance.immediateActions.join('\n')}`,
        timestamp: new Date(),
        severity: guidance.severity.toLowerCase() as 'low' | 'medium' | 'high' | 'critical'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in emergency chat:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble processing your request. If this is an emergency, please call emergency services immediately.',
        timestamp: new Date(),
        severity: 'high'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity?: 'low' | 'medium' | 'high' | 'critical') => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Emergency Header */}
      <div className="p-4 bg-red-500 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6" />
          <h2 className="text-lg font-semibold">Emergency Assistant</h2>
        </div>
        <span className="text-sm">Call 911 for immediate assistance</span>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : `${getSeverityColor(message.severity)} text-white`
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe your emergency situation..."
            className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}