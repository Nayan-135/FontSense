import React, { useState } from 'react';
import { FileText, Sparkles, Send } from 'lucide-react';
import './TextInput.css';

const TextInput = ({ isDarkMode, onTextSubmit }) => {
  const [text, setText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = () => {
    if (text.trim()) {
      onTextSubmit(text);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className={`text-input-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Animated background elements */}
      <div className="bg-decoration">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>
      
      <div className="input-header">
        <div className="icon-wrapper">
          <FileText className={`icon ${isDarkMode ? 'dark' : ''}`} />
          <Sparkles className={`sparkle-icon ${isDarkMode ? 'dark' : ''}`} />
        </div>
        <div className="title-section">
          <h3 className="input-title">Text Analyzer</h3>
          <p className="input-subtitle">Paste your content for intelligent font analysis</p>
        </div>
      </div>
      
      <div className="input-content">
        <div className="textarea-wrapper">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type or paste your text here to analyze the font...&#10;&#10;💡 Tip: Press Ctrl+Enter to submit quickly"
            className={`text-area ${isDarkMode ? 'dark' : ''}`}
          />
          <div className="char-counter">
            <span className={`counter-text ${isDarkMode ? 'dark' : ''}`}>
              {text.length} characters
            </span>
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={!text.trim()}
          className={`submit-button ${isDarkMode ? 'dark' : ''} ${!text.trim() ? 'disabled' : ''}`}
        >
          <Send className="button-icon" />
          <span>Analyze Text</span>
          <div className="button-glow"></div>
        </button>
      </div>
    </div>
  );
};

export default TextInput;