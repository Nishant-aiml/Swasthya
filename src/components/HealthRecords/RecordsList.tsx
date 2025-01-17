import React from 'react';
import { FileText, Download, Share2 } from 'lucide-react';

interface HealthRecord {
  type: string;
  date: string;
  doctor: string;
  hospital: string;
  fileUrl: string;
}

export default function RecordsList() {
  const records: HealthRecord[] = [
    {
      type: 'Blood Test Report',
      date: '2024-03-15',
      doctor: 'Dr. Sharma',
      hospital: 'Apollo Hospital',
      fileUrl: '#'
    },
    {
      type: 'X-Ray Report',
      date: '2024-02-28',
      doctor: 'Dr. Patel',
      hospital: 'Max Healthcare',
      fileUrl: '#'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Health Records</h2>
        <button className="text-emerald-600 hover:text-emerald-700 font-medium">
          Upload New
        </button>
      </div>
      
      <div className="divide-y divide-gray-200">
        {records.map((record, index) => (
          <div key={index} className="p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium">{record.type}</h3>
                  <p className="text-sm text-gray-600">
                    {record.doctor} • {record.hospital}
                  </p>
                  <p className="text-sm text-gray-500">{record.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Download className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}