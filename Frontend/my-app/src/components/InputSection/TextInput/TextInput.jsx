import React, { useState } from 'react';
import './TextInput.css';

const TextInput = ({ onResult, onError, darkMode }) => {
  const [textInput, setTextInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim()) {
      onError('Please enter some text to analyze');
      return;
    }
    // Simulate font recognition result
    onResult({
      type: 'text',
      input: textInput,
      fonts: [
        { name: 'Roboto', confidence: 85 },
        { name: 'Open Sans', confidence: 78 },
        { name: 'Lato', confidence: 72 }
      ]
    });
  };

  return (
    <div className={`input-card ${darkMode ? 'dark' : 'light'}`}>
      <h3>Type Text</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter text with the font you want to identify"
          className={darkMode ? 'dark' : 'light'}
        />
        <button type="submit" className={`submit-btn ${darkMode ? 'dark' : 'light'}`}>
          Analyze Text
        </button>
      </form>
    </div>
  );
};

export default TextInput;