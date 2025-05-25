import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import './CameraInput.css';

const CameraInput = ({ isDarkMode, onCameraCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        onCameraCapture(blob);
        stopCamera();
      }, 'image/jpeg', 0.8);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsRecording(false);
  };

  return (
    <div className={`camera-input-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="input-header">
        <Camera className={`icon ${isDarkMode ? 'dark' : ''}`} />
        <h3 className="input-title">Camera Capture</h3>
      </div>
      
      <div className="camera-content">
        {isRecording ? (
          <div className="camera-active">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="camera-view"
            />
            <div className="camera-buttons">
              <button
                onClick={capturePhoto}
                className={`capture-button ${isDarkMode ? 'dark' : ''}`}
              >
                Capture Photo
              </button>
              <button
                onClick={stopCamera}
                className={`stop-button ${isDarkMode ? 'dark' : ''}`}
              >
                Stop
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={startCamera}
            className={`camera-inactive ${isDarkMode ? 'dark' : ''}`}
          >
            <Camera className={`camera-icon ${isDarkMode ? 'dark' : ''}`} />
            <p className={`camera-title ${isDarkMode ? 'dark' : ''}`}>
              Click to open camera
            </p>
            <p className={`camera-subtitle ${isDarkMode ? 'dark' : ''}`}>
              Capture text from real world
            </p>
          </div>
        )}
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraInput;