import React from 'react';
import { ShieldCheck, Zap, Lock, Sparkles, ArrowRight, Activity } from 'lucide-react';

export default function HeroSection({ onStartScan, onOpenScratchpad, onTryLab, stats }) {
  return (
    <section style={{
      padding: '3.5rem 0 2.5rem 0',
      position: 'relative',
      textAlign: 'center'
    }}>
      {/* Soft Light Mint Glow */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '650px',
        height: '280px',
        background: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.25), transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '880px', margin: '0 auto' }}>
        {/* Top Tagline Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.45rem 1.15rem',
          borderRadius: '9999px',
          background: 'rgba(5, 150, 105, 0.12)',
          border: '1px solid rgba(5, 150, 105, 0.3)',
          color: 'var(--deep-forest)',
          fontSize: '0.88rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          boxShadow: '0 4px 12px rgba(5, 150, 105, 0.1)'
        }}>
          <Sparkles size={16} color="var(--primary-emerald)" />
          <span>Next-Generation Digital Threat Inspector & Evidence AI</span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          color: 'var(--deep-forest)',
          marginBottom: '1.25rem'
        }}>
          Uncover Digital Scams Instantly.<br />
          <span style={{
            background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #047857 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Understand the Evidence Behind Every Warning.
          </span>
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '1.12rem',
          color: 'var(--text-muted)',
          lineHeight: 1.65,
          maxWidth: '740px',
          margin: '0 auto 2rem auto',
          fontWeight: 500
        }}>
          Encountered a suspicious SMS, email, payment QR code, or website link? Paste it below to instantly break down technical red flags into clear, plain-language explanations so you can make confident, safer choices.
        </p>

        {/* Hero Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <button className="btn-primary" onClick={onStartScan}>
            <Zap size={18} /> Examine Suspicious Content
          </button>
          <button className="btn-secondary" onClick={onOpenScratchpad} style={{ background: 'rgba(5, 150, 105, 0.12)', borderColor: 'rgba(5, 150, 105, 0.3)', color: 'var(--deep-forest)' }}>
            <Sparkles size={18} color="var(--primary-emerald)" /> Open Threat Scratchpad Demo
          </button>
          <button className="btn-secondary" onClick={onTryLab}>
            <Activity size={18} /> Test Simulator <ArrowRight size={16} />
          </button>
        </div>

        {/* Metrics Bar */}
        <div className="glass-card" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem',
          padding: '1.25rem 2rem',
          maxWidth: '900px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.9)',
          borderColor: 'var(--border-color)'
        }}>
          <div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary-emerald)' }}>
              {stats?.total_scans_processed ? stats.total_scans_processed.toLocaleString() : '148,920+'}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', fontWeight: 600 }}>Threat Content Scanned</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#047857' }}>
              {stats?.threats_neutralized ? stats.threats_neutralized.toLocaleString() : '134,210+'}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', fontWeight: 600 }}>Scams Caught & Explained</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#059669' }}>
              {stats?.accuracy_rating || '99.4%'}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', fontWeight: 600 }}>Detection Precision</div>
          </div>
        </div>
      </div>
    </section>
  );
}
