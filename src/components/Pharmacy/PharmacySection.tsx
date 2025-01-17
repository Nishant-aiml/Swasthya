import React from 'react';
import { Pill, Package, Leaf, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PharmacyCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  hoverColor: string;
  onClick: () => void;
}

const PharmacyCard: React.FC<PharmacyCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  bgColor,
  hoverColor,
  onClick,
}) => (
  <button
    onClick={onClick}
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

export default function PharmacySection() {
  const navigate = useNavigate();

  const pharmacyOptions = [
    {
      title: 'Generic Medicines',
      description: 'Find affordable alternatives to branded medicines',
      icon: Pill,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      onClick: () => navigate('/medicines/generic')
    },
    {
      title: 'Sanitary Products',
      description: 'Quality sanitary pads and feminine hygiene products',
      icon: Package,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
      hoverColor: 'hover:bg-pink-100',
      onClick: () => navigate('/medicines/sanitary')
    },
    {
      title: 'Alternative Medicine',
      description: 'Ayurvedic and homeopathic alternatives',
      icon: Leaf,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      onClick: () => navigate('/medicines/alternative')
    },
    {
      title: 'Medical Supplies',
      description: 'First aid and medical equipment',
      icon: Stethoscope,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      onClick: () => navigate('/medicines/supplies')
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-orange-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-orange-600 flex items-center gap-2">
          <Pill className="h-6 w-6" />
          Online Pharmacy
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pharmacyOptions.map((option, index) => (
          <PharmacyCard
            key={index}
            {...option}
          />
        ))}
      </div>
    </div>
  );
}
