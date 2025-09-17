
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { CustomThemeProvider } from './contexts/ThemeContext.jsx';
import './index.css'  
// Pages
import App from './pages/App.jsx'
import Help from './pages/Help.jsx';
import Survey from './pages/Survey.jsx';
import BeginnerSurvey from './pages/BeginnerSurvey.jsx';
import Join from './pages/Join.jsx';
// Components
import AppNavbar from './components/Navbar.jsx';
import AppFooter from './components/Footer.jsx';

/*
  This is the main entry point for the application.
  Routes should be defined in the <Routes> tag. e.g <Route path="/" element={<App />} />
  All routes must first be imported
*/
createRoot(document.getElementById('root')).render(
  <CustomThemeProvider>
    <CssBaseline />
    <BrowserRouter>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <AppNavbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/help" element={<Help />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/beginner-survey" element={<BeginnerSurvey />} />
            <Route path="/join" element={<Join />} />
          </Routes>
        </Box>
        <AppFooter />
      </Box>
    </BrowserRouter>
  </CustomThemeProvider>
);
