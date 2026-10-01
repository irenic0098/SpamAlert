import React, { useState } from 'react';
import { 
  ShieldAlert, Search, MessageSquare, Globe, CreditCard, 
  Share2, Sparkles, AlertCircle, RefreshCw, Zap, CheckCircle2, Mail, Lock
} from 'lucide-react';
import EvidenceBreakdown from './EvidenceBreakdown';
import RiskDashboard from './RiskDashboard';

export default function ThreatAnalyzer({ lang, initialContent }) {
  const [contentType, setContentType] = useState('EMAIL'); // EMAIL, URL, PAYMENT, SMS, WHATSAPP
  const [content, setContent] = useState(initialContent || '');
  const [sender, setSender] = useState('');
  const [url, setUrl] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Sample presets
  const samplePresets = [
    {
      label: "🔗 Suspicious Link Scanner Demo",
      type: "URL",
      content: "",
      sender: "",
      url: "http://paypal.security-auth-update.xyz/login"
    },
    {
      label: "💬 WhatsApp Urgency Scam",
      type: "SMS",
      content: "URGENT: Your bank account has been suspended! Click http://hdfc-verify.xyz/update within 12 hours or account blocked permanently.",
      sender: "+91-9876543210",
      url: "http://hdfc-verify.xyz/update"
    },
    {
      label: "📧 Phishing Email Scanner Demo",
      type: "EMAIL",
      content: "Your FedEx package delivery failed due to unpaid customs fee of $2.99. Pay immediately to avoid package destruction.",
      sender: "delivery-alert@gmail.com",
      url: "https://fedex-clearance.top/pay"
    },
    {
      label: "💳 Reverse UPI QR Payment Trap",
      type: "PAYMENT",
      content: "Buyer says: 'I am sending your $150 item payment. Scan this QR code and enter your 6-digit UPI PIN to receive money in your bank account.'",
      sender: "Unknown Buyer",
      url: ""
    }
  ];

  const handleApplyPreset = (preset) => {
    setContentType(preset.type);
    setContent(preset.content);
    setSender(preset.sender || '');
    setUrl(preset.url || '');
    setErrorMsg('');
    setAnalysisResult(null);
  };

  const handleRunAnalysis = async (e) => {
    if (e) e.preventDefault();
    
    if (!content.trim() && !url.trim()) {
      setErrorMsg('Please paste suspicious text, an email, message, or a web link to examine.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    setLoadingStep('Evaluating Heuristics & Urgency Signals...');
    await new Promise(r => setTimeout(r, 300));
    
    setLoadingStep('Inspecting Domain Reputation & Punycode...');
    await new Promise(r => setTimeout(r, 300));

    try {
      const response = await fetch('http://127.0.0.1:8000/api/analyze/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content,
          type: contentType,
          sender: sender,
          url: url,
          lang: lang || 'EN'
        })
      });

      if (!response.ok) {
        throw new Error('Analysis server error');
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.warn("Backend API offline, using enhanced local client analyzer", err);
      const localResult = fallbackLocalEngine(content, sender, url, lang);
      setAnalysisResult(localResult);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback local analyzer engine
  const fallbackLocalEngine = (textVal, senderVal, urlVal, language) => {
    const textLower = (textVal + ' ' + urlVal + ' ' + senderVal).toLowerCase();
    const hasUrgency = textLower.includes('suspended') || textLower.includes('12 hours') || textLower.includes('urgent') || textLower.includes('immediately');
    const hasFakeDomain = textLower.includes('.xyz') || textLower.includes('.top') || textLower.includes('kyc');
    const isQRScam = textLower.includes('pin') && textLower.includes('receive');
    const hasOTP = textLower.includes('otp') || textLower.includes('password');

    let score = 10;
    const why = [];

    if (hasUrgency) {
      score += 35;
      why.push("Creates artificial urgency & panic pressure tactics");
    }
    if (hasFakeDomain) {
      score += 40;
      why.push("Link domain uses high-risk extension (.xyz / .top) or spoofed name");
    }
    if (isQRScam) {
      score += 45;
      why.push("Contains reverse UPI payment trap (Scan QR/Enter PIN to receive money)");
    }
    if (hasOTP) {
      score += 30;
      why.push("Requests sensitive authentication credentials (OTP / Password / PIN)");
    }

    score = Math.min(Math.max(score, 5), 100);
    const level = score >= 70 ? 'HIGH' : score >= 35 ? 'MEDIUM' : 'LOW';

    return {
      risk_score: score,
      risk_level: level,
      summary: score >= 60 ? "CRITICAL THREAT: High probability of a scam attempt!" : "Low risk content.",
      why_reasons: why.length > 0 ? why : ["No major suspicious indicators detected."],
      evidence: [],
      sub_factors: {
        urgency: { level: hasUrgency ? 'High' : 'Low', score: hasUrgency ? 80 : 10 },
        suspicious_link: { level: hasFakeDomain ? 'Very High' : 'Low', score: hasFakeDomain ? 90 : 10 },
        sensitive_request: { level: (isQRScam || hasOTP) ? 'Very High' : 'Low', score: (isQRScam || hasOTP) ? 95 : 10 },
        sender: { level: senderVal.includes('gmail') ? 'Medium' : 'Low', score: senderVal.includes('gmail') ? 50 : 10 }
      },
      recommended_actions: [
        "Do NOT click any unknown links or download attachments.",
        "Do NOT share your OTP, PIN, password, or banking credentials.",
        "Verify the message through the organization's official website or app.",
        "Block and report the sender on your device."
      ]
    };
  };

  return (
    <div id="inspector-section" style={{ paddingBottom: '3rem' }}>
      
      {/* Explicit Safety Banner */}
      <div style={{
        background: 'rgba(5, 150, 105, 0.1)',
        border: '1px solid rgba(5, 150, 105, 0.25)',
        padding: '0.85rem 1.25rem',
        borderRadius: '14px',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        fontSize: '0.9rem',
        color: 'var(--deep-forest)',
        fontWeight: 600,
        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.05)'
      }}>
        <Lock size={18} color="var(--primary-emerald)" />
        <span>
          <strong>Strict Safety Protocol:</strong> AegisThreat will NEVER ask you to enter your actual passwords, OTPs, PINs, or credit card numbers.
        </span>
      </div>

      {!analysisResult ? (
        <div className="glass-card glass-card-glow" style={{ padding: '2.5rem', maxWidth: '920px', margin: '0 auto', background: '#ffffff' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--deep-forest)', marginBottom: '0.4rem' }}>
              🔍 Digital Content Threat Inspector
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Select a scanner mode below, paste suspicious content, or try a sample demonstration.
            </p>
          </div>

          {/* Quick Presets */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              ⚡ Try Quick Sample Demos:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  style={{
                    background: 'rgba(220, 252, 231, 0.6)',
                    border: '1px solid var(--border-color)',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '10px',
                    color: 'var(--deep-forest)',
                    fontSize: '0.83rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary-emerald)'; e.currentTarget.style.background = 'rgba(220, 252, 231, 0.9)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = 'rgba(220, 252, 231, 0.6)'; }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scanner Mode Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            background: 'rgba(240, 253, 244, 0.9)',
            padding: '0.35rem',
            borderRadius: '14px',
            border: '1px solid var(--border-color)',
            overflowX: 'auto'
          }}>
            <button className={`tab-btn ${contentType === 'URL' ? 'active' : ''}`} onClick={() => setContentType('URL')}>
              <Globe size={16} /> 🔗 Suspicious Link Scanner
            </button>
            <button className={`tab-btn ${contentType === 'SMS' ? 'active' : ''}`} onClick={() => setContentType('SMS')}>
              <MessageSquare size={16} /> 💬 WhatsApp / SMS Analyzer
            </button>
            <button className={`tab-btn ${contentType === 'EMAIL' ? 'active' : ''}`} onClick={() => setContentType('EMAIL')}>
              <Mail size={16} /> 📧 Email Analyzer
            </button>
            <button className={`tab-btn ${contentType === 'PAYMENT' ? 'active' : ''}`} onClick={() => setContentType('PAYMENT')}>
              <CreditCard size={16} /> 💳 Payment Request Checker
            </button>
          </div>

          {errorMsg && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.9rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleRunAnalysis}>
            {/* Sender */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 600 }}>
                Sender Email / Phone Number (Optional)
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. delivery-notice@gmail.com or +91-98765XXXXX"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
            </div>

            {/* Content text */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 600 }}>
                Message Body / Text Content
              </label>
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Paste the suspicious message, WhatsApp forward, email text, or payment instruction..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* URL input */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 600 }}>
                Suspicious Website Link / URL
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. http://paypal.security-auth-update.xyz/login"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: '100%', justifyContent: 'center', padding: '0.95rem' }}>
              {isLoading ? (
                <>
                  <RefreshCw size={20} className="spin-slow" />
                  <span>{loadingStep || 'Analyzing Content...'}</span>
                </>
              ) : (
                <>
                  <Zap size={20} />
                  <span>Examine Threat & Generate Risk Report</span>
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <button className="btn-secondary" onClick={() => setAnalysisResult(null)} style={{ marginBottom: '1.5rem' }}>
            ← Examine Another Suspicious Content
          </button>

          <RiskDashboard result={analysisResult} lang={lang} />
          <EvidenceBreakdown result={analysisResult} onReset={() => setAnalysisResult(null)} />
        </div>
      )}
    </div>
  );
}
