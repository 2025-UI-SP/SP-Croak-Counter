import React from 'react';
// Import Material-UI components for building the user interface (like containers, tables, buttons, etc.)
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
  useMediaQuery
} from '@mui/material';
// Import icons for upload, delete, and status indicators
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// Import configuration for text labels (like table headers and button text)
import { observationsContent } from '../config.js';
import { useTheme } from '@mui/material/styles';

// Convert an ISO date string (like "2023-10-06T20:21:00Z") into a readable format (e.g., "10/6/2023, 8:21 PM")
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

// Clean up frog call density value: show a dash ("—") if empty, otherwise extract the first number or keep the text
function formatDensity(val) {
  if (val === null || val === undefined || val === '') return '—';
  const s = String(val);
  const m = s.match(/\d+/);
  return m ? m[0] : s;
}

// Clean up a number value: show a dash ("—") if empty, otherwise extract a number (including decimals or negative) or keep the text
function formatNumber(val) {
  if (val === null || val === undefined || val === '') return '—';
  const s = String(val);
  const m = s.match(/-?\d+(?:\.\d+)?/);
  return m ? m[0] : s;
}

// Clean up temperature value: show a dash ("—") if empty, keep ranges like "50-55", or extract the first number
function formatTemp(val) {
  if (val === null || val === undefined || val === '') return '—';
  const s = String(val).trim();
  /* Keep ranges like "50-55" intact */
  const rangeMatch = s.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
  if (rangeMatch) return `${rangeMatch[1]}-${rangeMatch[2]}`;
  /* Otherwise return the first number (including decimals or negative) */
  const m = s.match(/-?\d+(?:\.\d+)?/);
  return m ? m[0] : s;
}

// Clean up range value (like wind speed): show a dash ("—") if empty, keep ranges like "4-7", or extract the first number
function formatRange(val) {
  if (val === null || val === undefined || val === '') return '—';
  const s = String(val).trim();
  /* Preserve explicit ranges like "4-7" or "4 - 7" */
  const rangeMatch = s.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
  if (rangeMatch) return `${rangeMatch[1]}-${rangeMatch[2]}`;
  /* Otherwise return the first number (including decimals or negative) */
  const m = s.match(/-?\d+(?:\.\d+)?/);
  return m ? m[0] : s;
}

// Main component for the Observations page
export default function Observations() {
  // Determines when to use the mobile layout vs. desktop table
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <=600px

  // Load saved survey data from the browser's localStorage or start with an empty list
  const [entries, setEntries] = React.useState(() => {
    try {
      // Get data from localStorage under the key 'observations'
      const stored = JSON.parse(localStorage.getItem('observations') || 'null');
      // If the data is a valid list with items, use it
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch (e) {
      // If there's an error (like bad data), do nothing
    }
    // If no valid data, start with an empty list
    return [];
  });

  // Keep track of which rows are selected (using a Set to store IDs)
  const [selected, setSelected] = React.useState(new Set());

  // Check if all rows are selected (true if the number of selected items equals the number of entries)
  const allSelected = selected.size === entries.length && entries.length > 0;

  // When the page loads, check localStorage again to catch any new surveys (e.g., from another page)
  React.useEffect(() => {
    try {
      // Get the latest data from localStorage
      const stored = JSON.parse(localStorage.getItem('observations') || 'null');
      // If it's a valid list, update the entries
      if (Array.isArray(stored)) setEntries(stored);
    } catch (e) {
      // Ignore errors
    }
  }, []); // Empty array means this runs only when the page loads

  // Save the updated list of entries to localStorage
  function persistEntries(next) {
    // Update the component's state with the new entries
    setEntries(next);
    try {
      // Save the new entries to localStorage as a JSON string
      localStorage.setItem('observations', JSON.stringify(next));
    } catch (e) {
      // If saving fails, log an error
      console.error('Failed to persist observations', e);
    }
  }

  // details modal state
  const [detailEntry, setDetailEntry] = React.useState(null);
  const [detailForm, setDetailForm] = React.useState({});

  function openDetails(obs) {
    // Prefill the modal form with top-level and data fields
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
      comments: data.comments ?? ''
    });
  }

  function closeDetails() {
    setDetailEntry(null);
    setDetailForm({});
  }

  function handleDetailChange(name, value) {
    setDetailForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSaveDetails() {
    if (!detailEntry) return;
    // Build data object (exclude site/latitude/longitude)
    const dataFields = { ...detailForm };
    delete dataFields.site;
    delete dataFields.latitude;
    delete dataFields.longitude;

    const updated = entries.map(e => {
      if (e.id === detailEntry.id) {
        return {
          ...e,
          site: detailForm.site || e.site,
          latitude: detailForm.latitude ?? e.latitude,
          longitude: detailForm.longitude ?? e.longitude,
          // Merge with existing data so unspecified fields are preserved
          data: { ...(e.data || {}), ...dataFields }
        };
      }
      return e;
    });

    persistEntries(updated);
    closeDetails();
  }

  // Mark a survey entry as "uploaded" by updating its status and timestamp
  function handleUpload(id) {
    // Create a new list, updating the entry with the matching ID
    const next = entries.map((e) => {
      if (e.id === id) return { ...e, status: 'uploaded', uploadedAt: new Date().toISOString() };
      return e;
    });
    // Save the updated list
    persistEntries(next);
  }

  // Delete a survey entry by its ID
  function handleDelete(id) {
    // Create a new list without the entry that matches the ID
    const next = entries.filter((e) => e.id !== id);
    // Save the updated list
    persistEntries(next);
  }

  // Toggle the selection of a single row (select or deselect it)
  function toggleOne(id) {
    // Copy the current selected set
    const next = new Set(selected);
    // If the ID is already selected, remove it; otherwise, add it
    if (next.has(id)) next.delete(id);
    else next.add(id);
    // Update the selected state
    setSelected(next);
  }

  // Select or deselect all rows
  function toggleAll() {
    // If all are selected, clear the selection; otherwise, select all rows
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(entries.map((o) => o.id)));
  }

  function MobileList() {
  return (
    <Box sx={{ px: 2, pb: 2 }}>
      <Stack spacing={2}>
        {entries.map((obs) => (
          <Card key={obs.id} variant="outlined">
            <CardContent sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                {/* Optional: keep selection on mobile */}
                <Checkbox
                  checked={selected.has(obs.id)}
                  onClick={(e) => { e.stopPropagation(); toggleOne(obs.id); }}
                  inputProps={{ 'aria-label': `select observation ${obs.id}` }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {formatDate(obs.date)}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {obs.site}
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

            {/* Actions are BELOW date/site so they’re always reachable */}
            <CardActions sx={{ px: 2, py: 1.5 }}>
              <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                <Button
                  variant="contained"
                  onClick={() => openDetails(obs)}
                  fullWidth
                >
                  View / Edit
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => { /* upload not implemented */ }}
                  fullWidth
                >
                  Upload
                  </Button>

                  {/* Delete intentionally hidden on mobile list (per your note) */}
                  {/* If you DO want it, add a third button here with handleDelete */}
                </Stack>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Box>
    );
  }


  // Render the page's user interface
  return (
    <Container maxWidth="md" className="observations-container">
      {/* A centered container to hold the page content */}
      <Paper elevation={3} className="observations-paper">
        {/* A styled box (like a card) for the table and toolbar */}
        <Toolbar className="observations-toolbar">
          <Box>
            {/* Show the page title from the config */}
            <Typography variant="h6">{observationsContent.title}</Typography>
            {/* Show the introductory text from the config */}
            <Typography variant="body2" color="text.secondary">{observationsContent.intro}</Typography>
          </Box>
          {/* Button to upload selected entries (not functional yet) */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              /* Upload not implemented yet — does nothing */
            }}
            title="Upload not implemented yet"
          >
            {/* Show the upload button label and number of selected rows */}
            {observationsContent.labels.uploadButton} ({selected.size})
          </Button>
        </Toolbar>

        {/* Desktop table / Mobile cards */}
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
                <TableCell align="right">
                  {observationsContent.labels.actions}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {entries.map((obs) => (
                <TableRow
                  key={obs.id}
                  hover
                  onClick={() => openDetails(obs)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.has(obs.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOne(obs.id);
                      }}
                    />
                  </TableCell>

                  <TableCell>{formatDate(obs.date)}</TableCell>
                  <TableCell>{obs.site}</TableCell>
                  <TableCell>{formatDensity(obs.data?.frogCallDensity)}</TableCell>
                  <TableCell>{formatRange(obs.data?.windSpeed)}</TableCell>
                  <TableCell>{formatTemp(obs.data?.waterTemp)}</TableCell>
                  <TableCell>{formatTemp(obs.data?.startingAirTemp)}</TableCell>
                  <TableCell>{formatTemp(obs.data?.endingAirTemp)}</TableCell>

                  <TableCell>
                    {obs.status === 'uploaded' ? (
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Uploaded"
                        color="success"
                        size="small"
                      />
                    ) : (
                      <Chip label="Saved" size="small" />
                    )}
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CloudUploadIcon />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(obs.id);
                      }}
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
              <TextField label="Site" fullWidth value={detailForm.site ?? ''} onChange={(e) => handleDetailChange('site', e.target.value)} />
              <TextField label="Latitude" fullWidth value={detailForm.latitude ?? ''} onChange={(e) => handleDetailChange('latitude', e.target.value)} />
              <TextField label="Longitude" fullWidth value={detailForm.longitude ?? ''} onChange={(e) => handleDetailChange('longitude', e.target.value)} />

              <TextField label="Water Temp (°F)" fullWidth value={detailForm.waterTemp ?? ''} onChange={(e) => handleDetailChange('waterTemp', e.target.value)} />
              <TextField label="Starting Air Temp (°F)" fullWidth value={detailForm.startingAirTemp ?? ''} onChange={(e) => handleDetailChange('startingAirTemp', e.target.value)} />
              <TextField label="Ending Air Temp (°F)" fullWidth value={detailForm.endingAirTemp ?? ''} onChange={(e) => handleDetailChange('endingAirTemp', e.target.value)} />

               <FormControl fullWidth>
                <InputLabel>Sky Condition</InputLabel>
                <Select value={detailForm.skyCondition ?? ''} label="Sky Condition" onChange={(e) => handleDetailChange('skyCondition', e.target.value)}>
                  <MenuItem value="Clear or only a few clouds">Clear or only a few clouds</MenuItem>
                  <MenuItem value="Partly cloudy or variable">Partly cloudy or variable</MenuItem>
                  <MenuItem value="Broken clouds or overcast">Broken clouds or overcast</MenuItem>
                  <MenuItem value="Fog">Fog</MenuItem>
                  <MenuItem value="Drizzle or light rain (not affecting hearing)">Drizzle or light rain (not affecting hearing)</MenuItem>
                  <MenuItem value="Snow">Snow</MenuItem>
                  <MenuItem value="Showers (is affecting hearing ability)">Showers (is affecting hearing ability)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Wind Speed</InputLabel>
                <Select value={detailForm.windSpeed ?? ''} label="Wind Speed" onChange={(e) => handleDetailChange('windSpeed', e.target.value)}>
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
                <Select value={detailForm.frogCallDensity ?? ''} label="Frog Call Density" onChange={(e) => handleDetailChange('frogCallDensity', e.target.value)}>
                  <MenuItem value="0 - None">0 - No frogs heard</MenuItem>
                  <MenuItem value="1 - Individual calls, no overlapping">1 - Individual calls, easy to count</MenuItem>
                  <MenuItem value="2 - Individual calls, some overlapping">2 - Some calls overlapping</MenuItem>
                  <MenuItem value="3 - Full chorus, constant, continuous">3 - Full chorus, constant calling</MenuItem>
                </Select>
              </FormControl>

              <TextField label="Comments" fullWidth multiline rows={3} value={detailForm.comments ?? ''} onChange={(e) => handleDetailChange('comments', e.target.value)} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDetails}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveDetails}>Save</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}