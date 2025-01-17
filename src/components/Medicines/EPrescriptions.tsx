import React, { useState } from 'react';
import { Upload, FileText, Trash2, Eye, Calendar, Clock, AlertCircle } from 'lucide-react';

interface Prescription {
  id: string;
  fileName: string;
  uploadDate: Date;
  expiryDate: Date;
  status: 'active' | 'expired' | 'pending';
  doctorName: string;
  medicines: Array<{
    name: string;
    dosage: string;
    duration: string;
  }>;
}

export default function EPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      fileName: 'prescription-mar2024.pdf',
      uploadDate: new Date('2024-03-01'),
      expiryDate: new Date('2024-06-01'),
      status: 'active',
      doctorName: 'Dr. Sarah Johnson',
      medicines: [
        { name: 'Amoxicillin', dosage: '500mg', duration: '7 days' },
        { name: 'Paracetamol', dosage: '650mg', duration: '3 days' }
      ]
    }
  ]);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newPrescription: Prescription = {
        id: Date.now().toString(),
        fileName: file.name,
        uploadDate: new Date(),
        expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        status: 'pending',
        doctorName: 'Pending Verification',
        medicines: []
      };

      setPrescriptions(prev => [...prev, newPrescription]);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    setPrescriptions(prev => prev.filter(p => p.id !== id));
    if (selectedPrescription?.id === id) {
      setSelectedPrescription(null);
    }
  };

  const getStatusColor = (status: Prescription['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">E-Prescriptions</h2>

      {/* Upload Section */}
      <div className="mb-8">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="prescription-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Upload a prescription
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  PDF, JPG, or PNG up to 10MB
                </span>
                <input
                  id="prescription-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            {uploading && (
              <div className="mt-4 text-sm text-blue-600">
                Uploading prescription...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Your Prescriptions</h3>
          {prescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedPrescription?.id === prescription.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedPrescription(prescription)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{prescription.fileName}</p>
                    <p className="text-sm text-gray-500">
                      Dr. {prescription.doctorName}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(prescription.status)}`}>
                  {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Uploaded: {prescription.uploadDate.toLocaleDateString()}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(prescription.id);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Prescription Details */}
        <div>
          {selectedPrescription ? (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Prescription Details</h3>
                <button className="text-blue-600 hover:text-blue-700">
                  <Eye className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium">{selectedPrescription.doctorName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Valid Until</p>
                  <p className="font-medium">
                    {selectedPrescription.expiryDate.toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Prescribed Medicines</p>
                  <div className="space-y-2">
                    {selectedPrescription.medicines.map((medicine, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-3 rounded-lg"
                      >
                        <p className="font-medium">{medicine.name}</p>
                        <p className="text-sm text-gray-600">
                          {medicine.dosage} - {medicine.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedPrescription.status === 'active' && (
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Order Medicines
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-6 text-center text-gray-500">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p>Select a prescription to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Warning Message */}
      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Important Notice
            </h3>
            <p className="mt-1 text-sm text-yellow-700">
              Please ensure your prescriptions are valid and up-to-date. Expired or invalid
              prescriptions cannot be used for ordering medicines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 