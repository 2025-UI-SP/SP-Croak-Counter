import React, {useState} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Help as HelpIcon,
  Assignment as SurveyIcon,
  GroupAdd as JoinIcon,
  VolumeUp as EQIcon,
  Visibility as ObservationsIcon,
  InfoOutlined as InfoIcon,
  KeyboardArrowDown as SurveyDropIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation.js';

const AppNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { t } = useTranslation();
  const [surveyDrop, setSurveyDrop] = useState(null);
  const surveyMenuOpen = Boolean(surveyDrop);
  const handleSurveyClick = (event) => {
    setSurveyDrop(event.currentTarget);
  };
  const handleSurveyClose = () => {
    setSurveyDrop(null);
  }

  const navItems = [
    { label: t('nav.home'), path: '/', icon: HomeIcon },
    { label: t('nav.help'), path: '/help', icon: HelpIcon },
    { label: t('nav.survey'), path: '/survey', icon: SurveyIcon, hasDropdown: true },
    { label: t('nav.observations'), path: '/observations', icon: ObservationsIcon },
    { label: t('nav.frogs'), path: '/frog-identification', icon: EQIcon },
    { label: t('nav.join'), path: '/join', icon: JoinIcon },
    { label: t('nav.about'), path: '/about', icon: InfoIcon }
  ];
  const isSurveyPage = location.pathname === '/survey' || location.pathname === '/beginner-survey';

  

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
    item.hasDropdown ? (
      <Box key={item.path}>
        <Button
          color="inherit"
          onClick={handleSurveyClick}
          endIcon={<SurveyDropIcon />}
          sx={{
            mx: 1,
            backgroundColor: isSurveyPage
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
        <Menu
          anchorEl={surveyDrop}
          open={surveyMenuOpen}
          onClose={handleSurveyClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem
            component={Link}
            to="/beginner-survey"
            onClick={handleSurveyClose}
            selected={location.pathname === '/beginner-survey'}
          >
            Beginner Survey
          </MenuItem>
          <MenuItem
            component={Link}
            to="/survey"
            onClick={handleSurveyClose}
            selected={location.pathname === '/survey'}
          >
            Advanced Survey
          </MenuItem>
        </Menu>
      </Box>
    ) : (
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
    )
  ))}
</Box>
          </>
        )}

        {isMobile ? (
  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
    {navItems.map((item) => {
      const IconComponent = item.icon;
      
      // Handle survey dropdown on mobile
      if (item.hasDropdown) {
        return (
          <Box key={item.path}>
            <IconButton
              color="inherit"
              onClick={handleSurveyClick}
              sx={{
                backgroundColor: isSurveyPage
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'transparent',
                borderRadius: 1
              }}
            >
              <SurveyIcon />
            </IconButton>
            <Menu
              anchorEl={surveyDrop}
              open={surveyMenuOpen}
              onClose={handleSurveyClose}
            >
              <MenuItem
                component={Link}
                to="/beginner-survey"
                onClick={handleSurveyClose}
              >
                Beginner Survey
              </MenuItem>
              <MenuItem
                component={Link}
                to="/survey"
                onClick={handleSurveyClose}
              >
                Advanced Survey
              </MenuItem>
            </Menu>
          </Box>
        );
      }
      
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
