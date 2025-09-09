import React from 'react';
import { Container, Typography, Alert } from '@mui/material';
import { usePageTitle } from '../hooks/usePageTitle.js';

function Survey() {
  usePageTitle('Advanced Survey');
  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
      <Typography 
        variant="h3" 
        component="h2" 
        gutterBottom
        sx={{
          fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
        }}
      >
        Survey
      </Typography>
      <Typography 
        variant="h5" 
        component="p" 
        color="text.secondary" 
        gutterBottom
        sx={{
          fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' }
        }}
      >
        Lorem Ipsum
      </Typography>
      <Alert severity="info" sx={{ mt: 3 }}>
        This is a placeholder for the survey workflow.
      </Alert>
    </Container>
  );
}

export default Survey;


