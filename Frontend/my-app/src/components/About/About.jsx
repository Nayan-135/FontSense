import React from 'react';
import './About.css';

const About = ({ darkMode }) => {
  return (
    <section className={`about-section ${darkMode ? 'dark' : 'light'}`}>
      <h2>About FontFinder</h2>
      <div className="about-content">
        <p>
          FontFinder is a powerful tool that helps you identify fonts from images, 
          text, or directly from your camera. Whether you're a designer, developer, 
          or just curious about a font you've seen, our tool makes it easy to discover 
          the perfect typeface.
        </p>
        <h3>How It Works</h3>
        <ol>
          <li>Upload an image containing the text with the font you want to identify</li>
          <li>Or type some text to see font suggestions</li>
          <li>Or use your camera to capture text in real-time</li>
          <li>Our advanced algorithm will analyze the text and provide matching fonts</li>
        </ol>
        <h3>Features</h3>
        <ul>
          <li>Supports multiple input methods</li>
          <li>Extensive font database</li>
          <li>Fast and accurate results</li>
          <li>Day/Night mode for comfortable use</li>
        </ul>
      </div>
    </section>
  );
};

export default About;