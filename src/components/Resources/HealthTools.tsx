import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import {
  Activity,
  Droplets,
  Moon,
  Calculator,
  ChevronRight,
  Star,
  Users
} from 'lucide-react';
import { HealthTool, SymptomCheckerResult, WaterIntakeCalculation, SleepLog } from '@/types/Resources';

interface HealthToolsProps {
  onToolComplete?: () => void;
}

const tools: HealthTool[] = [
  {
    id: 'symptom-checker',
    name: 'Symptom Checker',
    description: 'Check your symptoms and get preliminary health insights',
    type: 'checker',
    icon: 'activity',
    category: 'Diagnostic',
    usageCount: 15000,
    rating: 4.8,
    reviews: []
  },
  {
    id: 'water-calculator',
    name: 'Water Intake Calculator',
    description: 'Get personalized water intake recommendations',
    type: 'calculator',
    icon: 'droplets',
    category: 'Wellness',
    usageCount: 25000,
    rating: 4.9,
    reviews: []
  },
  {
    id: 'sleep-tracker',
    name: 'Sleep Tracker',
    description: 'Track and improve your sleep patterns',
    type: 'tracker',
    icon: 'moon',
    category: 'Wellness',
    usageCount: 18000,
    rating: 4.7,
    reviews: []
  }
];

export default function HealthTools({ onToolComplete }: HealthToolsProps) {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const getToolIcon = (icon: string) => {
    switch (icon) {
      case 'activity':
        return <Activity className="h-6 w-6" />;
      case 'droplets':
        return <Droplets className="h-6 w-6" />;
      case 'moon':
        return <Moon className="h-6 w-6" />;
      default:
        return <Calculator className="h-6 w-6" />;
    }
  };

  const handleToolClick = (toolId: string) => {
    setActiveToolId(toolId);
    setResults(null);
  };

  const renderToolContent = () => {
    if (!activeToolId) return null;

    const tool = tools.find(t => t.id === activeToolId);
    if (!tool) return null;

    switch (tool.id) {
      case 'symptom-checker':
        return <SymptomCheckerTool onComplete={handleToolComplete} />;
      case 'water-calculator':
        return <WaterCalculatorTool onComplete={handleToolComplete} />;
      case 'sleep-tracker':
        return <SleepTrackerTool onComplete={handleToolComplete} />;
      default:
        return null;
    }
  };

  const handleToolComplete = (result: any) => {
    setResults(result);
    if (onToolComplete) {
      onToolComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                activeToolId === tool.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleToolClick(tool.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    tool.category === 'Diagnostic' ? 'bg-purple-100 text-purple-600' :
                    tool.category === 'Wellness' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {getToolIcon(tool.icon)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{tool.name}</h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{tool.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{tool.usageCount.toLocaleString()} uses</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Active Tool Content */}
      {activeToolId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Card className="p-6">
            {renderToolContent()}
          </Card>
        </motion.div>
      )}

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Card className="p-6">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(results, null, 2)}
            </pre>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

// Tool Components (to be implemented in separate files)
function SymptomCheckerTool({ onComplete }: { onComplete: (result: SymptomCheckerResult) => void }) {
  return <div>Symptom Checker Tool Content</div>;
}

function WaterCalculatorTool({ onComplete }: { onComplete: (result: WaterIntakeCalculation) => void }) {
  return <div>Water Calculator Tool Content</div>;
}

function SleepTrackerTool({ onComplete }: { onComplete: (result: SleepLog) => void }) {
  return <div>Sleep Tracker Tool Content</div>;
}
