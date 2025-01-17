import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { assessHealthRisks } from '../../services/healthAI';
import { HealthRiskInput, HealthRiskAssessment } from '../../types/health';

const HealthRiskPredictor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState<HealthRiskAssessment | null>(null);
  const [input, setInput] = useState<HealthRiskInput>({
    age: '',
    symptoms: [],
    medicalHistory: [],
    lifestyle: [],
    medicalConditions: []
  });

  const handleInputChange = (field: keyof HealthRiskInput, value: string) => {
    setInput((prev: HealthRiskInput) => ({
      ...prev,
      [field]: field === 'age' ? value : value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await assessHealthRisks({
        ...input,
        age: parseInt(input.age || '30') // Convert string to number
      });
      setAssessment(result);
    } catch (error) {
      console.error('Error assessing health risks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <div className="text-center mb-6">
        <Typography variant="h4" className="font-bold">Swasthya</Typography>
        <Typography variant="subtitle2" className="text-gray-600">by Shrinu</Typography>
      </div>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={input.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Symptoms (comma-separated)"
            value={input.symptoms.join(', ')}
            onChange={(e) => handleInputChange('symptoms', e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Medical History (comma-separated)"
            value={input.medicalHistory.join(', ')}
            onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Lifestyle Factors (comma-separated)"
            value={input.lifestyle.join(', ')}
            onChange={(e) => handleInputChange('lifestyle', e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Medical Conditions (comma-separated)"
            value={input.medicalConditions.join(', ')}
            onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Assess Health Risks'}
          </Button>
        </form>
      </Paper>

      {assessment && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Assessment Results
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Risk Level"
                secondary={assessment.risk}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Probability Assessment"
                secondary={assessment.probability}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Recommendations"
                secondary={
                  <List>
                    {assessment.recommendations.map((rec: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemText primary={rec} />
                      </ListItem>
                    ))}
                  </List>
                }
              />
            </ListItem>
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default HealthRiskPredictor;