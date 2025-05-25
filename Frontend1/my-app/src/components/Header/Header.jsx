import React from 'react';
import { Type, Sun, Moon } from 'lucide-react';
import './Header.css';

const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-icon">
              <Type className="icon" />
            </div>
            <div>
              <h1 className="logo-title">FontSense</h1>
              <p className="logo-subtitle">AI-Powered Font Recognition</p>
            </div>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="theme-toggle"
          >
            {isDarkMode ? <Sun className="icon" /> : <Moon className="icon" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;