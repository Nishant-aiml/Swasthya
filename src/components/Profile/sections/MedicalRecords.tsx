import { useState, createElement } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { toast } from '@/components/ui/ToastNotification';
import { dummyMedicalRecords, MedicalRecord } from '@/data/profile-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import FileUpload from './FileUpload';

export default function MedicalRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>(dummyMedicalRecords);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const downloadDocument = (documentName: string) => {
    const dummyContent = 'This is a simulated medical document content.';
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = documentName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Download Started',
      description: `Downloading ${documentName}`,
      duration: 3000,
    });
  };

  const handleViewDetails = (record: MedicalRecord) => {
    setSelectedRecord(record);
  };

  const handleUploadComplete = (fileInfo: { name: string; size: number; type: string }) => {
    const newRecord: MedicalRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: 'Document Upload',
      description: `Uploaded ${fileInfo.name}`,
      doctor: 'Self Upload',
      hospital: 'N/A',
      documents: [fileInfo.name],
      status: 'completed'
    };

    setRecords([newRecord, ...records]);
    setShowUploadDialog(false);
    
    toast({
      title: 'Upload Successful',
      description: `${fileInfo.name} has been uploaded successfully`,
      duration: 3000,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        // Process the file content
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Medical Records</h2>
        <Button onClick={() => setShowUploadDialog(true)}>Upload New Record</Button>
      </div>

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Medical Record</DialogTitle>
            <DialogDescription>
              Upload your medical documents securely
            </DialogDescription>
          </DialogHeader>
          <FileUpload onUploadComplete={handleUploadComplete} />
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.doctor}</TableCell>
              <TableCell>{record.hospital}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  record.status === 'completed' ? 'bg-green-100 text-green-800' :
                  record.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {record.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(record)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Medical Record Details</DialogTitle>
                        <DialogDescription>
                          Detailed information about the medical record
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Type</Label>
                          <Input value={record.type} readOnly />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Input value={record.description} readOnly />
                        </div>
                        <div>
                          <Label>Doctor</Label>
                          <Input value={record.doctor} readOnly />
                        </div>
                        <div>
                          <Label>Hospital</Label>
                          <Input value={record.hospital} readOnly />
                        </div>
                        <div>
                          <Label>Documents</Label>
                          <div className="space-y-2">
                            {record.documents.map((doc, index) => (
                              <div key={index} className="flex items-center justify-between p-2 border rounded">
                                <span>{doc}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => downloadDocument(doc)}
                                >
                                  Download
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
