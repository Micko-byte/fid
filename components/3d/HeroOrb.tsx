"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function OrbMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.06;
    meshRef.current.rotation.y += delta * 0.1;
    meshRef.current.rotation.z += delta * 0.04;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <MeshDistortMaterial
          color="#750006"
          distort={0.28}
          speed={1.4}
          roughness={0.55}
          metalness={0.3}
          opacity={0.22}
          transparent
          wireframe={false}
        />
      </mesh>
      {/* Wireframe overlay for depth */}
      <mesh>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial
          color="#d98038"
          wireframe
          opacity={0.12}
          transparent
        />
      </mesh>
    </Float>
  );
}

export default function HeroOrb() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "50%",
        right: "-2%",
        transform: "translateY(-54%)",
        width: "min(380px, 44vw)",
        height: "min(380px, 44vw)",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.7,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 6, 4]} intensity={2} color="#d98038" />
        <pointLight position={[-4, -2, -4]} intensity={0.8} color="#750006" />
        <OrbMesh />
      </Canvas>
    </div>
  );
}
