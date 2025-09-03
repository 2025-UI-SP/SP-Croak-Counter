
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'  
import App from './pages/App.jsx'
import AppNavbar from './components/navbar.jsx';
import Help from './pages/Help.jsx';
import Survey from './pages/Survey.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppNavbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/help" element={<Help />} />
      <Route path="/survey" element={<Survey />} />
    </Routes>
  </BrowserRouter>
);
