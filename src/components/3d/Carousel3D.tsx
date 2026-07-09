import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { playSound } from '../../utils/sound';

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

interface Project {
  title: string;
  desc: string;
  tech: string[];
  link: string;
  github: string;
}

const projects: Project[] = [
  {
    title: "Interledger Payments Hub",
    desc: "Open payments solution developed during the UCT Financial Innovation Hub hackathon, designing secure P2P ledger systems.",
    tech: ["Python", "Interledger API", "Fintech"],
    link: "https://github.com/theundefinedxman/UCT-Financial-innovation-Hub-x-Interledger-hackathon",
    github: "https://github.com/theundefinedxman/UCT-Financial-innovation-Hub-x-Interledger-hackathon"
  },
  {
    title: "Neural Network Optimizer",
    desc: "Constructing and optimizing artificial neural networks from scratch. Focuses on feedforward propagation, backpropagation, and training speed.",
    tech: ["Python", "NumPy", "Deep Learning", "Math"],
    link: "https://github.com/theundefinedxman/Neural-Network",
    github: "https://github.com/theundefinedxman/Neural-Network"
  },
  {
    title: "Neural Nets Architecture",
    desc: "Dedicated codebase for crafting complex network layouts, gradient descent tuning, and cost function minimization.",
    tech: ["Python", "Machine Learning", "Optimization"],
    link: "https://github.com/theundefinedxman/Neural-Networks-Project",
    github: "https://github.com/theundefinedxman/Neural-Networks-Project"
  },
  {
    title: "STM32F4 Audio Sampler",
    desc: "Real-time audio signal acquisition and sampling system built on the STM32F4 processor, utilizing ADC/DAC modules.",
    tech: ["C", "STM32F4", "DSP", "Embedded Systems"],
    link: "https://github.com/theundefinedxman/EEE3096S-2025-Practical-4",
    github: "https://github.com/theundefinedxman/EEE3096S-2025-Practical-4"
  },
  {
    title: "Perceptron Applications",
    desc: "Implementation of basic perceptron models, evaluating their boundaries, training weights, and applications in binary classification.",
    tech: ["Python", "Scikit-Learn", "Machine Learning"],
    link: "https://github.com/theundefinedxman/Perceptron-Implementation-and-Applications",
    github: "https://github.com/theundefinedxman/Perceptron-Implementation-and-Applications"
  },
  {
    title: "STM32 Profiler & Benchmark",
    desc: "Performance analysis, profiling, and benchmarking comparing execution runtimes between STM32F0 and STM32F4 processors.",
    tech: ["C", "STM32F4", "Benchmarking", "ARM Cortex"],
    link: "https://github.com/theundefinedxman/EEE3096S-2025-Practical-3",
    github: "https://github.com/theundefinedxman/EEE3096S-2025-Practical-3"
  },
  {
    title: "WDI Machine Learning",
    desc: "Supervised machine learning analysis of the World Development Index dataset to predict indicators and evaluate growth trends.",
    tech: ["Python", "Pandas", "Scikit-Learn", "Regression"],
    link: "https://github.com/theundefinedxman/World-Development-Index-Machine-Learning-Analysis",
    github: "https://github.com/theundefinedxman/World-Development-Index-Machine-Learning-Analysis"
  },
  {
    title: "STM32F0 Assembly GPIO",
    desc: "Low-level firmware utilizing ARM Assembly code to directly configure and command the GPIO registers of the STM32F0 MCU.",
    tech: ["ARM Assembly", "STM32F0", "GPIO", "Hardware Link"],
    link: "https://github.com/theundefinedxman/EEE3096S-2025-Practical-2",
    github: "https://github.com/theundefinedxman/EEE3096S-2025-Practical-2"
  },
  {
    title: "Mandelbrot STM32 Benchmark",
    desc: "Benchmarking the computing performance of the STM32F0 microcontroller using complex fractal Mandelbrot set rendering loops.",
    tech: ["C", "STM32F0", "Mandelbrot", "Low-Level Math"],
    link: "https://github.com/theundefinedxman/EEE3096-2025-Practical-1B--Public",
    github: "https://github.com/theundefinedxman/EEE3096-2025-Practical-1B--Public"
  },
  {
    title: "STM32 Interrupt Controller",
    desc: "Firmware setup establishing precise hardware timer interrupts, input capture, LEDs, and interactive pushbuttons on the STM32.",
    tech: ["C", "STM32", "Interrupts", "Timers"],
    link: "https://github.com/theundefinedxman/EEE3096-2025-Practical-1A-",
    github: "https://github.com/theundefinedxman/EEE3096-2025-Practical-1A-"
  },
  {
    title: "Prodigy Unit Converter",
    desc: "A desktop/web utility package converting between various metrics, weights, lengths, and temperature scales.",
    tech: ["Python", "Tkinter", "GUI Tools"],
    link: "https://github.com/theundefinedxman/Prodigy-Internship-Task-1-Unit-Converters",
    github: "https://github.com/theundefinedxman/Prodigy-Internship-Task-1-Unit-Converters"
  },
  {
    title: "Prodigy Guessing Game",
    desc: "An interactive CLI-based numerical guessing game featuring customizable ranges, scoring systems, and feedback hints.",
    tech: ["Python", "CLI", "Game Logic"],
    link: "https://github.com/theundefinedxman/Prodigy-Internship-Task-2-Guessing-Game",
    github: "https://github.com/theundefinedxman/Prodigy-Internship-Task-2-Guessing-Game"
  }
];

interface CarouselRingProps {
  activeIndex: number;
  isMobile: boolean;
}

function CarouselRing({ activeIndex, isMobile }: CarouselRingProps) {
  const ringRef = useRef<THREE.Group>(null);
  const count = projects.length;
  const radius = isMobile ? 3.8 : 4.8; // Pull in slightly tighter on mobile

  // Target angle rotation
  const targetRotationY = -(activeIndex * (Math.PI * 2)) / count;

  useFrame(() => {
    if (!ringRef.current) return;
    // Smoothly interpolate rotation toward target
    ringRef.current.rotation.y = THREE.MathUtils.lerp(
      ringRef.current.rotation.y,
      targetRotationY,
      0.08
    );
  });

  return (
    <group ref={ringRef}>
      {projects.map((project, idx) => {
        // Calculate radial coordinates
        const angle = (idx * (Math.PI * 2)) / count;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);

        return (
          <group 
            key={idx} 
            position={[x, isMobile ? -0.5 : -0.65, z]}
            rotation={[0, angle, 0]}
            scale={isMobile ? 0.72 : 1.0}
          >
            {/* The 3D CSS Card */}
            <Html 
              transform 
              center
              distanceFactor={isMobile ? 1.25 : 1.15}
              style={{ pointerEvents: 'auto' }}
            >
              <div style={{
                width: '320px',
                padding: '20px',
                background: 'rgba(13, 13, 22, 0.9)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: idx === activeIndex ? '2px solid var(--color-cyan)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                boxShadow: idx === activeIndex ? 'var(--shadow-cyan)' : '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
                transform: idx === activeIndex ? 'scale(1.05)' : 'scale(0.9)',
                opacity: idx === activeIndex ? 1 : 0.35,
                transition: 'all 0.4s ease',
                userSelect: 'none'
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-orbitron)',
                  color: idx === activeIndex ? 'var(--color-cyan)' : '#fff',
                  fontSize: '18px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  {project.title}
                  {idx === activeIndex && (
                    <span style={{ 
                      fontSize: '9px', 
                      background: 'rgba(0, 242, 254, 0.1)', 
                      padding: '2px 6px', 
                      borderRadius: '10px',
                      color: 'var(--color-cyan)',
                      border: '1px solid var(--color-cyan)'
                    }}>ACTIVE</span>
                  )}
                </h3>
                
                <p style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  marginBottom: '15px',
                  lineHeight: '1.5'
                }}>
                  {project.desc}
                </p>

                {/* Tech Badges */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '20px'
                }}>
                  {project.tech.map((t, i) => (
                    <span key={i} style={{
                      fontSize: '10px',
                      background: 'rgba(157, 78, 221, 0.12)',
                      border: '1px solid rgba(157, 78, 221, 0.3)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      color: '#c084fc',
                      fontFamily: 'var(--font-orbitron)'
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '12px'
                }}>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => playSound.click()}
                    onMouseOver={() => playSound.hover()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <Github size={14} /> Code
                  </a>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => playSound.click()}
                    onMouseOver={() => playSound.hover()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: 'var(--color-cyan)'
                    }}
                  >
                    <ExternalLink size={14} /> Demo
                  </a>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function Carousel3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: isMobile ? '480px' : '580px', overflow: 'hidden' }}>
      {/* 3D Canvas Area (adjusted camera to 6.4 to maintain proportion with radius 4.8) */}
      <Canvas camera={{ position: [0, 0, isMobile ? 5.8 : 6.4], fov: 60 }} style={{ pointerEvents: 'auto', height: '100%', width: '100%' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <CarouselRing activeIndex={activeIndex} isMobile={isMobile} />
      </Canvas>

      {/* Manual Navigation Controls */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        zIndex: 10
      }}>
        <button 
          onClick={() => {
            playSound.click();
            handlePrev();
          }}
          onMouseOver={() => playSound.hover()}
          className="cyber-button"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', padding: '0', borderRadius: '50%' }}
          aria-label="Previous Project"
        >
          <ChevronLeft size={20} />
        </button>
        
        <span style={{ 
          fontFamily: 'var(--font-orbitron)', 
          fontSize: '14px', 
          color: 'var(--text-primary)',
          letterSpacing: '2px'
        }}>
          {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1} / {projects.length < 10 ? `0${projects.length}` : projects.length}
        </span>

        <button 
          onClick={() => {
            playSound.click();
            handleNext();
          }}
          onMouseOver={() => playSound.hover()}
          className="cyber-button"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', padding: '0', borderRadius: '50%' }}
          aria-label="Next Project"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
