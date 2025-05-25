import React from 'react';
import './ResultSection.css';

const ResultSection = ({ result, error, darkMode }) => {
  if (!result && !error) return null;

  return (
    <section className={`result-section ${darkMode ? 'dark' : 'light'}`}>
      <h2>Results</h2>
      
      {error && (
        <div className={`error-message ${darkMode ? 'dark' : 'light'}`}>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className="result-content">
          {result.type === 'image' || result.type === 'photo' ? (
            <div className="image-result">
              <div className="image-container">
                <img src={result.input} alt="Submitted for analysis" />
              </div>
              <div className="font-results">
                <h3>Detected Fonts</h3>
                <ul>
                  {result.fonts.map((font, index) => (
                    <li key={index}>
                      <span className="font-name">{font.name}</span>
                      <span className="confidence">{font.confidence}% match</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-result">
              <div className="text-sample">
                <h3>Your Text</h3>
                <p>{result.input}</p>
              </div>
              <div className="font-results">
                <h3>Suggested Fonts</h3>
                <ul>
                  {result.fonts.map((font, index) => (
                    <li key={index}>
                      <span className="font-name">{font.name}</span>
                      <span className="confidence">{font.confidence}% match</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ResultSection;