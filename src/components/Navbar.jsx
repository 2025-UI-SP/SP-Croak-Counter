
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Home as HomeIcon, 
  Help as HelpIcon, 
  Assignment as SurveyIcon,
  GroupAdd as JoinIcon,
  GraphicEq as EQIcon,
  ListAlt as ObservationsIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const AppNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Help', path: '/help', icon: HelpIcon },
    { label: 'Survey', path: '/survey', icon: SurveyIcon },
    { label: 'Join', path: '/join', icon: JoinIcon },
    { label: 'Frogs', path: '/frog-identification', icon: EQIcon },
    { label: 'Observations', path: '/observations', icon: ObservationsIcon }
  ];

  return (
    <AppBar position="fixed">
      <Toolbar>
        {!isMobile && (
          <>
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                mr: 3,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }
              }}
            >
              Croak Counter
            </Typography>
            <Box sx={{ display: 'flex' }}>
              {navItems.map((item) => (
                <Button 
                  key={item.path}
                  color="inherit" 
                  component={Link} 
                  to={item.path}
                  sx={{ 
                    mx: 1,
                    backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </>
        )}
        
        {isMobile ? (
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <IconButton
                  key={item.path}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={{
                    backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    borderRadius: 1
                  }}
                >
                  <IconComponent />
                </IconButton>
              );
            })}
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
