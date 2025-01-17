import React from 'react';
import { Activity, Heart, Droplets, Moon } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { useHealthStore } from '../../store/healthStore';

export default function HealthDashboard() {
  const { metrics } = useHealthStore();

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Steps',
        data: [6000, 7500, 5500, 8000, 9500, 7000, metrics.steps],
        borderColor: '#059669',
        tension: 0.4,
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start">
        <h3 className="text-lg font-semibold text-gray-900">Swasthya</h3>
        <p className="text-xs text-gray-600">by Shrinu</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-emerald-600" />
            <span className="text-sm text-gray-600">Steps</span>
          </div>
          <p className="text-2xl font-semibold mt-2">{metrics.steps}</p>
        </div>

        <div className="p-4 rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-red-600" />
            <span className="text-sm text-gray-600">Heart Rate</span>
          </div>
          <p className="text-2xl font-semibold mt-2">{metrics.heartRate} bpm</p>
        </div>

        <div className="p-4 rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <Droplets className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600">Water</span>
          </div>
          <p className="text-2xl font-semibold mt-2">{metrics.water}ml</p>
        </div>

        <div className="p-4 rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <Moon className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-gray-600">Sleep</span>
          </div>
          <p className="text-2xl font-semibold mt-2">{metrics.sleep}h</p>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-gray-200 bg-white">
        <h4 className="font-medium mb-4">Weekly Activity</h4>
        <div className="h-64">
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}