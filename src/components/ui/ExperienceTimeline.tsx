import { Briefcase, GraduationCap, Bike, Compass, Terminal, Shield, Music, Trophy } from 'lucide-react';

interface TimelineEntry {
  type: 'work' | 'education' | 'hobby';
  date: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
}

const timelineData: TimelineEntry[] = [
  {
    type: 'work',
    date: '2024 - PRESENT',
    title: 'Software Engineer',
    subtitle: 'Apex Tech Solutions',
    desc: 'Developing high-performance React web applications, optimizing graphics-heavy UI dashboards, and designing backend microservices in Node.js and Rust.',
    tags: ['React', 'TypeScript', 'Node.js', 'Rust', 'Docker']
  },
  {
    type: 'hobby',
    date: 'WEEKENDS & HOLIDAYS',
    title: 'Peninsula Cycle Climber',
    subtitle: 'Cape Town Routes & Trails',
    desc: 'Conquering the steep coastal climbs of Chapman\'s Peak and logging training miles. Keeps my energy high and my discipline sharp.',
    tags: ['Cycling', 'Endurance', 'Active Lifestyle', 'Cape Town Loops']
  },
  {
    type: 'education',
    date: '2021 - PRESENT',
    title: 'Computer Science & Computer Engineering',
    subtitle: 'University of Cape Town',
    desc: 'Studying algorithms, computer systems, computer networking, cloud computing, and hardware-software integration.',
    tags: ['Algorithms', 'C++', 'Python', 'Networking', 'Systems']
  },
  {
    type: 'hobby',
    date: 'LEISURE',
    title: 'Afro Deep House Beats Producer',
    subtitle: 'Electronic Music Composition',
    desc: 'Producing deep rhythmic tracks in FL Studio. Merging technical software synthesis, sound engineering, and organic percussive textures.',
    tags: ['Beats Production', 'Afro House', 'FL Studio', 'Sound Design']
  },
  {
    type: 'hobby',
    date: 'CONTINUOUS',
    title: 'Tactical Chess Player',
    subtitle: 'Board Strategies & Analysis',
    desc: 'Analyzing board positions, pattern recognition, and tactical lines. Chess keeps my mind sharp for software debugging and complex system problem-solving.',
    tags: ['Chess', 'Tactics', 'Pattern Recognition', 'Focus']
  },
  {
    type: 'work',
    date: '2023 (6 Months)',
    title: 'Junior Web Developer (Intern)',
    subtitle: 'ByteCraft Labs',
    desc: 'Assisted in building responsive dashboards, writing automation integration tests, and documenting internal developer APIs.',
    tags: ['JavaScript', 'HTML/CSS', 'Git', 'Jest', 'API Integration']
  }
];

export default function ExperienceTimeline() {
  const getIcon = (item: TimelineEntry) => {
    if (item.type === 'work') return <Briefcase size={16} color="var(--color-cyan)" />;
    if (item.type === 'education') return <GraduationCap size={16} color="var(--color-purple)" />;
    if (item.type === 'hobby') {
      if (item.title.toLowerCase().includes('cycle') || item.title.toLowerCase().includes('cycling')) {
        return <Bike size={16} color="var(--color-green)" />;
      }
      if (item.title.toLowerCase().includes('beats') || item.title.toLowerCase().includes('house')) {
        return <Music size={16} color="var(--color-green)" />;
      }
      if (item.title.toLowerCase().includes('chess')) {
        return <Trophy size={16} color="var(--color-green)" />;
      }
      return <Compass size={16} color="var(--color-green)" />;
    }
    return <Terminal size={16} color="var(--text-primary)" />;
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'var(--color-cyan)';
      case 'education':
        return 'var(--color-purple)';
      case 'hobby':
        return 'var(--color-green)';
      default:
        return 'rgba(255, 255, 255, 0.15)';
    }
  };

  return (
    <div className="timeline">
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        fontFamily: 'var(--font-orbitron)',
        color: 'var(--text-muted)',
        fontSize: '11px',
        letterSpacing: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}>
        <Shield size={12} color="var(--color-cyan)" />
        [ VERIFIED HISTORY LOG // CHRONOLOGY ACTIVE ]
      </div>

      {timelineData.map((item, index) => {
        const borderCol = getBorderColor(item.type);
        return (
          <div key={index} className="timeline-item">
            {/* Dot marker on the vertical line */}
            <div 
              className="timeline-dot" 
              style={{ borderColor: borderCol, boxShadow: `0 0 10px ${borderCol}66` }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-primary)',
                borderRadius: '50%'
              }}>
                {getIcon(item)}
              </div>
            </div>

            {/* Glowing Glass Card */}
            <div className="timeline-content glass-panel" style={{
              borderLeft: `4px solid ${borderCol}`
            }}>
              <div className="timeline-date">{item.date}</div>
              
              <h3 style={{
                fontSize: '1.2rem',
                color: '#fff',
                marginBottom: '4px',
                fontFamily: 'var(--font-orbitron)',
                letterSpacing: '0.5px'
              }}>
                {item.title}
              </h3>
              
              <h4 style={{
                fontSize: '0.9rem',
                color: item.type === 'hobby' ? 'var(--color-green)' : 'var(--text-secondary)',
                fontWeight: 500,
                marginBottom: '12px'
              }}>
                {item.subtitle}
              </h4>

              <p style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                marginBottom: '16px',
                lineHeight: '1.6'
              }}>
                {item.desc}
              </p>

              {/* Badges */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {item.tags.map((t, idx) => (
                  <span 
                    key={idx} 
                    className={item.type === 'hobby' ? 'hobby-tag' : 'skill-badge'}
                    style={item.type === 'hobby' ? { fontSize: '0.75rem', padding: '0.2rem 0.6rem' } : undefined}
                  >
                    {item.type === 'hobby' && (item.title.toLowerCase().includes('cycle') || item.title.toLowerCase().includes('cycling')) && <Bike size={12} style={{ marginRight: '3px' }} />}
                    {item.type === 'hobby' && (item.title.toLowerCase().includes('beats') || item.title.toLowerCase().includes('house')) && <Music size={12} style={{ marginRight: '3px' }} />}
                    {item.type === 'hobby' && item.title.toLowerCase().includes('chess') && <Trophy size={12} style={{ marginRight: '3px' }} />}
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
