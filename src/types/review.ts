export interface Review {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  metrics: {
    punctuality: number;
    communication: number;
    treatment: number;
  };
  treatmentType: string;
  helpful: number;
}
