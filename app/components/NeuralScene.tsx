'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, OrbitControls, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Network() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const nodes = useMemo(() => Array.from({ length: 38 }, (_, i) => {
    const phi = Math.acos(-1 + (2 * i) / 38);
    const theta = Math.sqrt(38 * Math.PI) * phi;
    const r = 1.72 + (i % 4) * 0.075;
    return new THREE.Vector3(r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi));
  }), []);
  const links = useMemo(() => nodes.flatMap((a, i) => nodes.slice(i + 1).filter(b => a.distanceTo(b) < 1.18).map(b => [a, b] as [THREE.Vector3, THREE.Vector3])), [nodes]);
  useFrame((state, delta) => {
    if (group.current) { group.current.rotation.y += delta * 0.075; group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.12; }
    if (core.current) { const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.035; core.current.scale.setScalar(s); }
  });
  return <group ref={group}>
    <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.25}>
      <mesh ref={core}><icosahedronGeometry args={[0.72, 2]} /><meshStandardMaterial color="#0a8cff" emissive="#0879ff" emissiveIntensity={1.4} roughness={0.22} metalness={0.7} wireframe /></mesh>
      <mesh><icosahedronGeometry args={[0.53, 1]} /><meshBasicMaterial color="#62e8ff" wireframe transparent opacity={0.36} /></mesh>
      {links.map(([a, b], i) => <Line key={i} points={[a, b]} color="#36baff" transparent opacity={0.2} lineWidth={0.7} />)}
      {nodes.map((p, i) => <mesh key={i} position={p}><sphereGeometry args={[i % 5 === 0 ? 0.055 : 0.032, 10, 10]} /><meshStandardMaterial color={i % 4 === 0 ? '#8df5ff' : '#268dff'} emissive="#168bff" emissiveIntensity={1.8} /></mesh>)}
      <mesh rotation={[Math.PI / 2.3, 0.3, 0]}><torusGeometry args={[2.18, 0.006, 8, 180]} /><meshBasicMaterial color="#28b9ff" transparent opacity={0.42} /></mesh>
      <mesh rotation={[0.7, 0.4, 0.8]}><torusGeometry args={[2.42, 0.004, 8, 180]} /><meshBasicMaterial color="#3c7cff" transparent opacity={0.28} /></mesh>
    </Float>
  </group>;
}

export default function NeuralScene() {
  return <div className="scene-wrap" aria-label="Animated 3D neural network visualization">
    <Canvas camera={{ position: [0, 0, 7.3], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.65} /><pointLight position={[4, 3, 5]} intensity={35} color="#279bff" /><pointLight position={[-4, -2, -3]} intensity={18} color="#12d8e8" />
      <Stars radius={45} depth={18} count={850} factor={2} saturation={0} fade speed={0.35} />
      <Network /><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.22} minPolarAngle={Math.PI / 2.7} maxPolarAngle={Math.PI / 1.7} />
    </Canvas>
  </div>;
}
