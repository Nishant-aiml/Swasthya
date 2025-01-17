import React, { useState } from 'react';
import { VirtualTour } from '@/types/Resources';
import { Box, Headset, ScanFace, Gamepad2 } from 'lucide-react';

interface VirtualToursProps {
  tours: VirtualTour[];
  onTourSelect: (tour: VirtualTour) => void;
}

export function VirtualTours({ tours, onTourSelect }: VirtualToursProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredTours = tours.filter(tour => {
    const categoryMatch = selectedCategory === 'all' || tour.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || tour.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const categories = ['all', ...new Set(tours.map(t => t.category))];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const getTourIcon = (type: 'AR' | 'VR' | '3D') => {
    switch (type) {
      case 'AR':
        return <ScanFace className="w-6 h-6" />;
      case 'VR':
        return <Headset className="w-6 h-6" />;
      case '3D':
        return <Box className="w-6 h-6" />;
      default:
        return <Gamepad2 className="w-6 h-6" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 dark:text-green-400';
      case 'intermediate':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'advanced':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
        >
          {difficulties.map(diff => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <div
            key={tour.id}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
            onClick={() => onTourSelect(tour)}
          >
            <div className="aspect-video relative">
              <img
                src={tour.thumbnail}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md">
                {getTourIcon(tour.type)}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 px-2 py-1 rounded">
                  {tour.type}
                </span>
                <span className={`text-sm font-medium ${getDifficultyColor(tour.difficulty)}`}>
                  {tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1)}
                </span>
              </div>

              <h3 className="font-semibold text-lg">{tour.title}</h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {tour.description}
              </p>

              <div className="pt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Category: {tour.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
