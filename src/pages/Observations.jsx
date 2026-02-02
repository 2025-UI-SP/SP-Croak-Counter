import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
  Box,
  Toolbar,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Stack,
  Divider
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from '../hooks/useTranslation.js';

import { frogContent } from '../config.js';

/* ---------- helpers ---------- */
function formatDateTime(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return isNaN(d) ? String(iso) : d.toLocaleString();
  } catch {
    return String(iso);
  }
}

function formatDateOnly(iso) {
  if (!iso) return '—';
  try {
    const date = new Date(iso);
    return isNaN(date) ? String(iso) : date.toLocaleDateString();
  } catch {
    return String(iso);
  }
}

function formatTime(time) {
  if (!time) return '—';
  const str = String(time).trim();

  try {
    if (str.includes('T')) {
      const date = new Date(str);
      if (!isNaN(date)) {
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      }
    }

    const match = str.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
    if (match) {
      const hours = Number(match[1]);
      const minutes = Number(match[2]);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }

    return str;
  } catch {
    return String(time);
  }
}

/* ---------- component ---------- */
export default function Observations() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch options from translation
  const skyConditions = t('survey.options.skyConditions') || [];
  const windSpeeds = t('survey.options.windSpeeds') || [];
  const frogCallDensities = t('survey.options.frogCallDensity') || [];
  const speciesDensityOptions = t('survey.options.frogCallDensityFull') || []; // Using frogCallDensityFull for species

  const [entries, setEntries] = React.useState(() => {
    try {
      const stored = localStorage.getItem('observations');
      const parsed = stored ? JSON.parse(stored) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [];
    } catch {
      return [];
    }
  });

  const [selected, setSelected] = React.useState(new Set());
  const allSelected = selected.size === entries.length && entries.length > 0;
  // Note for future devs, when working on apps script run the function in the console `getAccesstoken`, and put the token below
  // Allows you to run latest code without a deploy. If you run into CORs errors with it run the script again, 99% chance it expired.
  // Github will not allow you to push with the token, so it must be removed before attempting github commands.
  const token = ""
  const BACKENDURL = token ? 
    "https://script.google.com/a/macros/mtu.edu/s/AKfycbxh2f4dvJP-EgPZim6J2AssshNlUKtps3gJqgCHnBg/dev?access_token=" + token:
    "https://script.google.com/macros/s/AKfycbw7Yjg_I9L6ypXvw7j0o7H9Mud7XA6oshxHDva_j4-ssiB5EGHaekgXvtPs5aKaSFlA/exec"

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('observations');
      if (stored) setEntries(JSON.parse(stored));
    } catch (error) {
      console.error('Failed to load observations from localStorage', error);
    }
  }, []);

  const persistEntries = (nextEntries) => {
    setEntries(nextEntries);
    try {
      localStorage.setItem('observations', JSON.stringify(nextEntries));
    } catch (error) {
      console.error('Failed to save observations', error);
    }
  };

  /* ---- detail modal ---- */
  const [detailEntry, setDetailEntry] = React.useState(null);
  const [detailForm, setDetailForm] = React.useState({});

  const openDetails = (obs) => {
    const data = obs.data || {};
    const base = {
      site: obs.site || data.location || '',
      latitude: obs.latitude ?? data.latitude ?? '',
      longitude: obs.longitude ?? data.longitude ?? '',
      frogCallDensity: data.frogCallDensity ?? data.frog_call_density ?? '',
      windSpeed: data.windSpeed ?? data.wind_speed ?? '',
      skyCondition: data.skyCondition ?? data.sky_condition ?? '',
      waterTemp: data.waterTemp ?? data.water_temp ?? '',
      startingAirTemp: data.startingAirTemp ?? data.starting_air_temp ?? '',
      endingAirTemp: data.endingAirTemp ?? data.ending_air_temp ?? '',
      startTime: data.startTime ?? obs.startTime ?? '',
      endTime: data.endTime ?? obs.endTime ?? '',
      comments: data.comments ?? '',
      observer: data.observer ?? obs.observer ?? '',
      affiliation: data.affiliation ?? obs.affiliation ?? '',
      county: data.county ?? obs.county ?? ''
    };

    const speciesFields = Object.fromEntries(
      (frogContent?.frogs || []).map(frog => [frog.fieldName, data[frog.fieldName] ?? ''])
    );

    setDetailEntry(obs);
    setDetailForm({ ...base, ...speciesFields });
  };

  const closeDetails = () => {
    setDetailEntry(null);
    setDetailForm({});
  };

  const handleDetailChange = (name, value) => {
    setDetailForm(prev => ({ ...prev, [name]: value }));
  };

  // Advanced modal required fields
  const requiredFields = [
    'startTime', 'endTime', 'site', 'latitude', 'longitude', 'county', 'observer', 'skyCondition', 'windSpeed'
  ];

  const isAdvancedModal = !!detailEntry && (detailEntry.surveyType ?? detailEntry.formType) === 'advanced';

  const missingRequired = isAdvancedModal && requiredFields.some(field => !detailForm[field] || String(detailForm[field]).trim() === '');

  // Beginner modal required fields
  const beginnerRequiredFields = [
    'startTime', 'endTime', 'latitude', 'longitude', 'site', 'skyCondition', 'windSpeed', 'frogCallDensity'
  ];

  const isBeginnerModal = !!detailEntry && !((detailEntry.surveyType ?? detailEntry.formType) === 'advanced');
  const missingBeginnerRequired = isBeginnerModal && beginnerRequiredFields.some(field => !detailForm[field] || String(detailForm[field]).trim() === '');

  const handleSaveDetails = () => {
    if (!detailEntry) return;
    if (isAdvancedModal && missingRequired) {
      setUploadSnackbarMessage(t('survey.messages.validationWarning'));
      setUploadSnackbarOpen(true);
      return;
    }
    if (isBeginnerModal && missingBeginnerRequired) {
      setUploadSnackbarMessage(t('survey.messages.validationWarning'));
      setUploadSnackbarOpen(true);
      return;
    }
    const { site, latitude, longitude, ...dataFields } = detailForm;

    const updated = entries.map(e =>
      e.id === detailEntry.id
        ? {
          ...e,
          site: site || e.site,
          latitude: latitude ?? e.latitude,
          longitude: longitude ?? e.longitude,
          data: { ...(e.data || {}), ...dataFields }
        }
        : e
    );

    persistEntries(updated);
    closeDetails();
  };

  /* ---- delete ---- */
  const handleDelete = (id) => {
    const next = entries.filter(e => e.id !== id);
    persistEntries(next);
  };

  const doUpload = function (entries) {
    return new Promise((res, rej) => {
      fetch(BACKENDURL, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(entries),
        headers: {},
      })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          res(true);
        } else {
          console.error("doUpload error ", data.error);
          res(false);
        }
      });
    });
  }

  /* ---- upload placeholder ---- */
  const performUpload = async (id) => {
    // Preserve local mock upload logic from Sprint 7
    if (await doUpload(entries)) {
      const next = entries.map((e) =>
        e.id === id ? { ...e, status: 'uploaded', uploadedAt: new Date().toISOString() } : e
      );
      persistEntries(next);

      // Show success message (using master's snackbar infrastructure)
      setUploadSnackbarMessage(t('observations.messages.uploadSuccess') || 'Observation marked as uploaded (mock)');
      setUploadSnackbarOpen(true);
      return { ok: true };
    } else {
      return { ok: false };
    }
    
  };

  /* ---- dialogs / snackbar ---- */
  const [confirmUploadId, setConfirmUploadId] = React.useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = React.useState(null);
  const [confirmBulkUploadOpen, setConfirmBulkUploadOpen] = React.useState(false);
  const [uploadSnackbarOpen, setUploadSnackbarOpen] = React.useState(false);
  const [uploadSnackbarMessage, setUploadSnackbarMessage] = React.useState('');

  /* ---- selection ---- */
  const toggleOne = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(entries.map(o => o.id)));
  };

  /* ---------- Mobile cards ---------- */
  function MobileList() {
    if (entries.length === 0) {
      return (
        <Box sx={{ p: 2 }}>
          <Typography color="text.secondary">No observations saved yet.</Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ px: 2, pb: 2 }}>
        <Stack spacing={2}>
          {entries.map((obs) => (
            <Card key={obs.id} variant="outlined">
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <Checkbox
                    checked={selected.has(obs.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOne(obs.id);
                    }}
                    inputProps={{ 'aria-label': `select observation ${obs.id}` }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {formatDateTime(obs.date ?? obs.data?.date ?? obs.startTime)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {obs.site || '—'}
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                      {obs.status === 'uploaded' ? (
                        <Chip icon={<CheckCircleIcon />} label="Uploaded" color="success" size="small" />
                      ) : (
                        <Chip label="Saved" size="small" />
                      )}
                    </Box>
                  </Box>
                </Box>
              </CardContent>

              <Divider />

              <CardActions sx={{ px: 2, py: 1.5 }}>
                <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                  <Button variant="contained" onClick={() => openDetails(obs)} fullWidth>
                    View / Edit
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => setConfirmUploadId(obs.id)}
                    fullWidth
                  >
                    {/* Preserve 'Upload' label logic or use t() */}
                    {t('observations.labels.uploadButton') || 'Upload'}
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Box>
    );
  }

  /* ---------- render ---------- */
  return (
    <Container maxWidth="lg" className="observations-container" sx={{ mt: 12, mb: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }, color: 'primary.main', fontWeight: 700 }}
        >
          {t('observations.title')}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' }, mb: 2 }}
        >
          {t('observations.intro')}
        </Typography>
      </Box>

      <Paper elevation={3} className="observations-paper">
        <Toolbar className="observations-toolbar">
          <Button
            variant="contained"
            onClick={() => setConfirmBulkUploadOpen(true)}
            disabled={selected.size === 0}
          >
            {t('observations.labels.uploadButton')} ({selected.size})
          </Button>
        </Toolbar>

        {isMobile ? (
          <MobileList />
        ) : (
          <Box sx={{ overflowX: 'auto' }}>
            <Table size="small" className="observations-table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <div style={{ whiteSpace: 'nowrap' }}>
                      <label htmlFor="selectAll"><strong>{t('observations.selectAllLabel')}</strong></label>
                      <Checkbox
                        id="selectAll"
                        indeterminate={selected.size > 0 && !allSelected}
                        checked={allSelected}
                        onChange={toggleAll}
                        aria-label="select all observations"
                      />
                    </div>
                  </TableCell>

                  <TableCell>{t('observations.labels.date')}</TableCell>
                  <TableCell>{t('observations.labels.time')}</TableCell>
                  <TableCell sx={{ maxWidth: { xs: 120, sm: 240 }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {t('observations.labels.site')}
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{t('observations.table.type')}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{t('observations.labels.status')}</TableCell>
                  <TableCell align="center" sx={{ width: 120 }}>{t('observations.table.uploadColumn')}</TableCell>
                  <TableCell align="center" sx={{ width: 120 }}>{t('observations.table.deleteColumn')}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {entries.map((obs) => {
                  const type = obs.surveyType ?? obs.formType;
                  const isAdvanced = type === 'advanced';
                  const isBeginner = ['basic', 'beginner'].includes(type);

                  return (
                    <TableRow
                      key={obs.id}
                      hover
                      onClick={() => openDetails(obs)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox" onClick={e => e.stopPropagation()}>
                        <Checkbox
                          checked={selected.has(obs.id)}
                          onClick={e => { e.stopPropagation(); toggleOne(obs.id); }}
                          aria-label={`select observation ${obs.id}`}
                        />
                      </TableCell>

                      <TableCell>{formatDateOnly(obs.date ?? obs.data?.date ?? obs.startTime ?? '')}</TableCell>
                      <TableCell>{formatTime(obs.date ?? obs.data?.date ?? obs.startTime ?? '')}</TableCell>

                      <TableCell
                        sx={{
                          maxWidth: { xs: 120, sm: 240 },
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {obs.site}
                      </TableCell>

                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                        {isAdvanced
                          ? t('observations.typeLabels.advanced')
                          : isBeginner
                            ? t('observations.typeLabels.beginner')
                            : t('observations.typeLabels.unknown')}
                      </TableCell>

                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                        {obs.status === 'uploaded' ? (
                          <Chip icon={<CheckCircleIcon />} label={t('observations.statusLabels.uploaded')} color="success" size="small" />
                        ) : (
                          <Chip label={t('observations.statusLabels.saved')} size="small" />
                        )}
                      </TableCell>

                      <TableCell align="center" sx={{ width: 120 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => { e.stopPropagation(); setConfirmUploadId(obs.id); }}
                          title={t('observations.labels.uploadButton')}
                          aria-label="upload"
                        >
                          <CloudUploadIcon />
                        </IconButton>
                      </TableCell>

                      <TableCell align="center" sx={{ width: 120 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(obs.id); }}
                          title={t('observations.table.deleteColumn')}
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        )}

        {/* dialogs and modals*/}

        <Dialog open={!!confirmUploadId} onClose={() => setConfirmUploadId(null)}>
          <DialogTitle>{t('observations.dialogs.confirmUploadTitle')}</DialogTitle>
          <DialogContent dividers><Typography>{t('observations.dialogs.confirmUploadMessage')}</Typography></DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmUploadId(null)}>Cancel</Button>
            <Button variant="contained" onClick={() => { performUpload(confirmUploadId); setConfirmUploadId(null); }}>
              {t('observations.labels.uploadButton')}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={uploadSnackbarOpen} autoHideDuration={4000} onClose={() => setUploadSnackbarOpen(false)} message={uploadSnackbarMessage} />

        <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
          <DialogTitle>{t('observations.dialogs.confirmDeleteTitle')}</DialogTitle>
          <DialogContent dividers><Typography>{t('observations.dialogs.confirmDeleteMessage')}</Typography></DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
            <Button variant="contained" color="error" onClick={() => { handleDelete(confirmDeleteId); setConfirmDeleteId(null); }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmBulkUploadOpen} onClose={() => setConfirmBulkUploadOpen(false)}>
          <DialogTitle>{t('observations.dialogs.bulkUploadTitle')}</DialogTitle>
          <DialogContent dividers>
            <Typography>{t('observations.dialogs.bulkUploadMessage').replace('{count}', selected.size)}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmBulkUploadOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => {
              Array.from(selected).forEach(id => performUpload(id));
              setSelected(new Set());
              setConfirmBulkUploadOpen(false);
            }}>
              {t('observations.labels.uploadButton')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Beginner Modal */}
        <Dialog
          open={!!detailEntry && !((detailEntry.surveyType ?? detailEntry.formType) === 'advanced')}
          onClose={closeDetails}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{t('observations.dialogs.beginnerDetailsTitle')}</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
              <TextField label={t('survey.fields.startTime')} fullWidth type="time" required value={detailForm.startTime ?? ''} onChange={e => handleDetailChange('startTime', e.target.value)} InputLabelProps={{ shrink: true }} />
              <TextField label={t('survey.fields.site')} fullWidth required value={detailForm.site ?? ''} onChange={e => handleDetailChange('site', e.target.value)} />
              <TextField label={t('survey.fields.latitude')} fullWidth required value={detailForm.latitude ?? ''} onChange={e => handleDetailChange('latitude', e.target.value)} />
              <TextField label={t('survey.fields.longitude')} fullWidth required value={detailForm.longitude ?? ''} onChange={e => handleDetailChange('longitude', e.target.value)} />
              <TextField label={t('survey.fields.waterTemp')} fullWidth value={detailForm.waterTemp ?? ''} onChange={e => handleDetailChange('waterTemp', e.target.value)} />
              <TextField label={t('survey.fields.startingAirTemp')} fullWidth value={detailForm.startingAirTemp ?? ''} onChange={e => handleDetailChange('startingAirTemp', e.target.value)} />
              <TextField label={t('survey.fields.endingAirTemp')} fullWidth value={detailForm.endingAirTemp ?? ''} onChange={e => handleDetailChange('endingAirTemp', e.target.value)} />
              <TextField label={t('survey.fields.endTime')} fullWidth type="time" required value={detailForm.endTime ?? ''} onChange={e => handleDetailChange('endTime', e.target.value)} InputLabelProps={{ shrink: true }} />

              <FormControl fullWidth variant="outlined" required>
                <InputLabel shrink={detailForm.skyCondition !== undefined && detailForm.skyCondition !== ''}>
                  {t('survey.fields.skyCondition')}
                </InputLabel>
                <Select value={detailForm.skyCondition ?? ''} onChange={e => handleDetailChange('skyCondition', e.target.value)} label={t('survey.fields.skyCondition')} required>
                  {Array.isArray(skyConditions) && skyConditions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" required>
                <InputLabel shrink={detailForm.windSpeed !== undefined && detailForm.windSpeed !== ''}>
                  {t('survey.fields.windSpeed')}
                </InputLabel>
                <Select value={detailForm.windSpeed ?? ''} onChange={e => handleDetailChange('windSpeed', e.target.value)} label={t('survey.fields.windSpeed')} required>
                  {Array.isArray(windSpeeds) && windSpeeds.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" required>
                <InputLabel shrink={detailForm.frogCallDensity !== undefined && detailForm.frogCallDensity !== ''}>
                  {t('survey.fields.frogCallDensity')}
                </InputLabel>
                <Select value={detailForm.frogCallDensity ?? ''} onChange={e => handleDetailChange('frogCallDensity', e.target.value)} label={t('survey.fields.frogCallDensity')} required>
                  {Array.isArray(frogCallDensities) && frogCallDensities.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField label={t('survey.fields.comments')} fullWidth multiline rows={3} value={detailForm.comments ?? ''} onChange={e => handleDetailChange('comments', e.target.value)} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDetails}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveDetails} disabled={missingBeginnerRequired}>Save</Button>
          </DialogActions>
        </Dialog>

        {/* Advanced Modal */}
        <Dialog
          open={!!detailEntry && (detailEntry.surveyType ?? detailEntry.formType) === 'advanced'}
          onClose={closeDetails}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{t('observations.dialogs.advancedDetailsTitle')}</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
              <TextField label={t('survey.fields.startTime')} fullWidth type="time" required value={detailForm.startTime ?? ''} onChange={e => handleDetailChange('startTime', e.target.value)} InputLabelProps={{ shrink: true }} />
              <TextField label={t('survey.fields.site')} fullWidth required value={detailForm.site ?? ''} onChange={e => handleDetailChange('site', e.target.value)} />
              <TextField label={t('survey.fields.latitude')} fullWidth required value={detailForm.latitude ?? ''} onChange={e => handleDetailChange('latitude', e.target.value)} />
              <TextField label={t('survey.fields.longitude')} fullWidth required value={detailForm.longitude ?? ''} onChange={e => handleDetailChange('longitude', e.target.value)} />
              <TextField label={t('survey.fields.county')} fullWidth required value={detailForm.county ?? ''} onChange={e => handleDetailChange('county', e.target.value)} />
              <TextField label={t('survey.fields.observer')} fullWidth required value={detailForm.observer ?? ''} onChange={e => handleDetailChange('observer', e.target.value)} />
              <TextField label={t('survey.fields.affiliation')} fullWidth value={detailForm.affiliation ?? ''} onChange={e => handleDetailChange('affiliation', e.target.value)} />
              <TextField label={t('survey.fields.waterTemp')} fullWidth value={detailForm.waterTemp ?? ''} onChange={e => handleDetailChange('waterTemp', e.target.value)} />
              <TextField label={t('survey.fields.startingAirTemp')} fullWidth value={detailForm.startingAirTemp ?? ''} onChange={e => handleDetailChange('startingAirTemp', e.target.value)} />
              <TextField label={t('survey.fields.endingAirTemp')} fullWidth value={detailForm.endingAirTemp ?? ''} onChange={e => handleDetailChange('endingAirTemp', e.target.value)} />

              <FormControl fullWidth variant="outlined" required>
                <InputLabel shrink={detailForm.skyCondition !== undefined && detailForm.skyCondition !== ''}>
                  {t('survey.fields.skyCondition')}
                </InputLabel>
                <Select value={detailForm.skyCondition ?? ''} onChange={e => handleDetailChange('skyCondition', e.target.value)} label={t('survey.fields.skyCondition')} required>
                  {Array.isArray(skyConditions) && skyConditions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" required>
                <InputLabel shrink={detailForm.windSpeed !== undefined && detailForm.windSpeed !== ''}>
                  {t('survey.fields.windSpeed')}
                </InputLabel>
                <Select value={detailForm.windSpeed ?? ''} onChange={e => handleDetailChange('windSpeed', e.target.value)} label={t('survey.fields.windSpeed')} required>
                  {Array.isArray(windSpeeds) && windSpeeds.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField label={t('survey.fields.endTime')} fullWidth type="time" required value={detailForm.endTime ?? ''} onChange={e => handleDetailChange('endTime', e.target.value)} InputLabelProps={{ shrink: true }} />

              <Typography variant="h6" sx={{ mt: 1 }}>{t('observations.speciesHeading')}</Typography>

              {(frogContent?.frogs || []).map(frog => (
                <FormControl key={frog.fieldName} fullWidth variant="outlined">
                  <InputLabel shrink={detailForm[frog.fieldName] !== undefined && detailForm[frog.fieldName] !== ''}>
                    {t(`frogs.${frog.fieldName}.name`) || frog.name}
                  </InputLabel>
                  <Select value={detailForm[frog.fieldName] ?? '0'} onChange={e => handleDetailChange(frog.fieldName, e.target.value)} label={t(`frogs.${frog.fieldName}.name`) || frog.name}>
                    {Array.isArray(speciesDensityOptions) && speciesDensityOptions.map((label, idx) => (
                      <MenuItem key={label} value={String(idx)}>{label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ))}

              <TextField label={t('survey.fields.comments')} fullWidth multiline rows={3} value={detailForm.comments ?? ''} onChange={e => handleDetailChange('comments', e.target.value)} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDetails}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveDetails} disabled={missingRequired}>Save</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}
