import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import './TextInput.css';

const TextInput = ({ isDarkMode, onTextSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onTextSubmit(text);
    }
  };

  return (
    <div className={`text-input-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="input-header">
        <FileText className={`icon ${isDarkMode ? 'dark' : ''}`} />
        <h3 className="input-title">Text Input</h3>
      </div>
      
      <div className="input-content">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to analyze the font..."
          className={`text-area ${isDarkMode ? 'dark' : ''}`}
        />
        <button
          onClick={handleSubmit}
          className={`submit-button ${isDarkMode ? 'dark' : ''}`}
        >
          Analyze Text
        </button>
      </div>
    </div>
  );
};

export default TextInput;