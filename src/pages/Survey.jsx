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
  Stack,
  Divider
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { useLocalStorageForm } from '../hooks/useLocalStorageForm.js';
import { useTranslation } from '../hooks/useTranslation.js';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { frogContent } from '../config.js';
import AudioPlayer from '../components/AudioPlayer.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

function AdvancedSurvey() {
  usePageTitle('Advanced Survey');
  const { t } = useTranslation();

  // Fetch options
  const skyConditions = t('survey.options.skyConditions') || [];
  const windSpeeds = t('survey.options.windSpeeds') || [];
  // Note: frogCallDensities array in en.json tracks "0 - None", "1 - ...", etc.
  // We can use the index or mapped value, but the form uses "0", "1", "2", "3" as values currently.
  const frogCallDensities = t('survey.options.frogCallDensity') || [];

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
    startTime: '',
    endTime: '',
    skyCondition: '',
    windSpeed: '',
    americantoad: '0',
    bullfrog: '0',
    copesgraytreefrog: '0',
    easterngraytreefrog: '0',
    fowlerstoad: '0',
    greenfrog: '0',
    minkfrog: '0',
    northerncricketfrog: '0',
    pickerelfrog: '0',
    springpeeper: '0',
    westernchorusfrog: '0',
    woodfrog: '0',
    northernleopardfrog: '0',
    comments: ''
  };

  // Required fields for advanced survey
  const requiredFields = [
    { name: 'location', label: 'site' }, // keys in en.json survey.fields
    { name: 'latitude', label: 'latitude' },
    { name: 'longitude', label: 'longitude' },
    { name: 'startTime', label: 'startTime' },
    { name: 'endTime', label: 'endTime' },
    { name: 'county', label: 'county' },
    { name: 'observer', label: 'observer' },
    { name: 'skyCondition', label: 'skyCondition' },
    { name: 'windSpeed', label: 'windSpeed' }
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
        const fieldLabel = t(`survey.fields.${field.label}`);
        newErrors[field.name] = t('survey.messages.requiredError').replace('{field}', fieldLabel);
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
      setShowValidation(true);
      return;
    }

    // Build an observation entry and save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('observations') || '[]');
      const entry = {
        id: Date.now().toString(),
        surveyType: 'advanced',
        date: new Date().toISOString(),
        site: formData.location || 'Unknown location',
        latitude: formData.latitude,
        longitude: formData.longitude,
        data: formData
      };
      existing.unshift(entry);
      localStorage.setItem('observations', JSON.stringify(existing));

      // Clear draft without prompting the user, show success, then navigate
      clearForm(false);
      setShowSuccess(true);

      // Wait briefly so user sees confirmation, then navigate
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

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Box display="flex" justifyContent="center">
        <Box sx={{ width: { xs: '100%', md: '90%', lg: '80%' } }}>

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
                color: 'primary.main',
                fontWeight: 700
              }}
            >
              {t('survey.advancedTitle')}
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
              mx: { xs: -4.05, md: 4 }
            }}
          >
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

              {/* Start Time */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start Time *"
                  value={formData.startTime ? dayjs(formData.startTime, 'HH:mm') : null}
                  onChange={(newValue) => {
                    updateField('startTime', newValue ? newValue.format('HH:mm') : '');
                  }}
                  timeSteps={{ minutes: 1 }}
                  referenceDate={dayjs()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      helperText: "Time when survey started",
                      error: !!errors.startTime
                    }
                  }}
                />
              </LocalizationProvider>

              {/* Site Name */}
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

              {/* GPS Button */}
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

              {/* Latitude */}
              <TextField
                fullWidth
                required
                label={t('survey.fields.latitude')}
                value={formData.latitude}
                onChange={(e) => handleNumberInput('latitude', e.target.value)}
                error={!!errors.latitude}
                helperText={errors.latitude}
                type="text"
                slotProps={{
                  htmlInput: {
                    inputMode: 'decimal',
                    pattern: '[0-9.-]*'
                  }
                }}
              />
              {fieldError === 'latitude' && (
                <Alert severity="warning" sx={{ mt: 1 }}>{t('survey.messages.numbersOnly')}</Alert>
              )}

              {/* Longitude */}
              <TextField
                fullWidth
                required
                label={t('survey.fields.longitude')}
                value={formData.longitude}
                onChange={(e) => handleNumberInput('longitude', e.target.value)}
                error={!!errors.longitude}
                helperText={errors.longitude}
                type="text"
                slotProps={{
                  htmlInput: {
                    inputMode: 'decimal',
                    pattern: '[0-9.-]*'
                  }
                }}
              />
              {fieldError === 'longitude' && (
                <Alert severity="warning" sx={{ mt: 1 }}>{t('survey.messages.numbersOnly')}</Alert>
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
                label={t('survey.fields.county')}
                value={formData.county}
                onChange={(e) => updateField('county', e.target.value)}
                placeholder={t('survey.helpers.county')}
                error={!!errors.county}
                helperText={errors.county}
              />

              {/*Observer*/}
              <TextField
                fullWidth
                required
                label={t('survey.fields.observer')}
                value={formData.observer}
                onChange={(e) => updateField('observer', e.target.value)}
                placeholder={t('survey.helpers.observer')}
                error={!!errors.observer}
                helperText={errors.observer}
              />

              {/*Affiliation*/}
              <TextField
                fullWidth
                label={t('survey.fields.affiliation')}
                value={formData.affiliation}
                onChange={(e) => updateField('affiliation', e.target.value)}
                placeholder={t('survey.helpers.affiliation')}
                helperText={t('survey.helpers.affiliationOptional')}
              />

              {/*Water Temperature*/}
              <TextField
                fullWidth
                label={t('survey.fields.waterTemp')}
                value={formData.waterTemp}
                onChange={(e) => handleNumberInput('waterTemp', e.target.value)}
                helperText="Optional - only if you have a thermometer"
                type="text"
                slotProps={{
                  htmlInput: {
                    inputMode: 'decimal',
                    pattern: '[0-9.-]*'
                  }
                }}
              />
              {fieldError === 'waterTemp' && (
                <Alert severity="warning" sx={{ mt: 1 }}>{t('survey.messages.numbersOnly')}</Alert>
              )}

              {/*Starting Air Temperature*/}
              <TextField
                fullWidth
                label={t('survey.fields.startingAirTemp')}
                value={formData.startingAirTemp}
                onChange={(e) => handleNumberInput('startingAirTemp', e.target.value)}
                helperText="Optional - air temperature when you started"
                type="text"
                slotProps={{
                  htmlInput: {
                    inputMode: 'decimal',
                    pattern: '[0-9.-]*'
                  }
                }}
              />
              {fieldError === 'startingAirTemp' && (
                <Alert severity="warning" sx={{ mt: 1 }}>{t('survey.messages.numbersOnly')}</Alert>
              )}

              {/* Ending Air Temperature */}
              <TextField
                fullWidth
                label={t('survey.fields.endingAirTemp')}
                value={formData.endingAirTemp}
                onChange={(e) => handleNumberInput('endingAirTemp', e.target.value)}
                helperText="Optional - air temperature when you finished"
                type="text"
                slotProps={{
                  htmlInput: {
                    inputMode: 'decimal',
                    pattern: '[0-9.-]*'
                  }
                }}
              />
              {fieldError === 'endingAirTemp' && (
                <Alert severity="warning" sx={{ mt: 1 }}>{t('survey.messages.numbersOnly')}</Alert>
              )}

              {/* Sky Condition */}
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

              {/* Wind Speed */}
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

              {/* Frog Species Section */}
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                {t('survey.species.title')}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {t('survey.species.description')}
              </Typography>

              {/* Loop through all frogs from config */}
              {(frogContent.frogs || []).map((frog) => (
                <Paper
                  key={frog.name}
                  sx={{
                    p: 2,
                    border: 1,
                    borderColor: 'text.secondary',
                    borderRadius: 1,
                    mb: 3,
                    position: 'relative',
                    boxShadow: 3,
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      fontSize: { xs: '1rem', sm: '1.5rem'}
                    }}
                  >
                    🐸
                  </Box>
                  
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'primary.main',
                      pr: { xs: 2, sm: 4 } 
                    }}
                  >
                    {frog.name}
                  </Typography>

                {/* Audio Player */}
                {frog.audio && (
                <Box 
                  sx={{ 
                    mb: 2,
                    '& .MuiSlider-root': {
                      mr: 1
                    }
                  }}
                >
                  <AudioPlayer src={frog.audio} startTime={frog.startTime}/>
                </Box>
              )}

              {/* Call Density Selector */}
              <FormControl fullWidth>
                <InputLabel>Call Density</InputLabel>
                <Select
                  value={formData[frog.fieldName] || '0'}
                  onChange={(e) => updateField(frog.fieldName, e.target.value)}
                  label="Call Density"
                >
                  <MenuItem value="0">0 - None heard</MenuItem>
                  <MenuItem value="1">1 - Individual calls, no overlapping</MenuItem>
                  <MenuItem value="2">2 - Individual calls, some overlapping</MenuItem>
                  <MenuItem value="3">3 - Full chorus, constant calling</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          ))}

              {/* End Time */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="End Time *"
                  value={formData.endTime ? dayjs(formData.endTime, 'HH:mm') : null}
                  onChange={(newValue) => {
                    updateField('endTime', newValue ? newValue.format('HH:mm') : '');
                  }}
                  timeSteps={{ minutes: 1 }}
                  referenceDate={dayjs()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      helperText: "Time when survey ended",
                      error: !!errors.endTime
                    }
                  }}
                />
              </LocalizationProvider>

              {/* Comments */}
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

export default AdvancedSurvey;