import React from 'react';
import { MapPin, Calendar, Clock, Download, CreditCard, Phone, Mail } from 'lucide-react';
import { generateAppointmentPDF } from '../../utils/appointmentUtils';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), { ssr: false });

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface AppointmentConfirmationProps {
  appointmentId: string;
  doctorName: string;
  specialization: string;
  hospitalName: string;
  location: Location;
  date: Date;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  acceptsAyushman: boolean;
  ayushmanCardNumber?: string;
  specialInstructions?: string;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  appointmentId,
  doctorName,
  specialization,
  hospitalName,
  location,
  date,
  patientName,
  patientPhone,
  patientEmail,
  acceptsAyushman,
  ayushmanCardNumber,
  specialInstructions,
}) => {
  const handleDownload = () => {
    generateAppointmentPDF({
      appointmentId,
      doctorName,
      specialization,
      hospitalName,
      address: location.address,
      date: date.toLocaleDateString('en-IN'),
      time: date.toLocaleTimeString('en-IN'),
      patientName,
      patientPhone,
      acceptsAyushman,
      ayushmanCardNumber,
      specialInstructions,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-2">Appointment Confirmed!</h2>
          <p className="opacity-90">Your appointment has been successfully scheduled</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-8">
        {/* Appointment Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {date.toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-600">
                        {date.toLocaleTimeString('en-IN', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">{hospitalName}</p>
                    <p className="text-gray-600 mt-1">{location.address}</p>
                  </div>
                </div>

                {acceptsAyushman && ayushmanCardNumber && (
                  <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-lg">
                    <CreditCard className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-emerald-800">Ayushman Card Accepted</p>
                      <p className="text-emerald-600 text-sm">Card Number: {ayushmanCardNumber}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
              <div className="space-y-3">
                <p className="text-gray-800">{patientName}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{patientPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{patientEmail}</span>
                </div>
              </div>
            </div>

            {specialInstructions && (
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-medium text-amber-800 mb-2">Special Instructions</h4>
                <p className="text-amber-700">{specialInstructions}</p>
              </div>
            )}

            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 w-full bg-emerald-100 text-emerald-700 py-3 px-4 rounded-lg hover:bg-emerald-200 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Appointment Summary
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Location</h3>
              <div className="h-[300px] rounded-lg overflow-hidden">
                <Map center={location} zoom={15} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
