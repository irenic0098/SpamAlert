import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Info, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

export default function RiskDashboard({ result, lang }) {
  if (!result) return null;

  const getMeterColor = (level) => {
    switch (level) {
      case 'Very High': return '#dc2626';
      case 'High': return '#ea580c';
      case 'Medium': return '#d97706';
      default: return '#059669';
    }
  };

  const getMeterWidth = (level) => {
    switch (level) {
      case 'Very High': return '95%';
      case 'High': return '75%';
      case 'Medium': return '45%';
      default: return '15%';
    }
  };

  const sub = result.sub_factors || {
    urgency: { level: 'High', color: '#ea580c' },
    suspicious_link: { level: 'Very High', color: '#dc2626' },
    sensitive_request: { level: 'High', color: '#ea580c' },
    sender: { level: 'Medium', color: '#d97706' }
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      
      {/* Risk Score & Sub-Factor Dashboard Card */}
      <div className="glass-card" style={{
        padding: '2rem',
        marginBottom: '2rem',
        background: '#ffffff',
        border: `1.5px solid ${result.risk_score >= 70 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(5, 150, 105, 0.3)'}`
      }}>
        <div className="grid-responsive-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', alignItems: 'center' }}>
          
          {/* Overall Score Circle/Gauge */}
          <div style={{
            textAlign: 'center',
            padding: '1.5rem',
            background: 'rgba(240, 253, 244, 0.8)',
            borderRadius: '20px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.5rem' }}>
              📊 Overall Threat Risk Assessment
            </div>
            
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              lineHeight: 1,
              color: result.risk_score >= 70 ? '#dc2626' : result.risk_score >= 35 ? '#d97706' : '#059669'
            }}>
              {result.risk_score}<span style={{ fontSize: '1.5rem', opacity: 0.6 }}>/100</span>
            </div>

            <div style={{ margin: '0.85rem 0' }}>
              <span className={`badge ${result.risk_level === 'HIGH' ? 'badge-critical' : result.risk_level === 'MEDIUM' ? 'badge-caution' : 'badge-safe'}`}>
                {result.risk_level === 'HIGH' ? '⚠️ High Risk Threat' : result.risk_level === 'MEDIUM' ? '⚡ Caution / Medium Risk' : '✅ Low Risk / Safe'}
              </span>
            </div>

            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 500 }}>
              {result.summary}
            </div>
          </div>

          {/* Individual Factor Breakdown Meters */}
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--deep-forest)', marginBottom: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="var(--primary-emerald)" /> Risk Factor Breakdown Dashboard
            </h3>

            <div style={{ display: 'grid', gap: '0.95rem' }}>
              
              {/* Urgency Factor */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.3rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Urgency & Pressure</span>
                  <span style={{ fontWeight: 800, color: getMeterColor(sub.urgency.level) }}>{sub.urgency.level}</span>
                </div>
                <div style={{ height: '9px', background: '#e5e7eb', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: getMeterWidth(sub.urgency.level), background: getMeterColor(sub.urgency.level), transition: 'width 0.8s ease' }} />
                </div>
              </div>

              {/* Suspicious Link Factor */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.3rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Suspicious Link & Domain</span>
                  <span style={{ fontWeight: 800, color: getMeterColor(sub.suspicious_link.level) }}>{sub.suspicious_link.level}</span>
                </div>
                <div style={{ height: '9px', background: '#e5e7eb', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: getMeterWidth(sub.suspicious_link.level), background: getMeterColor(sub.suspicious_link.level), transition: 'width 0.8s ease' }} />
                </div>
              </div>

              {/* Sensitive Request Factor */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.3rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Sensitive Request (OTP / PIN / Password)</span>
                  <span style={{ fontWeight: 800, color: getMeterColor(sub.sensitive_request.level) }}>{sub.sensitive_request.level}</span>
                </div>
                <div style={{ height: '9px', background: '#e5e7eb', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: getMeterWidth(sub.sensitive_request.level), background: getMeterColor(sub.sensitive_request.level), transition: 'width 0.8s ease' }} />
                </div>
              </div>

              {/* Sender Reputation Factor */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.3rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Sender Identity & Domain</span>
                  <span style={{ fontWeight: 800, color: getMeterColor(sub.sender.level) }}>{sub.sender.level}</span>
                </div>
                <div style={{ height: '9px', background: '#e5e7eb', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: getMeterWidth(sub.sender.level), background: getMeterColor(sub.sender.level), transition: 'width 0.8s ease' }} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Explainable AI "Why?" Section */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', background: '#ffffff' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={22} /> 🤖 AI Explanation: Why is this dangerous?
        </h3>
        
        <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem' }}>
          {result.why_reasons && result.why_reasons.map((reason, idx) => (
            <li key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.85rem 1.1rem',
              background: 'rgba(254, 242, 242, 0.9)',
              borderLeft: '4px solid #dc2626',
              borderRadius: '0 10px 10px 0',
              fontSize: '0.94rem',
              color: '#991b1b',
              fontWeight: 600
            }}>
              <span style={{ color: '#dc2626', fontWeight: 800 }}>⚠️</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Action Checklist */}
      <div className="glass-card" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.95), #ffffff)', border: '1px solid rgba(5, 150, 105, 0.3)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#047857', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={22} color="#059669" /> 🛡️ Recommended Safe Actions
        </h3>
        
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {result.recommended_actions && result.recommended_actions.map((act, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: '#ffffff',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '10px',
              fontSize: '0.94rem',
              fontWeight: 500,
              color: 'var(--text-main)'
            }}>
              <span style={{ color: '#059669', fontWeight: 800 }}>✅</span>
              <span>{act}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
