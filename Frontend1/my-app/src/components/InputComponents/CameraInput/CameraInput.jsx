import React, { useRef, useState, useEffect } from 'react';
import { Camera, Zap, StopCircle, Aperture, Flashlight } from 'lucide-react';
import './CameraInput.css';

const CameraInput = ({ isDarkMode, onCameraCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [hasFlash, setHasFlash] = useState(false);

  useEffect(() => {
    // Check if device supports flash
    if (navigator.mediaDevices && navigator.mediaDevices.getSupportedConstraints) {
      const supports = navigator.mediaDevices.getSupportedConstraints();
      setHasFlash(supports.torch || supports.flashlight);
    }
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
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

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsCapturing(true);
    
    // Countdown animation
    for (let i = 3; i > 0; i--) {
      setCountdown(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    setCountdown(0);

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      onCameraCapture(blob);
      setIsCapturing(false);
      stopCamera();
    }, 'image/jpeg', 0.9);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsRecording(false);
    setIsCapturing(false);
    setCountdown(0);
  };

  const toggleFlash = async () => {
    if (stream && hasFlash) {
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      if (capabilities.torch) {
        await track.applyConstraints({
          advanced: [{ torch: !track.getSettings().torch }]
        });
      }
    }
  };

  return (
    <div className={`camera-input-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Animated background elements */}
      <div className="bg-decoration">
        <div className="bg-pulse pulse-1"></div>
        <div className="bg-pulse pulse-2"></div>
        <div className="bg-scan-line"></div>
      </div>
      
      <div className="input-header">
        <div className="icon-wrapper">
          <Camera className={`icon ${isDarkMode ? 'dark' : ''}`} />
          <Zap className={`flash-icon ${isDarkMode ? 'dark' : ''} ${isRecording ? 'active' : ''}`} />
        </div>
        <div className="title-section">
          <h3 className="input-title">Smart Camera</h3>
          <p className="input-subtitle">Capture and analyze text from real world</p>
        </div>
      </div>
      
      <div className="camera-content">
        {isRecording ? (
          <div className="camera-active">
            <div className="camera-wrapper">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="camera-view"
              />
              
              {/* Camera overlay UI */}
              <div className="camera-overlay">
                <div className="viewfinder">
                  <div className="corner corner-tl"></div>
                  <div className="corner corner-tr"></div>
                  <div className="corner corner-bl"></div>
                  <div className="corner corner-br"></div>
                </div>
                
                {countdown > 0 && (
                  <div className="countdown">
                    <span className="countdown-number">{countdown}</span>
                  </div>
                )}
                
                {isCapturing && countdown === 0 && (
                  <div className="flash-effect"></div>
                )}
              </div>
            </div>
            
            <div className="camera-controls">
              <div className="camera-buttons">
                {hasFlash && (
                  <button
                    onClick={toggleFlash}
                    className={`flash-button ${isDarkMode ? 'dark' : ''}`}
                    title="Toggle Flash"
                  >
                    <Flashlight className="button-icon" />
                  </button>
                )}
                
                <button
                  onClick={capturePhoto}
                  disabled={isCapturing}
                  className={`capture-button ${isDarkMode ? 'dark' : ''} ${isCapturing ? 'capturing' : ''}`}
                >
                  <Aperture className={`button-icon ${isCapturing ? 'spinning' : ''}`} />
                  <span>{isCapturing ? 'Capturing...' : 'Capture'}</span>
                  <div className="button-ring"></div>
                </button>
                
                <button
                  onClick={stopCamera}
                  className={`stop-button ${isDarkMode ? 'dark' : ''}`}
                  title="Stop Camera"
                >
                  <StopCircle className="button-icon" />
                </button>
              </div>
              
              <div className="camera-info">
                <div className={`status-indicator ${isDarkMode ? 'dark' : ''}`}>
                  <div className="status-dot"></div>
                  <span>Camera Active</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={startCamera}
            className={`camera-inactive ${isDarkMode ? 'dark' : ''}`}
          >
            <div className="activation-area">
              <div className="camera-icon-wrapper">
                <Camera className={`camera-icon ${isDarkMode ? 'dark' : ''}`} />
                <div className="icon-glow"></div>
              </div>
              
              <div className="activation-content">
                <h4 className={`camera-title ${isDarkMode ? 'dark' : ''}`}>
                  Activate Camera
                </h4>
                <p className={`camera-subtitle ${isDarkMode ? 'dark' : ''}`}>
                  Click to start capturing text from your surroundings
                </p>
                <div className={`feature-list ${isDarkMode ? 'dark' : ''}`}>
                  <span className="feature">• High Quality Capture</span>
                  <span className="feature">• Auto Text Detection</span>
                  <span className="feature">• Real-time Processing</span>
                </div>
              </div>
              
              <div className="activation-button">
                <span>Tap to Start</span>
                <div className="button-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraInput;