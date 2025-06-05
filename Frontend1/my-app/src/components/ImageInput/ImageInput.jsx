import React, { useRef, useState } from 'react';
import { ImageIcon, Upload, Check, AlertCircle, Sparkles } from 'lucide-react';
import './ImageInput.css';

const ImageInput = ({ isDarkMode, onImageUpload }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const scrollToResults = () => {
    const resultsSection = document.querySelector('.results-section') || 
                          document.querySelector('[class*="result"]') ||
                          document.querySelector('.input-section').nextElementSibling;
    
    if (resultsSection) {
      resultsSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const validateFile = (file) => {
    // Check if file is JPG/JPEG or PNG
    const isValidImage = file.type === 'image/jpeg' || 
                        file.type === 'image/jpg' || 
                        file.type === 'image/png';
    const hasValidExtension = file.name.toLowerCase().endsWith('.jpg') || 
                             file.name.toLowerCase().endsWith('.jpeg') || 
                             file.name.toLowerCase().endsWith('.png');
    
    if (!isValidImage && !hasValidExtension) {
      setError('Please upload only JPG/JPEG or PNG images');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    
    return true;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setError('');
      setUploadedFileName(file.name);
      onImageUpload(file);
      setIsUploaded(true);
      
      // Auto-scroll to results after a short delay
      setTimeout(() => {
        scrollToResults();
      }, 800);
      
      // Reset uploaded state after 3 seconds
      setTimeout(() => {
        setIsUploaded(false);
        setUploadedFileName('');
      }, 3000);
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
    if (file && validateFile(file)) {
      setError('');
      setUploadedFileName(file.name);
      onImageUpload(file);
      setIsUploaded(true);
      
      // Auto-scroll to results after a short delay
      setTimeout(() => {
        scrollToResults();
      }, 800);
      
      // Reset uploaded state after 3 seconds
      setTimeout(() => {
        setIsUploaded(false);
        setUploadedFileName('');
      }, 3000);
    }
  };

  return (
    <div className={`image-input-container ${isDarkMode ? 'dark' : ''} ${error ? 'error' : ''}`}>
      <div className="input-header">
        <div className="icon-wrapper">
          <ImageIcon className={`icon ${isDarkMode ? 'dark' : ''}`} />
          <div className="icon-glow"></div>
          <Sparkles className="sparkle-1" />
          <Sparkles className="sparkle-2" />
        </div>
        <div className="title-section">
          <h3 className="input-title">Upload Image</h3>
          <span className="input-subtitle">Drag & drop or click to browse • JPG/PNG formats</span>
        </div>
      </div>
      
      {error && (
        <div className={`error-message ${isDarkMode ? 'dark' : ''}`}>
          <AlertCircle className="error-icon" />
          <span>{error}</span>
        </div>
      )}
      
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`dropzone ${isDarkMode ? 'dark' : ''} ${isDragOver ? 'drag-over' : ''} ${isUploaded ? 'uploaded' : ''} ${error ? 'error' : ''}`}
      >
        <div className="upload-content">
          <div className="upload-icon-wrapper">
            {isUploaded ? (
              <Check className={`upload-icon success ${isDarkMode ? 'dark' : ''}`} />
            ) : error ? (
              <AlertCircle className={`upload-icon error ${isDarkMode ? 'dark' : ''}`} />
            ) : (
              <Upload className={`upload-icon ${isDarkMode ? 'dark' : ''}`} />
            )}
            <div className={`icon-ripple ${isUploaded ? 'success' : ''}`}></div>
          </div>
          
          <div className="upload-text">
            <p className={`dropzone-title ${isDarkMode ? 'dark' : ''}`}>
              {isUploaded ? 'Image uploaded successfully!' : 
               error ? 'Upload failed' :
               'Drop your image here'}
            </p>
            <p className={`dropzone-subtitle ${isDarkMode ? 'dark' : ''}`}>
              {isUploaded ? `${uploadedFileName} • Scrolling to results...` : 
               error ? 'Please try again with a valid JPG/PNG file' :
               'JPG/JPEG/PNG formats • Max 10MB'}
            </p>
          </div>
        </div>
        
        <div className="upload-overlay"></div>
        <div className="magic-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        onChange={handleFileSelect}
        className="file-input"
      />
    </div>
  );
};

export default ImageInput;