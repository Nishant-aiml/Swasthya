import React, { useState } from 'react';
import { generateHealthPlan } from '../../services/healthAI';
import ChatInterface, { Message } from './ChatInterface';

export default function HealthPlanGenerator() {
  const [messages, setMessages] = useState<Message[]>([{
    type: 'bot',
    content: "Hello! I'm your AI Health Plan Generator. I can create a personalized health plan based on your goals and preferences. What are your main health goals? (e.g., weight loss, muscle gain, better sleep, stress management)",
  }]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<'goals' | 'preferences' | 'constraints'>('goals');
  const [planData, setPlanData] = useState({
    goals: '',
    preferences: '',
    constraints: ''
  });

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

    // Update plan data based on current step
    setPlanData(prev => ({
      ...prev,
      [currentStep]: userInput
    }));

    setUserInput('');
    
    // Handle different steps
    switch (currentStep) {
      case 'goals':
        addMessage({
          type: 'bot',
          content: "Great! Now, tell me about your preferences. Do you have any specific dietary preferences (vegetarian, vegan, etc.) or preferred types of exercise?"
        });
        setCurrentStep('preferences');
        break;

      case 'preferences':
        addMessage({
          type: 'bot',
          content: "Lastly, are there any constraints or limitations I should know about? (e.g., injuries, time constraints, available equipment)"
        });
        setCurrentStep('constraints');
        break;

      case 'constraints':
        // Generate the health plan
        setLoading(true);
        try {
          const plan = await generateHealthPlan({
            goals: [planData.goals],
            dietaryRestrictions: [planData.preferences],
            exercisePreferences: [],
            medicalConditions: [],
            lifestyle: [userInput]
          });

          // Format the response properly
          const response = `Based on your input, here's your personalized health plan:

Goals:
${plan.goals.map(goal => `• ${goal}`).join('\n')}

Diet Plan:
${plan.dietPlan.map(item => `• ${item}`).join('\n')}

Exercise Routine:
${plan.exerciseRoutine.map(item => `• ${item}`).join('\n')}

Lifestyle Recommendations:
${plan.lifestyleRecommendations.map(item => `• ${item}`).join('\n')}

Progress Tracking:
${plan.progressTracking.map(item => `• ${item}`).join('\n')}

Remember: This plan is adaptable and can be adjusted based on your progress and comfort level.`;

          addMessage({
            type: 'bot',
            content: response,
            options: ['Generate New Plan', 'End Chat']
          });
        } catch (error) {
          console.error('Health Plan Generation Error:', error);
          addMessage({
            type: 'bot',
            content: 'I apologize, but I encountered an error while generating your health plan. Would you like to try again?',
            options: ['Try Again', 'End Chat']
          });
        } finally {
          setLoading(false);
        }
        break;
    }
  };

  const handleOptionClick = (option: string) => {
    switch (option) {
      case 'Generate New Plan':
      case 'Try Again':
        setCurrentStep('goals');
        setPlanData({
          goals: '',
          preferences: '',
          constraints: ''
        });
        addMessage({
          type: 'bot',
          content: "Let's create a new health plan. What are your main health goals?"
        });
        break;
      case 'End Chat':
        addMessage({
          type: 'bot',
          content: "Thank you for using the AI Health Plan Generator. Good luck with your health journey! Remember to consult with healthcare professionals before starting any new health regimen."
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
      placeholder="Type your response..."
    />
  );
}
