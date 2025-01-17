import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  HealthMetrics,
  MedicationReminder,
  HealthTask,
  EmotionalHealth,
} from '../types/health';

interface HealthState {
  metrics: HealthMetrics;
  medications: MedicationReminder[];
  tasks: HealthTask[];
  emotionalEntries: EmotionalHealth[];
  updateMetrics: (metrics: Partial<HealthMetrics>) => void;
  addMedication: (medication: MedicationReminder) => void;
  removeMedication: (id: string) => void;
  completeTask: (id: string) => void;
  addEmotionalEntry: (entry: EmotionalHealth) => void;
}

export const useHealthStore = create<HealthState>()(
  persist(
    (set) => ({
      metrics: {
        steps: 0,
        calories: 0,
        water: 0,
        sleep: 0,
        heartRate: 0,
        bloodPressure: {
          systolic: 0,
          diastolic: 0,
        },
      },
      medications: [],
      tasks: [],
      emotionalEntries: [],

      updateMetrics: (newMetrics) =>
        set((state) => ({
          metrics: { ...state.metrics, ...newMetrics },
        })),

      addMedication: (medication) =>
        set((state) => ({
          medications: [...state.medications, medication],
        })),

      removeMedication: (id) =>
        set((state) => ({
          medications: state.medications.filter((med) => med.id !== id),
        })),

      completeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: true } : task
          ),
        })),

      addEmotionalEntry: (entry) =>
        set((state) => ({
          emotionalEntries: [...state.emotionalEntries, entry],
        })),
    }),
    {
      name: 'health-store',
    }
  )
);