import { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Soldier() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Resolve base path for GitHub Pages compatibility
  const modelPath = `${import.meta.env.BASE_URL}models/Soldier.glb`;
  const { scene, animations } = useGLTF(modelPath);
  
  // Extract animations (this model contains "Idle", "Walk", "Run")
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Play the Idle animation by default
    const idleAction = actions['Idle'];
    if (idleAction) {
      idleAction.reset().fadeIn(0.5).play();
    }
    return () => {
      if (idleAction) idleAction.fadeOut(0.5);
    };
  }, [actions]);

  // Apply shadow setup to all children meshes in the loaded scene
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Enhance metalness slightly for a sleek sci-fi soldier armor finish
        const mesh = child as THREE.Mesh;
        if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.35;
          mat.metalness = 0.6;
        }
      }
    });
  }, [scene]);

  return (
    <primitive 
      ref={groupRef}
      object={scene} 
      scale={2.3} // Increased scale to fill vertical space
      position={[0, -1.75, 0]} // Pushed down to align feet with card baselines
    />
  );
}

// Pre-load model to prevent loading lag
useGLTF.preload(`${import.meta.env.BASE_URL || '/'}models/Soldier.glb`);

export default function JaegerModel() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '440px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* HUD floating info tag (no borders) */}
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
        JAEGER_UNIT // HUMANOID_ACTIVE.EXE
      </div>

      {/* Canvas background set to transparent to blend seamlessly with the main site background */}
      <Canvas 
        shadows
        camera={{ position: [0, 0.3, 3.2], fov: 48 }} 
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        
        {/* Cyberpunk accent lighting */}
        <pointLight position={[-3, 3, 2]} intensity={2.0} color="#00f2fe" />
        <pointLight position={[3, 3, 2]} intensity={2.0} color="#f72585" />
        
        {/* Strong Key Directional Light for casting shadows */}
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.8} 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#00f2fe" />
        
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <Soldier />
        </Suspense>
        
        {/* Ground shadow receiver aligned with scaled character feet */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.75, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.4} />
        </mesh>
        
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.8} />
      </Canvas>
    </div>
  );
}
