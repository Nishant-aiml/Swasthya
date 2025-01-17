import React from 'react';
import { Upload } from 'lucide-react';

export default function InsuranceHelp() {
  return (
    <div className="min-h-screen bg-gray-50">      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Insurance Assistance</h1>
        <p className="text-gray-600 mb-6">Quick claims processing and insurance management</p>

        {/* Insurance Card */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-blue-800 font-medium">HealthGuard Insurance</h2>
              <p className="text-sm text-blue-600">Policy: HG-2023-12345</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600">Coverage Limit</p>
              <p className="text-xl font-semibold text-blue-800">₹500,000</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button className="border-b-2 border-blue-500 py-4 px-1 text-blue-600">
              Quick Claim
            </button>
            <button className="py-4 px-1 text-gray-500 hover:text-gray-700">
              Claims History
            </button>
            <button className="py-4 px-1 text-gray-500 hover:text-gray-700">
              Coverage Details
            </button>
          </nav>
        </div>

        {/* Claim Type Grid */}
        <h3 className="text-sm font-medium text-gray-700 mb-3">Claim Type</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
            <h4 className="text-blue-800 font-medium">Emergency</h4>
            <p className="text-sm text-blue-600">Immediate medical attention required</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-200">
            <h4 className="text-gray-800 font-medium">Hospitalization</h4>
            <p className="text-sm text-gray-600">Planned or emergency hospital stay</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-200">
            <h4 className="text-gray-800 font-medium">Medication</h4>
            <p className="text-sm text-gray-600">Prescription medicine expenses</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-200">
            <h4 className="text-gray-800 font-medium">Consultation</h4>
            <p className="text-sm text-gray-600">Doctor consultation fees</p>
          </div>
        </div>

        {/* Document Upload */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Upload Documents</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="mt-1 text-sm text-gray-500">
                Drag and drop your files here, or click to select files
              </p>
              <button className="mt-2 px-4 py-2 text-sm text-blue-500 hover:text-blue-600">
                Browse Files
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
