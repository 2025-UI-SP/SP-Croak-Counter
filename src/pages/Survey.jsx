import React, { useState } from 'react';
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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { useLocalStorageForm } from '../hooks/useLocalStorageForm.js';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

function AdvancedSurvey() {
  usePageTitle('Advanced Survey');

  // Form state for advanced survey
  const initialFormState = {
    location: '',
    latitude: '',
    longitude: '',
    county: '',
    observer: '',
    affiliation: '',  
    waterTemp: '',
    startingAirTemp: '',
    endingAirTemp: '',
    skyCondition: '',
    windSpeed: '',
    americanToad: '0',  
    comments: ''
  };

  // Required fields for advanced survey
  const requiredFields = [
    { name: 'location', label: 'site name' },
    { name: 'latitude', label: 'latitude' },
    { name: 'longitude', label: 'longitude' },
    { name: 'county', label: 'county' },
    { name: 'observer', label: 'observer name' },
    { name: 'skyCondition', label: 'sky condition' },
    { name: 'windSpeed', label: 'wind speed' }
  ];

  const { formData, lastSaved, errors, updateField, setFieldErrors, clearForm } =
    useLocalStorageForm('advancedSurveyDraft', initialFormState);
  
  const navigate = useNavigate();
  const [showValidation, setShowValidation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // GPS state
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');
  
  // Track invalid input per field
  const [fieldError, setFieldError] = useState('');

  //Regex validation, so only numbers decimals and negatives can be put into the temperature and latitude/longitude fields
  const isValidNumber = (value) => /^-?\d*\.?\d*$/.test(value);
  
  // Handle number fields for responsiveness
  const handleNumberInput = (field, value) => {
    if (isValidNumber(value) || value === '') {
      updateField(field, value);
      if (fieldError === field) setFieldError('');
    } else {
      setFieldError(field);
      setTimeout(() => setFieldError(''), 2000);
    }
  };

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

  // Get GPS location
  const handleGetLocation = () => {
    setGpsLoading(true);
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateField('latitude', latitude.toFixed(4));
        updateField('longitude', longitude.toFixed(4));
        setGpsLoading(false);
        setGpsError('');
      },
      (error) => {
        let errorMessage = 'Cannot get user location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied, please allow access';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
        }
        setGpsError(errorMessage);
        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowValidation(true);
      return;
    }

    // Submit functionality added later
    alert('Form is valid! (Submit functionality will be added later)');
  };

  const handleClear = () => {
    clearForm();
  };

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
              Advanced Call Index Survey
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

              {/* Site Name */}
              <TextField
                fullWidth
                required
                label="Site Name"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="Name of the survey location"
                error={!!errors.location}
                helperText={errors.location}
              />

              {/* GPS Button */}
              <Button
                variant="outlined"
                onClick={handleGetLocation}
                disabled={gpsLoading}
                fullWidth
                startIcon={<LocationOnIcon />}
                sx={{ height: '56px' }}
              >
                {gpsLoading ? 'Getting Location, wait one moment please' : 'Get GPS Location'}
              </Button>

              {/* Latitude */}
              <TextField
                fullWidth
                required
                label="Latitude"
                value={formData.latitude}
                onChange={(e) => handleNumberInput('latitude', e.target.value)}
                error={!!errors.latitude}
                helperText={errors.latitude}
                inputMode="decimal"
              />
              {fieldError === 'latitude' && (
                <Alert severity="warning" sx={{ mt: 1 }}>Numbers only</Alert>
              )}

              {/* Longitude */}
              <TextField
                fullWidth
                required
                label="Longitude"
                value={formData.longitude}
                onChange={(e) => handleNumberInput('longitude', e.target.value)}
                error={!!errors.longitude}
                helperText={errors.longitude}
                inputMode="decimal"
              />
              {fieldError === 'longitude' && (
                <Alert severity="warning" sx={{ mt: 1 }}>Numbers only</Alert>
              )}

              {gpsError && (
                <Alert severity="error">
                  {gpsError}
                </Alert>
              )}

              {/* County */}
              <TextField
                fullWidth
                required
                label="County"
                value={formData.county}
                onChange={(e) => updateField('county', e.target.value)}
                placeholder="e.g., Baraga"
                error={!!errors.county}
                helperText={errors.county}
              />

              {/*Observer*/}
              <TextField
                fullWidth
                required
                label="Observer Name"
                value={formData.observer}
                onChange={(e) => updateField('observer', e.target.value)}
                placeholder="Name of person conducting survey"
                error={!!errors.observer}
                helperText={errors.observer}
              />

              {/*Affiliation*/}
              <TextField
                fullWidth
                label="Affiliation"
                value={formData.affiliation}
                onChange={(e) => updateField('affiliation', e.target.value)}
                placeholder="School, organization, or institution"
                helperText="Optional - affiliated organization if applicable"
              />

              {/*Water Temperature*/}
              <TextField
                fullWidth
                label="Water Temp (°F)"
                value={formData.waterTemp}
                onChange={(e) => handleNumberInput('waterTemp', e.target.value)}
                helperText="Optional - only if you have a thermometer"
                inputMode="decimal"
              />
              {fieldError === 'waterTemp' && (
                <Alert severity="warning" sx={{ mt: 1 }}>Numbers only</Alert>
              )}

              {/*Starting Air Temperature*/}
              <TextField
                fullWidth
                label="Starting Air Temp (°F)"
                value={formData.startingAirTemp}
                onChange={(e) => handleNumberInput('startingAirTemp', e.target.value)}
                helperText="Optional - air temperature when you started"
                inputMode="decimal"
              />
              {fieldError === 'startingAirTemp' && (
                <Alert severity="warning" sx={{ mt: 1 }}>Numbers only</Alert>
              )}

              {/* Ending Air Temperature */}
              <TextField
                fullWidth
                label="Ending Air Temp (°F)"
                value={formData.endingAirTemp}
                onChange={(e) => handleNumberInput('endingAirTemp', e.target.value)}
                helperText="Optional - air temperature when you finished"
                inputMode="decimal"
              />
              {fieldError === 'endingAirTemp' && (
                <Alert severity="warning" sx={{ mt: 1 }}>Numbers only</Alert>
              )}

              {/* Sky Condition */}
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

              {/* Wind Speed */}
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

              {/* American Toad Call Density */}
              <FormControl fullWidth>
                <InputLabel>American Toad - Call Density</InputLabel>
                <Select
                  value={formData.americanToad}
                  onChange={(e) => updateField('americanToad', e.target.value)}
                  label="American Toad - Call Density"
                >
                  <MenuItem value="0">0 - None heard</MenuItem>
                  <MenuItem value="1">1 - Individual calls, no overlapping</MenuItem>
                  <MenuItem value="2">2 - Individual calls, some overlapping</MenuItem>
                  <MenuItem value="3">3 - Full chorus, constant calling</MenuItem>
                </Select>
              </FormControl>

              {/* Comments */}
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Comments"
                value={formData.comments}
                onChange={(e) => updateField('comments', e.target.value)}
                placeholder="Final Comments"
                helperText="Any other wildlife species encountered? Anything interesting or concerning at the site? Any additional frog information you want to include?"
              />

              {/* Buttons */}
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

      <Snackbar
        open={showValidation}
        autoHideDuration={4000}
        onClose={() => setShowValidation(false)}
      >
        <MuiAlert severity="warning" onClose={() => setShowValidation(false)}>
          Please fill out all required fields before saving.
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={showSuccess}
        autoHideDuration={1000}
        onClose={() => setShowSuccess(false)}
      >
        <MuiAlert severity="success" onClose={() => setShowSuccess(false)}>
          Survey submitted — saving to Observations
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default AdvancedSurvey;