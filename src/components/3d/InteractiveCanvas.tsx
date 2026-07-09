import { useRef, useState, useMemo } from 'react';
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

  const pos = useRef(new THREE.Vector3(...initialPos));
  const vel = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 0.04,
    (Math.random() - 0.5) * 0.04,
    0
  ));

  useFrame((state) => {
    if (!ref.current) return;

    const xLimit = viewport.width / 2 - 0.7;
    const yLimit = viewport.height / 2 - 0.7;

    if (isDragging) {
      const targetX = (state.pointer.x * viewport.width) / 2;
      const targetY = (state.pointer.y * viewport.height) / 2;
      const nextPos = new THREE.Vector3(targetX, targetY, 0);
      
      vel.current.subVectors(nextPos, pos.current).multiplyScalar(0.25);
      pos.current.copy(nextPos);
    } else {
      pos.current.add(vel.current);

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

      vel.current.multiplyScalar(0.975);

      if (vel.current.length() < 0.005) {
        vel.current.set(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          0
        );
      }
    }

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

/* 3D Road Bike Component (Low-Poly Cyberpunk Styling) */
function RoadBike() {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 2.3;
  const speed = 0.55;

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const angle = time * speed;

    // Orbit in X-Z space
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = Math.sin(time * 1.8) * 0.15 + 0.1;

    groupRef.current.position.set(x, y, z);
    
    // Face the direction of motion (tangent to orbit)
    groupRef.current.rotation.y = -angle + Math.PI / 2;

    // Rotate/spin wheels
    const frontWheel = groupRef.current.getObjectByName('front-w');
    const rearWheel = groupRef.current.getObjectByName('rear-w');
    if (frontWheel) frontWheel.rotation.x = time * 4.5;
    if (rearWheel) rearWheel.rotation.x = time * 4.5;
  });

  return (
    <group ref={groupRef} scale={0.42}>
      {/* Wheels */}
      <group name="rear-w" position={[-0.65, -0.4, 0]}>
        <mesh>
          <torusGeometry args={[0.3, 0.024, 6, 20]} />
          <meshStandardMaterial color="var(--color-cyan)" emissive="var(--color-cyan)" emissiveIntensity={0.7} />
        </mesh>
        <mesh rotation={[0, 0, 0]}>
          <boxGeometry args={[0.6, 0.01, 0.01]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.6, 0.01, 0.01]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      <group name="front-w" position={[0.65, -0.4, 0]}>
        <mesh>
          <torusGeometry args={[0.3, 0.024, 6, 20]} />
          <meshStandardMaterial color="var(--color-cyan)" emissive="var(--color-cyan)" emissiveIntensity={0.7} />
        </mesh>
        <mesh rotation={[0, 0, 0]}>
          <boxGeometry args={[0.6, 0.01, 0.01]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.6, 0.01, 0.01]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* Frame Geometry */}
      {/* Chainstay */}
      <mesh position={[-0.32, -0.4, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.65]} />
        <meshStandardMaterial color="#9d4edd" />
      </mesh>
      {/* Seatstay */}
      <mesh position={[-0.48, -0.1, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.012, 0.012, 0.6]} />
        <meshStandardMaterial color="#9d4edd" />
      </mesh>
      {/* Seat Tube */}
      <mesh position={[-0.2, -0.1, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Down Tube */}
      <mesh position={[0.15, -0.15, 0]} rotation={[0, 0, 0.7]}>
        <cylinderGeometry args={[0.022, 0.022, 0.75]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Top Tube */}
      <mesh position={[0.1, 0.2, 0]} rotation={[0, 0, 1.57]}>
        <cylinderGeometry args={[0.018, 0.018, 0.68]} />
        <meshStandardMaterial color="var(--color-pink)" emissive="var(--color-pink)" emissiveIntensity={0.3} />
      </mesh>
      {/* Fork */}
      <mesh position={[0.5, -0.12, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.016, 0.016, 0.6]} />
        <meshStandardMaterial color="#9d4edd" />
      </mesh>

      {/* Drop Handlebars */}
      <group position={[0.42, 0.26, 0]}>
        <mesh position={[-0.05, 0.04, 0]} rotation={[0, 0, 1.1]}>
          <cylinderGeometry args={[0.015, 0.015, 0.12]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh rotation={[1.57, 0, 0]}>
          <cylinderGeometry args={[0.013, 0.013, 0.38]} />
          <meshStandardMaterial color="var(--color-cyan)" />
        </mesh>
        {/* Low-poly drop curves */}
        <mesh position={[0.05, -0.1, 0.18]}>
          <boxGeometry args={[0.1, 0.02, 0.02]} />
          <meshStandardMaterial color="var(--color-cyan)" />
        </mesh>
        <mesh position={[0.05, -0.1, -0.18]}>
          <boxGeometry args={[0.1, 0.02, 0.02]} />
          <meshStandardMaterial color="var(--color-cyan)" />
        </mesh>
      </group>

      {/* Saddle */}
      <mesh position={[-0.23, 0.23, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.18, 0.03, 0.09]} />
        <meshStandardMaterial color="#111116" roughness={0.9} />
      </mesh>
      
      {/* Crankset */}
      <mesh position={[-0.15, -0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.03, 8]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}

/* Floating Chess Pieces Component */
interface ChessPieceProps {
  type: 'king' | 'queen' | 'rook' | 'knight' | 'pawn';
  color: string;
  initialPos: [number, number, number];
}

function ChessPiece({ type, color, initialPos }: ChessPieceProps) {
  const ref = useRef<THREE.Group>(null);
  
  const rotSpeedX = useMemo(() => (Math.random() - 0.5) * 0.008, []);
  const rotSpeedY = useMemo(() => (Math.random() - 0.5) * 0.012, []);
  
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow drifting offset loops
    ref.current.position.x = initialPos[0] + Math.sin(time * 0.4 + initialPos[1]) * 0.25;
    ref.current.position.y = initialPos[1] + Math.cos(time * 0.35 + initialPos[2]) * 0.2;
    ref.current.position.z = initialPos[2] + Math.sin(time * 0.25 + initialPos[0]) * 0.12;
    
    // Slow rotational spins
    ref.current.rotation.x += rotSpeedX;
    ref.current.rotation.y += rotSpeedY;
  });

  return (
    <group ref={ref} position={initialPos} scale={0.32}>
      {/* Base collar */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.24, 0.08, 12]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} emissive={color} emissiveIntensity={0.25} />
      </mesh>
      
      {/* Piece profile details */}
      {type === 'pawn' && (
        <group>
          <mesh position={[0, -0.1, 0]}>
            <coneGeometry args={[0.14, 0.4, 10]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} emissive={color} emissiveIntensity={0.2} />
          </mesh>
        </group>
      )}

      {type === 'rook' && (
        <group>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.15, 0.17, 0.4, 10]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.19, 0.17, 0.12, 10]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      )}

      {type === 'king' && (
        <group>
          <mesh position={[0, 0, 0]}>
            <coneGeometry args={[0.15, 0.58, 10]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <torusGeometry args={[0.12, 0.026, 8, 16]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
          </mesh>
          <group position={[0, 0.42, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.04, 0.12, 0.04]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} emissive={color} emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[0, 0.02, 0]}>
              <boxGeometry args={[0.11, 0.04, 0.04]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} emissive={color} emissiveIntensity={0.3} />
            </mesh>
          </group>
        </group>
      )}

      {type === 'queen' && (
        <group>
          <mesh position={[0, 0, 0]}>
            <coneGeometry args={[0.15, 0.58, 10]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <cylinderGeometry args={[0.13, 0.09, 0.05, 10]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.38, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} emissive={color} emissiveIntensity={0.3} />
          </mesh>
        </group>
      )}

      {type === 'knight' && (
        <group>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.15, 0.17, 0.2, 10]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.08, 0]} rotation={[0.35, 0, 0]}>
            <boxGeometry args={[0.14, 0.28, 0.2]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.14, 0.1]} rotation={[-0.2, 0, 0]}>
            <boxGeometry args={[0.11, 0.13, 0.16]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      )}
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
        <ambientLight intensity={0.45} />
        <directionalLight position={[2, 4, 3]} intensity={1.5} />
        <pointLight position={[-2, -4, -3]} intensity={0.5} />
        
        {/* Orbiting 3D Road Bike */}
        <RoadBike />

        {/* Floating Space Chess Pieces (Offset Slightly in Background) */}
        <ChessPiece type="king" color="#9d4edd" initialPos={[1.4, 1.7, -0.8]} />
        <ChessPiece type="queen" color="#f72585" initialPos={[-2.2, 1.4, -1.0]} />
        <ChessPiece type="knight" color="#00f5d4" initialPos={[-1.5, -1.7, -1.2]} />
        <ChessPiece type="rook" color="#ffb703" initialPos={[2.2, -1.5, -1.2]} />
        <ChessPiece type="pawn" color="#00f2fe" initialPos={[0.1, 1.8, -0.6]} />

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
