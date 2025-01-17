import { useState, useCallback } from 'react';
import { mockDoctors, mockAppointments } from '../data/mockData';
import type { Appointment } from '../types/doctor';

export function useAppointments() {
  const [appointments, setAppointments] = useState(mockAppointments);

  const cancelAppointment = useCallback((id: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' } : apt
      )
    );
  }, []);

  const rescheduleAppointment = useCallback((id: string, newDate: string, newTime: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, date: newDate, time: newTime } : apt
      )
    );
  }, []);

  const submitFeedback = useCallback((id: string, feedback: any) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, feedback } : apt
      )
    );
  }, []);

  const bookAppointment = useCallback((appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      id: `a${Date.now()}`,
      ...appointmentData,
      status: 'confirmed'
    };
    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  }, []);

  return {
    appointments,
    cancelAppointment,
    rescheduleAppointment,
    submitFeedback,
    bookAppointment,
  };
}
