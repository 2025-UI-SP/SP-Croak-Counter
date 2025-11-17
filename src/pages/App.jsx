
import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Chip,
  Divider,
  Stack,
  Card,
  CardContent,
  Tooltip
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
              variant="h6" 
              component="p" 
              color="text.secondary" 
              gutterBottom
              sx={{
                fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                textAlign: 'center',
                mb: 3
              }}
            >
              Useful Equipment to Bring
            </Typography>

            <Box 
              sx={{ 
                mb: 4, 
                maxWidth: 500, 
                mx: 'auto', 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 1.25
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Tooltip 
                  title="A thermometer is essential for measuring water temperature during surveys. Temperature affects frog activity."
                  arrow
                  enterTouchDelay={0}
                >
                  <Card 
                    sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      height: 110,
                      width: '100%',
                      textAlign: 'center',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardContent sx={{ py: 1.25, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h5" sx={{ mb: 0.25, fontSize: '2rem' }}>🌡️</Typography>
                      <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.25 }}>
                        Thermometer
                      </Typography>
                      <Chip 
                        label="Required" 
                        size="small" 
                        color="error" 
                        variant="outlined"
                        sx={{ mt: 0.25 }}
                      />
                    </CardContent>
                  </Card>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Tooltip 
                  title="A flashlight helps you navigate survey sites in low-light conditions."
                  arrow
                  enterTouchDelay={0}
                >
                  <Card 
                    sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      height: 110,
                      width: '100%',
                      textAlign: 'center',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardContent sx={{ py: 1.25, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h5" sx={{ mb: 0.25, fontSize: '2rem' }}>🔦</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        Flashlight
                      </Typography>
                    </CardContent>
                  </Card>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Tooltip 
                  title="A GPS or mobile device helps you locate survey sites and mark your survey locations accurately."
                  arrow
                  enterTouchDelay={0}
                >
                  <Card 
                    sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      height: 110,
                      width: '100%',
                      textAlign: 'center',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardContent sx={{ py: 1.25, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h5" sx={{ mb: 0.25, fontSize: '2rem' }}>🗺️</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        Map
                      </Typography>
                    </CardContent>
                  </Card>
                </Tooltip>
              </Box>
            </Box>

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
