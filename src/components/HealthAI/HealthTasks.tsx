import React from 'react';
import { Trophy, CheckCircle2, Circle } from 'lucide-react';
import { useHealthStore } from '../../store/healthStore';

const categories = {
  exercise: 'bg-blue-50 text-blue-700',
  nutrition: 'bg-green-50 text-green-700',
  mindfulness: 'bg-purple-50 text-purple-700',
  sleep: 'bg-indigo-50 text-indigo-700',
};

export default function HealthTasks() {
  const { tasks, completeTask } = useHealthStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">Swasthya</h3>
          <p className="text-xs text-gray-600">by Shrinu</p>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-medium">
            {tasks.filter(t => t.completed).length} / {tasks.length}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg border ${
              task.completed ? 'bg-gray-50 border-gray-200' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => completeTask(task.id)}
                className="mt-0.5 flex-shrink-0"
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
              </button>

              <div>
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {task.description}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    categories[task.category]
                  }`}>
                    {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {task.points} points
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}