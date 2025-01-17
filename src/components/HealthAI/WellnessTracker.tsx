import React, { useState } from 'react';
import { Activity, Scale, Moon, Coffee, Heart, TrendingUp } from 'lucide-react';

interface MetricCard {
  id: string;
  title: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  color: string;
  target?: number;
}

export default function WellnessTracker() {
  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      id: 'steps',
      title: 'Daily Steps',
      value: 8439,
      unit: 'steps',
      icon: Activity,
      color: 'bg-blue-500',
      target: 10000
    },
    {
      id: 'bmi',
      title: 'BMI',
      value: 22.5,
      unit: 'kg/m²',
      icon: Scale,
      color: 'bg-green-500',
      target: 24
    },
    {
      id: 'sleep',
      title: 'Sleep',
      value: 7.5,
      unit: 'hours',
      icon: Moon,
      color: 'bg-indigo-500',
      target: 8
    },
    {
      id: 'water',
      title: 'Water Intake',
      value: 6,
      unit: 'glasses',
      icon: Coffee,
      color: 'bg-cyan-500',
      target: 8
    },
    {
      id: 'heartRate',
      title: 'Heart Rate',
      value: 72,
      unit: 'bpm',
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      id: 'calories',
      title: 'Calories',
      value: 1850,
      unit: 'kcal',
      icon: TrendingUp,
      color: 'bg-orange-500',
      target: 2000
    }
  ]);

  const updateMetric = (id: string, newValue: number) => {
    setMetrics(metrics.map(metric => 
      metric.id === id ? { ...metric, value: newValue } : metric
    ));
  };

  const getProgressColor = (value: number, target?: number) => {
    if (!target) return 'bg-gray-200';
    const progress = (value / target) * 100;
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Wellness Tracker</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${metric.color}`}>
                  <metric.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-gray-900">{metric.title}</h3>
              </div>
              {metric.target && (
                <span className="text-sm text-gray-500">
                  Target: {metric.target} {metric.unit}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={metric.value}
                  onChange={(e) => updateMetric(metric.id, parseFloat(e.target.value) || 0)}
                  className="w-24 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-600">{metric.unit}</span>
              </div>

              {metric.target && (
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {((metric.value / metric.target) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        getProgressColor(metric.value, metric.target)
                      }`}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Daily Wellness Tips</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Try to reach your step goal by taking short walks during breaks
          </li>
          <li className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            Remember to stay hydrated throughout the day
          </li>
          <li className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            Maintain a consistent sleep schedule for better rest
          </li>
        </ul>
      </div>
    </div>
  );
}