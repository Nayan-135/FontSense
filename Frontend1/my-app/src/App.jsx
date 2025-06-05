import React, { useState } from 'react';
import Header from './components/Header/Header';
import About from './components/About/About';
import ImageInput from './components/ImageInput/ImageInput';
import Results from './components/Results/Results';
import Footer from './components/Footer/Footer';
import './styles/globals.css';
import './styles/themes.css';
import './App.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [result, setResult] = useState('');
  const [hasInput, setHasInput] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleImageUpload = (file) => {
    setResult(`Image uploaded: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    setHasInput(true);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`} data-theme={isDarkMode ? 'dark' : 'light'}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="main-content">
        <About isDarkMode={isDarkMode} />
        
        <section className="input-section">
          <div className="container">
            <h2 className="section-title">Choose Your Input Method</h2>
            
            <div className="input-grid">
              <ImageInput isDarkMode={isDarkMode} onImageUpload={handleImageUpload} />
            </div>
            
            <Results isDarkMode={isDarkMode} result={result} hasInput={hasInput} />
          </div>
        </section>
      </main>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;