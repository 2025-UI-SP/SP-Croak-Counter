import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
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
  ListAlt as ObservationsIcon,
  InfoOutlined as InfoIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation.js';

const AppNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { label: t('nav.home'), path: '/', icon: HomeIcon },
    { label: t('nav.help'), path: '/help', icon: HelpIcon },
    { label: t('nav.survey'), path: '/survey', icon: SurveyIcon },
    { label: t('nav.join'), path: '/join', icon: JoinIcon },
    { label: t('nav.frogs'), path: '/frog-identification', icon: EQIcon },
    { label: t('nav.observations'), path: '/observations', icon: ObservationsIcon },
    { label: t('nav.about'), path: '/about', icon: InfoIcon }
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
              {t('app.title')}
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
                    backgroundColor: location.pathname === item.path
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'transparent',
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
                    backgroundColor: location.pathname === item.path
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'transparent',
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
