export const languages = [
  'English',
  'Hindi',
  'Telugu',
  'Tamil',
  'Kannada',
  'Malayalam',
  'Bengali',
  'Marathi',
  'Gujarati',
  'Punjabi'
];

export const appointmentStatus = [
  'confirmed',
  'completed',
  'cancelled',
  'scheduled'
] as const;

export const consultationType = [
  'video',
  'in-person',
  'phone'
] as const;

export const metrics = {
  punctuality: 'Punctuality',
  communication: 'Communication',
  treatment: 'Treatment Effectiveness'
} as const;
