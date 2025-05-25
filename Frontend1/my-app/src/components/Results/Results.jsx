import React from 'react';
import { AlertCircle } from 'lucide-react';
import './Results.css';

const Results = ({ isDarkMode, result, hasInput }) => {
  if (!hasInput) {
    return (
      <div className={`results-empty ${isDarkMode ? 'dark' : ''}`}>
        <AlertCircle className="empty-icon" />
        <h3 className="empty-title">No Input Detected</h3>
        <p className="empty-message">
          Please upload an image, capture a photo, or enter text to analyze fonts.
        </p>
      </div>
    );
  }

  return (
    <div className={`results-container ${isDarkMode ? 'dark' : ''}`}>
      <h3 className="results-title">Font Analysis Results</h3>
      
      <div className="input-preview">
        <h4 className="preview-title">Detected Input:</h4>
        <p className="preview-content">{result}</p>
      </div>
      
      <div className="matches-grid">
        <div className="match-card primary">
          <h5 className="match-title">Primary Match</h5>
          <p className="match-font">Helvetica Neue</p>
          <p className="match-confidence">95% confidence</p>
        </div>
        
        <div className="match-card secondary">
          <h5 className="match-title">Alternative Match</h5>
          <p className="match-font">Arial</p>
          <p className="match-confidence">87% confidence</p>
        </div>
      </div>
    </div>
  );
};

export default Results;