import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('CONNECTING TO XB_CORE.SYS PERIPHERALS...');
  const [isComplete, setIsComplete] = useState(false);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    // Dynamic status text updates based on progress
    if (progress < 25) {
      setStatus('CONNECTING TO XB_CORE.SYS PERIPHERALS...');
    } else if (progress < 50) {
      setStatus('ESTABLISHING HOLOGRID VECTOR CHANNELS...');
    } else if (progress < 75) {
      setStatus('LOADING 3D CHESS MATRIX & BIKE ENGINE...');
    } else if (progress < 90) {
      setStatus('COMPILING DYNAMIC WEBGL SHADERS...');
    } else if (progress < 100) {
      setStatus('CALIBRATING SYSTEM INTERFACE...');
    } else {
      setStatus('[ SYSTEM INITIALIZATION COMPLETE ]');
    }
  }, [progress]);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment by random amounts to look realistic and have a nice pacing
        const increment = Math.floor(Math.random() * 8) + 2;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setIsComplete(true);
      // Wait 1 second after 100% to let the complete message display
      const delayTimeout = setTimeout(() => {
        setShouldFadeOut(true);
        // Wait 800ms for fade out transition before telling parent to unmount
        const unmountTimeout = setTimeout(() => {
          onComplete();
        }, 800);
        return () => clearTimeout(unmountTimeout);
      }, 1000);
      return () => clearTimeout(delayTimeout);
    }
  }, [progress, onComplete]);

  // Generate ASCII block progress bar
  const totalBlocks = 20;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  const barString = '[' + '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks) + ']';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#050508',
      zIndex: 99999, // Render on top of everything including header nav!
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'var(--font-orbitron)',
      color: '#fff',
      transition: 'opacity 0.8s ease-in-out',
      opacity: shouldFadeOut ? 0 : 1,
      pointerEvents: shouldFadeOut ? 'none' : 'all',
      userSelect: 'none'
    }}>
      {/* Sci-fi scanning background line overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(rgba(0, 242, 254, 0.008) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 254, 0.008) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        pointerEvents: 'none'
      }} />

      {/* Main Terminal Frame */}
      <div className="glass-panel" style={{
        padding: '3rem 4rem',
        border: isComplete ? '1px solid var(--color-green)' : '1px solid rgba(0, 242, 254, 0.25)',
        borderRadius: '12px',
        background: 'rgba(13, 13, 22, 0.85)',
        boxShadow: isComplete ? '0 0 30px rgba(0, 245, 212, 0.05)' : '0 0 30px rgba(0, 242, 254, 0.05)',
        textAlign: 'center',
        position: 'relative',
        minWidth: '320px',
        maxWidth: '600px',
        transition: 'all 0.4s ease'
      }}>
        {/* Glowing corner notches */}
        <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '12px', height: '12px', borderTop: '2px solid ' + (isComplete ? 'var(--color-green)' : 'var(--color-cyan)'), borderLeft: '2px solid ' + (isComplete ? 'var(--color-green)' : 'var(--color-cyan)'), borderRadius: '3px 0 0 0' }} />
        <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '12px', height: '12px', borderTop: '2px solid ' + (isComplete ? 'var(--color-green)' : 'var(--color-cyan)'), borderRight: '2px solid ' + (isComplete ? 'var(--color-green)' : 'var(--color-cyan)'), borderRadius: '0 3px 0 0' }} />
        <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '12px', height: '12px', borderBottom: '2px solid ' + (isComplete ? 'var(--color-green)' : 'var(--color-cyan)'), borderLeft: '2px solid ' + (isComplete ? 'var(--color-green)' : 'var(--color-cyan)'), borderRadius: '0 0 0 3px' }} />
        <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '12px', height: '12px', borderBottom: '2px solid ' + (isComplete ? 'var(--color-green)' : 'var(--color-cyan)'), borderRight: '2px solid ' + (isComplete ? 'var(--color-green)' : 'var(--color-cyan)'), borderRadius: '0 0 3px 0' }} />

        {/* Top title code tag */}
        <div style={{
          fontSize: '9px',
          color: isComplete ? 'var(--color-green)' : 'var(--color-cyan)',
          letterSpacing: '3px',
          marginBottom: '2rem',
          opacity: 0.8
        }}>
          // BOOT_SEQUENCE: INITIALIZE_PORTFOLIO
        </div>

        {/* System Title */}
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          letterSpacing: '4px',
          color: isComplete ? 'var(--color-green)' : '#fff',
          textShadow: isComplete ? '0 0 15px rgba(0, 245, 212, 0.4)' : '0 0 15px rgba(0, 242, 254, 0.2)',
          marginBottom: '1.5rem',
          transition: 'color 0.4s ease'
        }}>
          {isComplete ? '[ SYSTEM INITIALIZATION COMPLETE ]' : '[ SYSTEM INITIALIZATION ]'}
        </h2>

        {/* ASCII Loading Bar */}
        <div style={{
          fontFamily: 'monospace',
          fontSize: '14px',
          letterSpacing: '2px',
          color: isComplete ? 'var(--color-green)' : 'var(--color-cyan)',
          marginBottom: '1.5rem',
          textShadow: isComplete ? '0 0 8px rgba(0, 245, 212, 0.2)' : '0 0 8px rgba(0, 242, 254, 0.2)'
        }}>
          {barString}
        </div>

        {/* Percentage Counter */}
        <div style={{
          fontSize: '2rem',
          fontWeight: 900,
          color: isComplete ? 'var(--color-green)' : '#fff',
          marginBottom: '1.5rem',
          letterSpacing: '1px'
        }}>
          {progress}%
        </div>

        {/* Console Log status message */}
        <div style={{
          fontSize: '10px',
          color: 'var(--text-secondary)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          minHeight: '20px',
          transition: 'all 0.3s ease'
        }}>
          {status}
        </div>
      </div>

      {/* Mini footer details */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        fontSize: '9px',
        color: 'var(--text-muted)',
        letterSpacing: '2px'
      }}>
        XB_CORE.SYS v1.0.0 // PROTOCOL ONLINE
      </div>
    </div>
  );
}
