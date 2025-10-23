
import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Chip,
  Divider,
  Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle.js';

function App() {
  usePageTitle();
  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Box display="flex" justifyContent="center">
        <Box sx={{ width: { xs: '100%', md: '90%', lg: '80%' } }}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 5, 
              textAlign: 'center',
              borderRadius: 4,
              mx: { xs: 2, md: 4 }
            }}
          >
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                🐸
                Croak Counter
              </Box>
            </Typography>
            
            <Box display="flex" justifyContent="center" mb={3}>
              <Chip 
                label="Michigan Technology University" 
                color="primary" 
                variant="outlined"
              />
            </Box>
            
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
              Help the Keweenaw Bay Indian Community track frog populations using
              quick call index surveys.
            </Typography>

            <Divider sx={{ my: 4 }} />
            
            <Typography 
              variant="h4" 
              component="h3" 
              gutterBottom
              sx={{
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
              }}
            >
              Useful Equipment to Bring
            </Typography>
            
            <List sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
              <ListItem sx={{ justifyContent: 'center', py: 0.5 }}>
                <ListItemText 
                  sx={{ textAlign: 'center' }}
                  primary={
                    <Box>
                      Thermometer <strong>(Required)</strong>
                    </Box>
                  }
                />
              </ListItem>
              <ListItem sx={{ justifyContent: 'center', py: 0.5 }}>
                <ListItemText sx={{ textAlign: 'center' }} primary="Flashlight" />
              </ListItem>
              <ListItem sx={{ justifyContent: 'center', py: 0.5 }}>
                <ListItemText sx={{ textAlign: 'center' }} primary="Map" />
              </ListItem>
            </List>

            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center"
            >
              <Button 
                component={Link}
                to="/beginner-survey"
                variant="contained"
                size="large"
                sx={{ 
                  borderRadius: 6, 
                  px: 4,
                  '&:hover': {
                    color: 'white'
                  }
                }}
              >
                Beginner Survey
              </Button>
              <Button 
                component={Link}
                to="/survey"
                variant="contained"
                color="success"
                size="large"
                sx={{ 
                  borderRadius: 6, 
                  px: 4,
                  '&:hover': {
                    color: 'white'
                  }
                }}
              >
                Advanced Survey
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
