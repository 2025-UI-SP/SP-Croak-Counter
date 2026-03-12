import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

/**
 * Error modal that shows error name / label
 */
export default function ErrorModal({
  open,
  title = 'An error occurred',
  error,
  onClose,
}) {
  if (!open) return null;

  let errorLabel = 'Error';

  if (error) {
    if (typeof error === 'string') {
      errorLabel = error;
    } else if (typeof error.message === 'string' && typeof error.name === 'string' && error.name && error.name !== 'Error') {
      // Include name when it's specific (e.g. TypeError: ...).
      errorLabel = `${error.name}: ${error.message}`;
    } else if (typeof error.message === 'string' && error.message) {
      errorLabel = error.message;
    } else if (typeof error.name === 'string' && error.name) {
      errorLabel = error.name;
    }
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="error-dialog-title">
      <DialogTitle id="error-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          {errorLabel}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

