import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, Terminal, TriangleAlert, CircleCheck } from 'lucide-react';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    // Simulate high-tech secure transmission
    setTimeout(() => {
      setStatus('success');
      
      // Trigger canvas confetti explosion
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#9d4edd', '#f72585', '#00f5d4']
      });
      
      setFormState({ name: '', email: '', message: '' });
    }, 1800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
    if (status === 'error') setStatus('idle');
  };

  return (
    <div className="glass-panel" style={{
      maxWidth: '650px',
      margin: '0 auto',
      padding: '2.5rem',
      position: 'relative',
      border: '1px solid rgba(0, 242, 254, 0.15)'
    }}>
      {/* Decorative corners for cyberpunk theme */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '15px', height: '15px', borderTop: '2px solid var(--color-cyan)', borderLeft: '2px solid var(--color-cyan)' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '15px', height: '15px', borderTop: '2px solid var(--color-cyan)', borderRight: '2px solid var(--color-cyan)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '15px', height: '15px', borderBottom: '2px solid var(--color-cyan)', borderLeft: '2px solid var(--color-cyan)' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '15px', height: '15px', borderBottom: '2px solid var(--color-cyan)', borderRight: '2px solid var(--color-cyan)' }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '1rem'
      }}>
        <Terminal size={18} color="var(--color-cyan)" />
        <h3 style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: '15px',
          color: '#fff',
          letterSpacing: '2px',
          margin: 0
        }}>
          ESTABLISH SECURE COMMS LINK
        </h3>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
        <div className="form-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              letterSpacing: '1px'
            }}>
              NAME // IDENTIFIER
            </label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              disabled={status === 'sending'}
              style={{
                background: 'rgba(5, 5, 8, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                padding: '0.8rem 1rem',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'var(--font-sans)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-cyan)';
                e.target.style.boxShadow = '0 0 10px rgba(0, 242, 254, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              letterSpacing: '1px'
            }}>
              EMAIL // ROUTE
            </label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="e.g. name@domain.com"
              disabled={status === 'sending'}
              style={{
                background: 'rgba(5, 5, 8, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                padding: '0.8rem 1rem',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'var(--font-sans)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-cyan)';
                e.target.style.boxShadow = '0 0 10px rgba(0, 242, 254, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            letterSpacing: '1px'
          }}>
            MESSAGE // PAYLOAD
          </label>
          <textarea
            name="message"
            rows={5}
            value={formState.message}
            onChange={handleChange}
            placeholder="Type your message details here..."
            disabled={status === 'sending'}
            style={{
              background: 'rgba(5, 5, 8, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              padding: '0.8rem 1rem',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none',
              resize: 'none',
              transition: 'all 0.3s ease',
              fontFamily: 'var(--font-sans)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-cyan)';
              e.target.style.boxShadow = '0 0 10px rgba(0, 242, 254, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Status display */}
        {status === 'error' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-pink)',
            fontSize: '12px',
            fontFamily: 'var(--font-orbitron)'
          }}>
            <TriangleAlert size={14} /> [ ERROR: ALL FIELDS MUST BE POPULATED ]
          </div>
        )}

        {status === 'success' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-green)',
            fontSize: '12px',
            fontFamily: 'var(--font-orbitron)'
          }}>
            <CircleCheck size={14} /> [ TRANSMISSION SUCCESSFUL // ENCRYPTED PACKET SENT ]
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`cyber-button ${status === 'sending' ? 'active' : ''}`}
          disabled={status === 'sending'}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
        >
          {status === 'sending' ? (
            <>
              TRANSMITTING...
            </>
          ) : (
            <>
              <Send size={16} /> SEND MESSAGE
            </>
          )}
        </button>
      </form>
    </div>
  );
}
