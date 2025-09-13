import React from 'react';
import { Activity, Heart, Calendar, FileText, User, Brain, Crosshair, Pill, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/Button";
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import HealthcareMap from '@/components/Maps/HealthcareMap';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const greetings = [
    "Take care of your body, it's the only place you have to live.",
    "A healthy outside starts from the inside.",
    "Your health is an investment, not an expense.",
    "Small steps lead to big changes.",
  ];

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  const features = [
    {
      title: "Book Appointments",
      description: "Schedule appointments with healthcare professionals",
      icon: Calendar,
      path: "/appointments",
      color: "text-blue-500",
    },
    {
      title: "Emergency Services",
      description: "Quick access to emergency medical services",
      icon: AlertCircle,
      path: "/emergency",
      color: "text-red-500",
    },
    {
      title: "Health AI",
      description: "AI-powered health assistance and diagnosis",
      icon: Brain,
      path: "/health-ai",
      color: "text-purple-500",
    },
    {
      title: "Medicine Reminders",
      description: "Set and manage your medicine reminders",
      icon: Pill,
      path: "/medicines",
      color: "text-green-500",
    },
    {
      title: "Health Resources",
      description: "Access health articles and resources",
      icon: FileText,
      path: "/resources",
      color: "text-yellow-500",
    },
    {
      title: "Fun Zone",
      description: "Health games and activities",
      icon: Activity,
      path: "/funzone",
      color: "text-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Message */}
        <div className="mb-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome to Your Health Dashboard</h1>
          <p className="text-orange-100">{randomGreeting}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow duration-300 border border-orange-100 cursor-pointer"
              onClick={() => navigate(feature.path)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map Section */}
        <Card className="lg:col-span-2 border border-orange-100">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-orange-600">Nearby Hospitals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <HealthcareMap height="400px" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;