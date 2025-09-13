import React from 'react';
import { Star, MapPin, Globe, CreditCard, Award } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import type { Doctor } from '@/types/doctor';

interface DoctorComparisonProps {
  doctors: Doctor[];
  onClose?: () => void;
}

export default function DoctorComparison({ doctors, onClose }: DoctorComparisonProps) {
  const compareFeatures = [
    {
      label: 'Experience',
      getValue: (doctor: Doctor) => `${doctor.experience} years`,
    },
    {
      label: 'Rating',
      getValue: (doctor: Doctor) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span>{doctor.rating}</span>
          <span className="text-gray-500">({doctor.reviewCount})</span>
        </div>
      ),
    },
    {
      label: 'Consultation Fee',
      getValue: (doctor: Doctor) => (
        <div>
          <div className="font-semibold">₹{doctor.consultationFee}</div>
          {doctor.acceptsAyushman && (
            <div className="text-sm text-emerald-600">Ayushman Card Accepted</div>
          )}
        </div>
      ),
    },
    {
      label: 'Location',
      getValue: (doctor: Doctor) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          {doctor.location.address}
        </div>
      ),
    },
    {
      label: 'Languages',
      getValue: (doctor: Doctor) => (
        <div className="flex flex-wrap gap-2">
          {doctor.languages?.map((language, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
            >
              {language}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: 'Qualifications',
      getValue: (doctor: Doctor) => (
        <div className="space-y-1">
          {doctor.qualifications.map((qual, index) => (
            <div key={index} className="text-sm">{qual}</div>
          ))}
        </div>
      ),
    },
    {
      label: 'Available Slots',
      getValue: (doctor: Doctor) => (
        <div className="space-y-1">
          {doctor.availableSlots?.map((slot, index) => (
            <div key={index} className="text-sm">
              {slot.date}: {slot.slots.length} slots
            </div>
          )) || <div className="text-sm">0 slots</div>}
        </div>
      ),
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Compare Selected Doctors</Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Doctor Comparison</DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <div className="grid grid-cols-1 divide-y">
            {/* Doctor Headers */}
            <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-6 pb-6">
              <div className="font-medium text-gray-500">Doctor Profile</div>
              {doctors.map((doctor) => (
                <div key={doctor.id} className="space-y-3">
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    className="w-full aspect-square rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-blue-600">{doctor.specialization}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            {compareFeatures.map((feature) => (
              <div
                key={feature.label}
                className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-6 py-4"
              >
                <div className="font-medium text-gray-500">{feature.label}</div>
                {doctors.map((doctor) => (
                  <div key={doctor.id}>{feature.getValue(doctor)}</div>
                ))}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
