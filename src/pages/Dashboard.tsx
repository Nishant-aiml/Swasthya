import React from 'react';
import { Activity, Heart, Calendar, FileText, User, Brain, Crosshair, Pill, AlertCircle, Building2, LogOut } from 'lucide-react';
import WellnessTracker from '../components/HealthAI/WellnessTracker';
import WearableSync from '../components/HealthAI/WearableSync';
import EmergencyServicesMap from '../components/Maps/EmergencyServicesMap';
import EmergencyServices from '../components/Emergency/EmergencyServices';
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useNavigate } from 'react-router-dom';
import HealthcareMap from '../components/Maps/HealthcareMap';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

interface Activity {
  text: string;
  time: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, bgColor }) => (
  <div className={`${bgColor} rounded-lg shadow-sm p-4 transition-transform hover:scale-105`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const greetings = [
    "Take care of your body, it's the only place you have to live.",
    "A healthy outside starts from the inside.",
    "Your health is an investment, not an expense.",
    "Small steps lead to big changes.",
  ];

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  const recentActivities: Activity[] = [
    { text: "Completed daily health check", time: "2h ago" },
    { text: "Booked appointment with Dr. Smith", time: "5h ago" },
    { text: "Updated medical records", time: "1d ago" },
    { text: "Synced fitness data", time: "2d ago" }
  ];

  return (
    <div>
      {/* Dashboard Content */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-6 relative">
          {/* Welcome Message */}
          <div className="mb-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome to Your Health Dashboard</h1>
            <p className="text-orange-100">{randomGreeting}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Section (Previously Right Section) */}
            <div className="space-y-8">
              {/* Location Map */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-orange-100">
                <h2 className="text-xl font-semibold text-orange-600 mb-4">Emergency Services Near You</h2>
                <EmergencyServicesMap />
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-orange-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-orange-600">Recent Activity</h2>
                  <Activity className="h-5 w-5 text-orange-500" />
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600">{activity.text}</span>
                      <span className="text-sm text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section (Previously Left Section) */}
            <div className="space-y-8">
              {/* Emergency Services */}
              <EmergencyServices />

              {/* Wearable Sync */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-orange-100">
                <h2 className="text-xl font-semibold text-orange-600 mb-4">Wearable Devices</h2>
                <WearableSync />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <StatCard
                  title="Heart Rate"
                  value="72 BPM"
                  icon={Heart}
                  color="bg-orange-500"
                  bgColor="bg-orange-50"
                />
                <StatCard
                  title="Daily Steps"
                  value="8,439"
                  icon={Activity}
                  color="bg-orange-600"
                  bgColor="bg-orange-50"
                />
                <StatCard
                  title="Appointments"
                  value="2"
                  icon={Calendar}
                  color="bg-orange-500"
                  bgColor="bg-orange-50"
                />
                <StatCard
                  title="Health Score"
                  value="85%"
                  icon={Brain}
                  color="bg-orange-600"
                  bgColor="bg-orange-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;