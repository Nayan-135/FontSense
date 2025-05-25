import React from 'react';
import './InputSection.css';
import TextInput from './TextInput/TextInput';
import ImageInput from './ImageInput/ImageInput';
import PhotoCapture from './PhotoCapture/PhotoCapture';

const InputSection = ({ onResult, onError, darkMode }) => {
  return (
    <section className={`input-section ${darkMode ? 'dark' : 'light'}`}>
      <h2>Identify a Font</h2>
      
      <div className="input-methods">
        <TextInput onResult={onResult} onError={onError} darkMode={darkMode} />
        <ImageInput onResult={onResult} onError={onError} darkMode={darkMode} />
        <PhotoCapture onResult={onResult} onError={onError} darkMode={darkMode} />
      </div>
    </section>
  );
};

export default InputSection;