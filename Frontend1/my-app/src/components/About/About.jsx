import React from 'react';
import { Upload, Camera, Type } from 'lucide-react';
import './About.css';

const About = ({ isDarkMode }) => {
  return (
    <section className={`about-section ${isDarkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="about-content">
          <h2 className="about-title">Discover Any Font Instantly</h2>
          <p className="about-description">
            Upload an image, capture a photo, or type text to identify fonts using our advanced AI technology. 
            Perfect for designers, developers, and typography enthusiasts who want to identify fonts quickly and accurately.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon bg-blue">
                <Upload className="icon" />
              </div>
              <h3 className="feature-title">Upload Images</h3>
              <p className="feature-text">
                Drag and drop or select images from your device to analyze fonts
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon bg-green">
                <Camera className="icon" />
              </div>
              <h3 className="feature-title">Capture Photos</h3>
              <p className="feature-text">
                Use your camera to capture text and identify fonts in real-time
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon bg-purple">
                <Type className="icon" />
              </div>
              <h3 className="feature-title">Text Analysis</h3>
              <p className="feature-text">
                Type or paste text to get font suggestions and similar matches
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;