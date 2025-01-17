import React from 'react';
import { Filter, Video, Calendar, Globe, CreditCard } from 'lucide-react';
import { useDoctors } from '../../hooks/useDoctors';

const specializations = [
  'All Specializations',
  'General Physician',
  'Cardiologist',
  'Pediatrician',
  'Dermatologist',
  'Gynecologist',
  'Orthopedic',
  'ENT Specialist',
  'Neurologist'
];

export default function DoctorFilters() {
  const { filters, setFilters } = useDoctors();

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <div className="flex items-center gap-2 text-gray-700">
        <Filter className="h-5 w-5" />
        <span className="font-medium">Filter Doctors</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialization
          </label>
          <select
            value={filters.specialization}
            onChange={(e) => setFilters({ specialization: e.target.value })}
            className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec.toLowerCase()}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['all', 'today', 'week'].map((period) => (
              <button
                key={period}
                onClick={() => setFilters({ availability: period as any })}
                className={`px-3 py-1.5 text-sm rounded-lg border
                  ${filters.availability === period
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Consultation Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setFilters({ consultationType: 'in-person' })}
              className={`flex items-center justify-center gap-2 px-3 py-1.5 text-sm rounded-lg border
                ${filters.consultationType === 'in-person'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'border-gray-300 hover:bg-gray-50'
                }`}
            >
              <Calendar className="h-4 w-4" />
              In-Person
            </button>
            <button
              onClick={() => setFilters({ consultationType: 'online' })}
              className={`flex items-center justify-center gap-2 px-3 py-1.5 text-sm rounded-lg border
                ${filters.consultationType === 'online'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'border-gray-300 hover:bg-gray-50'
                }`}
            >
              <Video className="h-4 w-4" />
              Online
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            value={filters.language}
            onChange={(e) => setFilters({ language: e.target.value })}
            className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Languages</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="bn">Bengali</option>
            <option value="mr">Marathi</option>
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.acceptsAyushman}
              onChange={(e) => setFilters({ acceptsAyushman: e.target.checked })}
              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-600" />
              Accepts Ayushman Card
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}