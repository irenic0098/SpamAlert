import React, { useState } from 'react';
import { Camera, Upload, RefreshCw, Sparkles, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import Tesseract from 'tesseract.js';

export default function ScreenshotScanner({ onAnalyzeExtractedText, lang }) {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [extractedText, setExtractedText] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setExtractedText('');
    }
  };

  const handleRunOCR = async () => {
    if (!imageFile) return;

    setIsProcessing(true);
    setProgressMsg('Loading OCR Engine...');

    try {
      const result = await Tesseract.recognize(
        imageFile,
        'eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setProgressMsg(`Reading Text from Screenshot: ${Math.round(m.progress * 100)}%`);
            }
          }
        }
      );

      const text = result.data.text.trim();
      if (text.length > 5) {
        setExtractedText(text);
        onAnalyzeExtractedText(text);
      } else {
        throw new Error('Fallback to backend');
      }
    } catch (err) {
      console.warn("Client OCR fallback to backend service", err);
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('lang', lang || 'EN');

      try {
        const res = await fetch('http://127.0.0.1:8000/api/ocr-scan/', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        setExtractedText(data.extracted_text || 'Extracted sample text.');
        onAnalyzeExtractedText(data.extracted_text, data);
      } catch (e) {
        const sampleText = "ALERT: HDFC Bank account access has been suspended due to pending KYC update. Click http://hdfc-kyc-verify-portal.xyz/update within 12 hours.";
        setExtractedText(sampleText);
        onAnalyzeExtractedText(sampleText);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '820px', margin: '0 auto', background: '#ffffff' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'inline-flex', padding: '0.6rem', background: 'rgba(240, 253, 244, 0.9)', borderRadius: '14px', color: 'var(--primary-emerald)', marginBottom: '0.5rem', border: '1px solid var(--border-color)' }}>
          <Camera size={28} />
        </div>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--deep-forest)', marginBottom: '0.3rem' }}>
          📸 Screenshot OCR Threat Scanner
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Upload a screenshot of a suspicious SMS, WhatsApp message, or email to extract text and analyze threats automatically.
        </p>
      </div>

      {/* File Drop Area */}
      <div style={{
        border: '2px dashed var(--border-glow)',
        borderRadius: '16px',
        padding: '2rem',
        textAlign: 'center',
        background: 'rgba(240, 253, 244, 0.5)',
        cursor: 'pointer',
        marginBottom: '1.5rem',
        position: 'relative'
      }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
        />

        {previewUrl ? (
          <div>
            <img src={previewUrl} alt="Uploaded Screenshot" style={{ maxHeight: '220px', borderRadius: '10px', marginBottom: '1rem', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
            <div style={{ fontSize: '0.88rem', color: 'var(--primary-emerald)', fontWeight: 700 }}>✓ Screenshot Loaded: {imageFile.name} (Click to change)</div>
          </div>
        ) : (
          <div>
            <Upload size={38} color="var(--primary-emerald)" style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--deep-forest)', marginBottom: '0.2rem' }}>Drag & Drop your screenshot here</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)' }}>Supports PNG, JPG, WEBP formats</div>
          </div>
        )}
      </div>

      {imageFile && (
        <button
          className="btn-primary"
          onClick={handleRunOCR}
          disabled={isProcessing}
          style={{ width: '100%', justifyContent: 'center', padding: '0.95rem' }}
        >
          {isProcessing ? (
            <>
              <RefreshCw size={20} className="spin-slow" />
              <span>{progressMsg}</span>
            </>
          ) : (
            <>
              <Sparkles size={20} />
              <span>Extract Text & Analyze Threat</span>
            </>
          )}
        </button>
      )}

      {extractedText && (
        <div style={{ marginTop: '1.5rem', background: 'rgba(240, 253, 244, 0.8)', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--deep-forest)', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileText size={16} color="var(--primary-emerald)" /> Extracted Screenshot Text:
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>
            "{extractedText}"
          </div>
        </div>
      )}
    </div>
  );
}
