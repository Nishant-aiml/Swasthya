import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { toast } from '@/components/ui/ToastNotification';

interface FileUploadProps {
  onUploadComplete: (fileInfo: { name: string; size: number; type: string }) => void;
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    const totalSteps = 10;
    let currentStep = 0;

    const uploadInterval = setInterval(() => {
      currentStep++;
      setUploadProgress((currentStep / totalSteps) * 100);

      if (currentStep === totalSteps) {
        clearInterval(uploadInterval);
        setIsUploading(false);
        onUploadComplete({
          name: file.name,
          size: file.size,
          type: file.type,
        });
      }
    }, 500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      simulateUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      simulateUpload(files[0]);
    }
  };

  return (
    <div
      className={`p-6 border-2 border-dashed rounded-lg ${
        isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 14v20c0 4.418 3.582 8 8 8h16c4.418 0 8-3.582 8-8V14M8 14c0-4.418 3.582-8 8-8h16c4.418 0 8 3.582 8 8M8 14h32"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          {isDragging ? 'Drop your file here' : 'Drag and drop your file here'}
        </h3>
        <p className="mt-1 text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>

        <div className="mt-4">
          <input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleFileSelect}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <label htmlFor="file-upload">
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              disabled={isUploading}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Select File
            </Button>
          </label>
        </div>

        {isUploading && (
          <div className="mt-4 space-y-2">
            <Progress value={uploadProgress} />
            <p className="text-sm text-gray-500">Uploading... {Math.round(uploadProgress)}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
