import React from 'react';
import { ShieldAlert, Heart, Lock, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      background: 'rgba(240, 253, 244, 0.95)',
      padding: '3rem 0 2rem 0',
      marginTop: '4rem',
      fontSize: '0.88rem',
      color: 'var(--text-subtle)'
    }}>
      <div className="app-container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Brand column */}
        <div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--deep-forest)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <ShieldAlert size={22} color="var(--primary-emerald)" /> AegisThreat PRO
          </div>
          <p style={{ lineHeight: 1.6, color: 'var(--text-muted)', fontWeight: 500 }}>
            Empowering ordinary citizens with plain-language threat evidence analysis, forensic warnings, and safer digital choices.
          </p>
        </div>

        {/* Emergency Contacts */}
        <div>
          <div style={{ fontWeight: 800, color: 'var(--deep-forest)', marginBottom: '0.75rem' }}>Emergency Cyber Helplines</div>
          <ul style={{ listStyle: 'none', display: 'grid', gap: '0.4rem', color: 'var(--text-muted)' }}>
            <li>National Cyber Crime Helpline: <strong>1930</strong></li>
            <li>FTC Fraud Reporting: <strong>reportfraud.ftc.gov</strong></li>
            <li>Anti-Phishing Working Group: <strong>apwg.org</strong></li>
          </ul>
        </div>

        {/* System Capabilities */}
        <div>
          <div style={{ fontWeight: 800, color: 'var(--deep-forest)', marginBottom: '0.75rem' }}>Inspection Engines</div>
          <ul style={{ listStyle: 'none', display: 'grid', gap: '0.4rem', color: 'var(--text-muted)' }}>
            <li>Domain Typosquatting Resolver</li>
            <li>UPI Reverse PIN Trap Detector</li>
            <li>High-Entropy Urgency NLP Heuristics</li>
            <li>Public Free Email Impersonation Scan</li>
          </ul>
        </div>
      </div>

      <div className="app-container" style={{
        borderTop: '1px solid var(--border-color)',
        paddingTop: '1.5rem',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>© 2026 AegisThreat Platform. Built for Problem Statement 6: Digital Threat Literacy.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Powered by Python Django REST Engine & Vite React
        </div>
      </div>
    </footer>
  );
}
