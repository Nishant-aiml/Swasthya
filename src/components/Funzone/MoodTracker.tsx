import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MoodEntry } from '@/types/Funzone';
import { 
  Smile,
  SmilePlus,
  Meh,
  Frown,
  Angry,
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface MoodTrackerProps {
  onStreak: () => void;
}

const moodEmojis = {
  happy: <SmilePlus className="h-8 w-8 text-green-500" />,
  good: <Smile className="h-8 w-8 text-blue-500" />,
  neutral: <Meh className="h-8 w-8 text-yellow-500" />,
  sad: <Frown className="h-8 w-8 text-orange-500" />,
  stressed: <Angry className="h-8 w-8 text-red-500" />
};

const activities = [
  'Exercise', 'Meditation', 'Reading', 'Social', 'Work',
  'Family', 'Hobbies', 'Nature', 'Rest', 'Learning'
];

export default function MoodTracker({ onStreak }: MoodTrackerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState<MoodEntry['mood'] | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSave = () => {
    if (selectedMood) {
      // Save mood entry logic here
      onStreak();
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Mood Calendar</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() - 1);
                setSelectedDate(newDate);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {selectedDate.toLocaleDateString('en-US', { 
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() + 1);
                setSelectedDate(newDate);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mood Selection */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {(Object.entries(moodEmojis) as [MoodEntry['mood'], JSX.Element][]).map(([mood, emoji]) => (
            <motion.div
              key={mood}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all ${
                  selectedMood === mood
                    ? 'ring-2 ring-blue-500 shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedMood(mood)}
              >
                <div className="flex flex-col items-center gap-2">
                  {emoji}
                  <span className="text-sm font-medium capitalize">
                    {mood}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Activities */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3">What did you do today?</h4>
          <div className="flex flex-wrap gap-2">
            {activities.map(activity => (
              <Button
                key={activity}
                variant={selectedActivities.includes(activity) ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleActivityToggle(activity)}
              >
                {activity}
              </Button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Notes (Optional)</h4>
          <textarea
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="How are you feeling today?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <Button
          className="w-full"
          disabled={!selectedMood}
          onClick={handleSave}
        >
          Save Mood Entry
        </Button>
      </Card>

      {/* Mood Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Mood Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="text-sm font-medium text-green-700 mb-1">Weekly Mood</h4>
            <p className="text-2xl font-bold text-green-600">Mostly Happy</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-700 mb-1">Streak</h4>
            <p className="text-2xl font-bold text-blue-600">7 Days</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="text-sm font-medium text-purple-700 mb-1">Top Activity</h4>
            <p className="text-2xl font-bold text-purple-600">Exercise</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
