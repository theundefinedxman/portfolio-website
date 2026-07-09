import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function JaegerRobot() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const turbineRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const chestRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Subtle breathing animation (torso shifts up/down, shoulders rotate)
    if (chestRef.current) {
      chestRef.current.position.y = Math.sin(t * 1.5) * 0.04;
      chestRef.current.rotation.x = Math.sin(t * 1.5) * 0.015;
    }

    // 2. Head scanning animation (looks left and right, tilts)
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.8) * 0.3;
      headRef.current.rotation.x = (Math.cos(t * 1.2) * 0.05) - 0.05; // look slightly down
    }

    // 3. Rotating Gipsy-style chest vortex turbine core
    if (turbineRef.current) {
      turbineRef.current.rotation.z = t * 6.0;
    }

    // 4. Arms swaying with breath
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = -0.15 + Math.sin(t * 1.5) * 0.02;
      leftArmRef.current.rotation.x = Math.cos(t * 0.8) * 0.05;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = 0.15 - Math.sin(t * 1.5) * 0.02;
      rightArmRef.current.rotation.x = -Math.cos(t * 0.8) * 0.05;
    }

    // 5. Whole body slight drift
    if (groupRef.current) {
      groupRef.current.position.y = -1.25 + Math.sin(t * 0.5) * 0.05;
    }
  });

  // Cyberpunk metal texture values
  const metalProps = {
    color: '#1e1e2a',
    metalness: 0.95,
    roughness: 0.15,
  };

  const frameColor = '#2d2d3a';

  // Emissive glowing cyan / pink properties
  const cyanGlow = {
    color: '#00f2fe',
    emissive: '#00f2fe',
    emissiveIntensity: 3,
  };
  const pinkGlow = {
    color: '#f72585',
    emissive: '#f72585',
    emissiveIntensity: 4,
  };
  const turbineGlow = {
    color: '#00f5d4',
    emissive: '#00f5d4',
    emissiveIntensity: 6,
  };

  return (
    <group ref={groupRef} position={[0, -1.25, 0]} scale={0.9}>
      {/* 1. PELVIS & LOWER BODY BASE */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.5, 0.25, 0.4]} />
        <meshStandardMaterial {...metalProps} color="#222" />
      </mesh>
      
      {/* 2. TORSO / CHEST AREA */}
      <group ref={chestRef} position={[0, 0.9, 0]}>
        {/* Main Chest Armor block (Gipsy Danger / Striker Eureka shape) */}
        <mesh position={[0, 0.6, 0]}>
          <coneGeometry args={[0.42, 0.7, 4, 1]} />
          <meshStandardMaterial {...metalProps} />
        </mesh>
        
        {/* Upper Back shoulders stabilizer wings */}
        <mesh position={[0, 0.75, -0.2]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.9, 0.15, 0.25]} />
          <meshStandardMaterial {...metalProps} color={frameColor} />
        </mesh>
        {/* Wing Left */}
        <mesh position={[-0.55, 0.85, -0.22]} rotation={[0.4, 0.2, -0.25]}>
          <boxGeometry args={[0.3, 0.1, 0.08]} />
          <meshStandardMaterial {...pinkGlow} />
        </mesh>
        {/* Wing Right */}
        <mesh position={[0.55, 0.85, -0.22]} rotation={[0.4, -0.2, 0.25]}>
          <boxGeometry args={[0.3, 0.1, 0.08]} />
          <meshStandardMaterial {...pinkGlow} />
        </mesh>

        {/* Central Chest Vortex Core Turbine (rotating) */}
        <group position={[0, 0.55, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.15, 0.15, 0.06, 16]} />
            <meshStandardMaterial color="#111" metalness={0.9} />
          </mesh>
          {/* Glowing spinning turbine blades */}
          <mesh ref={turbineRef} position={[0, 0.035, 0]}>
            <torusGeometry args={[0.09, 0.025, 6, 16]} />
            <meshStandardMaterial {...turbineGlow} />
          </mesh>
          {/* Inner turbine emitter */}
          <mesh position={[0, 0.01, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color="#fff" />
          </mesh>
        </group>

        {/* 3. HEAD & VISOR */}
        <group ref={headRef} position={[0, 1.05, 0.08]}>
          {/* Neck cylinder */}
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.15, 8]} />
            <meshStandardMaterial color="#111" metalness={0.9} />
          </mesh>
          {/* Heavy Helmet */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.22, 0.18, 0.25]} />
            <meshStandardMaterial {...metalProps} color={frameColor} />
          </mesh>
          {/* Face mask jaw plates */}
          <mesh position={[0, 0.0, 0.11]} rotation={[-0.1, 0, 0]}>
            <boxGeometry args={[0.16, 0.1, 0.06]} />
            <meshStandardMaterial {...metalProps} color="#15151b" />
          </mesh>
          {/* Glowing Neon Visor (horizontal slot) */}
          <mesh position={[0, 0.07, 0.122]}>
            <boxGeometry args={[0.15, 0.025, 0.03]} />
            <meshStandardMaterial {...cyanGlow} />
          </mesh>
          {/* Crest / Antennas */}
          <mesh position={[-0.05, 0.16, -0.05]} rotation={[0.4, 0, -0.2]}>
            <cylinderGeometry args={[0.01, 0.015, 0.18]} />
            <meshStandardMaterial {...cyanGlow} />
          </mesh>
          <mesh position={[0.05, 0.16, -0.05]} rotation={[0.4, 0, 0.2]}>
            <cylinderGeometry args={[0.01, 0.015, 0.18]} />
            <meshStandardMaterial {...cyanGlow} />
          </mesh>
        </group>

        {/* 4. UPPER ARMS & SHOULDERS */}
        {/* Left Shoulder Joint */}
        <group ref={leftArmRef} position={[-0.52, 0.72, 0]}>
          {/* Shoulder Armor Sphere */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial {...metalProps} />
          </mesh>
          {/* Glowing energy joint connector */}
          <mesh position={[0.03, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.08]} />
            <meshStandardMaterial {...pinkGlow} />
          </mesh>
          {/* Bicep Cylinder */}
          <mesh position={[-0.08, -0.28, 0]} rotation={[0, 0, 0.1]}>
            <cylinderGeometry args={[0.08, 0.07, 0.4, 8]} />
            <meshStandardMaterial {...metalProps} color={frameColor} />
          </mesh>
          {/* Elbow Joint (glowing port) */}
          <mesh position={[-0.1, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.1]} />
            <meshStandardMaterial {...pinkGlow} />
          </mesh>
          {/* Forearm shield armor */}
          <group position={[-0.12, -0.74, 0.02]} rotation={[0, 0, 0.08]}>
            <mesh>
              <boxGeometry args={[0.12, 0.38, 0.14]} />
              <meshStandardMaterial {...metalProps} />
            </mesh>
            {/* Plasma Cannon forearm detail */}
            <mesh position={[-0.02, -0.05, 0.08]}>
              <cylinderGeometry args={[0.02, 0.03, 0.2]} />
              <meshStandardMaterial {...cyanGlow} />
            </mesh>
          </group>
          {/* Claw / Fist */}
          <mesh position={[-0.14, -0.98, 0.01]}>
            <boxGeometry args={[0.09, 0.1, 0.1]} />
            <meshStandardMaterial color="#111" metalness={0.9} />
          </mesh>
        </group>

        {/* Right Shoulder Joint */}
        <group ref={rightArmRef} position={[0.52, 0.72, 0]}>
          {/* Shoulder Armor Sphere */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial {...metalProps} />
          </mesh>
          {/* Glowing energy joint connector */}
          <mesh position={[-0.03, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.08]} />
            <meshStandardMaterial {...pinkGlow} />
          </mesh>
          {/* Bicep Cylinder */}
          <mesh position={[0.08, -0.28, 0]} rotation={[0, 0, -0.1]}>
            <cylinderGeometry args={[0.08, 0.07, 0.4, 8]} />
            <meshStandardMaterial {...metalProps} color={frameColor} />
          </mesh>
          {/* Elbow Joint (glowing port) */}
          <mesh position={[0.1, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.1]} />
            <meshStandardMaterial {...pinkGlow} />
          </mesh>
          {/* Forearm shield armor */}
          <group position={[0.12, -0.74, 0.02]} rotation={[0, 0, -0.08]}>
            <mesh>
              <boxGeometry args={[0.12, 0.38, 0.14]} />
              <meshStandardMaterial {...metalProps} />
            </mesh>
            {/* Plasma Cannon forearm detail */}
            <mesh position={[0.02, -0.05, 0.08]}>
              <cylinderGeometry args={[0.02, 0.03, 0.2]} />
              <meshStandardMaterial {...cyanGlow} />
            </mesh>
          </group>
          {/* Claw / Fist */}
          <mesh position={[0.14, -0.98, 0.01]}>
            <boxGeometry args={[0.09, 0.1, 0.1]} />
            <meshStandardMaterial color="#111" metalness={0.9} />
          </mesh>
        </group>
      </group>

      {/* 5. LEGS & LOWER JOINTS */}
      {/* Left Hip joint */}
      <group position={[-0.2, 0.8, 0]}>
        <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0.15]}>
          <cylinderGeometry args={[0.06, 0.06, 0.12]} />
          <meshStandardMaterial {...pinkGlow} />
        </mesh>
        {/* Thigh Cylinder */}
        <mesh position={[-0.04, -0.32, 0]} rotation={[0, 0, 0.05]}>
          <cylinderGeometry args={[0.1, 0.08, 0.5, 8]} />
          <meshStandardMaterial {...metalProps} color={frameColor} />
        </mesh>
        {/* Knee Shield Plate */}
        <mesh position={[-0.02, -0.32, 0.09]}>
          <boxGeometry args={[0.12, 0.25, 0.05]} />
          <meshStandardMaterial {...metalProps} />
        </mesh>
        {/* Knee Joint (glowing port) */}
        <mesh position={[-0.06, -0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.1]} />
          <meshStandardMaterial {...pinkGlow} />
        </mesh>
        {/* Shin Armor */}
        <mesh position={[-0.08, -0.92, 0.02]}>
          <boxGeometry args={[0.13, 0.55, 0.15]} />
          <meshStandardMaterial {...metalProps} />
        </mesh>
        {/* Heavy Mechanical Ankle & Foot */}
        <group position={[-0.08, -1.22, 0.05]}>
          <mesh>
            <boxGeometry args={[0.16, 0.12, 0.32]} />
            <meshStandardMaterial {...metalProps} color="#222" />
          </mesh>
          {/* Glowing bottom sole matrix lights */}
          <mesh position={[0, -0.065, 0]}>
            <boxGeometry args={[0.1, 0.02, 0.25]} />
            <meshStandardMaterial {...cyanGlow} />
          </mesh>
        </group>
      </group>

      {/* Right Hip joint */}
      <group position={[0.2, 0.8, 0]}>
        <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, -0.15]}>
          <cylinderGeometry args={[0.06, 0.06, 0.12]} />
          <meshStandardMaterial {...pinkGlow} />
        </mesh>
        {/* Thigh Cylinder */}
        <mesh position={[0.04, -0.32, 0]} rotation={[0, 0, -0.05]}>
          <cylinderGeometry args={[0.1, 0.08, 0.5, 8]} />
          <meshStandardMaterial {...metalProps} color={frameColor} />
        </mesh>
        {/* Knee Shield Plate */}
        <mesh position={[0.02, -0.32, 0.09]}>
          <boxGeometry args={[0.12, 0.25, 0.05]} />
          <meshStandardMaterial {...metalProps} />
        </mesh>
        {/* Knee Joint (glowing port) */}
        <mesh position={[0.06, -0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.1]} />
          <meshStandardMaterial {...pinkGlow} />
        </mesh>
        {/* Shin Armor */}
        <mesh position={[0.08, -0.92, 0.02]}>
          <boxGeometry args={[0.13, 0.55, 0.15]} />
          <meshStandardMaterial {...metalProps} />
        </mesh>
        {/* Heavy Mechanical Ankle & Foot */}
        <group position={[0.08, -1.22, 0.05]}>
          <mesh>
            <boxGeometry args={[0.16, 0.12, 0.32]} />
            <meshStandardMaterial {...metalProps} color="#222" />
          </mesh>
          {/* Glowing bottom sole matrix lights */}
          <mesh position={[0, -0.065, 0]}>
            <boxGeometry args={[0.1, 0.02, 0.25]} />
            <meshStandardMaterial {...cyanGlow} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function JaegerModel() {
  return (
    <div className="glass-panel animate-glow" style={{
      width: '100%',
      height: '420px',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(0, 242, 254, 0.15)',
      boxShadow: '0 8px 32px 0 rgba(0, 242, 254, 0.02)'
    }}>
      {/* Corner Bracket decorations */}
      <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '8px', height: '8px', borderTop: '2px solid var(--color-cyan)', borderLeft: '2px solid var(--color-cyan)' }} />
      <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '8px', height: '8px', borderBottom: '2px solid var(--color-cyan)', borderRight: '2px solid var(--color-cyan)' }} />

      {/* Cyber Grid Sub-Header */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '16px',
        fontFamily: 'var(--font-orbitron)',
        fontSize: '9px',
        color: 'var(--color-cyan)',
        letterSpacing: '1.5px',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: 'var(--color-cyan)', borderRadius: '50%', boxShadow: '0 0 8px var(--color-cyan)' }} />
        JAEGER_UNIT // COGNITIVE_LINK.EXE
      </div>

      <Canvas camera={{ position: [0, 0, 3.8], fov: 50 }} style={{ background: 'rgba(5, 5, 8, 0.4)' }}>
        <ambientLight intensity={0.6} />
        {/* Cyberpunk accent lighting */}
        <pointLight position={[-3, 3, 3]} intensity={1.5} color="#00f2fe" />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#f72585" />
        <directionalLight position={[0, 5, 5]} intensity={1.0} />
        
        <JaegerRobot />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.8} />
      </Canvas>
    </div>
  );
}
