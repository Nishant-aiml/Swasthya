import React, { useState } from 'react';
import { FileText, Upload, Folder, Search, Download, Trash2, Eye } from 'lucide-react';

interface HealthRecord {
  id: string;
  name: string;
  type: 'report' | 'prescription' | 'scan' | 'other';
  date: Date;
  size: number;
  category: string;
  uploadedBy: string;
  tags: string[];
  file: string; // URL to file
}

export default function HealthRecordsVault() {
  const [records, setRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      name: 'Blood Test Report.pdf',
      type: 'report',
      date: new Date('2024-02-15'),
      size: 2.5 * 1024 * 1024, // 2.5MB
      category: 'Lab Reports',
      uploadedBy: 'Dr. Smith',
      tags: ['blood test', 'routine', 'annual'],
      file: '/path/to/file.pdf'
    },
    {
      id: '2',
      name: 'X-Ray Chest.jpg',
      type: 'scan',
      date: new Date('2024-02-10'),
      size: 5 * 1024 * 1024, // 5MB
      category: 'Radiology',
      uploadedBy: 'City Hospital',
      tags: ['x-ray', 'chest', 'routine'],
      file: '/path/to/xray.jpg'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [uploading, setUploading] = useState(false);

  const categories = ['all', ...new Set(records.map(record => record.category))];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || record.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newRecord: HealthRecord = {
        id: Date.now().toString(),
        name: file.name,
        type: 'other',
        date: new Date(),
        size: file.size,
        category: 'Uncategorized',
        uploadedBy: 'Self',
        tags: [],
        file: URL.createObjectURL(file)
      };

      setRecords(prev => [...prev, newRecord]);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Health Records Vault</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search records..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
            <Upload className="h-5 w-5" />
            <span>Upload</span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {uploading && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-blue-600">Uploading file...</span>
            </div>
          </div>
        )}

        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{record.name}</h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span>{record.category}</span>
                    <span>•</span>
                    <span>{record.date.toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{formatFileSize(record.size)}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {record.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.open(record.file, '_blank')}
                  className="p-2 text-gray-400 hover:text-blue-600"
                  title="View"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = record.file;
                    link.download = record.name;
                    link.click();
                  }}
                  className="p-2 text-gray-400 hover:text-green-600"
                  title="Download"
                >
                  <Download className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="p-2 text-gray-400 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <Folder className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload your medical records to keep them organized and secure
            </p>
          </div>
        )}
      </div>

      {/* Storage Info */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Storage Used</h4>
            <p className="text-xs text-gray-500">
              {formatFileSize(records.reduce((acc, record) => acc + record.size, 0))} of 1 GB
            </p>
          </div>
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{
                width: `${(records.reduce((acc, record) => acc + record.size, 0) / (1024 * 1024 * 1024)) * 100}%`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}