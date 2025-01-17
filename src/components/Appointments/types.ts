export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  date: Date;
  time: string;
  doctorType: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  cancellationReason?: string;
}

export const doctorTypes = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic',
  'Neurologist',
] as const;

export const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
] as const;

export type DoctorType = typeof doctorTypes[number];
export type TimeSlot = typeof timeSlots[number];
