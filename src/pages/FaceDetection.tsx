import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Camera, Upload, AlertTriangle, Info } from 'lucide-react';
import { AIMedicalService } from '@/services/aiMedical.service';

interface AnalysisResult {
  condition: string;
  confidence: number;
  description: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
}

export default function FaceDetection() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      setError('Unable to access camera');
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setImage(imageData);
        stopCamera();
        analyzeImage(imageData);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCapturing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setImage(imageData);
        analyzeImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageData: string) => {
    setAnalyzing(true);
    setError(null);
    try {
      // TODO: Implement actual AI analysis
      // Mock analysis results for demonstration
      const mockResults: AnalysisResult[] = [
        {
          condition: 'Fatigue Signs',
          confidence: 0.85,
          description: 'Detected signs of fatigue based on eye patterns and facial features',
          recommendations: ['Ensure adequate sleep', 'Take regular breaks', 'Stay hydrated'],
          severity: 'medium'
        },
        {
          condition: 'Stress Indicators',
          confidence: 0.75,
          description: 'Facial muscle tension patterns indicate potential stress',
          recommendations: ['Practice stress management', 'Consider relaxation techniques'],
          severity: 'medium'
        }
      ];
      setResults(mockResults);
    } catch (err) {
      setError('Error analyzing image. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Face-Based Health Analysis</h1>
        <p className="text-gray-600">
          AI-powered facial analysis to detect potential health indicators
        </p>
        <div className="mt-2">
          <Badge variant="outline" className="bg-yellow-50">
            <AlertTriangle className="h-4 w-4 mr-1" />
            For preliminary screening only
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Capture Section */}
        <Card>
          <CardHeader>
            <CardTitle>Image Capture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isCapturing ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg"
                  />
                  <Button
                    onClick={captureImage}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Capture
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button onClick={startCamera} className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Start Camera
                  </Button>
                  <div className="text-center text-gray-500">or</div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </div>
              )}

              {image && (
                <div className="mt-4">
                  <img src={image} alt="Captured" className="w-full rounded-lg" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {analyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
                <p className="mt-4 text-gray-600">Analyzing image...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                {error}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-6">
                {results.map((result, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{result.condition}</h3>
                      <Badge
                        variant={{
                          low: 'secondary',
                          medium: 'default',
                          high: 'destructive'
                        }[result.severity]}
                      >
                        {result.confidence * 100}% Confidence
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{result.description}</p>
                    <div className="space-y-1">
                      {result.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    This analysis is for preliminary screening only. Please consult with a healthcare
                    professional for proper medical diagnosis and treatment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No analysis results yet. Please capture or upload an image.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}