import React, { useState } from 'react';
import { Bell, Plus, Clock, Calendar } from 'lucide-react';
import { useHealthStore } from '../../store/healthStore';
import { MedicationReminder as MedicationReminderType } from '../../types/health';

export default function MedicationReminder() {
  const { medications, addMedication, removeMedication } = useHealthStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState<Partial<MedicationReminderType>>({
    medicationName: '',
    dosage: '',
    frequency: 'daily',
    time: ['08:00'],
  });

  const handleAddMedication = () => {
    if (!newMedication.medicationName || !newMedication.dosage) return;

    addMedication({
      ...newMedication,
      id: Date.now().toString(),
      startDate: new Date().toISOString(),
      time: newMedication.time || ['08:00'],
    } as MedicationReminderType);

    setShowAddForm(false);
    setNewMedication({
      medicationName: '',
      dosage: '',
      frequency: 'daily',
      time: ['08:00'],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">Swasthya</h3>
          <p className="text-xs text-gray-600">by Shrinu</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
        >
          <Plus className="h-4 w-4" />
          Add Medication
        </button>
      </div>

      {showAddForm && (
        <div className="p-4 rounded-lg border border-gray-200 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Medication Name
            </label>
            <input
              type="text"
              value={newMedication.medicationName}
              onChange={(e) => setNewMedication(prev => ({
                ...prev,
                medicationName: e.target.value
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dosage
            </label>
            <input
              type="text"
              value={newMedication.dosage}
              onChange={(e) => setNewMedication(prev => ({
                ...prev,
                dosage: e.target.value
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddMedication}
              className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
            >
              Add Reminder
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {medications.map((medication) => (
          <div
            key={medication.id}
            className="p-4 rounded-lg border border-gray-200 bg-white"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{medication.medicationName}</h4>
                <p className="text-sm text-gray-600">{medication.dosage}</p>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {medication.time[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(medication.startDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeMedication(medication.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}