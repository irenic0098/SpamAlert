import React, { useState } from 'react';
import { Cpu, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Trophy, ArrowRight, HelpCircle } from 'lucide-react';

export default function InteractiveSimulator() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [foundFlagIds, setFoundFlagIds] = useState([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const scenarios = [
    {
      title: "Scenario #1: Urgent Bank Suspension Email",
      sender: "no-reply-alerts@chase-secure-auth.xyz",
      subject: "IMMEDIATE ACTION REQUIRED: Account #4810 Suspended",
      content: [
        { text: "Dear Customer,\n\nWe detected unauthorized attempt to access your banking profile. ", isFlag: false },
        { id: "flag1", text: "Your online access will be permanently terminated in 12 hours", isFlag: true, explanation: "Urgency Pressure Tactic: Scammers use tight deadlines so you panic and skip verification." },
        { text: " unless you verify your identity.\n\nPlease ", isFlag: false },
        { id: "flag2", text: "Click here to login and enter your SSN & PIN", isFlag: true, explanation: "Credential Harvesting: Real banks NEVER ask for your PIN or SSN via an email link." },
        { text: " or visit ", isFlag: false },
        { id: "flag3", text: "http://chase-secure-auth.xyz/verify", isFlag: true, explanation: "Spoofed Domain (.xyz): Notice how chase is combined with '-secure-auth.xyz'. The real domain is chase.com." }
      ],
      totalFlags: 3,
      safeTips: [
        "Check the web address after the last dot.",
        "Never enter your password via an email link.",
        "Log in directly using the official banking mobile application."
      ]
    },
    {
      title: "Scenario #2: Reverse UPI / Payment App QR Trap",
      sender: "Unknown Buyer (+91-9812345678)",
      subject: "WhatsApp Message regarding your online item listing",
      content: [
        { text: "Hello! I am ready to purchase your sofa for $200. I have sent the payment via Google Pay.\n\n", isFlag: false },
        { id: "flagA", text: "Scan this QR code and enter your 6-digit UPI PIN to credit $200 to your bank account.", isFlag: true, explanation: "REVERSE QR SCAM: Entering your PIN ALWAYS debits money from your account. You NEVER need to enter a PIN to receive money!" },
        { text: "\n\nIf you do not scan within 10 minutes, ", isFlag: false },
        { id: "flagB", text: "the bank payment transaction will lapse and cancel.", isFlag: true, explanation: "Fake Expiry Threat: Standard bank transfers do not lapse because you didn't scan a QR code." }
      ],
      totalFlags: 2,
      safeTips: [
        "GOLDEN RULE: Receiving money NEVER requires entering your PIN.",
        "Beware of buyers who insist on instant QR code transactions for simple cash items."
      ]
    }
  ];

  const currentScenario = scenarios[activeScenarioIdx];

  const handleElementClick = (item) => {
    if (!item.isFlag) return;
    if (!foundFlagIds.includes(item.id)) {
      const newFound = [...foundFlagIds, item.id];
      setFoundFlagIds(newFound);
      setScore(score + 100);

      if (newFound.length === currentScenario.totalFlags) {
        setIsCompleted(true);
      }
    }
  };

  const handleNextScenario = () => {
    if (activeScenarioIdx < scenarios.length - 1) {
      setActiveScenarioIdx(activeScenarioIdx + 1);
      setFoundFlagIds([]);
      setIsCompleted(false);
    }
  };

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '2.25rem', marginBottom: '2rem', textAlign: 'center', background: '#ffffff' }}>
        <div style={{ display: 'inline-flex', padding: '0.6rem', background: 'rgba(240, 253, 244, 0.9)', borderRadius: '14px', color: 'var(--primary-emerald)', marginBottom: '0.5rem', border: '1px solid var(--border-color)' }}>
          <Cpu size={28} />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--deep-forest)', marginBottom: '0.4rem' }}>
          Interactive "Spot the Threat" Simulator
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
          Test your detection skills! Read the mock digital message below and <strong>click on the suspicious red flag sections</strong> to uncover why they are dangerous.
        </p>

        {/* Scoreboard */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem' }}>
          <div style={{ background: 'rgba(240, 253, 244, 0.9)', padding: '0.5rem 1.35rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', fontWeight: 600 }}>Score: </span>
            <span style={{ fontWeight: 800, color: 'var(--primary-emerald)', fontSize: '1.15rem' }}>{score} pts</span>
          </div>
          <div style={{ background: 'rgba(240, 253, 244, 0.9)', padding: '0.5rem 1.35rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', fontWeight: 600 }}>Red Flags Discovered: </span>
            <span style={{ fontWeight: 800, color: '#047857', fontSize: '1.15rem' }}>{foundFlagIds.length} / {currentScenario.totalFlags}</span>
          </div>
        </div>
      </div>

      {/* Mock Client Interface */}
      <div className="glass-card" style={{ padding: '2.25rem', background: '#ffffff', border: '1px solid var(--border-glow)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 700 }}>{currentScenario.title}</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--deep-forest)' }}>{currentScenario.subject}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--primary-emerald)', fontWeight: 600 }}>Sender: {currentScenario.sender}</div>
          </div>
          <span className="badge badge-caution">Simulation Active</span>
        </div>

        {/* Interactive Text Body */}
        <div style={{
          background: 'rgba(240, 253, 244, 0.6)',
          padding: '1.5rem',
          borderRadius: '14px',
          border: '1px solid var(--border-color)',
          fontSize: '1rem',
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
          marginBottom: '1.5rem',
          color: 'var(--text-main)'
        }}>
          {currentScenario.content.map((item, idx) => {
            const isFound = foundFlagIds.includes(item.id);
            if (!item.isFlag) {
              return <span key={idx}>{item.text}</span>;
            }
            return (
              <span
                key={idx}
                onClick={() => handleElementClick(item)}
                style={{
                  background: isFound ? 'rgba(254, 242, 242, 0.9)' : 'rgba(254, 243, 199, 0.9)',
                  borderBottom: isFound ? '2.5px solid #dc2626' : '2.5px dashed #d97706',
                  color: isFound ? '#b91c1c' : '#b45309',
                  padding: '0.2rem 0.45rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  margin: '0 0.15rem'
                }}
                title={isFound ? "Red Flag Identified!" : "Click if you think this is suspicious"}
              >
                {item.text} {isFound && "🚩"}
              </span>
            );
          })}
        </div>

        {/* Revealed Evidence Cards */}
        {foundFlagIds.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#047857', marginBottom: '0.75rem' }}>
              💡 Discovered Forensic Evidence:
            </h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {currentScenario.content
                .filter(item => foundFlagIds.includes(item.id))
                .map((item) => (
                  <div key={item.id} style={{
                    background: 'rgba(240, 253, 244, 0.9)',
                    borderLeft: '4px solid #059669',
                    padding: '0.9rem 1.1rem',
                    borderRadius: '0 10px 10px 0',
                    fontSize: '0.92rem'
                  }}>
                    <strong style={{ color: '#047857', display: 'block', marginBottom: '0.2rem' }}>Flagged: "{item.text}"</strong>
                    <div style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{item.explanation}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Completion Action */}
        {isCompleted && (
          <div style={{
            marginTop: '2rem',
            padding: '1.75rem',
            background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.95), #ffffff)',
            borderRadius: '16px',
            border: '1.5px solid var(--primary-emerald)',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(5, 150, 105, 0.15)'
          }}>
            <Trophy size={40} color="#d97706" style={{ marginBottom: '0.5rem' }} />
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--deep-forest)', marginBottom: '0.5rem' }}>
              Scenario Cleared! Excellent Security Instincts!
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              You identified all {currentScenario.totalFlags} red flags in this simulation.
            </p>
            
            {activeScenarioIdx < scenarios.length - 1 ? (
              <button className="btn-primary" onClick={handleNextScenario}>
                Next Scenario <ArrowRight size={16} />
              </button>
            ) : (
              <div style={{ color: '#047857', fontWeight: 800, fontSize: '1.05rem' }}>🎉 You completed all available simulation scenarios!</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
