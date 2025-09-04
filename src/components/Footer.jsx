import React from 'react';
import { Link } from 'react-router-dom';

function AppFooter() {
  return (
    <footer className="app-footer text-center mt-auto py-4">
      <div className="container">
        <div className="small text-muted">Croak Counter · Senior Software Project · 2025</div>
        <div className="mt-2">
            <Link to="/" aria-label="Home" className="me-3">Home</Link>
            <Link to="/help" aria-label="Help" className="me-3">Help</Link>
            <Link to="/survey" aria-label="Survey" className="me-3">Survey</Link>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;


