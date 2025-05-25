import React from 'react';
import './Footer.css';

const Footer = ({ darkMode }) => {
  return (
    <footer className={darkMode ? 'dark' : 'light'}>
      <div className="footer-container">
        <p>© {new Date().getFullYear()} FontFinder. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;