import React from 'react';
import { TrendingUp, Calendar, Activity, Heart, Brain } from 'lucide-react';
import { Line } from 'react-chartjs-2';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export default function HealthHistory() {
  const metrics: HealthMetric[] = [
    {
      id: 'weight',
      name: 'Weight',
      value: 68,
      unit: 'kg',
      trend: 'down',
      change: 2.5
    },
    {
      id: 'bp',
      name: 'Blood Pressure',
      value: 120,
      unit: 'mmHg',
      trend: 'stable',
      change: 0
    },
    {
      id: 'glucose',
      name: 'Blood Glucose',
      value: 95,
      unit: 'mg/dL',
      trend: 'up',
      change: 5
    }
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [70, 69.5, 69, 68.5, 68.2, 68],
        borderColor: '#059669',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          Health History Analysis
        </h2>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-600">{metric.name}</h3>
                <span className={`text-sm ${
                  metric.trend === 'up' ? 'text-red-600' :
                  metric.trend === 'down' ? 'text-green-600' :
                  'text-blue-600'
                }`}>
                  {metric.trend === 'up' ? '↑' :
                   metric.trend === 'down' ? '↓' : '→'} {metric.change}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-semibold">{metric.value}</span>
                <span className="text-gray-500 ml-1">{metric.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-4">6-Month Weight Trend</h3>
          <div className="h-64">
            <Line
              data={chartData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-emerald-600" />
              <h3 className="font-medium">Health Score</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-600">85</p>
            <p className="text-sm text-emerald-700 mt-1">
              Your health score has improved by 5 points
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium">Next Checkup</h3>
            </div>
            <p className="text-lg font-medium">April 15, 2024</p>
            <p className="text-sm text-blue-700 mt-1">
              Regular health checkup with Dr. Smith
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}