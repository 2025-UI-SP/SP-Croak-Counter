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
 * Generic error modal that shows error name / label
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
    } else if (error.name) {
      errorLabel = error.name;
    } else if (error.message) {
      errorLabel = error.message;
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

