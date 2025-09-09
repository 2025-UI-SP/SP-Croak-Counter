import React from 'react';
import { Box, Typography, Container, Link as MuiLink, IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useThemeMode } from '../contexts/ThemeContext.jsx';

function AppFooter() {
  const { darkMode, toggleDarkMode } = useThemeMode();

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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Croak Counter · Senior Software Project · 2025
          </Typography>
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
      </Container>
    </Box>
  );
}

export default AppFooter;


