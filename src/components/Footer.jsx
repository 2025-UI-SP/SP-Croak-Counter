import React from 'react';
import { Box, Typography, Container, IconButton, Tooltip, Chip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { useThemeMode } from '../contexts/ThemeContext.jsx';
import useOnlineStatus from '../hooks/useOnlineStatus';

function AppFooter() {
  const { darkMode, toggleDarkMode } = useThemeMode();
  const online = useOnlineStatus();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 0.5,
        textAlign: 'center',
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 1, sm: 2 }
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Senior Software Project · 2025
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip
              icon={online ? <CheckCircleIcon /> : <CloudOffIcon />}
              label={online ? 'Online' : 'Offline'}
              color={online ? 'success' : 'default'}
              size="small"
            />
            <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton 
                onClick={toggleDarkMode} 
                color="primary"
                size="small"
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AppFooter;