import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, RefreshCw, Award, CheckCircle2 } from 'lucide-react';

export default function SecurityQuiz() {
  const [answers, setAnswers] = useState({});
  const [resultScore, setResultScore] = useState(null);

  const questions = [
    {
      id: 'q1',
      question: "If your bank sends an SMS saying 'Account Locked, click link immediately to verify', what do you do?",
      options: [
        { label: "Click the link in SMS to restore access fast", points: 0 },
        { label: "Ignore the SMS link, open official bank app directly to check alerts", points: 25 }
      ]
    },
    {
      id: 'q2',
      question: "Someone buying your online listing asks you to scan a QR code on Google Pay to RECEIVE money. Is this safe?",
      options: [
        { label: "Yes, scanning QR code receives money into my account", points: 0 },
        { label: "No! Entering PIN or scanning QR codes ALWAYS sends money OUT", points: 25 }
      ]
    },
    {
      id: 'q3',
      question: "How do you check if a website domain is genuine (e.g. paypal.security-auth.xyz)?",
      options: [
        { label: "If the word 'paypal' is anywhere in the URL, it must be official", points: 0 },
        { label: "Check the domain extension after the last dot (it's '.xyz', NOT paypal.com!)", points: 25 }
      ]
    },
    {
      id: 'q4',
      question: "An email from 'customer-support@gmail.com' claims to be from Amazon Billing. Is this suspicious?",
      options: [
        { label: "No, many companies use gmail for customer support", points: 0 },
        { label: "Yes, official companies use their own corporate domain (e.g. @amazon.com)", points: 25 }
      ]
    }
  ];

  const handleSelect = (qId, points) => {
    setAnswers({ ...answers, [qId]: points });
  };

  const calculateScore = () => {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    setResultScore(total);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '12px', color: '#34d399', marginBottom: '0.75rem' }}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            Personal Scam Defense Vulnerability Radar
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Answer 4 quick security scenarios to test your defense readiness against modern digital threats.
          </p>
        </div>

        {resultScore === null ? (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {questions.map((q, idx) => (
              <div key={q.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem' }}>
                  {idx + 1}. {q.question}
                </h4>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, opt.points)}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: answers[q.id] === opt.points ? '1px solid var(--primary-cyan)' : '1px solid var(--border-color)',
                        background: answers[q.id] === opt.points ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        color: answers[q.id] === opt.points ? '#fff' : 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              className="btn-primary"
              onClick={calculateScore}
              disabled={Object.keys(answers).length < questions.length}
              style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.9rem' }}
            >
              Calculate My Security Defense Score
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <Award size={48} color={resultScore >= 75 ? "#34d399" : "#f59e0b"} style={{ marginBottom: '0.5rem' }} />
            <h3 style={{ fontSize: '2rem', fontWeight: 900, color: resultScore >= 75 ? "#34d399" : "#f59e0b" }}>
              {resultScore} / 100 Points
            </h3>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0.5rem 0 1rem 0' }}>
              {resultScore >= 75 ? "Security Specialist Level! Hard to Scam!" : "Moderate Vulnerability Risk"}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
              {resultScore >= 75 
                ? "Great job! You recognize deceptive urgency tactics, reverse UPI traps, and domain spoofing patterns." 
                : "Remember: Real banks never ask for PINs via links, and receiving money NEVER requires entering your PIN."}
            </p>

            <button className="btn-secondary" onClick={() => { setAnswers({}); setResultScore(null); }}>
              <RefreshCw size={16} /> Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
