import React, { useState } from 'react';
import { BookOpen, ShieldAlert, Globe, CreditCard, Mail, KeyRound, ClockAlert, Gift, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function LearnWhyLibrary() {
  const [selectedTopic, setSelectedTopic] = useState('phishing');

  const topics = [
    {
      id: 'phishing',
      title: '📧 Phishing Emails',
      icon: <Mail size={20} color="#059669" />,
      description: 'Deceptive emails designed to steal credentials by mimicking legitimate companies like banks or Netflix.',
      signals: [
        'Sender email uses a public domain (e.g., support-paypal@gmail.com)',
        'Contains urgent warnings like "Account locked in 24 hours"',
        'Includes links to fake login pages asking for passwords or SSN'
      ],
      defense: 'Never click embedded links. Always navigate directly to the company website in your browser.'
    },
    {
      id: 'websites',
      title: '🌐 Fake Websites & Typosquatting',
      icon: <Globe size={20} color="#0284c7" />,
      description: 'Fraudulent web pages that copy the look of real bank or shopping portals using slightly altered domain names.',
      signals: [
        'Domain spelling tricks like paypa1.com or hdfc-verify-portal.xyz',
        'Lacks valid HTTPS security certificate',
        'Web address uses raw IP numbers like 192.168.1.5'
      ],
      defense: 'Check the domain name right before the last dot (e.g., hdfc.com). Look out for weird extensions like .xyz or .top.'
    },
    {
      id: 'upi_scams',
      title: '💳 Reverse UPI & QR Payment Traps',
      icon: <CreditCard size={20} color="#dc2626" />,
      description: 'A major scam where buyers claim they are sending money to your payment app but trick you into entering your PIN.',
      signals: [
        'Buyer tells you to "Scan QR code to receive money"',
        'Prompt asks for your 4-digit or 6-digit UPI PIN',
        'Transaction message says "DEBIT" instead of "CREDIT"'
      ],
      defense: 'GOLDEN RULE: Receiving money NEVER requires entering your PIN. Entering your PIN ALWAYS sends money OUT!'
    },
    {
      id: 'impersonation',
      title: '🎭 Brand & Authority Impersonation',
      icon: <ShieldAlert size={20} color="#7c3aed" />,
      description: 'Scammers pretending to be police officers, tax officials, utility boards, or company CEOs demanding immediate payment.',
      signals: [
        'Caller/Sender demands payment via gift cards, crypto, or private accounts',
        'Threatens immediate arrest, electricity cutoff, or legal warrant',
        'Refuses to provide official verification tickets'
      ],
      defense: 'Hang up immediately. Utility and law enforcement agencies issue written legal notices, never WhatsApp cut-offs.'
    },
    {
      id: 'fake_rewards',
      title: '🎁 Fake Offers, Lotteries & Task Scams',
      icon: <Gift size={20} color="#d97706" />,
      description: 'Unsolicited messages promising high daily payouts for simple YouTube likes or fake lottery cash prizes.',
      signals: [
        'Promises $500/day for trivial online tasks',
        'Asks for an advance registration fee or tax payment to release funds',
        'Communicates exclusively via Telegram or WhatsApp bots'
      ],
      defense: 'If an offer sounds too good to be true, it is 100% a scam. Never pay money to receive money.'
    }
  ];

  const current = topics.find(t => t.id === selectedTopic) || topics[0];

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', paddingBottom: '3rem' }}>
      
      {/* Library Header */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center', background: '#ffffff' }}>
        <div style={{ display: 'inline-flex', padding: '0.6rem', background: 'rgba(240, 253, 244, 0.9)', borderRadius: '14px', color: 'var(--primary-emerald)', marginBottom: '0.5rem', border: '1px solid var(--border-color)' }}>
          <BookOpen size={28} />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--deep-forest)', marginBottom: '0.4rem' }}>
          🧠 "Learn Why" Digital Threat Pattern Library
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', maxWidth: '650px', margin: '0 auto' }}>
          Master common scam mechanics in simple language. Recognize key red flags before clicking suspicious digital content.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="pattern-library-grid" style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: '1.5rem' }}>
        
        {/* Sidebar */}
        <div className="scroll-tabs" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t.id)}
              style={{
                textAlign: 'left',
                padding: '0.85rem 1rem',
                borderRadius: '14px',
                border: selectedTopic === t.id ? '1px solid var(--primary-emerald)' : '1px solid var(--border-color)',
                background: selectedTopic === t.id ? '#ffffff' : 'rgba(240, 253, 244, 0.6)',
                color: selectedTopic === t.id ? 'var(--deep-forest)' : 'var(--text-muted)',
                boxShadow: selectedTopic === t.id ? '0 4px 14px rgba(5, 150, 105, 0.12)' : 'none',
                cursor: 'pointer',
                fontWeight: selectedTopic === t.id ? 800 : 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {t.icon}
                <span>{t.title}</span>
              </div>
              <ChevronRight size={16} opacity={selectedTopic === t.id ? 1 : 0.4} />
            </button>
          ))}
        </div>

        {/* Detailed View Card */}
        <div className="glass-card" style={{ padding: '2rem', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.55rem', background: 'rgba(240, 253, 244, 0.9)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              {current.icon}
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--deep-forest)' }}>{current.title}</h3>
          </div>

          <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
            {current.description}
          </p>

          {/* Red Flags */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#dc2626', marginBottom: '0.75rem' }}>
              🚩 Key Red Flags to Watch For:
            </h4>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {current.signals.map((sig, idx) => (
                <div key={idx} style={{
                  padding: '0.7rem 0.9rem',
                  background: 'rgba(254, 242, 242, 0.8)',
                  borderLeft: '4px solid #dc2626',
                  borderRadius: '0 8px 8px 0',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--text-main)'
                }}>
                  • {sig}
                </div>
              ))}
            </div>
          </div>

          {/* Safe Defense Rationale */}
          <div style={{ background: 'rgba(240, 253, 244, 0.9)', border: '1px solid rgba(5, 150, 105, 0.3)', padding: '1rem 1.25rem', borderRadius: '14px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={18} color="#059669" /> How to Protect Yourself:
            </h4>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.55, fontWeight: 500 }}>
              {current.defense}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
