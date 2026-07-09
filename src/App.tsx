import { useState } from 'react';
import ParticleBackground from './components/3d/ParticleBackground';
import InteractiveCanvas from './components/3d/InteractiveCanvas';
import Carousel3D from './components/3d/Carousel3D';
import ExperienceTimeline from './components/ui/ExperienceTimeline';
import ContactForm from './components/ui/ContactForm';
import LoadingScreen from './components/ui/LoadingScreen';
import { playSound } from './utils/sound';
import { Mail, Cpu, Bike, Music, Trophy, GraduationCap, Terminal, Activity } from 'lucide-react';

const Github = ({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => {
      setIsLoading(false);
      playSound.boot();
    }} />;
  }

  return (
    <>
      {/* 3D Fixed Background Particles */}
      <ParticleBackground />

      {/* High-tech HUD Header Navigation */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        background: 'rgba(5, 5, 8, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '1rem 2rem'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 0
        }}>
          <div 
            onClick={() => {
              playSound.click();
              scrollToSection('hero');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-orbitron)',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '2.5px',
              color: 'var(--color-cyan)',
              textShadow: 'var(--shadow-cyan)',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'opacity 0.2s ease'
            }}
            onMouseOver={(e) => {
              playSound.hover();
              (e.currentTarget as HTMLDivElement).style.opacity = '0.8';
            }}
            onMouseOut={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = '1.0'; }}
          >
            <Cpu size={18} /> XB_CORE.SYS
          </div>

          <nav style={{
            display: 'flex',
            gap: '24px'
          }}>
            {['hero', 'about', 'projects', 'contact'].map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  playSound.click();
                  scrollToSection(sec);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '10px',
                  letterSpacing: '1.5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase'
                }}
                onMouseOver={(e) => {
                  playSound.hover();
                  (e.target as HTMLButtonElement).style.color = 'var(--color-cyan)';
                  (e.target as HTMLButtonElement).style.textShadow = 'var(--shadow-cyan)';
                }}
                onMouseOut={(e) => {
                  (e.target as HTMLButtonElement).style.color = 'var(--text-secondary)';
                  (e.target as HTMLButtonElement).style.textShadow = 'none';
                }}
              >
                // {sec}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* HERO SECTION */}
        <section id="hero">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '3rem',
            alignItems: 'center'
          }} className="form-grid">
            <div className="hero-content">
              <div style={{
                fontFamily: 'var(--font-orbitron)',
                color: 'var(--color-cyan)',
                fontSize: '11px',
                letterSpacing: '4px',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                fontWeight: 600
              }} className="text-glow-cyan">
                [ SYSTEM INITIALIZATION OPERATIONAL ]
              </div>
              
              <h1 style={{
                fontSize: '3.6rem',
                lineHeight: '1.1',
                marginBottom: '1.2rem',
                color: '#fff',
                fontWeight: 800
              }}>
                Hi there, I'm <br />
                <span style={{ 
                  background: 'linear-gradient(90deg, var(--color-cyan), var(--color-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 900
                }}>Sxova 👋</span>
              </h1>

              {/* Glowing Console Message */}
              <div style={{
                background: 'rgba(5, 5, 8, 0.75)',
                border: '1px solid rgba(0, 242, 254, 0.25)',
                padding: '10px 16px',
                borderRadius: '6px',
                fontFamily: 'var(--font-orbitron)',
                fontSize: '0.85rem',
                color: '#00f2fe',
                display: 'inline-block',
                marginBottom: '1.8rem',
                letterSpacing: '1px',
                boxShadow: 'inset 0 0 10px rgba(0, 242, 254, 0.05), 0 0 15px rgba(0, 242, 254, 0.05)'
              }}>
                <span style={{ color: '#f72585' }}>System</span>.<span style={{ color: '#9d4edd' }}>out</span>.println(<span style={{ color: '#00f5d4' }}>"Welcome to my world!"</span>);
              </div>
              
              {/* Developer Diagnostics Terminal */}
              <div className="glass-panel" style={{
                padding: '1.5rem',
                border: '1px solid rgba(0, 242, 254, 0.15)',
                borderRadius: '8px',
                position: 'relative',
                background: 'rgba(10, 10, 20, 0.6)',
                backdropFilter: 'blur(10px)',
                maxWidth: '540px',
                marginBottom: '2.5rem',
                boxShadow: '0 8px 32px 0 rgba(0, 242, 254, 0.02)',
              }}>
                {/* Corner high-tech brackets */}
                <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '8px', height: '8px', borderTop: '2px solid var(--color-cyan)', borderLeft: '2px solid var(--color-cyan)', borderRadius: '2px 0 0 0' }} />
                <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '8px', height: '8px', borderBottom: '2px solid var(--color-cyan)', borderRight: '2px solid var(--color-cyan)', borderRadius: '0 0 2px 0' }} />

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '9px',
                  letterSpacing: '1.5px',
                  color: 'var(--text-muted)',
                  marginBottom: '1rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingBottom: '8px'
                }}>
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: 'var(--color-green)', borderRadius: '50%', boxShadow: '0 0 8px var(--color-green)' }} />
                  SYS.STATUS // PROFILE_LOGS.EXE
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)'
                }}>
                  {/* Item 1: Education */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'rgba(0, 242, 254, 0.1)',
                      border: '1px solid rgba(0, 242, 254, 0.25)',
                      color: 'var(--color-cyan)',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <GraduationCap size={15} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '10px', color: 'var(--color-cyan)', letterSpacing: '0.5px', marginBottom: '2px' }}>ACADEMICS</div>
                      <span style={{ color: '#fff' }}>BSc Computer Science & Computer Engineering</span> at the <span style={{ color: 'var(--color-cyan)', fontWeight: 500 }}>University of Cape Town</span>
                    </div>
                  </div>

                  {/* Item 2: Focus */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'rgba(157, 78, 221, 0.1)',
                      border: '1px solid rgba(157, 78, 221, 0.25)',
                      color: 'var(--color-purple)',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <Terminal size={15} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '10px', color: 'var(--color-purple)', letterSpacing: '0.5px', marginBottom: '2px' }}>SPECIALIZATION</div>
                      Aspiring Software Engineer specialized in <span style={{ color: '#fff' }}>Network Protocols & Cloud Architectures</span>
                    </div>
                  </div>

                  {/* Item 3: Mission */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'rgba(247, 37, 133, 0.1)',
                      border: '1px solid rgba(247, 37, 133, 0.25)',
                      color: 'var(--color-pink)',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <Activity size={15} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '10px', color: 'var(--color-pink)', letterSpacing: '0.5px', marginBottom: '2px' }}>CORE_MISSION</div>
                      Designing <span style={{ color: '#fff' }}>resilient, real-world technologies</span> that bridge systems and human needs
                    </div>
                  </div>
                </div>
              </div>

               <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => {
                    playSound.click();
                    scrollToSection('projects');
                  }}
                  onMouseOver={() => playSound.hover()}
                  className="cyber-button"
                >
                  VIEW PROJECTS
                </button>
                <button 
                  onClick={() => {
                    playSound.click();
                    scrollToSection('contact');
                  }}
                  onMouseOver={() => playSound.hover()}
                  className="cyber-button" 
                  style={{ borderColor: 'var(--color-purple)', color: '#c084fc' }}
                >
                  GET IN TOUCH
                </button>
              </div>

              {/* Social Channels Link Icons */}
              <div style={{
                display: 'flex',
                gap: '1.8rem',
                marginTop: '3.5rem'
              }}>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="GitHub" 
                  onClick={() => playSound.click()}
                  onMouseOver={() => playSound.hover()}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn" 
                  onClick={() => playSound.click()}
                  onMouseOver={() => playSound.hover()}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="mailto:xolisilebuqwana@gmail.com" 
                  aria-label="Email" 
                  onClick={() => playSound.click()}
                  onMouseOver={() => playSound.hover()}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Draggable and throwable interactive 3D nodes */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%'
            }}>
              <InteractiveCanvas />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about">
          <h2 className="section-title">// About Dev</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '2.5rem',
            marginBottom: '4rem'
          }} className="form-grid">
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-orbitron)', fontSize: '1.1rem', color: '#fff', marginBottom: '1.2rem', letterSpacing: '1px' }}>
                Core Bio & Philosophy
              </h3>
              <p style={{ fontSize: '0.95rem', marginBottom: '1.2rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                I enjoy turning ideas into practical software solutions, whether it's developing desktop applications, building web platforms, or exploring network infrastructure. I'm particularly interested in backend development, networking, cloud computing, and open-source software.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                For a bit of context, I like problems that sit between people and systems, where the technical constraints (compliance, settlement rails, legacy infrastructure) meet real human friction (cost, trust, access).
              </p>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span className="hobby-tag">
                  <Trophy size={13} /> Chess
                </span>
                <span className="hobby-tag">
                  <Bike size={13} /> Cycling
                </span>
                <span className="hobby-tag">
                  <Music size={13} /> Afro Deep House beats
                </span>
              </div>
            </div>

            {/* Skill bars / System specifications */}
            <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-orbitron)', fontSize: '1.1rem', color: '#fff', marginBottom: '0.2rem', letterSpacing: '1px' }}>
                Technical Matrix
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', fontFamily: 'var(--font-orbitron)' }}>
                    <span>Software Development (TS/React)</span>
                    <span style={{ color: 'var(--color-cyan)' }}>90%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                    <div style={{ width: '90%', height: '100%', background: 'var(--color-cyan)', boxShadow: 'var(--shadow-cyan)', borderRadius: '2px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', fontFamily: 'var(--font-orbitron)' }}>
                    <span>Systems Architecture (Rust/C++)</span>
                    <span style={{ color: 'var(--color-purple)' }}>80%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                    <div style={{ width: '80%', height: '100%', background: 'var(--color-purple)', boxShadow: 'var(--shadow-purple)', borderRadius: '2px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', fontFamily: 'var(--font-orbitron)' }}>
                    <span>3D Rendering & Shaders (R3F/GLSL)</span>
                    <span style={{ color: 'var(--color-pink)' }}>85%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                    <div style={{ width: '85%', height: '100%', background: 'var(--color-pink)', boxShadow: 'var(--shadow-pink)', borderRadius: '2px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CURRENT ACTIVE RESEARCH PANEL */}
          <div className="glass-panel" style={{
            padding: '2.5rem',
            margin: '2.5rem 0',
            border: '1px solid rgba(157, 78, 221, 0.25)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              fontFamily: 'var(--font-orbitron)',
              fontSize: '8px',
              color: 'var(--color-purple)',
              letterSpacing: '2px',
              border: '1px solid rgba(157, 78, 221, 0.4)',
              padding: '3px 8px',
              borderRadius: '10px'
            }}>
              [ ACTIVE LOG ]
            </div>
            
            <h3 style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '1.1rem',
              color: '#fff',
              marginBottom: '1.2rem',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🔭 Currently Working On
            </h3>
            
            <h4 style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '0.95rem',
              color: 'var(--color-cyan)',
              marginBottom: '0.8rem',
              letterSpacing: '0.5px'
            }}>
              🌍 Cross-Border Payments Remittance (SADC Region)
            </h4>
            
            <p style={{
              fontSize: '0.94rem',
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              marginBottom: '1rem'
            }}>
              I\'ve been digging into the software mechanics of P2P remittance systems for the SADC region: MTOs, KYC/AML compliance, ISO 20022 messaging, PAPSS, SADC RTGS, and mobile money rails. 
            </p>
            
            <p style={{
              fontSize: '0.94rem',
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              fontWeight: 500
            }}>
              The goal is understanding where cost, speed, access, and transparency break down for the people who need these systems most.
            </p>
          </div>

          <ExperienceTimeline />

          <div style={{
            textAlign: 'center',
            marginTop: '2.5rem',
            fontFamily: 'var(--font-orbitron)',
            color: 'var(--text-muted)',
            fontSize: '11px',
            letterSpacing: '1.5px'
          }}>
            // Currently learning, expect this profile to evolve as code does.
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <h2 className="section-title">// Projects Log</h2>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            textAlign: 'center',
            maxWidth: '600px',
            marginInline: 'auto',
            fontSize: '0.95rem'
          }}>
            Explore some of my systems and graphics projects below. Use the manual buttons at the bottom of the WebGL viewport to spin cards.
          </p>
          <Carousel3D />
        </section>

        {/* CONTACT SECTION */}
        <section id="contact">
          <h2 className="section-title" style={{ textAlign: 'center', display: 'block', marginInline: 'auto', width: 'fit-content' }}>
            // Contact Channels
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            textAlign: 'center',
            maxWidth: '500px',
            marginInline: 'auto',
            fontSize: '0.95rem'
          }}>
            Get in touch to collaborate, chat about WebGL development, or discuss road loops around Cape Town!
          </p>
          <ContactForm />
        </section>

        {/* FOOTER */}
        <footer style={{
          padding: '4rem 0 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          textAlign: 'center',
          fontFamily: 'var(--font-orbitron)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '1.5px'
        }}>
          [ XB_CORE v1.0.0 // CONNECTED REMOTE ORIGIN // COPYRIGHT 2026 ]
        </footer>

      </main>
    </>
  );
}

export default App;
