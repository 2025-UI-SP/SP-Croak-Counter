
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'  
// Pages
import App from './pages/App.jsx'
import Help from './pages/Help.jsx';
import Survey from './pages/Survey.jsx';
import BeginnerSurvey from './pages/BeginnerSurvey.jsx';
// Components
import AppNavbar from './components/Navbar.jsx';
import AppFooter from './components/Footer.jsx';

/*
  This is the main entry point for the application.
  Routes should be defined in the <Routes> tag. e.g <Route path="/" element={<App />} />
  All routes must first be imported
*/
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppNavbar />
    <div className="app-content">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/help" element={<Help />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/beginner-survey" element={<BeginnerSurvey />} />
      </Routes>
    </div>
    <AppFooter />
  </BrowserRouter>
);
