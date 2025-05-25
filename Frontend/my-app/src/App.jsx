import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import InputSection from './components/InputSection/InputSection';
import ResultSection from './components/ResultSection/ResultSection';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleResult = (data) => {
    setResult(data);
    setError(null);
    setActiveTab('home');
  };

  const handleError = (message) => {
    setError(message);
    setResult(null);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <main>
        {activeTab === 'home' && (
          <>
            <InputSection 
              onResult={handleResult} 
              onError={handleError} 
              darkMode={darkMode}
            />
            <ResultSection 
              result={result} 
              error={error} 
              darkMode={darkMode}
            />
          </>
        )}
        {activeTab === 'about' && <About darkMode={darkMode} />}
      </main>
      
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;