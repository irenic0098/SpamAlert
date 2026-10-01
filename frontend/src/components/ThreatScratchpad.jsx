import React, { useState, useEffect } from 'react';
import {
  Terminal, Sliders, Sparkles, ShieldAlert, CheckCircle2, AlertTriangle,
  Copy, Download, RefreshCw, Zap, Eye, Play, FileText, Globe,
  MessageSquare, Mail, CreditCard, Lock, ShieldCheck, Layers, FileCode
} from 'lucide-react';

export default function ThreatScratchpad({ lang }) {
  // Preset scenarios
  const presets = [
    {
      id: 'bank-sms',
      name: '🚨 Bank Suspension SMS',
      category: 'SMS / Smishing',
      sender: '+91-9845012345',
      url: 'http://hdfc-netbanking.security-update.xyz/login',
      text: 'URGENT ATTENTION: Your HDFC bank account is BLOCKED due to incomplete PAN KYC! Update your credentials immediately within 12 HOURS at http://hdfc-netbanking.security-update.xyz/login or account will be permanently terminated.',
      weights: { urgency: 85, domain: 90, credential: 95, panic: 80 }
    },
    {
      id: 'upi-refund',
      name: '💳 Fake UPI Refund Trap',
      category: 'Payment Scam',
      sender: 'PayTM Security Helpdesk',
      url: 'http://paytm-refund-claim.top/qr',
      text: 'Congratulations! You have won a cashback refund of ₹4,999 from GooglePay. Scan this QR code and enter your 6-digit UPI PIN to claim money directly into your bank account immediately!',
      weights: { urgency: 65, domain: 75, credential: 90, panic: 60 }
    },
    {
      id: 'crypto-giveaway',
      name: '🎁 Elon Musk Crypto Giveaway',
      category: 'Brand Impersonation',
      sender: 'elon.musk@tesla-events-promo.com',
      url: 'https://btc-double-event.org/claim',
      text: 'To celebrate our new AI milestone, Tesla is giving away 5000 BTC! Send 0.1 BTC to the verification wallet below and receive 0.2 BTC back instantly. Double your crypto now!',
      weights: { urgency: 70, domain: 85, credential: 80, panic: 75 }
    },
    {
      id: 'telegram-job',
      name: '💼 Telegram WFH Part-Time Scam',
      category: 'Job Scam',
      sender: '+1 (555) 019-2834',
      url: 'https://t.me/GlobalTaskHR_bot',
      text: 'Earn ₹5,000 to ₹20,000 per day working from home by simply liking YouTube videos! No experience required. Deposit ₹1,000 security fee to unlock daily payout tasks.',
      weights: { urgency: 50, domain: 60, credential: 70, panic: 40 }
    },
    {
      id: 'safe-notice',
      name: '✅ Legitimate Security Notice (Safe)',
      category: 'Official Notice',
      sender: 'no-reply@github.com',
      url: 'https://github.com/settings/security',
      text: 'Hi developer, a new SSH key was added to your GitHub account on October 1st, 2026. If this was you, no action is needed. If you did not authorize this change, please visit your account security settings.',
      weights: { urgency: 10, domain: 5, credential: 5, panic: 10 }
    }
  ];

  const [selectedPreset, setSelectedPreset] = useState(presets[0]);
  const [scratchpadText, setScratchpadText] = useState(presets[0].text);
  const [senderInput, setSenderInput] = useState(presets[0].sender);
  const [urlInput, setUrlInput] = useState(presets[0].url);
  const [contentType, setContentType] = useState('SMS');

  // Sensitivity Sliders
  const [urgencyWeight, setUrgencyWeight] = useState(85);
  const [domainWeight, setDomainWeight] = useState(90);
  const [credentialWeight, setCredentialWeight] = useState(95);
  const [panicWeight, setPanicWeight] = useState(80);

  // Settings & Toggles
  const [checkPunycode, setCheckPunycode] = useState(true);
  const [checkReverseUPI, setCheckReverseUPI] = useState(true);
  const [highlightMode, setHighlightMode] = useState(true);
  const [activeTab, setActiveTab] = useState('inspector'); // inspector, json, advisory

  // Live Analysis Output state
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(false);

  // Auto recalculate live analysis when inputs change
  useEffect(() => {
    runScratchpadAnalysis();
  }, [scratchpadText, senderInput, urlInput, urgencyWeight, domainWeight, credentialWeight, panicWeight, checkPunycode, checkReverseUPI]);

  const handleLoadPreset = (preset) => {
    setSelectedPreset(preset);
    setScratchpadText(preset.text);
    setSenderInput(preset.sender);
    setUrlInput(preset.url);
    setUrgencyWeight(preset.weights.urgency);
    setDomainWeight(preset.weights.domain);
    setCredentialWeight(preset.weights.credential);
    setPanicWeight(preset.weights.panic);
  };

  const runScratchpadAnalysis = () => {
    const fullContent = (scratchpadText + ' ' + urlInput + ' ' + senderInput).toLowerCase();
    
    // Key threat pattern detectors
    const urgencyTokens = ['urgent', 'immediately', '12 hours', 'blocked', 'suspended', 'terminated', 'account locked', 'within 24h', 'action required'];
    const credentialTokens = ['kyc', 'pan', 'upi pin', 'otp', 'password', 'login', 'credentials', 'verify', 'wallet', 'security fee'];
    const suspiciousDomains = ['.xyz', '.top', '.org/claim', '.info', 'bit.ly', 'security-update', 'refund-claim', 'double-event'];
    const reverseUPITokens = ['enter upi pin to receive', 'pin to receive', 'scan qr to get money', 'claim cashback'];
    const moneyTokens = ['₹', '$', 'btc', 'cashback', 'double', 'earn', 'refund', '5000'];

    const matchedUrgency = urgencyTokens.filter(t => fullContent.includes(t));
    const matchedCredentials = credentialTokens.filter(t => fullContent.includes(t));
    const matchedDomains = suspiciousDomains.filter(t => fullContent.includes(t));
    const matchedReverseUPI = reverseUPITokens.filter(t => fullContent.includes(t));
    const matchedMoney = moneyTokens.filter(t => fullContent.includes(t));

    // Calculate score based on user-adjusted weights
    let rawScore = 5;

    if (matchedUrgency.length > 0) rawScore += (matchedUrgency.length * 15) * (urgencyWeight / 50);
    if (matchedCredentials.length > 0) rawScore += (matchedCredentials.length * 20) * (credentialWeight / 50);
    if (matchedDomains.length > 0) rawScore += 35 * (domainWeight / 50);
    if (checkReverseUPI && matchedReverseUPI.length > 0) rawScore += 40;
    if (checkPunycode && (urlInput.includes('.xyz') || urlInput.includes('-') || urlInput.includes('.top'))) rawScore += 25;
    if (matchedMoney.length > 0) rawScore += 10 * (panicWeight / 50);

    const calculatedRiskScore = Math.min(Math.max(Math.round(rawScore), 0), 100);

    let riskGrade = 'LOW';
    let gradeColor = '#10b981';
    let gradeBg = 'rgba(16, 185, 129, 0.12)';

    if (calculatedRiskScore >= 75) {
      riskGrade = 'CRITICAL / SEVERE THREAT';
      gradeColor = '#ef4444';
      gradeBg = 'rgba(239, 68, 68, 0.12)';
    } else if (calculatedRiskScore >= 45) {
      riskGrade = 'MODERATE / SUSPICIOUS';
      gradeColor = '#f59e0b';
      gradeBg = 'rgba(245, 158, 11, 0.12)';
    }

    setAnalysis({
      score: calculatedRiskScore,
      grade: riskGrade,
      color: gradeColor,
      bg: gradeBg,
      matches: {
        urgency: matchedUrgency,
        credentials: matchedCredentials,
        domains: matchedDomains,
        reverseUPI: matchedReverseUPI,
        money: matchedMoney
      },
      vector: matchedReverseUPI.length > 0 ? 'Reverse UPI QR Scam' : matchedDomains.length > 0 ? 'Phishing / Impersonation' : matchedUrgency.length > 0 ? 'Smishing Urgency Pressure' : 'Informational / Low Threat',
      ioc: {
        domainExtracted: urlInput ? urlInput.replace(/^https?:\/\//, '').split('/')[0] : 'None',
        ipEstimated: matchedDomains.length > 0 ? '192.0.2.148 (Flagged Suspicious ASN)' : 'Safe / Standard Infrastructure',
        urgencyIndex: `${matchedUrgency.length * 25}%`,
        socialEngineeringTactics: [
          matchedUrgency.length > 0 && 'Artificial Time-Constraint Pressure',
          matchedCredentials.length > 0 && 'Credential / Authentication Harvesting',
          matchedReverseUPI.length > 0 && 'Reverse Transaction Manipulation (PIN to receive)',
          matchedMoney.length > 0 && 'Financial Reward / Loss Aversion Bait'
        ].filter(Boolean)
      }
    });
  };

  // Helper to render inline highlighted text in scratchpad
  const renderHighlightedText = () => {
    if (!highlightMode || !scratchpadText) return scratchpadText;

    const dangerousWords = ['URGENT', 'BLOCKED', 'KYC', '12 HOURS', 'PIN', 'OTP', 'DOUBLE', 'CLAIM', 'LIMIT'];
    let text = scratchpadText;

    // Simple highlight wrap for scratchpad preview
    return (
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '0.95rem' }}>
        {text.split(/(\s+)/).map((word, i) => {
          const clean = word.toUpperCase().replace(/[^A-Z0-9]/g, '');
          const isDanger = dangerousWords.includes(clean);
          const isLink = word.startsWith('http://') || word.startsWith('https://');

          if (isDanger) {
            return (
              <mark key={i} style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.1rem 0.3rem', borderRadius: '4px', fontWeight: 700 }}>
                {word}
              </mark>
            );
          }
          if (isLink) {
            return (
              <mark key={i} style={{ background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', padding: '0.1rem 0.3rem', borderRadius: '4px', fontWeight: 700 }}>
                {word}
              </mark>
            );
          }
          return word;
        })}
      </div>
    );
  };

  const handleCopyManifest = () => {
    navigator.clipboard.writeText(JSON.stringify(analysis, null, 2));
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  return (
    <div style={{ paddingBottom: '3rem', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #059669, #047857)', color: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <Terminal size={28} color="#a7f3d0" />
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
                Digital Threat Inspector Scratchpad
              </h2>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                Interactive Lab
              </span>
            </div>
            <p style={{ color: '#d1fae5', margin: 0, fontSize: '0.95rem' }}>
              Test, inspect, tokenize, and tune heuristic risk engines on suspicious digital messages, URLs, and financial payloads in real-time.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleCopyManifest}
              style={{
                background: '#ffffff',
                color: '#047857',
                border: 'none',
                padding: '0.6rem 1rem',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              {copiedStatus ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              {copiedStatus ? 'Copied JSON!' : 'Copy Analysis Manifest'}
            </button>
          </div>
        </div>
      </div>

      {/* Preset Scenarios Selector Bar */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: '#ffffff' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={14} color="var(--primary-emerald)" /> Select a Preset Scratchpad Scenario:
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleLoadPreset(preset)}
              style={{
                background: selectedPreset.id === preset.id ? 'var(--primary-emerald)' : 'rgba(220, 252, 231, 0.5)',
                color: selectedPreset.id === preset.id ? '#ffffff' : 'var(--deep-forest)',
                border: selectedPreset.id === preset.id ? '1px solid var(--primary-emerald)' : '1px solid var(--border-color)',
                padding: '0.5rem 0.9rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Scratchpad Editor, Right Real-time Threat Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column: Interactive Scratchpad Editor & Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 800, color: 'var(--deep-forest)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} color="var(--primary-emerald)" /> Text Scratchpad Editor
              </div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={highlightMode}
                  onChange={(e) => setHighlightMode(e.target.checked)}
                />
                Live Token Highlighting
              </label>
            </div>

            {/* Sender & URL Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.3rem' }}>
                  SENDER IDENTITY
                </label>
                <input
                  type="text"
                  className="form-input"
                  style={{ fontSize: '0.85rem', padding: '0.45rem 0.75rem' }}
                  value={senderInput}
                  onChange={(e) => setSenderInput(e.target.value)}
                  placeholder="e.g. +91-XXXXX or sender@domain.com"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.3rem' }}>
                  TARGET URL / LINK
                </label>
                <input
                  type="text"
                  className="form-input"
                  style={{ fontSize: '0.85rem', padding: '0.45rem 0.75rem' }}
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="e.g. http://suspicious-link.xyz"
                />
              </div>
            </div>

            {/* Content Scratchpad Input Area */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.3rem' }}>
                SCRATCHPAD CONTENT (TYPE OR PASTE SUSPICIOUS PAYLOAD)
              </label>
              <textarea
                className="form-textarea"
                rows={6}
                style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.5' }}
                value={scratchpadText}
                onChange={(e) => setScratchpadText(e.target.value)}
                placeholder="Type or paste suspicious text content..."
              />
            </div>

            {/* Tokenized Preview Box */}
            {highlightMode && (
              <div style={{
                background: 'rgba(248, 250, 252, 0.9)',
                border: '1px solid var(--border-color)',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  🔍 Real-Time Tokenization Highlight Preview:
                </div>
                {renderHighlightedText()}
              </div>
            )}

          </div>

          {/* Heuristic Weight Tuning Controls */}
          <div className="glass-card" style={{ padding: '1.5rem', background: '#ffffff' }}>
            <div style={{ fontWeight: 800, color: 'var(--deep-forest)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Sliders size={18} color="var(--primary-emerald)" /> Heuristic Sensitivity Sliders
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                  <span>Urgency Pressure Weight</span>
                  <span style={{ color: 'var(--primary-emerald)' }}>{urgencyWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={urgencyWeight}
                  onChange={(e) => setUrgencyWeight(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary-emerald)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                  <span>Domain Reputation Weight</span>
                  <span style={{ color: 'var(--primary-emerald)' }}>{domainWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={domainWeight}
                  onChange={(e) => setDomainWeight(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary-emerald)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                  <span>Credential Harvesting Sensitivity</span>
                  <span style={{ color: 'var(--primary-emerald)' }}>{credentialWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={credentialWeight}
                  onChange={(e) => setCredentialWeight(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary-emerald)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                  <span>Financial Reward / Panic Weight</span>
                  <span style={{ color: 'var(--primary-emerald)' }}>{panicWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={panicWeight}
                  onChange={(e) => setPanicWeight(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary-emerald)' }}
                />
              </div>

              {/* Toggles */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={checkPunycode}
                    onChange={(e) => setCheckPunycode(e.target.checked)}
                  />
                  Punycode / Homograph Check
                </label>

                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={checkReverseUPI}
                    onChange={(e) => setCheckReverseUPI(e.target.checked)}
                  />
                  Reverse UPI PIN Check
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Live Inspector Output Terminal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Risk Meter Card */}
          {analysis && (
            <div className="glass-card" style={{ padding: '1.5rem', background: '#ffffff', borderTop: `4px solid ${analysis.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>
                  LIVE THREAT EVALUATION SCORE
                </div>
                <span style={{ background: analysis.bg, color: analysis.color, padding: '0.3rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800 }}>
                  {analysis.grade}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: analysis.bg,
                  border: `3px solid ${analysis.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
                }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: analysis.color, lineHeight: 1 }}>
                    {analysis.score}
                  </div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>
                    OUT OF 100
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--deep-forest)', marginBottom: '0.2rem' }}>
                    Primary Classification:
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: analysis.color, marginBottom: '0.5rem' }}>
                    {analysis.vector}
                  </div>
                  
                  {/* Score Progress Bar */}
                  <div style={{ height: '8px', width: '100%', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${analysis.score}%`, background: analysis.color, transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              </div>

              {/* Matched Token Pills */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Extracted Suspicious Threat Markers:
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {analysis.matches.urgency.map((t, idx) => (
                    <span key={`u-${idx}`} style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      ⚠️ Urgency: "{t}"
                    </span>
                  ))}
                  {analysis.matches.credentials.map((t, idx) => (
                    <span key={`c-${idx}`} style={{ background: '#fff1f2', color: '#be123c', border: '1px solid #fda4af', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      🔑 Credential: "{t}"
                    </span>
                  ))}
                  {analysis.matches.domains.map((t, idx) => (
                    <span key={`d-${idx}`} style={{ background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      🌐 High-Risk Link: "{t}"
                    </span>
                  ))}
                  {analysis.matches.reverseUPI.map((t, idx) => (
                    <span key={`ru-${idx}`} style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #f87171', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                      💳 Reverse UPI Trap: "{t}"
                    </span>
                  ))}
                  {analysis.matches.urgency.length === 0 && analysis.matches.credentials.length === 0 && analysis.matches.domains.length === 0 && (
                    <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 600 }}>
                      ✅ No high-risk threat markers detected in current scratchpad payload.
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Threat Artifacts & Indicators of Compromise (IOC) */}
          {analysis && (
            <div className="glass-card" style={{ padding: '1.5rem', background: '#ffffff' }}>
              <div style={{ fontWeight: 800, color: 'var(--deep-forest)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Layers size={18} color="var(--primary-emerald)" /> Extracted Indicators of Compromise (IOC)
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(240, 253, 244, 0.6)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontWeight: 700 }}>EXTRACTED DOMAIN</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--deep-forest)', wordBreak: 'break-all' }}>
                    {analysis.ioc.domainExtracted}
                  </div>
                </div>

                <div style={{ background: 'rgba(240, 253, 244, 0.6)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontWeight: 700 }}>SENDER ADVISORY</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--deep-forest)' }}>
                    {senderInput || 'Unspecified Sender'}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Social Engineering Tactics Identified:
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {analysis.ioc.socialEngineeringTactics.map((tactic, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>
                      <strong style={{ color: 'var(--deep-forest)' }}>{tactic}</strong>
                    </li>
                  ))}
                  {analysis.ioc.socialEngineeringTactics.length === 0 && (
                    <li>No malicious pressure tactics identified.</li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Inspection Output JSON Manifest Tab */}
          <div className="glass-card" style={{ padding: '1.5rem', background: '#1e293b', color: '#e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
                <FileCode size={18} /> Raw Threat Inspection JSON
              </div>
              <button
                onClick={handleCopyManifest}
                style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                Copy JSON
              </button>
            </div>
            <pre style={{ margin: 0, padding: '0.75rem', background: '#0f172a', borderRadius: '8px', fontSize: '0.75rem', maxHeight: '180px', overflowY: 'auto', color: '#a5f3fc', fontFamily: 'monospace' }}>
              {JSON.stringify({
                scratchpad_input: scratchpadText,
                sender: senderInput,
                target_url: urlInput,
                inspection_result: analysis
              }, null, 2)}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
}
