import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { getEmergencyGuidance } from '../../services/healthAI';
import { EmergencyGuidance } from '../../types/health';

const EmergencyAssistant: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [guidance, setGuidance] = useState<EmergencyGuidance | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      const result = await getEmergencyGuidance(description);
      setGuidance(result);
    } catch (error) {
      console.error('Error getting emergency guidance:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'HIGH':
        return 'error.main';
      case 'MEDIUM':
        return 'warning.main';
      case 'LOW':
        return 'success.main';
      default:
        return 'text.primary';
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom color="error">
        Emergency Assistant
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" gutterBottom color="error">
          If you are experiencing a medical emergency, call emergency services immediately!
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Describe the emergency situation"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            disabled={loading || !description.trim()}
          >
            {loading ? <CircularProgress size={24} /> : 'Get Emergency Guidance'}
          </Button>
        </form>
      </Paper>

      {guidance && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Emergency Assessment
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <Typography color={getSeverityColor(guidance.severity)}>
                    Severity Level: {guidance.severity}
                  </Typography>
                }
                secondary={guidance.assessment}
              />
            </ListItem>
            
            <ListItem>
              <ListItemText
                primary="Immediate Actions"
                secondary={
                  <List>
                    {guidance.immediateActions.map((action: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemText primary={`${index + 1}. ${action}`} />
                      </ListItem>
                    ))}
                  </List>
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemText
                primary="Important: Do Not"
                secondary={
                  <List>
                    {guidance.doNotDo.map((action: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemText primary={`• ${action}`} />
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

export default EmergencyAssistant;
