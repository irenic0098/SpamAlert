import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ThumbsUp, Plus, ShieldAlert, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';

export default function ThreatDirectory() {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // New report form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('EMAIL');
  const [newContent, setNewContent] = useState('');
  const [newEvidence, setNewEvidence] = useState('');
  const [reporterName, setReporterName] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/scams/');
      if (res.ok) {
        const data = await res.json();
        setReports(data);
      }
    } catch (e) {
      console.warn("Using fallback reports", e);
      setReports([
        {
          id: 1,
          title: "Urgent Bank Account Deactivation SMS",
          threat_type: "SMS",
          content_sample: "ALERT: Your HDFC Bank account access has been suspended due to pending KYC update. Click http://hdfc-kyc-verify-portal.xyz/update to reactivate within 12 hours.",
          evidence_summary: "Punycode/Fake domain (.xyz) combined with high panic urgency (12 hour deadline).",
          risk_score: 95,
          severity: "CRITICAL",
          reporter_name: "CyberSafety Watch",
          upvotes: 42
        },
        {
          id: 2,
          title: "Unsolicited FedEx Package Delivery Fee Email",
          threat_type: "EMAIL",
          content_sample: "From: delivery-notice@gmail.com\nPackage #FDX-9981 held at central hub. Pay $2.99 custom clearance fee immediately: https://fedex-clearance-track.top/pay",
          evidence_summary: "Sender is generic @gmail.com account rather than @fedex.com. Demands credit card on .top domain.",
          risk_score: 88,
          severity: "HIGH",
          reporter_name: "TechGuard",
          upvotes: 29
        },
        {
          id: 3,
          title: "Reverse QR Code Payment Request Scam",
          threat_type: "PAYMENT",
          content_sample: "Scan this QR code and enter your UPI PIN to credit $150 to your account.",
          evidence_summary: "Entering PIN on any payment gateway ALWAYS DEBITS money, never credits.",
          risk_score: 100,
          severity: "CRITICAL",
          reporter_name: "Financial Crime Cell",
          upvotes: 118
        }
      ]);
    }
  };

  const handleUpvote = (id) => {
    setReports(reports.map(r => r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r));
  };

  const handleSubmitNewScam = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const payload = {
      title: newTitle,
      threat_type: newType,
      content_sample: newContent,
      evidence_summary: newEvidence || 'User-reported digital threat sample.',
      risk_score: 75,
      severity: 'HIGH',
      reporter_name: reporterName || 'Anonymous Citizen'
    };

    try {
      await fetch('http://127.0.0.1:8000/api/scams/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn("Saved locally", e);
    }

    setReports([ { id: Date.now(), ...payload, upvotes: 1 }, ...reports ]);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setNewTitle('');
      setNewContent('');
      setNewEvidence('');
    }, 1500);
  };

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.content_sample.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || r.threat_type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '3rem' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--deep-forest)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen color="var(--primary-emerald)" /> Live Digital Threat Database
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Search known scam patterns, impersonation attempts, and community-flagged digital traps.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Report a Suspicious Scam
        </button>
      </div>

      {/* Search & Category Filter */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} color="var(--text-subtle)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.75rem', background: '#ffffff' }}
            placeholder="Search scams by bank name, keyword, domain, or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="form-input"
          style={{ width: 'auto', minWidth: '160px', background: '#ffffff' }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          <option value="EMAIL">Phishing Email</option>
          <option value="SMS">Smishing SMS</option>
          <option value="PAYMENT">Payment / UPI Scam</option>
          <option value="SOCIAL">Social Media</option>
        </select>
      </div>

      {/* Threat Cards List */}
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        {filteredReports.length === 0 ? (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', background: '#ffffff', color: 'var(--text-muted)' }}>
            No matching threat records found in database.
          </div>
        ) : (
          filteredReports.map((report) => (
            <div key={report.id} className="glass-card" style={{ padding: '1.6rem', background: '#ffffff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--deep-forest)', marginBottom: '0.2rem' }}>{report.title}</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
                    Reported by <strong style={{ color: 'var(--text-main)' }}>{report.reporter_name}</strong> • Type: {report.threat_type}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={`badge ${report.severity === 'CRITICAL' ? 'badge-critical' : 'badge-high'}`}>
                    {report.severity} ({report.risk_score}/100)
                  </span>
                  
                  <button
                    onClick={() => handleUpvote(report.id)}
                    style={{
                      background: 'rgba(240, 253, 244, 0.9)',
                      border: '1px solid var(--border-color)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      color: 'var(--deep-forest)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <ThumbsUp size={14} color="var(--primary-emerald)" /> {report.upvotes}
                  </button>
                </div>
              </div>

              {/* Content Sample */}
              <div style={{
                background: 'rgba(240, 253, 244, 0.6)',
                border: '1px solid var(--border-color)',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-main)',
                marginBottom: '0.75rem',
                wordBreak: 'break-word'
              }}>
                "{report.content_sample}"
              </div>

              {/* Evidence Explanation */}
              <div style={{ fontSize: '0.9rem', color: 'var(--deep-forest)', background: 'rgba(240, 253, 244, 0.9)', borderLeft: '3.5px solid var(--primary-emerald)', padding: '0.65rem 0.85rem', borderRadius: '0 8px 8px 0', fontWeight: 500 }}>
                💡 <strong>Forensic Evidence:</strong> {report.evidence_summary}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Submitting New Threat */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(6, 78, 59, 0.4)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '550px', padding: '2.25rem', background: '#ffffff' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--deep-forest)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert color="var(--primary-emerald)" /> Submit Threat to Public Database
            </h3>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={48} color="#059669" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--deep-forest)' }}>Threat Logged Successfully!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Thank you for protecting the community.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitNewScam}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: 600 }}>Threat Title / Headline</label>
                  <input type="text" className="form-input" required placeholder="e.g. Fake Electricity Bill WhatsApp Cutoff Notice" value={newTitle} onChange={e=>setNewTitle(e.target.value)} />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: 600 }}>Category</label>
                  <select className="form-input" value={newType} onChange={e=>setNewType(e.target.value)}>
                    <option value="EMAIL">Phishing Email</option>
                    <option value="SMS">Smishing SMS</option>
                    <option value="PAYMENT">Payment / UPI Fraud</option>
                    <option value="SOCIAL">Social Media Impersonation</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: 600 }}>Suspicious Text or Link Sample</label>
                  <textarea className="form-textarea" rows={3} required placeholder="Paste the message text or link..." value={newContent} onChange={e=>setNewContent(e.target.value)} />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: 600 }}>Your Name / Organization (Optional)</label>
                  <input type="text" className="form-input" placeholder="e.g. Anonymous Cyber Citizen" value={reporterName} onChange={e=>setReporterName(e.target.value)} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn-primary"><Send size={16} /> Submit Warning</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
