import React, { useState } from 'react';
import { Filter, Video, Calendar } from 'lucide-react';

interface Filters {
  type: 'all' | 'hospital' | 'ambulance' | 'pharmacy';
  open24Hours: boolean;
  acceptsInsurance: boolean;
}

export default function ServiceFilters() {
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    open24Hours: false,
    acceptsInsurance: false
  });

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="font-medium">Filters</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="px-3 py-1.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">All Services</option>
          <option value="hospital">Hospitals</option>
          <option value="ambulance">Ambulances</option>
          <option value="pharmacy">Pharmacies</option>
        </select>

        <button
          onClick={() => handleFilterChange('open24Hours', !filters.open24Hours)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors ${
            filters.open24Hours
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Calendar className="h-4 w-4" />
          24/7 Only
        </button>

        <button
          onClick={() => handleFilterChange('acceptsInsurance', !filters.acceptsInsurance)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors ${
            filters.acceptsInsurance
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Video className="h-4 w-4" />
          Accepts Insurance
        </button>
      </div>
    </div>
  );
}