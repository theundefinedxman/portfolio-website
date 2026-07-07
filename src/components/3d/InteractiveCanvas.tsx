import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface NodeProps {
  name: string;
  color: string;
  initialPos: [number, number, number];
  shape: 'sphere' | 'cube' | 'torus' | 'torusKnot' | 'cone';
  sectionId: string;
}

function InteractiveNode({ name, color, initialPos, shape, sectionId }: NodeProps) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Mechanics and physics states
  const pos = useRef(new THREE.Vector3(...initialPos));
  const vel = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 0.04,
    (Math.random() - 0.5) * 0.04,
    0
  ));

  useFrame((state) => {
    if (!ref.current) return;

    // Boundary constraints (subtracting radius margin of 0.6)
    const xLimit = viewport.width / 2 - 0.7;
    const yLimit = viewport.height / 2 - 0.7;

    if (isDragging) {
      // Direct drag mapping to 3D coordinate
      const targetX = (state.pointer.x * viewport.width) / 2;
      const targetY = (state.pointer.y * viewport.height) / 2;
      const nextPos = new THREE.Vector3(targetX, targetY, 0);
      
      // Calculate velocity vector based on drag distance delta
      vel.current.subVectors(nextPos, pos.current).multiplyScalar(0.25);
      pos.current.copy(nextPos);
    } else {
      // Apply momentum
      pos.current.add(vel.current);

      // Bounce physics off walls
      if (pos.current.x > xLimit) {
        pos.current.x = xLimit;
        vel.current.x *= -0.75;
      } else if (pos.current.x < -xLimit) {
        pos.current.x = -xLimit;
        vel.current.x *= -0.75;
      }

      if (pos.current.y > yLimit) {
        pos.current.y = yLimit;
        vel.current.y *= -0.75;
      } else if (pos.current.y < -yLimit) {
        pos.current.y = -yLimit;
        vel.current.y *= -0.75;
      }

      // Air friction damping
      vel.current.multiplyScalar(0.975);

      // Keep items in constant micro-drifting movement when energy depletes
      if (vel.current.length() < 0.005) {
        vel.current.set(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          0
        );
      }
    }

    // Update position and rotation
    ref.current.position.copy(pos.current);
    ref.current.rotation.x += 0.008 + vel.current.y * 0.05;
    ref.current.rotation.y += 0.012 + vel.current.x * 0.05;
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  const handleClick = () => {
    if (vel.current.length() < 0.05) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <group
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
      onClick={handleClick}
    >
      {/* Central Mesh */}
      {shape === 'sphere' && (
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} emissive={color} emissiveIntensity={hovered ? 1.2 : 0.3} />
        </mesh>
      )}
      {shape === 'cube' && (
        <mesh>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial color={color} roughness={0.15} metalness={0.7} emissive={color} emissiveIntensity={hovered ? 1.2 : 0.25} />
        </mesh>
      )}
      {shape === 'torus' && (
        <mesh>
          <torusGeometry args={[0.42, 0.16, 16, 64]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.85} emissive={color} emissiveIntensity={hovered ? 1.2 : 0.25} />
        </mesh>
      )}
      {shape === 'torusKnot' && (
        <mesh>
          <torusKnotGeometry args={[0.33, 0.11, 64, 8]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} emissive={color} emissiveIntensity={hovered ? 1.2 : 0.3} />
        </mesh>
      )}
      {shape === 'cone' && (
        <mesh>
          <coneGeometry args={[0.45, 0.9, 4]} />
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.6} emissive={color} emissiveIntensity={hovered ? 1.2 : 0.25} />
        </mesh>
      )}

      {/* Outer Wireframe Halo on Hover */}
      {hovered && (
        <mesh scale={1.22}>
          {shape === 'sphere' && <sphereGeometry args={[0.55, 16, 16]} />}
          {shape === 'cube' && <boxGeometry args={[0.9, 0.9, 0.9]} />}
          {shape === 'torus' && <torusGeometry args={[0.42, 0.16, 8, 32]} />}
          {shape === 'torusKnot' && <torusKnotGeometry args={[0.33, 0.11, 32, 6]} />}
          {shape === 'cone' && <coneGeometry args={[0.45, 0.9, 4]} />}
          <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
        </mesh>
      )}

      {/* Floating 2D Label */}
      <Html distanceFactor={8} position={[0, -0.85, 0]} center>
        <div style={{
          background: 'rgba(10, 10, 20, 0.9)',
          color: '#ffffff',
          border: `1px solid ${color}`,
          padding: '4px 10px',
          borderRadius: '4px',
          fontFamily: 'var(--font-orbitron)',
          fontSize: '10px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          boxShadow: `0 0 10px ${color}33`,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.2s ease, background 0.2s ease',
          userSelect: 'none'
        }}>
          {name}
        </div>
      </Html>
    </group>
  );
}

export default function InteractiveCanvas() {
  return (
    <div className="interactive-canvas-container">
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '16px',
        zIndex: 10,
        pointerEvents: 'none',
        fontFamily: 'var(--font-orbitron)',
        fontSize: '10px',
        color: 'var(--text-muted)',
        letterSpacing: '1px'
      }}>
        [ INTERACTIVE HOLOGRID CANVAS // DRAG, TOSS, OR CLICK NODES ]
      </div>
      
      <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 4, 3]} intensity={1.5} />
        <pointLight position={[-2, -4, -3]} intensity={0.5} />
        
        {/* Five Interactive Nodes */}
        <InteractiveNode name="System Core" color="#00f2fe" initialPos={[-1.8, 1.0, 0]} shape="sphere" sectionId="hero" />
        <InteractiveNode name="About Dev" color="#9d4edd" initialPos={[1.8, 1.0, 0]} shape="cube" sectionId="about" />
        <InteractiveNode name="Project Ring" color="#f72585" initialPos={[-1.6, -1.0, 0]} shape="torus" sectionId="projects" />
        <InteractiveNode name="Hobbies Node" color="#00f5d4" initialPos={[1.6, -1.0, 0]} shape="torusKnot" sectionId="about" />
        <InteractiveNode name="Link Channel" color="#ffb703" initialPos={[0, 0, 0]} shape="cone" sectionId="contact" />
      </Canvas>
    </div>
  );
}
