import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Sparkles, Copy, Download, Star, TrendingUp, Zap } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './Results.css';

const Result = ({ isDarkMode, result, hasInput, uploadedImage }) => {
  const [animateIn, setAnimateIn] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (hasInput) {
      setAnimateIn(true);
    }
  }, [hasInput]);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const generatePDF = async () => {
    if (!window.confirm('Do you want to download the results as PDF?')) {
      return;
    }

    setIsGeneratingPDF(true);
    
    try {
      const doc = new jsPDF('p', 'pt', 'a4');
      const margin = 40;
      let yPosition = margin;

      // Add title and metadata
      doc.setProperties({
        title: 'Font Analysis Report',
        creator: 'Font Finder AI'
      });

      // Add title
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text('Font Analysis Report', margin, yPosition);
      yPosition += 30;

      // Add date
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
      yPosition += 30;

      // Add uploaded image if available
      if (uploadedImage) {
        doc.setFontSize(12);
        doc.text('Uploaded Image:', margin, yPosition);
        yPosition += 20;

        const imgProps = await addImageToPDF(doc, uploadedImage, margin, yPosition, 200);
        yPosition += imgProps.height + 30;
      }

      // Add input text
      doc.setFontSize(14);
      doc.text('Detected Text:', margin, yPosition);
      yPosition += 20;
      
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(result || 'No text detected', doc.internal.pageSize.width - margin * 2);
      doc.text(splitText, margin, yPosition);
      yPosition += splitText.length * 15 + 30;

      // Add font matches section
      doc.setFontSize(16);
      doc.text('Font Matches:', margin, yPosition);
      yPosition += 30;

      // Create a canvas of the matches section
      const matchesElement = document.querySelector('.matches-grid');
      if (matchesElement) {
        const canvas = await html2canvas(matchesElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = doc.internal.pageSize.width - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Add new page if needed
        if (yPosition + imgHeight > doc.internal.pageSize.height - margin) {
          doc.addPage();
          yPosition = margin;
        }
        
        doc.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
      }

      doc.save('font-analysis-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const addImageToPDF = async (doc, imageSrc, x, y, maxWidth) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageSrc;
      img.onload = () => {
        const ratio = maxWidth / img.width;
        const height = img.height * ratio;
        doc.addImage(img, 'JPEG', x, y, maxWidth, height);
        resolve({ width: maxWidth, height });
      };
      img.onerror = () => {
        console.error('Failed to load image for PDF');
        doc.text('Failed to load uploaded image', x, y);
        resolve({ width: 0, height: 0 });
      };
    });
  };

  const mockFontMatches = [
    {
      name: 'Helvetica Neue',
      confidence: 95,
      category: 'Sans-serif',
      popularity: 'Very High',
      tags: ['Modern', 'Clean', 'Professional'],
      isPrimary: true
    },
    {
      name: 'Arial',
      confidence: 87,
      category: 'Sans-serif',
      popularity: 'High',
      tags: ['Universal', 'Readable', 'Classic'],
      isPrimary: false
    },
    {
      name: 'Inter',
      confidence: 82,
      category: 'Sans-serif',
      popularity: 'Rising',
      tags: ['Modern', 'UI', 'Digital'],
      isPrimary: false
    }
  ];

  if (!hasInput) {
    return (
      <div className={`results-empty ${isDarkMode ? 'dark' : ''}`}>
        <div className="empty-content">
          <div className="empty-icon-wrapper">
            <AlertCircle className="empty-icon" />
            <div className="icon-pulse"></div>
          </div>
          <div className="empty-text">
            <h3 className="empty-title">Ready to Analyze</h3>
            <p className="empty-message">
              Upload an image, capture a photo, or enter text to discover font matches with AI-powered precision.
            </p>
          </div>
          <div className="empty-features">
            <div className="feature-item">
              <Sparkles className="feature-icon" />
              <span>AI-Powered Detection</span>
            </div>
            <div className="feature-item">
              <TrendingUp className="feature-icon" />
              <span>95%+ Accuracy</span>
            </div>
            <div className="feature-item">
              <Zap className="feature-icon" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`results-container ${isDarkMode ? 'dark' : ''} ${animateIn ? 'animate-in' : ''}`}
      ref={resultsRef}
    >
      <div className="results-header">
        <div className="title-section">
          <Sparkles className="results-icon" />
          <div>
            <h3 className="results-title">Font Analysis Complete</h3>
            <p className="results-subtitle">AI-powered font identification results</p>
          </div>
        </div>
        <div className="results-actions">
          <button 
            className={`action-btn download ${isGeneratingPDF ? 'loading' : ''}`}
            onClick={generatePDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              'Generating...'
            ) : (
              <>
                <Download size={16} />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="input-preview">
        <div className="preview-header">
          <h4 className="preview-title">Detected Input</h4>
          <div className="preview-badge">Analyzed</div>
        </div>
        <div className="preview-content-wrapper">
          <p className="preview-content">{result}</p>
          <button 
            onClick={() => handleCopy(result, 'input')}
            className={`copy-btn ${copiedIndex === 'input' ? 'copied' : ''}`}
          >
            <Copy size={16} />
          </button>
        </div>
      </div>
      
      <div className="matches-section">
        <div className="section-header">
          <h4 className="section-title">Font Matches</h4>
          <div className="match-count">{mockFontMatches.length} matches found</div>
        </div>
        
        <div className="matches-grid">
          {mockFontMatches.map((match, index) => (
            <div 
              key={index}
              className={`match-card ${match.isPrimary ? 'primary' : 'secondary'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="match-header">
                <div className="match-rank">
                  {match.isPrimary && <Star className="star-icon" />}
                  <span className="rank-number">#{index + 1}</span>
                </div>
                <button 
                  onClick={() => handleCopy(match.name, index)}
                  className={`copy-btn ${copiedIndex === index ? 'copied' : ''}`}
                >
                  <Copy size={14} />
                </button>
              </div>
              
              <div className="match-content">
                <h5 className="match-font">{match.name}</h5>
                <div className="match-meta">
                  <span className="match-category">{match.category}</span>
                  <span className="match-popularity">{match.popularity}</span>
                </div>
              </div>
              
              <div className="confidence-section">
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill"
                    style={{ width: `${match.confidence}%` }}
                  ></div>
                </div>
                <span className="confidence-text">{match.confidence}% match</span>
              </div>
              
              <div className="match-tags">
                {match.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
              
              <div className="match-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;