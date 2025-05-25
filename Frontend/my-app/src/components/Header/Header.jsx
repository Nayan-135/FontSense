import React from 'react';
import './Header.css';

const Header = ({ darkMode, toggleDarkMode, activeTab, setActiveTab }) => {
  return (
    <header className={darkMode ? 'dark' : 'light'}>
      <div className="header-container">
        <h1>FontFinder</h1>
        <nav>
          <ul>
            <li>
              <button 
                className={activeTab === 'home' ? 'active' : ''}
                onClick={() => setActiveTab('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'about' ? 'active' : ''}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
            </li>
          </ul>
        </nav>
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;