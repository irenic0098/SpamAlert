import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ThreatAnalyzer from './components/ThreatAnalyzer';
import ScreenshotScanner from './components/ScreenshotScanner';
import LearnWhyLibrary from './components/LearnWhyLibrary';
import InteractiveSimulator from './components/InteractiveSimulator';
import ThreatScratchpad from './components/ThreatScratchpad';
import ThreatDirectory from './components/ThreatDirectory';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('inspector');
  const [lang, setLang] = useState('EN');
  const [stats, setStats] = useState(null);
  const [ocrText, setOcrText] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/stats/');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.warn("Using fallback stats", e);
    }
  };

  const handleStartScan = () => {
    setActiveTab('inspector');
    setTimeout(() => {
      const el = document.getElementById('inspector-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOcrExtracted = (extractedText) => {
    setOcrText(extractedText);
    setActiveTab('inspector');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} setLang={setLang} />

      <main style={{ flex: 1 }}>
        <div className="app-container">
          
          {/* Hero Section */}
          <HeroSection
            onStartScan={handleStartScan}
            onOpenScratchpad={() => setActiveTab('scratchpad')}
            onTryLab={() => setActiveTab('simulator')}
            stats={stats}
          />

          {/* Tab Views */}
          {activeTab === 'inspector' && (
            <ThreatAnalyzer lang={lang} initialContent={ocrText} />
          )}

          {activeTab === 'scratchpad' && (
            <ThreatScratchpad lang={lang} />
          )}

          {activeTab === 'ocr' && (
            <ScreenshotScanner onAnalyzeExtractedText={handleOcrExtracted} lang={lang} />
          )}

          {activeTab === 'library' && (
            <LearnWhyLibrary />
          )}

          {activeTab === 'simulator' && (
            <InteractiveSimulator />
          )}

          {activeTab === 'directory' && (
            <ThreatDirectory />
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
