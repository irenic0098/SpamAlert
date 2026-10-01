import React from 'react';
import { ShieldAlert, Cpu, Sparkles, BookOpen, Search, ShieldCheck, Camera, Globe2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, lang, setLang }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(240, 253, 244, 0.92)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: '0 4px 20px rgba(5, 150, 105, 0.05)'
    }}>
      <div className="app-container navbar-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px',
        gap: '0.75rem'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveTab('inspector')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #059669, #10b981)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(5, 150, 105, 0.35)',
            flexShrink: 0
          }}>
            <ShieldAlert size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--deep-forest)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              Aegis<span style={{ color: 'var(--primary-emerald)' }}>Threat</span>
              <span style={{
                fontSize: '0.62rem',
                background: 'rgba(5, 150, 105, 0.12)',
                color: 'var(--primary-emerald)',
                padding: '0.15rem 0.4rem',
                borderRadius: '6px',
                border: '1px solid rgba(5, 150, 105, 0.3)',
                fontWeight: 800
              }}>PRO</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontWeight: 600 }}>Digital Threat Inspector & AI</div>
          </div>
        </div>

        {/* Responsive Navigation Bar */}
        <nav className="navbar-nav scroll-tabs" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          background: 'rgba(220, 252, 231, 0.7)',
          padding: '0.3rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)'
        }}>
          <button className={`tab-btn ${activeTab === 'inspector' ? 'active' : ''}`} onClick={() => setActiveTab('inspector')}>
            <Search size={15} /> Inspector
          </button>
          <button className={`tab-btn ${activeTab === 'scratchpad' ? 'active' : ''}`} onClick={() => setActiveTab('scratchpad')}>
            <Sliders size={15} /> Scratchpad Demo
          </button>
          <button className={`tab-btn ${activeTab === 'ocr' ? 'active' : ''}`} onClick={() => setActiveTab('ocr')}>
            <Camera size={15} /> OCR Scan
          </button>
          <button className={`tab-btn ${activeTab === 'library' ? 'active' : ''}`} onClick={() => setActiveTab('library')}>
            <BookOpen size={15} /> Library
          </button>
          <button className={`tab-btn ${activeTab === 'simulator' ? 'active' : ''}`} onClick={() => setActiveTab('simulator')}>
            <Cpu size={15} /> Simulator
          </button>
          <button className={`tab-btn ${activeTab === 'directory' ? 'active' : ''}`} onClick={() => setActiveTab('directory')}>
            <ShieldCheck size={15} /> Database
          </button>
        </nav>

        {/* Multilingual Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          <Globe2 size={17} color="var(--primary-emerald)" />
          <select
            className="form-input"
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem', width: 'auto', background: '#ffffff', borderColor: 'var(--border-color)', fontWeight: 600 }}
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="EN">🌐 English</option>
            <option value="HI">🇮🇳 हिंदी (Hindi)</option>
            <option value="HINGLISH">💬 Hinglish</option>
          </select>
        </div>
      </div>
    </header>
  );
}
