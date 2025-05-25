import React from 'react';
import { Type } from 'lucide-react';
import './Footer.css';

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`footer ${isDarkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <div className={`logo-icon ${isDarkMode ? 'dark' : ''}`}>
              <Type className="icon" />
            </div>
            <h3 className="logo-text">FontSense</h3>
          </div>
          
          <p className="footer-tagline">
            Powered by AI • Built for Designers
          </p>
          
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">API Documentation</a>
            <a href="#" className="footer-link">Support</a>
          </div>
          
          <div className="footer-copyright">
            <p>© 2025 FontSense. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;