import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { Button } from '../../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { FileText, Upload, Clock, Share2, Lock } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  version: number;
  sharedWith: string[];
}

export default function MedicalRecordsManagement() {
  const [selectedRecord, setSelectedRecord] = useState('all');
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Blood Test Report.pdf',
      type: 'Lab Report',
      date: '2025-01-15',
      size: '2.5 MB',
      version: 1,
      sharedWith: ['Dr. Smith', 'Family']
    },
    {
      id: '2',
      name: 'X-Ray Results.jpg',
      type: 'Imaging',
      date: '2025-01-10',
      size: '5.0 MB',
      version: 2,
      sharedWith: ['Dr. Johnson']
    }
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Records Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Medical Records</h2>
          <Select
            value={selectedRecord}
            onValueChange={setSelectedRecord}
            defaultValue="all"
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter records" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Records</SelectItem>
              <SelectItem value="prescriptions">Prescriptions</SelectItem>
              <SelectItem value="reports">Lab Reports</SelectItem>
              <SelectItem value="imaging">Imaging</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Upload Section */}
        <div className="border-2 border-dashed rounded-lg p-4">
          <div className="text-center">
            <Upload className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-medium">Upload Documents</h3>
            <p className="text-sm text-gray-500">
              Drag and drop files or click to browse
            </p>
          </div>
          <Input
            type="file"
            className="hidden"
            id="file-upload"
            multiple
            accept=".pdf,.jpg,.png,.doc,.docx"
          />
        </div>

        {/* Document Categories */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="flex items-center justify-center">
            <FileText className="w-4 h-4 mr-2" />
            Lab Reports
          </Button>
          <Button variant="outline" className="flex items-center justify-center">
            <FileText className="w-4 h-4 mr-2" />
            Prescriptions
          </Button>
          <Button variant="outline" className="flex items-center justify-center">
            <FileText className="w-4 h-4 mr-2" />
            Imaging Results
          </Button>
          <Button variant="outline" className="flex items-center justify-center">
            <FileText className="w-4 h-4 mr-2" />
            Discharge Summary
          </Button>
        </div>

        {/* Document List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Recent Documents</Label>
            <Select
              value="date"
              onValueChange={() => {}}
              defaultValue="date"
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-gray-500">
                      {doc.type} • {doc.size}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Lock className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {doc.date}
                  </div>
                  <div>
                    Version {doc.version}
                  </div>
                </div>

                {doc.sharedWith.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {doc.sharedWith.map((person, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {person}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="outline">Load More Documents</Button>
        </div>
      </CardContent>
    </Card>
  );
}
