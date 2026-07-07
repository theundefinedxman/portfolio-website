import ParticleBackground from './components/3d/ParticleBackground';
import InteractiveCanvas from './components/3d/InteractiveCanvas';
import Carousel3D from './components/3d/Carousel3D';
import ExperienceTimeline from './components/ui/ExperienceTimeline';
import ContactForm from './components/ui/ContactForm';
import { Mail, Cpu, Bike, Compass } from 'lucide-react';

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
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-orbitron)',
            fontWeight: 800,
            fontSize: '1.1rem',
            letterSpacing: '2.5px',
            color: 'var(--color-cyan)',
            textShadow: 'var(--shadow-cyan)'
          }}>
            <Cpu size={18} /> XB_CORE.SYS
          </div>

          <nav style={{
            display: 'flex',
            gap: '24px'
          }}>
            {['hero', 'about', 'projects', 'contact'].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
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
                marginBottom: '1.5rem',
                color: '#fff',
                fontWeight: 800
              }}>
                Xolisile <br />
                <span style={{ 
                  background: 'linear-gradient(90deg, var(--color-cyan), var(--color-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 900
                }}>Buqwana</span>
              </h1>
              
              <h2 style={{
                fontSize: '1.3rem',
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-orbitron)',
                textTransform: 'none',
                fontWeight: 500
              }}>
                Software Engineer // BSc Computer Science (UCT)
              </h2>

              <p style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                marginBottom: '2.5rem',
                maxWidth: '580px',
                lineHeight: '1.6'
              }}>
                I specialize in engineering scalable software, designing real-time 3D modules, and crafting high-performance, responsive web architectures.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => scrollToSection('projects')} className="cyber-button">
                  VIEW PROJECTS
                </button>
                <button onClick={() => scrollToSection('contact')} className="cyber-button" style={{ borderColor: 'var(--color-purple)', color: '#c084fc' }}>
                  GET IN TOUCH
                </button>
              </div>

              {/* Social Channels Link Icons */}
              <div style={{
                display: 'flex',
                gap: '1.8rem',
                marginTop: '3.5rem'
              }}>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--text-secondary)' }}>
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--text-secondary)' }}>
                  <Linkedin size={20} />
                </a>
                <a href="mailto:xolisilebuqwana@gmail.com" aria-label="Email" style={{ color: 'var(--text-secondary)' }}>
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
              <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                I am a Software Engineer with a computer science background from the <strong>University of Cape Town (UCT)</strong>. I aim to create code structures that are not only robust and highly-performant but also visually captivating.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                When offline, I’m usually active outdoors. You can find me riding Chapman's Peak on my road bicycle or hiking up the trails around Table Mountain to gain fresh focus and energy.
              </p>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span className="hobby-tag">
                  <Compass size={13} /> Hiking Trails
                </span>
                <span className="hobby-tag">
                  <Bike size={13} /> Road Cycling
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

          <ExperienceTimeline />
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
