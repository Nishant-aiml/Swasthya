import React from 'react';
import { createPortal } from 'react-dom';

interface MapDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

export const MapDropdown: React.FC<MapDropdownProps> = ({ value, onChange, options }) => {
  // Create a portal container if it doesn't exist
  React.useEffect(() => {
    if (!document.getElementById('dropdown-portal')) {
      const portalDiv = document.createElement('div');
      portalDiv.id = 'dropdown-portal';
      document.body.appendChild(portalDiv);
    }
  }, []);

  const content = (
    <div className="absolute top-4 left-4" style={{ zIndex: 9999 }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-lg"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const portalElement = document.getElementById('dropdown-portal');
  if (!portalElement) return null;

  return createPortal(content, portalElement);
};
