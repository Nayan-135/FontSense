import React, { useRef, useState } from 'react';
import './PhotoCapture.css';

const PhotoCapture = ({ onResult, onError, darkMode }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      onError('Could not access the camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      
      const imageData = canvasRef.current.toDataURL('image/png');
      setImagePreview(imageData);
      stopCamera();
      
      // Simulate font recognition from photo
      setTimeout(() => {
        onResult({
          type: 'photo',
          input: imageData,
          fonts: [
            { name: 'Times New Roman', confidence: 95 },
            { name: 'Georgia', confidence: 87 },
            { name: 'Garamond', confidence: 80 }
          ]
        });
      }, 1500);
    }
  };

  return (
    <div className={`input-card ${darkMode ? 'dark' : 'light'}`}>
      <h3>Capture Photo</h3>
      {!isCameraActive ? (
        <button 
          onClick={startCamera}
          className={`camera-btn ${darkMode ? 'dark' : 'light'}`}
        >
          Open Camera
        </button>
      ) : (
        <div className="camera-container">
          <video ref={videoRef} autoPlay playsInline className="camera-feed"></video>
          <div className="camera-controls">
            <button 
              onClick={capturePhoto}
              className={`capture-btn ${darkMode ? 'dark' : 'light'}`}
            >
              Capture
            </button>
            <button 
              onClick={stopCamera}
              className={`cancel-btn ${darkMode ? 'dark' : 'light'}`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {imagePreview && !isCameraActive && (
        <div className="image-preview">
          <img src={imagePreview} alt="Captured" />
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default PhotoCapture;