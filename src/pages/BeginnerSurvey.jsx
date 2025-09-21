import React from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  TextField, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Button,
  Stack
} from '@mui/material';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { useLocalStorageForm } from '../hooks/useLocalStorageForm.js';

function BeginnerSurvey() {
  usePageTitle('Call Index Survey');

  // What we're storing for each survey
  const initialFormState = {
    location: '',
    waterTemp: '',
    startingAirTemp: '',
    endingAirTemp: '',
    skyCondition: '',
    windSpeed: '',
    frogCallDensity: '',
    notes: ''
  };

  // This hook handles saving to localStorage and loading so we can navigate away and keep info
  const {
    formData,
    lastSaved,
    errors,
    updateField,
    setFieldErrors,
    clearForm
  } = useLocalStorageForm('beginnerSurveyDraft', initialFormState);

  // List of required fields, can change as needed by adding/removing elments to the array
  const requiredFields = [
    { name: 'location', label: 'location' },
    { name: 'startingAirTemp', label: 'starting temperature' },
    { name: 'endingAirTemp', label: 'ending temperature' },
    { name: 'skyCondition', label: 'sky condition' },
    { name: 'windSpeed', label: 'wind speed' },
    { name: 'frogCallDensity', label: 'call density' }
  ];

  // Check that required fields are filled out
  const validateForm = () => {
    const newErrors = {};
    
    requiredFields.forEach(field => {
      const value = formData[field.name];
      if (!value || !value.toString().trim()) {
        newErrors[field.name] = `Please enter ${field.label}`;
      }
    });
    
    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // When user clicks submit, needs functionality still
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill out all required fields');
      return;
    }
    
    // For now, just show that validation passed
    alert('functionality added later');
  };

  const handleClear = () => {
    clearForm();
  };

  //form contents
  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Box display="flex" justifyContent="center">
        <Box sx={{ width: { xs: '100%', md: '90%', lg: '80%' } }}>
          
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' }
              }}
            >
              Call Index Survey
            </Typography>
            
            <Typography
              variant="h5"
              component="p"
              sx={{
                maxWidth: '60ch',
                mx: 'auto',
                mb: 3,
                color: 'text.secondary'
              }}
            >
              Fill out the fields below based on what you observed
            </Typography>
            
            {lastSaved && (
              <Alert 
                severity="success" 
                sx={{ 
                  borderRadius: 4,
                  maxWidth: '400px',
                  mx: 'auto',
                  mb: 2
                }}
              >
                Saved at {lastSaved.toLocaleTimeString()}
              </Alert>
            )}
          </Box>

          <Paper 
            elevation={3} 
            sx={{ 
              p: 5,
              borderRadius: 4,
              mx: { xs: 2, md: 4 }
            }}
          >
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              <TextField
                fullWidth
                required
                label="Location"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="Where did you do the survey?"
                error={!!errors.location}
                helperText={errors.location}
              />
              
              <TextField
                fullWidth
                label="Water Temp (°F)"
                type="number"
                value={formData.waterTemp}
                onChange={(e) => updateField('waterTemp', e.target.value)}
                helperText="Only if you have a thermometer"
              />

              <TextField
                fullWidth
                required
                label="Starting Air Temp (°F)"
                type="number"
                value={formData.startingAirTemp}
                onChange={(e) => updateField('startingAirTemp', e.target.value)}
                error={!!errors.startingAirTemp}
                helperText={errors.startingAirTemp}
              />

              <TextField
                fullWidth
                required
                label="Ending Air Temp (°F)"
                type="number"
                value={formData.endingAirTemp}
                onChange={(e) => updateField('endingAirTemp', e.target.value)}
                error={!!errors.endingAirTemp}
                helperText={errors.endingAirTemp}
              />

              <FormControl fullWidth required error={!!errors.skyCondition}>
                <InputLabel>Sky Condition</InputLabel>
                <Select
                  value={formData.skyCondition}
                  onChange={(e) => updateField('skyCondition', e.target.value)}
                  label="Sky Condition"
                >
                  <MenuItem value="Clear or only a few clouds">Clear or only a few clouds</MenuItem>
                  <MenuItem value="Partly cloudy or variable">Partly cloudy or variable</MenuItem>
                  <MenuItem value="Broken clouds or overcast">Broken clouds or overcast</MenuItem>
                  <MenuItem value="Fog">Fog</MenuItem>
                  <MenuItem value="Drizzle or light rain (not affecting hearing)">Drizzle or light rain (not affecting hearing)</MenuItem>
                  <MenuItem value="Snow">Snow</MenuItem>
                  <MenuItem value="Showers (is affecting hearing ability)">Showers (is affecting hearing ability)</MenuItem>
                </Select>
                {errors.skyCondition && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.skyCondition}
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth required error={!!errors.windSpeed}>
                <InputLabel>Wind Speed</InputLabel>
                <Select
                  value={formData.windSpeed}
                  onChange={(e) => updateField('windSpeed', e.target.value)}
                  label="Wind Speed"
                >
                  <MenuItem value="Calm (<1 mph)">Calm (under 1 mph)</MenuItem>
                  <MenuItem value="Light Air (1-3 mph)">Light Air (1-3 mph)</MenuItem>
                  <MenuItem value="Light Breeze (4-7 mph)">Light Breeze (4-7 mph)</MenuItem>
                  <MenuItem value="Gentle Breeze (8-12 mph)">Gentle Breeze (8-12 mph)</MenuItem>
                  <MenuItem value="Moderate Breeze (13-18 mph)">Moderate Breeze (13-18 mph)</MenuItem>
                  <MenuItem value="Fresh Breeze (19-24 mph)">Fresh Breeze (19-24 mph)</MenuItem>
                  <MenuItem value="Strong Breeze (25-31 mph)">Strong Breeze (25-31 mph)</MenuItem>
                  <MenuItem value="Moderate Gale (32-38 mph)">Moderate Gale (32-38 mph)</MenuItem>
                  <MenuItem value="Fresh Gale (39-46 mph)">Fresh Gale (39-46 mph)</MenuItem>
                  <MenuItem value="Strong Gale (47-54 mph)">Strong Gale (47-54 mph)</MenuItem>
                  <MenuItem value="Whole Gale (55-63 mph)">Whole Gale (55-63 mph)</MenuItem>
                  <MenuItem value="Storm (64-72 mph)">Storm (64-72 mph)</MenuItem>
                  <MenuItem value="Hurricane (73+ mph)">Hurricane (73+ mph)</MenuItem>
                </Select>
                {errors.windSpeed && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.windSpeed}
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth required error={!!errors.frogCallDensity}>
                <InputLabel>Frog Call Density</InputLabel>
                <Select
                  value={formData.frogCallDensity}
                  onChange={(e) => updateField('frogCallDensity', e.target.value)}
                  label="Frog Call Density"
                >
                  <MenuItem value="0 - None">0 - No frogs heard</MenuItem>
                  <MenuItem value="1 - Individual calls, no overlapping">1 - Individual calls, easy to count</MenuItem>
                  <MenuItem value="2 - Individual calls, some overlapping">2 - Some calls overlapping</MenuItem>
                  <MenuItem value="3 - Full chorus, constant, continuous">3 - Full chorus, constant calling</MenuItem>
                </Select>
                {errors.frogCallDensity && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.frogCallDensity}
                  </Typography>
                )}
              </FormControl>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notes"
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Add any notes/comments here"
              />

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <Button
                  variant="outlined"
                  onClick={handleClear}
                  size="large"
                  sx={{
                    borderRadius: 6,
                    px: 4
                  }}
                >
                  Clear Form
                </Button>
                
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  type="submit"
                  size="large"
                  sx={{
                    borderRadius: 6,
                    px: 4
                  }}
                >
                  Submit Survey
                </Button>
              </Stack>

            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default BeginnerSurvey;