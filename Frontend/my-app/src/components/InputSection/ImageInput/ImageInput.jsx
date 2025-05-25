import React, { useRef, useState } from 'react';
import './ImageInput.css';

const ImageInput = ({ onResult, onError, darkMode }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      // Simulate font recognition from image
      setTimeout(() => {
        onResult({
          type: 'image',
          input: reader.result,
          fonts: [
            { name: 'Helvetica', confidence: 92 },
            { name: 'Arial', confidence: 88 },
            { name: 'San Francisco', confidence: 82 }
          ]
        });
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`input-card ${darkMode ? 'dark' : 'light'}`}>
      <h3>Upload Image</h3>
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <button 
        onClick={triggerFileInput}
        className={`upload-btn ${darkMode ? 'dark' : 'light'}`}
      >
        Choose Image
      </button>
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default ImageInput;