"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import * as THREE from "three";

/* ── Flowing liquid-gradient shader: burgundy → oxblood → gold, grainy,
      reacts to cursor. Multiply/screen blended over the hero video. ── */

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uRes;
  uniform vec3  uColA; // burgundy
  uniform vec3  uColB; // oxblood deep
  uniform vec3  uColC; // gold

  // hash + value noise
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0,0.0));
    float c = hash(i + vec2(0.0,1.0));
    float d = hash(i + vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
  }
  float fbm(vec2 p){
    float v = 0.0; float amp = 0.5;
    for(int i=0;i<5;i++){ v += amp*noise(p); p *= 2.02; amp *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 asp = vec2(uRes.x/uRes.y, 1.0);
    vec2 p = uv * asp;

    float t = uTime * 0.06;
    // cursor influence
    vec2 m = uMouse * asp;
    float md = distance(p, m);

    float n = fbm(p*2.2 + vec2(t, -t) + fbm(p*1.5 - t)*0.6);
    n += (0.18 / (md + 0.4)); // brighten toward cursor

    vec3 col = mix(uColB, uColA, smoothstep(0.25, 0.75, n));
    col = mix(col, uColC, smoothstep(0.72, 1.0, n) * 0.7);

    // grain
    float g = hash(uv * uRes + uTime) * 0.06;
    col += g - 0.03;

    // vignette so edges fall to deep oxblood
    float vig = smoothstep(1.15, 0.2, length((uv-0.5)*vec2(1.1,1.3)));
    col = mix(uColB, col, vig);

    gl_FragColor = vec4(col, 0.92);
  }
`;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

function Plane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uColA: { value: new THREE.Color("#750006") },
      uColB: { value: new THREE.Color("#1d0202") },
      uColC: { value: new THREE.Color("#D98038") },
    }),
    []
  );

  useEffect(() => {
    const move = (e: PointerEvent) => {
      target.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((_, dt) => {
    if (!mat.current) return;
    mouse.current.lerp(target.current, Math.min(1, dt * 2.5));
    uniforms.uTime.value += dt;
    uniforms.uMouse.value.copy(mouse.current);
    uniforms.uRes.value.set(size.width, size.height);
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={mat}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent
      />
    </ScreenQuad>
  );
}

export default function HeroCanvas() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOk(fine && !reduce);
  }, []);

  if (!ok) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "absolute", inset: 0, zIndex: 1,
        mixBlendMode: "soft-light", opacity: 0.85, pointerEvents: "none",
      }}
    >
      <Canvas
        orthographic
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <Plane />
      </Canvas>
    </div>
  );
}
