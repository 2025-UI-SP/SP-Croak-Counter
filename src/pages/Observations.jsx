// src/pages/Observations.jsx
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Stack,
  Divider,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { observationsContent } from '../config.js';

/* ---------- helpers ---------- */
function formatDate(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return isNaN(d) ? String(iso) : d.toLocaleString();
  } catch {
    return String(iso);
  }
}

function formatDensity(val) {
  if (val === null || val === undefined || val === '') return '—';
  const s = String(val);
  const m = s.match(/\d+/);
  return m ? m[0] : s;
}

function formatTemp(val) {
  if (val === null || val === undefined || val === '') return '—';
  const s = String(val).trim();
  const rangeMatch = s.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
  if (rangeMatch) return `${rangeMatch[1]}-${rangeMatch[2]}`;
  const m = s.match(/-?\d+(?:\.\d+)?/);
  return m ? m[0] : s;
}

function formatRange(val) {
  if (val === null || val === undefined || val === '') return '—';
  const s = String(val).trim();
  const rangeMatch = s.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
  if (rangeMatch) return `${rangeMatch[1]}-${rangeMatch[2]}`;
  const m = s.match(/-?\d+(?:\.\d+)?/);
  return m ? m[0] : s;
}

/* ---------- component ---------- */
export default function Observations() {
  // Mobile breakpoint
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Load entries
  const [entries, setEntries] = React.useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('observations') || 'null');
      if (Array.isArray(stored)) return stored;
    } catch {}
    return [];
  });

  // Refresh once on mount
  React.useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('observations') || 'null');
      if (Array.isArray(stored)) setEntries(stored);
    } catch {}
  }, []);

  function persistEntries(next) {
    setEntries(next);
    try {
      localStorage.setItem('observations', JSON.stringify(next));
    } catch (e) {
      console.error('Failed to persist observations', e);
    }
  }

  /* ---------- selection ---------- */
  const [selected, setSelected] = React.useState(new Set());
  const allSelected = selected.size === entries.length && entries.length > 0;

  function toggleOne(id) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(entries.map((o) => o.id)));
  }

  /* ---------- detail modal ---------- */
  const [detailEntry, setDetailEntry] = React.useState(null);
  const [detailForm, setDetailForm] = React.useState({});

  function openDetails(obs) {
    const data = obs.data || {};
    setDetailEntry(obs);
    setDetailForm({
      site: obs.site || data.location || '',
      latitude: obs.latitude ?? data.latitude ?? '',
      longitude: obs.longitude ?? data.longitude ?? '',
      frogCallDensity: data.frogCallDensity ?? data.frog_call_density ?? '',
      windSpeed: data.windSpeed ?? data.wind_speed ?? '',
      skyCondition: data.skyCondition ?? data.sky_condition ?? '',
      waterTemp: data.waterTemp ?? data.water_temp ?? '',
      startingAirTemp: data.startingAirTemp ?? data.starting_air_temp ?? '',
      endingAirTemp: data.endingAirTemp ?? data.ending_air_temp ?? '',
      comments: data.comments ?? '',
    });
  }

  function closeDetails() {
    setDetailEntry(null);
    setDetailForm({});
  }

  function handleDetailChange(name, value) {
    setDetailForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSaveDetails() {
    if (!detailEntry) return;

    const dataFields = { ...detailForm };
    delete dataFields.site;
    delete dataFields.latitude;
    delete dataFields.longitude;

    const updated = entries.map((e) => {
      if (e.id !== detailEntry.id) return e;
      return {
        ...e,
        site: detailForm.site || e.site,
        latitude: detailForm.latitude ?? e.latitude,
        longitude: detailForm.longitude ?? e.longitude,
        data: { ...(e.data || {}), ...dataFields },
      };
    });

    persistEntries(updated);
    closeDetails();
  }

  /* ---------- actions ---------- */
  function handleDelete(id) {
    persistEntries(entries.filter((e) => e.id !== id));
  }

  function handleUpload(id) {
    const next = entries.map((e) =>
      e.id === id ? { ...e, status: 'uploaded', uploadedAt: new Date().toISOString() } : e
    );
    persistEntries(next);
  }

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
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {formatDate(obs.date)}
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
                    onClick={() => handleUpload(obs.id)}
                    fullWidth
                  >
                    Upload
                  </Button>

                  {/* Delete hidden on mobile by design */}
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
    <Container maxWidth="md" className="observations-container">
      <Paper elevation={3} className="observations-paper">
        <Toolbar className="observations-toolbar">
          <Box>
            <Typography variant="h6">{observationsContent.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {observationsContent.intro}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              /* bulk upload not implemented */
            }}
            title="Upload not implemented yet"
            disabled={selected.size === 0}
          >
            {observationsContent.labels.uploadButton} ({selected.size})
          </Button>
        </Toolbar>

        {/* Mobile: cards | Desktop: table */}
        {isMobile ? (
          <MobileList />
        ) : (
          <Table className="observations-table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.size > 0 && !allSelected}
                    checked={allSelected}
                    onChange={toggleAll}
                    inputProps={{ 'aria-label': 'select all observations' }}
                  />
                </TableCell>

                <TableCell>{observationsContent.labels.date}</TableCell>
                <TableCell>{observationsContent.labels.site}</TableCell>
                <TableCell>{observationsContent.labels.callDensity}</TableCell>
                <TableCell>{observationsContent.labels.wind}</TableCell>
                <TableCell>{observationsContent.labels.waterTemp}</TableCell>
                <TableCell>{observationsContent.labels.startAir}</TableCell>
                <TableCell>{observationsContent.labels.endAir}</TableCell>
                <TableCell>{observationsContent.labels.status}</TableCell>
                <TableCell align="right">{observationsContent.labels.actions}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {entries.map((obs) => (
                <TableRow key={obs.id} hover onClick={() => openDetails(obs)} sx={{ cursor: 'pointer' }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.has(obs.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOne(obs.id);
                      }}
                      inputProps={{ 'aria-label': `select observation ${obs.id}` }}
                    />
                  </TableCell>

                  <TableCell>{formatDate(obs.date)}</TableCell>
                  <TableCell>{obs.site || '—'}</TableCell>
                  <TableCell>{formatDensity(obs.data?.frogCallDensity ?? obs.frogCallDensity)}</TableCell>
                  <TableCell>{formatRange(obs.data?.windSpeed ?? obs.windSpeed)}</TableCell>
                  <TableCell>{formatTemp(obs.data?.waterTemp ?? obs.waterTemp)}</TableCell>
                  <TableCell>{formatTemp(obs.data?.startingAirTemp ?? obs.startingAirTemp)}</TableCell>
                  <TableCell>{formatTemp(obs.data?.endingAirTemp ?? obs.endingAirTemp)}</TableCell>

                  <TableCell>
                    {obs.status === 'uploaded' ? (
                      <Chip icon={<CheckCircleIcon />} label="Uploaded" color="success" size="small" />
                    ) : (
                      <Chip label="Saved" size="small" />
                    )}
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      aria-label="upload"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpload(obs.id);
                      }}
                      title="Upload"
                    >
                      <CloudUploadIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(obs.id);
                      }}
                      title="Delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={!!detailEntry} onClose={closeDetails} fullWidth maxWidth="sm">
          <DialogTitle>Observation Details</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                label="Site"
                fullWidth
                value={detailForm.site ?? ''}
                onChange={(e) => handleDetailChange('site', e.target.value)}
              />
              <TextField
                label="Latitude"
                fullWidth
                value={detailForm.latitude ?? ''}
                onChange={(e) => handleDetailChange('latitude', e.target.value)}
              />
              <TextField
                label="Longitude"
                fullWidth
                value={detailForm.longitude ?? ''}
                onChange={(e) => handleDetailChange('longitude', e.target.value)}
              />

              <TextField
                label="Water Temp (°F)"
                fullWidth
                value={detailForm.waterTemp ?? ''}
                onChange={(e) => handleDetailChange('waterTemp', e.target.value)}
              />
              <TextField
                label="Starting Air Temp (°F)"
                fullWidth
                value={detailForm.startingAirTemp ?? ''}
                onChange={(e) => handleDetailChange('startingAirTemp', e.target.value)}
              />
              <TextField
                label="Ending Air Temp (°F)"
                fullWidth
                value={detailForm.endingAirTemp ?? ''}
                onChange={(e) => handleDetailChange('endingAirTemp', e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel>Sky Condition</InputLabel>
                <Select
                  value={detailForm.skyCondition ?? ''}
                  label="Sky Condition"
                  onChange={(e) => handleDetailChange('skyCondition', e.target.value)}
                >
                  <MenuItem value="Clear or only a few clouds">Clear or only a few clouds</MenuItem>
                  <MenuItem value="Partly cloudy or variable">Partly cloudy or variable</MenuItem>
                  <MenuItem value="Broken clouds or overcast">Broken clouds or overcast</MenuItem>
                  <MenuItem value="Fog">Fog</MenuItem>
                  <MenuItem value="Drizzle or light rain (not affecting hearing)">
                    Drizzle or light rain (not affecting hearing)
                  </MenuItem>
                  <MenuItem value="Snow">Snow</MenuItem>
                  <MenuItem value="Showers (is affecting hearing ability)">
                    Showers (is affecting hearing ability)
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Wind Speed</InputLabel>
                <Select
                  value={detailForm.windSpeed ?? ''}
                  label="Wind Speed"
                  onChange={(e) => handleDetailChange('windSpeed', e.target.value)}
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
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Frog Call Density</InputLabel>
                <Select
                  value={detailForm.frogCallDensity ?? ''}
                  label="Frog Call Density"
                  onChange={(e) => handleDetailChange('frogCallDensity', e.target.value)}
                >
                  <MenuItem value="0 - None">0 - No frogs heard</MenuItem>
                  <MenuItem value="1 - Individual calls, no overlapping">1 - Individual calls, easy to count</MenuItem>
                  <MenuItem value="2 - Individual calls, some overlapping">2 - Some calls overlapping</MenuItem>
                  <MenuItem value="3 - Full chorus, constant, continuous">3 - Full chorus, constant calling</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Comments"
                fullWidth
                multiline
                rows={3}
                value={detailForm.comments ?? ''}
                onChange={(e) => handleDetailChange('comments', e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDetails}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveDetails}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}
