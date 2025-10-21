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

function BeginnerSurvey() {
  usePageTitle('Call Index Survey');

  //What we're storing for each survey
  const initialFormState = {
    location: '',
    latitude: '',
    longitude: '',
    waterTemp: '',
    startingAirTemp: '',
    endingAirTemp: '',
    skyCondition: '',
    windSpeed: '',
    frogCallDensity: '',
    comments: ''
  };

  // Required Fields
  const requiredFields = [
    { name: 'location', label: 'location' },
    { name: 'latitude', label: 'latitude' },
    { name: 'longitude', label: 'longitude' },
    { name: 'skyCondition', label: 'sky condition' },
    { name: 'windSpeed', label: 'wind speed' },
    { name: 'frogCallDensity', label: 'call density' }
  ];

  const { formData, lastSaved, errors, updateField, setFieldErrors, clearForm } =
    useLocalStorageForm('beginnerSurveyDraft', initialFormState);
  const navigate = useNavigate();
  const [showValidation, setShowValidation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // GPS state
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');
  
  // Track invalid input per field for responsive feedback
  const [fieldError, setFieldError] = useState('');

  //Regex validation, so only numbers decimals and negatives can be put into the temperature and latitude/longitude fields
  const isValidNumber = (value) => /^-?\d*\.?\d*$/.test(value);
  
  // Handle number fields with responsive validation feedback
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

  // Get current GPS location
  const handleGetLocation = () => {
    setGpsLoading(true);
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Auto fill the latitude longitude fields
        updateField('latitude', latitude.toFixed(4));
        updateField('longitude', longitude.toFixed(4));

        setGpsLoading(false);
        setGpsError('');
      },
      (error) => {
        let errorMessage = 'Can not get user location';

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
      // show a UI warning instead
      setShowValidation(true);
      return;
    }
    // Build an observation entry and save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('observations') || '[]');
      const entry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        site: formData.location || 'Unknown location',
        latitude: formData.latitude,
        longitude: formData.longitude,
        data: formData
      };
      existing.unshift(entry);
      localStorage.setItem('observations', JSON.stringify(existing));
      // clear draft without prompting the user, show success, then navigate
      clearForm(false);
      setShowSuccess(true);
      // wait briefly so user sees confirmation, then navigate
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/observations');
      }, 1100);
    } catch (err) {
      console.error('Failed to save observation', err);
    }
  };

  const handleClear = () => {
    clearForm();
  };

{/*Form Content*/}
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

              {/*Location*/}
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

              {/*Get Location Button*/}
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

              {/*Latitude field should autofill with the button*/}
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

              {/*Longitude field, should autofill with the button*/}
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

              {/*Water temp*/}
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

              {/*Starting air temp*/}
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

              {/*Ending Air Temp*/}
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

              {/*Sky Condition Dropdown*/}
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

              {/*Wind Speed Form*/}
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

              {/* Frog Call Density Drop Down */}
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

              {/*Comments Section*/}
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

              {/*Buttons*/}
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

export default BeginnerSurvey;