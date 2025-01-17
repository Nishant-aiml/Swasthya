import React, { useState } from 'react';
import { Bell, Plus, Clock, Calendar, Trash2, Edit2 } from 'lucide-react';

interface MedicineReminder {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  time: string[];
  startDate: Date;
  endDate: Date | null;
  notes: string;
}

export default function MedicineReminder() {
  const [reminders, setReminders] = useState<MedicineReminder[]>([
    {
      id: '1',
      medicineName: 'Vitamin D3',
      dosage: '1 tablet',
      frequency: 'daily',
      time: ['09:00'],
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      notes: 'Take after breakfast'
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingReminder, setEditingReminder] = useState<MedicineReminder | null>(null);

  const handleAddReminder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const newReminder: MedicineReminder = {
      id: Date.now().toString(),
      medicineName: formData.get('medicineName') as string,
      dosage: formData.get('dosage') as string,
      frequency: formData.get('frequency') as string,
      time: [(formData.get('time') as string)],
      startDate: new Date(formData.get('startDate') as string),
      endDate: formData.get('endDate') ? new Date(formData.get('endDate') as string) : null,
      notes: formData.get('notes') as string
    };

    setReminders(prev => [...prev, newReminder]);
    setShowAddForm(false);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const handleEditReminder = (reminder: MedicineReminder) => {
    setEditingReminder(reminder);
    setShowAddForm(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Medicine Reminders</h2>
        <button
          onClick={() => {
            setEditingReminder(null);
            setShowAddForm(true);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Reminder</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <form onSubmit={handleAddReminder}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
                <input
                  type="text"
                  name="medicineName"
                  defaultValue={editingReminder?.medicineName}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Dosage</label>
                <input
                  type="text"
                  name="dosage"
                  defaultValue={editingReminder?.dosage}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Frequency</label>
                <select
                  name="frequency"
                  defaultValue={editingReminder?.frequency || 'daily'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  defaultValue={editingReminder?.time[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  defaultValue={editingReminder?.startDate.toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date (Optional)</label>
                <input
                  type="date"
                  name="endDate"
                  defaultValue={editingReminder?.endDate?.toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  defaultValue={editingReminder?.notes}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingReminder(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingReminder ? 'Update' : 'Add'} Reminder
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{reminder.medicineName}</h3>
                <p className="text-sm text-gray-500">{reminder.dosage}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditReminder(reminder)}
                  className="text-gray-400 hover:text-blue-500"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteReminder(reminder.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{reminder.time.join(', ')}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>
                  {reminder.startDate.toLocaleDateString()} 
                  {reminder.endDate && ` - ${reminder.endDate.toLocaleDateString()}`}
                </span>
              </div>
            </div>

            {reminder.notes && (
              <p className="mt-2 text-sm text-gray-600">{reminder.notes}</p>
            )}
          </div>
        ))}
      </div>

      {reminders.length === 0 && (
        <div className="text-center py-12">
          <Bell className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No reminders</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new medicine reminder
          </p>
        </div>
      )}
    </div>
  );
} 