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
import { useTranslation } from '../hooks/useTranslation.js';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

function BeginnerSurvey() {
  usePageTitle('Call Index Survey');
  const { t } = useTranslation();

  // Fetch options
  const skyConditions = t('survey.options.skyConditions') || [];
  const windSpeeds = t('survey.options.windSpeeds') || [];
  const frogCallDensities = t('survey.options.frogCallDensity') || [];

  //What we're storing for each survey
  const initialFormState = {
    location: '',
    latitude: '',
    longitude: '',
    waterTemp: '',
    startingAirTemp: '',
    endingAirTemp: '',
    startTime: '',
    endTime: '',
    skyCondition: '',
    windSpeed: '',
    frogCallDensity: '',
    comments: ''
  };

  // Required Fields
  const requiredFields = [
    { name: 'location', label: 'site' }, // label key in en.json
    { name: 'latitude', label: 'latitude' },
    { name: 'longitude', label: 'longitude' },
    { name: 'startTime', label: 'startTime' },
    { name: 'endTime', label: 'endTime' },
    { name: 'skyCondition', label: 'skyCondition' },
    { name: 'windSpeed', label: 'windSpeed' },
    { name: 'frogCallDensity', label: 'frogCallDensity' }
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
        const fieldLabel = t(`survey.fields.${field.label}`);
        newErrors[field.name] = t('survey.messages.requiredError').replace('{field}', fieldLabel);
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
        let errorMessage = t('survey.messages.gpsError');

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = t('survey.messages.gpsDenied');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = t('survey.messages.gpsUnavailable');
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
        data: formData,
        formType: 'basic'
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

  {/*Form Content*/ }
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
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
                color: 'primary.main',
                fontWeight: 700
              }}
            >
              {t('survey.beginnerTitle')}
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
              {t('survey.intro')}
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
                {t('survey.savedAt')} {lastSaved.toLocaleTimeString()}
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
              {/* Start Time */}
              <TextField
                fullWidth
                required
                label={t('survey.fields.startTime')}
                type="time"
                value={formData.startTime}
                onChange={(e) => updateField('startTime', e.target.value)}
                helperText={t('survey.helpers.startTime')}
                error={!!errors.startTime}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  '& input[type="time"]::-webkit-calendar-picker-indicator': {
                    filter: (theme) => theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
                  }
                }}
              />
              {/*Location*/}
              <TextField
                fullWidth
                required
                label={t('survey.fields.site')}
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder={t('survey.helpers.location')}
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
                {gpsLoading ? t('survey.messages.gpsLoading') : t('survey.messages.gpsButton')}
              </Button>

              {/*Latitude field should autofill with the button*/}
              <TextField
                fullWidth
                required
                label={t('survey.fields.latitude')}
                value={formData.latitude}
                onChange={(e) => handleNumberInput('latitude', e.target.value)}
                error={!!errors.latitude}
                helperText={errors.latitude}
                input type="text"
                inputMode="decimal"
              />
              {fieldError === 'latitude' && (
                <Alert severity="warning" sx={{ mt: 1 }}>{t('survey.messages.numbersOnly')}</Alert>
              )}

              {/*Longitude field, should autofill with the button*/}
              <TextField
                fullWidth
                required
                label={t('survey.fields.longitude')}
                value={formData.longitude}
                onChange={(e) => handleNumberInput('longitude', e.target.value)}
                error={!!errors.longitude}
                helperText={errors.longitude}
                input type="text"
                inputMode="decimal"
              />
              {fieldError === 'longitude' && (
                <Alert severity="warning" sx={{ mt: 1 }}>{t('survey.messages.numbersOnly')}</Alert>
              )}

              {gpsError && (
                <Alert severity="error">
                  {gpsError}
                </Alert>
              )}

              {/*Water temp*/}
              <TextField
                fullWidth
                label={t('survey.fields.waterTemp')}
                value={formData.waterTemp}
                onChange={(e) => handleNumberInput('waterTemp', e.target.value)}
                helperText={t('survey.helpers.waterTemp')}
                input type="text"
                inputMode="decimal"
              />
              {fieldError === 'waterTemp' && (
                <Alert severity="warning" sx={{ mt: 1 }}>{t('survey.messages.numbersOnly')}</Alert>
              )}

              {/*Starting air temp*/}
              <TextField
                fullWidth
                label={t('survey.fields.startingAirTemp')}
                value={formData.startingAirTemp}
                onChange={(e) => handleNumberInput('startingAirTemp', e.target.value)}
                helperText={t('survey.helpers.startingAirTemp')}
                input type="text"
                inputMode="decimal"
              />
              {fieldError === 'startingAirTemp' && (
                <Alert severity="warning" sx={{ mt: 1 }}>{t('survey.messages.numbersOnly')}</Alert>
              )}

              {/*Ending Air Temp*/}
              <TextField
                fullWidth
                label={t('survey.fields.endingAirTemp')}
                value={formData.endingAirTemp}
                onChange={(e) => handleNumberInput('endingAirTemp', e.target.value)}
                helperText={t('survey.helpers.endingAirTemp')}
                input type="text"
                inputMode="decimal"
              />
              {fieldError === 'endingAirTemp' && (
                <Alert severity="warning" sx={{ mt: 1 }}>{t('survey.messages.numbersOnly')}</Alert>
              )}

              {/*Sky Condition Dropdown*/}
              <FormControl fullWidth required error={!!errors.skyCondition}>
                <InputLabel>{t('survey.fields.skyCondition')}</InputLabel>
                <Select
                  value={formData.skyCondition}
                  onChange={(e) => updateField('skyCondition', e.target.value)}
                  label={t('survey.fields.skyCondition')}
                >
                  {Array.isArray(skyConditions) && skyConditions.map((condition) => (
                    <MenuItem key={condition} value={condition}>
                      {condition}
                    </MenuItem>
                  ))}
                </Select>
                {errors.skyCondition && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.skyCondition}
                  </Typography>
                )}
              </FormControl>

              {/*Wind Speed Form*/}
              <FormControl fullWidth required error={!!errors.windSpeed}>
                <InputLabel>{t('survey.fields.windSpeed')}</InputLabel>
                <Select
                  value={formData.windSpeed}
                  onChange={(e) => updateField('windSpeed', e.target.value)}
                  label={t('survey.fields.windSpeed')}
                >
                  {Array.isArray(windSpeeds) && windSpeeds.map((speed) => (
                    <MenuItem key={speed} value={speed}>
                      {speed}
                    </MenuItem>
                  ))}
                </Select>
                {errors.windSpeed && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.windSpeed}
                  </Typography>
                )}
              </FormControl>

              {/* Frog Call Density Drop Down */}
              <FormControl fullWidth required error={!!errors.frogCallDensity}>
                <InputLabel>{t('survey.fields.frogCallDensity')}</InputLabel>
                <Select
                  value={formData.frogCallDensity}
                  onChange={(e) => updateField('frogCallDensity', e.target.value)}
                  label={t('survey.fields.frogCallDensity')}
                >
                  {Array.isArray(frogCallDensities) && frogCallDensities.map((density) => (
                    <MenuItem key={density} value={density}>
                      {density}
                    </MenuItem>
                  ))}
                </Select>
                {errors.frogCallDensity && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.frogCallDensity}
                  </Typography>
                )}
              </FormControl>


              {/* End Time */}
              <TextField
                fullWidth
                required
                label={t('survey.fields.endTime')}
                type="time"
                value={formData.endTime}
                onChange={(e) => updateField('endTime', e.target.value)}
                helperText={t('survey.helpers.endTime')}
                error={!!errors.endTime}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  '& input[type="time"]::-webkit-calendar-picker-indicator': {
                    filter: (theme) => theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
                  }
                }}
              />
              {/*Comments Section*/}
              <TextField
                fullWidth
                multiline
                rows={4}
                label={t('survey.fields.comments')}
                value={formData.comments}
                onChange={(e) => updateField('comments', e.target.value)}
                placeholder={t('survey.fields.comments')}
                helperText={t('survey.helpers.comments')}
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
                  {t('survey.clearForm')}
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
                  {t('survey.submit')}
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
          {t('survey.messages.validationWarning')}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={showSuccess}
        autoHideDuration={1000}
        onClose={() => setShowSuccess(false)}
      >
        <MuiAlert severity="success" onClose={() => setShowSuccess(false)}>
          {t('survey.messages.success')}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default BeginnerSurvey;