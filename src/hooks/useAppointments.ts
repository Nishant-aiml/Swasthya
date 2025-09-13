import { useState } from 'react';
import { Appointment } from '@/types/appointment';

export const useAppointments = (initialAppointments: Appointment[] = []) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev =>
      prev.map(app => (app.id === id ? { ...app, ...updates } : app))
    );
  };

  const cancelAppointment = (id: string, reason: string) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === id
          ? {
              ...app,
              status: 'cancelled' as const,
              cancellationReason: reason
            }
          : app
      )
    );
  };

  const getAppointmentById = (id: string) => {
    return appointments.find(app => app.id === id);
  };

  return {
    appointments,
    addAppointment,
    updateAppointment,
    cancelAppointment,
    getAppointmentById
  };
};
