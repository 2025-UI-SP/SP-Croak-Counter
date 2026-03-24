import React from 'react';
import {
  Container,
  Typography,
  Box,
  TextField
} from '@mui/material';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { useTranslation } from '../hooks/useTranslation.js';
import { frogContent } from '../config.js';
import AudioPlayer from '../components/AudioPlayer';

function FrogIdentification() {
  usePageTitle('Frog Identification');
  const { t } = useTranslation();
  const [filter, setFilter] = React.useState('');

  const frogs = (frogContent.frogs || []).map(frog => ({
    ...frog,
    displayName: t(`frogs.${frog.fieldName}.name`) || frog.name,
    displayDescription: t(`frogs.${frog.fieldName}.description`) || frog.description
  }));

  const filteredFrogs = frogs.filter(frog =>
    frog.displayName.toLowerCase().includes(filter.toLowerCase())
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
        {t('frogIdentification.title')}
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
        {t('frogIdentification.subtitle')}
      </Typography>

      <Box sx={{ mt: 4, mb: 3, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ minWidth: 260, width: { xs: '100%', sm: 340 } }}>
          <TextField
            fullWidth
            variant="outlined"
            label={t('frogIdentification.filterLabel')}
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
            key={frog.fieldName || idx}
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
              {frog.displayName}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
              {frog.displayDescription}
            </Typography>
            {frog.image && (
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <img
                  // src={'data:image/jpeg;base64,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'}
                  src={frog.image}
                  alt={frog.displayName}
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
            {t('frogIdentification.noFrogs')}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default FrogIdentification;


