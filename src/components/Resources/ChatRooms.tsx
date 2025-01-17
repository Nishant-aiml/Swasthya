import React, { useState } from 'react';
import { ChatRoom } from '@/types/Resources';
import { MessageCircle, Users, Clock, Shield, EyeOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ChatRoomsProps {
  rooms: ChatRoom[];
  onJoinRoom: (roomId: string) => void;
}

export function ChatRooms({ rooms, onJoinRoom }: ChatRoomsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = ['all', ...new Set(rooms.map(r => r.category))];

  const filteredRooms = rooms.filter(
    room => selectedCategory === 'all' || room.category === selectedCategory
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
          onClick={() => {/* Handle create room */}}
        >
          Create Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h3 className="font-semibold text-lg">{room.name}</h3>
              </div>
              {room.isAnonymous && (
                <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {room.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{room.participants} participants</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    Active {formatDistanceToNow(new Date(room.lastActive))} ago
                  </span>
                </div>
              </div>

              {room.moderators.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {room.moderators.length} moderator{room.moderators.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}

              <div className="pt-2">
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
                  {room.category}
                </span>
              </div>
            </div>

            <button
              onClick={() => onJoinRoom(room.id)}
              className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium mt-4"
            >
              Join Chat Room
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
