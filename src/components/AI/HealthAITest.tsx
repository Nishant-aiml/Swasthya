import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { getHealthAdvice, getPreliminaryDiagnosis } from '@/services/aiMedical.service';
import { Textarea } from '../ui/Textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { Label } from '../ui/Label';

interface Symptom {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
}

export default function HealthAITest() {
  const [symptoms, setSymptoms] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('symptoms');

  const handleSymptomCheck = async () => {
    if (!symptoms.trim()) {
      setError('Please enter your symptoms');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Parse symptoms into required format
      const symptomList = symptoms.split(',').map(symptom => ({
        name: symptom.trim(),
        severity: 'moderate' as const,
        duration: '1 day'
      }));

      const result = await getPreliminaryDiagnosis(symptomList);
      setResponse(result.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleHealthAdvice = async () => {
    if (!query.trim()) {
      setError('Please enter your health query');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getHealthAdvice(query);
      setResponse(result.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health AI Assistant</CardTitle>
        <CardDescription>Get health advice and preliminary symptom assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="symptoms">Symptom Check</TabsTrigger>
            <TabsTrigger value="advice">Health Advice</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
          </TabsList>

          <TabsContent value="symptoms">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Enter your symptoms (comma separated)</Label>
                <Textarea
                  placeholder="Headache, fever, cough..."
                  value={symptoms}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSymptoms(e.target.value)}
                />
              </div>
              <Button
                onClick={handleSymptomCheck}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Checking...' : 'Check Symptoms'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="advice">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Ask a health question</Label>
                <Textarea
                  placeholder="How can I improve my sleep quality?"
                  value={query}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuery(e.target.value)}
                />
              </div>
              <Button
                onClick={handleHealthAdvice}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Getting advice...' : 'Get Advice'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="diagnosis">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Enter detailed symptoms</Label>
                <Textarea
                  placeholder="Describe your symptoms in detail..."
                  value={symptoms}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSymptoms(e.target.value)}
                />
              </div>
              <Button
                onClick={handleSymptomCheck}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Analyzing...' : 'Get Diagnosis'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {response && (
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <pre className="whitespace-pre-wrap">{response}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
