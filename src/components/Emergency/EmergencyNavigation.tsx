import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function EmergencyNavigation() {
  const location = useLocation();

  const tabs = [
    { name: 'SOS Locator', path: '/emergency/sos' },
    { name: 'Emergency Assistant', path: '/emergency/assistant' },
    { name: 'Insurance Help', path: '/emergency/insurance' },
    { name: 'Blood Bank', path: '/emergency/blood-bank' },
    { name: 'Emergency Kits', path: '/emergency/kits' }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={`${
                isActive
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
