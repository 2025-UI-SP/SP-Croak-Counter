import React from 'react';
import { 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usePageTitle } from '../hooks/usePageTitle.js';
import {frogContent} from '../config.js';
import { TextField } from '@mui/material';
import AudioPlayer from '../components/AudioPlayer';

function Help() {
  usePageTitle('Frog Identification');
  const [filter, setFilter] = React.useState('');

  const filteredFrogs = frogContent.frogs.filter(frog =>
    frog.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 8, sm: 10, md: 12 }, mb: 4 }}>
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
        Frog Identification
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
        Resources to help with identification
      </Typography>

      <Box sx={{ mt: 4, mb: 3, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ minWidth: 260, width: { xs: '100%', sm: 340 } }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Filter frogs by name"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            size="medium"
            sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            InputLabelProps={{ style: { fontSize: '1rem' } }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr'
          }
        }}
      >
        {filteredFrogs.map((frog, idx) => (
          <Box
            key={frog.name || idx}
            sx={{
              border: theme => `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              boxShadow: 2,
              p: 3,
              background: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              minHeight: 320
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.dark' }}>
              {frog.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              {frog.description}
            </Typography>
            {frog.image && (
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <img 
                  src={frog.image} 
                  alt={frog.name} 
                  style={{ maxWidth: '100%', maxHeight: 220, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                />
              </Box>
            )}
            {frog.audio && (
              <Box sx={{ mt: 'auto' }}>
                <AudioPlayer src={frog.audio} />
              </Box>
            )}
          </Box>
        ))}
        {filteredFrogs.length === 0 && (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
            No frogs found.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default Help;


