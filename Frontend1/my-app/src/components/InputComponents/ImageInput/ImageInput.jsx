import React, { useRef } from 'react';
import { ImageIcon, Upload } from 'lucide-react';
import './ImageInput.css';

const ImageInput = ({ isDarkMode, onImageUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  return (
    <div className={`image-input-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="input-header">
        <ImageIcon className={`icon ${isDarkMode ? 'dark' : ''}`} />
        <h3 className="input-title">Image Upload</h3>
      </div>
      
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`dropzone ${isDarkMode ? 'dark' : ''}`}
      >
        <Upload className={`upload-icon ${isDarkMode ? 'dark' : ''}`} />
        <p className={`dropzone-title ${isDarkMode ? 'dark' : ''}`}>
          Click to upload an image
        </p>
        <p className={`dropzone-subtitle ${isDarkMode ? 'dark' : ''}`}>
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="file-input"
      />
    </div>
  );
};

export default ImageInput;