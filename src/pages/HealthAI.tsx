import React, { useState } from 'react';
import HealthAIChat from '../components/AI/HealthAIChat';
import SymptomChecker from '../components/HealthAI/SymptomChecker';
import HealthPlanGenerator from '../components/HealthAI/HealthPlanGenerator';
import HealthRiskAssessment from '../components/HealthAI/HealthRiskAssessment';
import EmergencyAssistant from '../components/HealthAI/EmergencyAssistant';
import { 
  FaRobot, 
  FaStethoscope, 
  FaHeartbeat, 
  FaChartLine, 
  FaAmbulance 
} from 'react-icons/fa';

type AITool = 'chat' | 'symptoms' | 'plan' | 'risk' | 'emergency';

export default function HealthAI() {
  const [selectedTool, setSelectedTool] = useState<AITool>('chat');

  const tools = [
    { 
      id: 'chat', 
      name: 'AI Chat', 
      description: 'Chat with our AI health assistant',
      icon: FaRobot,
      gradient: 'from-emerald-400 to-teal-500',
      activeGradient: 'from-emerald-500 to-teal-600'
    },
    { 
      id: 'symptoms', 
      name: 'Symptom Checker', 
      description: 'Check your symptoms and get possible causes',
      icon: FaStethoscope,
      gradient: 'from-blue-400 to-indigo-500',
      activeGradient: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'plan', 
      name: 'Health Plan', 
      description: 'Get a personalized health improvement plan',
      icon: FaHeartbeat,
      gradient: 'from-purple-400 to-pink-500',
      activeGradient: 'from-purple-500 to-pink-600'
    },
    { 
      id: 'risk', 
      name: 'Risk Assessment', 
      description: 'Assess your health risks',
      icon: FaChartLine,
      gradient: 'from-orange-400 to-red-500',
      activeGradient: 'from-orange-500 to-red-600'
    },
    { 
      id: 'emergency', 
      name: 'Emergency Assistant', 
      description: 'Get immediate guidance for medical emergencies',
      icon: FaAmbulance,
      gradient: 'from-red-400 to-rose-500',
      activeGradient: 'from-red-500 to-rose-600'
    }
  ];

  const renderSelectedTool = () => {
    switch (selectedTool) {
      case 'chat':
        return <HealthAIChat />;
      case 'symptoms':
        return <SymptomChecker />;
      case 'plan':
        return <HealthPlanGenerator />;
      case 'risk':
        return <HealthRiskAssessment />;
      case 'emergency':
        return <EmergencyAssistant />;
      default:
        return <HealthAIChat />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl sm:rounded-2xl shadow-xl">
              <FaRobot className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 sm:mb-4">
            AI Health Assistant
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Get instant health advice, check symptoms, and receive personalized recommendations
            powered by advanced artificial intelligence.
          </p>
        </div>

        {/* Tools Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id as AITool)}
                className={`relative flex flex-col items-center text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg
                  ${
                    selectedTool === tool.id
                      ? `bg-gradient-to-br ${tool.activeGradient} text-white`
                      : 'bg-white hover:bg-gray-50'
                  }`}
              >
                <div className={`p-2 sm:p-3 rounded-lg ${
                  selectedTool === tool.id
                    ? 'bg-white/20'
                    : `bg-gradient-to-br ${tool.gradient} text-white`
                }`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold mt-2 sm:mt-3">{tool.name}</h3>
                <p className={`text-xs sm:text-sm mt-1 ${
                  selectedTool === tool.id ? 'text-white/90' : 'text-gray-500'
                }`}>
                  {tool.description}
                </p>
                {selectedTool === tool.id && (
                  <div className="absolute inset-0 border-2 border-white rounded-xl sm:rounded-2xl"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Tool Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
          {renderSelectedTool()}
        </div>
      </div>
    </div>
  );
}