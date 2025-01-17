import React from 'react';
import DoctorList from '../components/DoctorBooking/DoctorList';

export default function DoctorConsultation() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Find a Doctor</h1>
        <p className="text-gray-600">
          Book in-person or online consultations with verified doctors
        </p>
      </div>
      <DoctorList />
    </div>
  );
}