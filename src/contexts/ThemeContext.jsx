import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a CustomThemeProvider');
  }
  return context;
};

export const CustomThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#85ae75' : '#455e3b', // Lighter green for dark mode
        dark: darkMode ? '#6b8a5a' : '#334429',
        light: darkMode ? '#9bc088' : '#5f7950',
      },
      secondary: {
        main: '#85ae75', // Keep consistent across modes
      },
      success: {
        main: '#85ae75',
      },
      background: {
        default: darkMode ? '#121512' : '#fbfbfe', 
        paper: darkMode ? '#1e211e' : '#fbfbfe',
      },
      text: {
        primary: darkMode ? '#f0f5f0' : '#050316',
        secondary: darkMode ? '#b8c5b8' : '#666666',
      },
      divider: darkMode ? '#3a453a' : '#ebe7d6',
    },
    typography: {
      fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#2d4a2f' : '#455e3b',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none', // Remove Material-UI default gradient
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
