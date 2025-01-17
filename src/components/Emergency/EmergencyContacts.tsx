import React from 'react';
import { Phone, Pill, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  color: string;
  bgColor: string;
  hoverColor: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  action,
  color,
  bgColor,
  hoverColor,
}) => (
  <button
    onClick={action}
    className={`${bgColor} ${hoverColor} p-4 rounded-lg flex items-start gap-4 transition-all duration-300 hover:scale-105 hover:shadow-md w-full`}
  >
    <div className={`${color} p-3 rounded-full`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div className="text-left">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  </button>
);

export default function EmergencyServices() {
  const navigate = useNavigate();

  const emergencyServices = [
    {
      title: 'Call Emergency Services',
      description: '24/7 Emergency Support - Call 911',
      icon: Phone,
      action: () => window.location.href = 'tel:911',
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-100'
    },
    {
      title: 'Pharmacy Buy',
      description: 'Purchase medicines and medical supplies',
      icon: Pill,
      action: () => navigate('/pharmacy'),
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100'
    },
    {
      title: 'Profile ID',
      description: 'View family health profiles and emergency info',
      icon: UserCircle,
      action: () => navigate('/profile'),
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-orange-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-orange-600 flex items-center gap-2">
          <Phone className="h-6 w-6" />
          Emergency Services
        </h2>
      </div>
      
      <div className="space-y-6">
        {/* Emergency Services Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {emergencyServices.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Family Health Profiles</h3>
        <div className="space-y-3">
          <div className="p-3 bg-white rounded border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">John Doe (You)</h4>
                <p className="text-sm text-gray-600">Blood Type: O+ve | Age: 35</p>
                <p className="text-sm text-gray-600">Allergies: Penicillin</p>
              </div>
              <button 
                onClick={() => navigate('/profile/details')}
                className="text-blue-500 hover:text-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
          <div className="p-3 bg-white rounded border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Sarah Doe (Spouse)</h4>
                <p className="text-sm text-gray-600">Blood Type: A+ve | Age: 32</p>
                <p className="text-sm text-gray-600">Conditions: None</p>
              </div>
              <button 
                onClick={() => navigate('/profile/details/spouse')}
                className="text-blue-500 hover:text-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-red-600">
        For life-threatening emergencies, immediately call 911
      </div>
    </div>
  );
}
