import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

const languages: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  bn: 'বাংলা',
  mr: 'मराठी'
};

export default function LanguageSelector() {
  return (
    <div className="relative inline-block text-left">
      <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
        <Globe className="h-5 w-5" />
        <span>Language</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
        <div className="py-1">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}