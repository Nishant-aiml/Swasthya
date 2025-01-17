import React from 'react';
import { AlertTriangle, Phone, Pill, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  bgColor: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, bgColor, onClick }) => (
  <div
    onClick={onClick}
    className={`${bgColor} rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-all hover:shadow-md hover:scale-105`}
  >
    <div className="rounded-full p-3">
      <Icon className="w-8 h-8" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default function EmergencyServices() {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate('/appointments');
    toast.success("Welcome to Appointments", {
      description: "Schedule your consultation with our healthcare professionals."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-orange-500">
        <AlertTriangle className="h-6 w-6" />
        <h2 className="text-xl font-semibold">Emergency Services</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ServiceCard
          icon={Phone}
          title="Call Emergency Services"
          description="24/7 Emergency Support - 911"
          bgColor="bg-red-50 hover:bg-red-100"
          onClick={() => window.location.href = 'tel:911'}
        />
        <ServiceCard
          icon={Pill}
          title="Pharmacy Buy"
          description="Purchase medicines and supplies"
          bgColor="bg-blue-50 hover:bg-blue-100"
          onClick={() => {
            navigate('/medicines');
            toast.success("Welcome to our Online Pharmacy", {
              description: "Browse and purchase healthcare products securely."
            });
          }}
        />
        <ServiceCard
          icon={UserCircle}
          title="Profile ID"
          description="View health profiles and emergency info"
          bgColor="bg-green-50 hover:bg-green-100"
          onClick={() => navigate('/profile')}
        />
        <ServiceCard
          icon={AlertTriangle}
          title="Book Appointment"
          description="Schedule a consultation"
          bgColor="bg-purple-50 hover:bg-purple-100"
          onClick={handleAppointmentClick}
        />
      </div>
    </div>
  );
}
