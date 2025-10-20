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
  Chip
} from '@mui/material';
// Import icons for upload, delete, and status indicators
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// Import configuration for text labels (like table headers and button text)
import { observationsContent } from '../config.js';

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

  // Render the page's user interface
  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
      {/* Page Header */}
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
          {observationsContent.title}
        </Typography>
        <Typography 
          variant="h5" 
          component="p" 
          color="text.secondary" 
          gutterBottom
          sx={{
            fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
            textAlign: 'center',
            mb: 2
          }}
        >
          {observationsContent.intro}
        </Typography>
      </Box>

      {/* A centered container to hold the page content */}
      <Paper elevation={3} className="observations-paper">
        {/* A styled box (like a card) for the table and toolbar */}
        <Toolbar className="observations-toolbar">
          <Box>
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
          </Box>
        </Toolbar>

        {/* The table to display survey data */}
        <Table className="observations-table">
          <TableHead>
            <TableRow>
              {/* Checkbox to select/deselect all rows */}
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.size > 0 && !allSelected} /* Show a dash if some but not all rows are selected */
                  checked={allSelected} /* Checked if all rows are selected */
                  onChange={toggleAll} /* Call toggleAll when clicked */
                  inputProps={{ 'aria-label': 'select all observations' }}
                />
              </TableCell>
              {/* Column headers from the config */}
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
            {/* Loop through each survey entry to create a row */}
            {entries.map((obs) => (
              <TableRow key={obs.id} hover> {/* Hover effect for better usability */}
                {/* Checkbox for selecting this row */}
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.has(obs.id)} /* Checked if this row is selected */
                    onChange={() => toggleOne(obs.id)} /* Toggle selection when clicked */
                    inputProps={{ 'aria-label': `select observation ${obs.id}` }}
                  />
                </TableCell>
                {/* Display formatted data for each column */}
                <TableCell>{formatDate(obs.date)}</TableCell>
                <TableCell>{obs.site}</TableCell>
                {/* Use fallback (??) to handle different data structures */}
                <TableCell>{formatDensity(obs.data?.frogCallDensity ?? obs.frogCallDensity)}</TableCell>
                <TableCell>{formatRange(obs.data?.windSpeed ?? obs.windSpeed)}</TableCell>
                <TableCell>{formatTemp(obs.data?.waterTemp ?? obs.waterTemp)}</TableCell>
                <TableCell>{formatTemp(obs.data?.startingAirTemp ?? obs.startingAirTemp)}</TableCell>
                <TableCell>{formatTemp(obs.data?.endingAirTemp ?? obs.endingAirTemp)}</TableCell>
                {/* Show status as a colored chip */}
                <TableCell>
                  {obs.status === 'uploaded' ? (
                    <Chip icon={<CheckCircleIcon />} label="Uploaded" color="success" size="small" />
                  ) : (
                    <Chip label="Saved" size="small" />
                  )}
                </TableCell>
                {/* Action buttons for upload and delete */}
                <TableCell align="right">
                  {/* Upload button (not functional yet) */}
                  <IconButton aria-label="upload" size="small" onClick={() => {}} title="Upload not implemented yet">
                    <CloudUploadIcon />
                  </IconButton>
                  {/* Delete button to remove the entry */}
                  <IconButton aria-label="delete" size="small" onClick={() => handleDelete(obs.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}