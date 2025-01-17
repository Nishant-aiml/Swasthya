import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search medicines by name or generic compound..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
        <Filter className="h-5 w-5" />
        <span>Filters</span>
      </button>
    </div>
  );
}