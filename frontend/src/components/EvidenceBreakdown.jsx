import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, ClockAlert, 
  Gift, KeyRound, Globe, Link, Mail, CreditCard, CheckCircle2, 
  FileText, ArrowLeft, Download, Info, Sparkles, HelpCircle
} from 'lucide-react';

export default function EvidenceBreakdown({ result, onReset }) {
  if (!result) return null;

  const [showTechnical, setShowTechnical] = useState(false);

  const getSeverityStyle = (level) => {
    switch (level) {
      case 'CRITICAL':
      case 'HIGH':
        return { color: '#dc2626', badge: 'badge-critical', bg: 'rgba(254, 242, 242, 0.9)', border: 'rgba(239, 68, 68, 0.3)', label: 'Critical / High Threat' };
      case 'MEDIUM':
      case 'CAUTION':
        return { color: '#d97706', badge: 'badge-caution', bg: 'rgba(254, 243, 199, 0.9)', border: 'rgba(245, 158, 11, 0.3)', label: 'Caution / Medium Risk' };
      default:
        return { color: '#059669', badge: 'badge-safe', bg: 'rgba(240, 253, 244, 0.9)', border: 'rgba(16, 185, 129, 0.3)', label: 'Safe / Low Risk' };
    }
  };

  const severityInfo = getSeverityStyle(result.risk_level);

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'ClockAlert': return <ClockAlert size={20} color="#d97706" />;
      case 'Gift': return <Gift size={20} color="#059669" />;
      case 'KeyRound': return <KeyRound size={20} color="#dc2626" />;
      case 'Globe': return <Globe size={20} color="#0284c7" />;
      case 'Link': return <Link size={20} color="#2563eb" />;
      case 'Mail': return <Mail size={20} color="#ea580c" />;
      case 'CreditCard': return <CreditCard size={20} color="#dc2626" />;
      default: return <ShieldAlert size={20} color="#059669" />;
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Actions Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button className="btn-secondary" onClick={onReset}>
          <ArrowLeft size={16} /> Examine Another Message
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={() => setShowTechnical(!showTechnical)} style={{ fontSize: '0.85rem' }}>
            <Info size={16} /> {showTechnical ? "Simple View" : "Show Technical Forensics"}
          </button>
          <button className="btn-secondary" onClick={() => window.print()} style={{ fontSize: '0.85rem' }}>
            <Download size={16} /> Print Report
          </button>
        </div>
      </div>

      {/* Forensic Evidence Breakdown */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--deep-forest)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert color="var(--primary-emerald)" size={22} />
          Detailed Evidence Breakdown ({result.red_flag_count} Flags Found)
        </h3>

        {result.evidence.length === 0 ? (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', background: '#ffffff', color: 'var(--text-muted)' }}>
            <ShieldCheck size={36} color="#059669" style={{ marginBottom: '0.5rem' }} />
            <div>No active threat signatures or suspicious indicators detected in this content.</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {result.evidence.map((item, index) => (
              <div key={item.id || index} className="glass-card" style={{
                padding: '1.6rem',
                background: '#ffffff',
                borderLeft: `5px solid ${item.severity === 'CRITICAL' ? '#dc2626' : item.severity === 'HIGH' ? '#ea580c' : '#d97706'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      padding: '0.5rem',
                      borderRadius: '10px',
                      background: 'rgba(240, 253, 244, 0.9)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {renderIcon(item.icon)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--deep-forest)' }}>{item.title}</h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 600 }}>Category: {item.category}</span>
                    </div>
                  </div>

                  <span className={`badge ${item.severity === 'CRITICAL' ? 'badge-critical' : item.severity === 'HIGH' ? 'badge-high' : 'badge-caution'}`}>
                    {item.severity}
                  </span>
                </div>

                {/* Highlighted Snippet */}
                {item.matched_snippet && (
                  <div style={{
                    background: 'rgba(254, 242, 242, 0.8)',
                    border: '1px border-dashed rgba(239, 68, 68, 0.3)',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: '#b91c1c',
                    fontWeight: 600,
                    marginBottom: '0.85rem',
                    wordBreak: 'break-all'
                  }}>
                    🔍 <strong>Flagged Element:</strong> "{item.matched_snippet}"
                  </div>
                )}

                {/* Plain-English Explanation */}
                <div style={{
                  background: 'rgba(240, 253, 244, 0.85)',
                  borderLeft: '3.5px solid var(--primary-emerald)',
                  padding: '0.85rem 1rem',
                  borderRadius: '0 10px 10px 0',
                  fontSize: '0.94rem',
                  lineHeight: 1.6,
                  color: 'var(--text-main)',
                  fontWeight: 500
                }}>
                  <strong style={{ color: 'var(--deep-forest)', display: 'block', marginBottom: '0.2rem' }}>
                    💡 Plain-English Rationale:
                  </strong>
                  {item.plain_language_explanation}
                </div>

                {/* Technical Forensics Detail */}
                {showTechnical && (
                  <div style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    marginTop: '0.75rem'
                  }}>
                    ⚙️ <strong>Technical Forensic Signal:</strong> {item.technical_detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
