import React, { useRef, useState } from 'react';
import { ImageIcon, Upload, Check } from 'lucide-react';
import './ImageInput.css';

const ImageInput = ({ isDarkMode, onImageUpload }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
      setIsUploaded(true);
      setTimeout(() => setIsUploaded(false), 2000);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
      setIsUploaded(true);
      setTimeout(() => setIsUploaded(false), 2000);
    }
  };

  return (
    <div className={`image-input-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="input-header">
        <div className="icon-wrapper">
          <ImageIcon className={`icon ${isDarkMode ? 'dark' : ''}`} />
          <div className="icon-glow"></div>
        </div>
        <div className="title-section">
          <h3 className="input-title">Upload Image</h3>
          <span className="input-subtitle">Drag & drop or click to browse</span>
        </div>
      </div>
      
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`dropzone ${isDarkMode ? 'dark' : ''} ${isDragOver ? 'drag-over' : ''} ${isUploaded ? 'uploaded' : ''}`}
      >
        <div className="upload-content">
          <div className="upload-icon-wrapper">
            {isUploaded ? (
              <Check className={`upload-icon success ${isDarkMode ? 'dark' : ''}`} />
            ) : (
              <Upload className={`upload-icon ${isDarkMode ? 'dark' : ''}`} />
            )}
            <div className="icon-ripple"></div>
          </div>
          
          <div className="upload-text">
            <p className={`dropzone-title ${isDarkMode ? 'dark' : ''}`}>
              {isUploaded ? 'Image uploaded successfully!' : 'Drop your image here'}
            </p>
            <p className={`dropzone-subtitle ${isDarkMode ? 'dark' : ''}`}>
              {isUploaded ? 'Ready to process' : 'PNG, JPG, GIF up to 10MB'}
            </p>
          </div>
        </div>
        
        <div className="upload-overlay"></div>
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