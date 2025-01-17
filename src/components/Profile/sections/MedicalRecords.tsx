import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';
import { Upload, Lock, Share2, History } from 'lucide-react';

export function MedicalRecords() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [sharePermission, setSharePermission] = useState('private');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Records</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Digital Record Storage</Label>
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <Input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <Label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <p>Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">
                Supports PDF, JPG, PNG (up to 10MB)
              </p>
            </Label>
          </div>
          {selectedFile && (
            <p className="text-sm text-green-600">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Document Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lab-reports">Lab Reports</SelectItem>
              <SelectItem value="prescriptions">Prescriptions</SelectItem>
              <SelectItem value="imaging">Imaging Results</SelectItem>
              <SelectItem value="vaccination">Vaccination Records</SelectItem>
              <SelectItem value="discharge">Discharge Summaries</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sharing Permissions</Label>
          <Select value={sharePermission} onValueChange={setSharePermission}>
            <SelectTrigger>
              <SelectValue placeholder="Set permissions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="doctors">Doctors Only</SelectItem>
              <SelectItem value="family">Family Members</SelectItem>
              <SelectItem value="emergency">Emergency Access</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="flex items-center">
            <Lock className="w-4 h-4 mr-2" />
            Blockchain Security
          </Button>
          <Button variant="outline" className="flex items-center">
            <Share2 className="w-4 h-4 mr-2" />
            Share Records
          </Button>
          <Button variant="outline" className="flex items-center">
            <History className="w-4 h-4 mr-2" />
            Version History
          </Button>
        </div>

        <Button className="w-full">Upload Record</Button>
      </CardContent>
    </Card>
  );
}
