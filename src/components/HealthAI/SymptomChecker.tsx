import React, { useState } from 'react';
import { getSymptomAnalysis } from '../../services/healthAI';
import ChatInterface, { Message } from './ChatInterface';

export default function SymptomChecker() {
  const [messages, setMessages] = useState<Message[]>([{
    type: 'bot',
    content: "Hello! I'm your AI Symptom Checker. I can help you understand your symptoms and provide potential causes. Please describe your symptoms in detail."
  }]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUserInput = (input: string) => {
    setUserInput(input);
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message
    addMessage({
      type: 'user',
      content: userInput
    });

    setUserInput('');
    setLoading(true);

    try {
      const analysis = await getSymptomAnalysis([userInput]);
      
      const response = `Based on your symptoms, here's my analysis:

Possible Conditions:
${analysis.possibleConditions.map(condition => `• ${condition}`).join('\n')}

Severity Level: ${analysis.severityLevel}

Recommendations:
${analysis.recommendations.map(rec => `• ${rec}`).join('\n')}

Important: This is not a medical diagnosis. Please consult with a healthcare professional for proper evaluation and treatment.`;

      addMessage({
        type: 'bot',
        content: response,
        options: ['Check More Symptoms', 'End Chat']
      });
    } catch (error) {
      console.error('Symptom Analysis Error:', error);
      addMessage({
        type: 'bot',
        content: 'I apologize, but I encountered an error while analyzing your symptoms. Would you like to try again?',
        options: ['Try Again', 'End Chat']
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    switch (option) {
      case 'Check More Symptoms':
      case 'Try Again':
        addMessage({
          type: 'bot',
          content: 'Please describe your symptoms in detail.'
        });
        break;
      case 'End Chat':
        addMessage({
          type: 'bot',
          content: 'Thank you for using the AI Symptom Checker. Take care and remember to consult with healthcare professionals for proper medical advice.'
        });
        break;
    }
  };

  return (
    <ChatInterface
      messages={messages}
      userInput={userInput}
      loading={loading}
      onUserInput={handleUserInput}
      onSendMessage={handleSendMessage}
      onOptionClick={handleOptionClick}
      placeholder="Describe your symptoms..."
    />
  );
}