import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, AlertTriangle, Phone, Mail, Clock, Shield } from 'lucide-react';

interface InsuranceClaim {
  id: string;
  type: 'emergency' | 'hospitalization' | 'medication' | 'consultation';
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  amount: number;
  date: Date;
  hospital?: string;
  documents: string[];
  comments?: string;
}

interface InsuranceProvider {
  id: string;
  name: string;
  policyNumber: string;
  coverageLimit: number;
  contact: {
    phone: string;
    email: string;
    emergencyNumber: string;
  };
  features: string[];
}

export default function InsuranceAssistance() {
  const [activeTab, setActiveTab] = useState<'quick-claim' | 'history' | 'coverage'>('quick-claim');
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState<InsuranceClaim['type']>('emergency');

  // Mock data
  const insuranceProvider: InsuranceProvider = {
    id: '1',
    name: 'HealthGuard Insurance',
    policyNumber: 'HG-2023-12345',
    coverageLimit: 500000,
    contact: {
      phone: '+91 98765 43210',
      email: 'claims@healthguard.com',
      emergencyNumber: '1800-123-4567'
    },
    features: [
      'Cashless hospitalization',
      'Emergency medical evacuation',
      'Pre and post hospitalization coverage',
      '24/7 claims assistance',
      'Network hospitals coverage'
    ]
  };

  const recentClaims: InsuranceClaim[] = [
    {
      id: '1',
      type: 'emergency',
      status: 'approved',
      amount: 25000,
      date: new Date('2023-12-01'),
      hospital: 'City General Hospital',
      documents: ['admission.pdf', 'bills.pdf', 'prescription.pdf'],
      comments: 'Emergency appendectomy procedure'
    },
    {
      id: '2',
      type: 'medication',
      status: 'pending',
      amount: 5000,
      date: new Date('2023-12-10'),
      documents: ['prescription.pdf', 'bills.pdf'],
      comments: 'Monthly medication refill'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploading(true);
      // Simulate file upload
      setTimeout(() => {
        setUploading(false);
        // Show success message
      }, 2000);
    }
  };

  const handleQuickClaim = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle claim submission
  };

  const getStatusColor = (status: InsuranceClaim['status']) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Insurance Assistance</h2>
        <p className="text-sm text-gray-500 mt-1">
          Quick claims processing and insurance management
        </p>
      </div>

      {/* Insurance Provider Info */}
      <div className="mb-6 bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-blue-900">{insuranceProvider.name}</h3>
            <p className="text-sm text-blue-700">Policy: {insuranceProvider.policyNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-700">Coverage Limit</p>
            <p className="font-medium text-blue-900">₹{insuranceProvider.coverageLimit.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-6">
          {[
            { id: 'quick-claim', label: 'Quick Claim' },
            { id: 'history', label: 'Claims History' },
            { id: 'coverage', label: 'Coverage Details' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`pb-3 text-sm font-medium ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Claim Form */}
      {activeTab === 'quick-claim' && (
        <form onSubmit={handleQuickClaim} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Claim Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              {(['emergency', 'hospitalization', 'medication', 'consultation'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`p-4 rounded-lg border text-left ${
                    selectedType === type
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {type === 'emergency' && 'Immediate medical attention required'}
                    {type === 'hospitalization' && 'Planned or emergency hospital stay'}
                    {type === 'medication' && 'Prescription medicine expenses'}
                    {type === 'consultation' && 'Doctor consultation fees'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Documents
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500">Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileUpload}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Submit Claim'}
          </button>
        </form>
      )}

      {/* Claims History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {recentClaims.map((claim) => (
            <div key={claim.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {claim.type.charAt(0).toUpperCase() + claim.type.slice(1)} Claim
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {claim.hospital && `${claim.hospital} • `}
                    {claim.date.toLocaleDateString()}
                  </p>
                </div>
                <span className="font-medium text-gray-900">
                  ₹{claim.amount.toLocaleString()}
                </span>
              </div>

              {claim.documents.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2">Documents:</div>
                  <div className="flex flex-wrap gap-2">
                    {claim.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-1 text-sm bg-gray-100 px-2 py-1 rounded"
                      >
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {claim.comments && (
                <p className="mt-4 text-sm text-gray-600">
                  {claim.comments}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Coverage Details */}
      {activeTab === 'coverage' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">General: {insuranceProvider.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-red-400" />
                  <span className="text-gray-600">Emergency: {insuranceProvider.contact.emergencyNumber}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{insuranceProvider.contact.email}</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-4">Processing Times</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Emergency Claims: 24-48 hours</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Regular Claims: 5-7 working days</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Reimbursements: 7-10 working days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Coverage Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insuranceProvider.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}