import React from 'react';
import { Heart, Activity, Brain, Phone } from 'lucide-react';

const emergencyGuides = [
  {
    id: 'heartAttack',
    title: 'Heart Attack',
    icon: Heart,
    steps: [
      'Help the person sit down and stay calm',
      'Call emergency services (102/108)',
      'Loosen tight clothing',
      'Check if they have aspirin',
    ],
    color: 'red',
  },
  {
    id: 'seizure',
    title: 'Seizure',
    icon: Brain,
    steps: [
      'Clear the area around the person',
      'Protect their head',
      'Time the seizure',
      'Never put anything in their mouth',
    ],
    color: 'purple',
  },
];

export default function EmergencyGuide() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Emergency Guides</h3>
        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          <Phone className="h-4 w-4" />
          Call Emergency
        </button>
      </div>

      <div className="grid gap-4">
        {emergencyGuides.map(guide => (
          <div
            key={guide.id}
            className={`p-4 rounded-lg border bg-${guide.color}-50 border-${guide.color}-100`}
          >
            <div className="flex items-center gap-3 mb-3">
              <guide.icon className={`h-6 w-6 text-${guide.color}-600`} />
              <h4 className="font-medium">{guide.title}</h4>
            </div>
            <ul className="space-y-2">
              {guide.steps.map((step, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Activity className="h-4 w-4 text-gray-400" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}