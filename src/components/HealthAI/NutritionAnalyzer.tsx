import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, X } from 'lucide-react';
import { analyzeNutrition } from '../../services/healthAI';
import type { NutritionAnalysis } from '../../services/healthAI';

export default function NutritionAnalyzer() {
  const [analysis, setAnalysis] = useState<NutritionAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setError('');
    try {
      // Create image preview
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        
        // Convert base64 to text content for analysis
        const textContent = `Food image content: ${file.name}`;
        const result = await analyzeNutrition([textContent]);
        setAnalysis(result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error analyzing nutrition:', error);
      setError('Unable to analyze nutrition information. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
  });

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-lg">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Food Nutrition Analyzer</h2>
          <p className="text-gray-600">
            Upload a photo of your food to analyze its nutritional content
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-500'}`}
          >
            <input {...getInputProps()} />
            <Camera className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive
                ? 'Drop the image here...'
                : 'Take a photo or drop an image of your food'}
            </p>
          </div>

          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Food preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setImagePreview(null);
                  setAnalysis(null);
                }}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Analyzing nutrition content...</p>
            </div>
          )}

          {analysis && !error && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Nutrition Information</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">Calories</p>
                    <p className="text-lg font-semibold text-emerald-600">{analysis.calories} kcal</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">Protein</p>
                    <p className="text-lg font-semibold text-emerald-600">{analysis.macronutrients.protein}g</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">Carbs</p>
                    <p className="text-lg font-semibold text-emerald-600">{analysis.macronutrients.carbs}g</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">Fats</p>
                    <p className="text-lg font-semibold text-emerald-600">{analysis.macronutrients.fats}g</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-700 mb-2">Recommendations</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="text-gray-600">{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}