import React, { useState } from 'react';
import { HealthGroup } from '@/types/Resources';
import { Users, Trophy, Calendar, Lock, Unlock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface HealthGroupsProps {
  groups: HealthGroup[];
  onJoinGroup: (groupId: string) => void;
  onViewActivity: (groupId: string, activityId: string) => void;
}

export function HealthGroups({ groups, onJoinGroup, onViewActivity }: HealthGroupsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = ['all', ...new Set(groups.map(g => g.category))];

  const filteredGroups = groups.filter(
    group => selectedCategory === 'all' || group.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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

        <button
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
          onClick={() => {/* Handle create group */}}
        >
          Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="aspect-video relative">
              <img
                src={group.thumbnail}
                alt={group.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                {group.isPrivate ? (
                  <Lock className="w-5 h-5 text-white" />
                ) : (
                  <Unlock className="w-5 h-5 text-white" />
                )}
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {group.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{group.members} members</span>
                </div>
                <span className="text-primary-600 dark:text-primary-400">
                  {group.category}
                </span>
              </div>

              {group.activities.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Current Activities</h4>
                  <div className="space-y-2">
                    {group.activities.slice(0, 2).map((activity) => (
                      <button
                        key={activity.id}
                        onClick={() => onViewActivity(group.id, activity.id)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {activity.type === 'challenge' ? (
                            <Trophy className="w-4 h-4 text-yellow-500" />
                          ) : (
                            <Calendar className="w-4 h-4 text-primary-500" />
                          )}
                          <span className="text-sm font-medium">{activity.title}</span>
                        </div>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => onJoinGroup(group.id)}
                className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium mt-2"
              >
                Join Group
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
