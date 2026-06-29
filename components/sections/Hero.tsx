"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

/* ── Brand palette ── */
const BRAND = {
  crimson: 0x750006,
  amber: 0xd98038,
  cream: 0xf5f2ec,
  deep: 0x260000,
  anchor: 0x1c1c1c,
};

/* ── Section content ── */
const SECTIONS = [
  {
    title: "INSIGHT",
    line1: "Rigorous research and media intelligence",
    line2: "power every strategy we create.",
  },
  {
    title: "STRATEGY",
    line1: "From positioning to execution, built for",
    line2: "clarity and sustained influence across Africa.",
  },
  {
    title: "IMPACT",
    line1: "Every campaign engineered for outcomes —",
    line2: "brand reputation built, narratives shifted.",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  // Render the WebGL scene only while the hero is on screen — once scrolled
  // past, the loop idles so it stops costing GPU/CPU on the rest of the page.
  const renderActive = useRef(true);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const totalSections = 3;

  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    mountains: THREE.Mesh[];
    animationId: number | null;
    targetCameraX?: number;
    targetCameraY?: number;
    targetCameraZ?: number;
    locations: number[];
  }>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    locations: [],
  });

  /* ── Three.js init ── */
  useEffect(() => {
    if (!canvasRef.current) return;

    const refs = threeRefs.current;

    /* Scene */
    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    /* Camera */
    refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    refs.camera.position.z = 100;
    refs.camera.position.y = 20;

    /* Renderer */
    refs.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    /* Post-processing */
    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    refs.composer.addPass(
      new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.9, 0.4, 0.82)
    );

    /* Stars — warm amber/cream palette */
    for (let i = 0; i < 3; i++) {
      const count = 5000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let j = 0; j < count; j++) {
        const radius = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);

        const color = new THREE.Color();
        const r = Math.random();
        if (r < 0.6) color.setHSL(0, 0, 0.75 + Math.random() * 0.25); // white
        else if (r < 0.85) color.setHSL(0.08, 0.7, 0.75); // amber-warm
        else color.setHSL(0.02, 0.8, 0.55); // crimson-tint
        colors[j * 3] = color.r;
        colors[j * 3 + 1] = color.g;
        colors[j * 3 + 2] = color.b;
        sizes[j] = Math.random() * 2 + 0.5;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: i } },
        vertexShader: `
          attribute float size; attribute vec3 color; varying vec3 vColor;
          uniform float time; uniform float depth;
          void main() {
            vColor = color;
            vec3 pos = position;
            float angle = time * 0.05 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            vec4 mvp = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvp.z);
            gl_Position = projectionMatrix * mvp;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.0, 0.5, d));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const stars = new THREE.Points(geometry, material);
      refs.scene.add(stars);
      refs.stars.push(stars);
    }

    /* Nebula — crimson × amber brand palette */
    const nebGeo = new THREE.PlaneGeometry(8000, 4000, 100, 100);
    const nebMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(BRAND.crimson) },
        color2: { value: new THREE.Color(BRAND.amber) },
        opacity: { value: 0.28 },
      },
      vertexShader: `
        varying vec2 vUv; varying float vElev; uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float elev = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
          pos.z += elev; vElev = elev;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1; uniform vec3 color2;
        uniform float opacity; uniform float time;
        varying vec2 vUv; varying float vElev;
        void main() {
          float m = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
          vec3 c = mix(color1, color2, m * 0.5 + 0.5);
          float a = opacity * (1.0 - length(vUv - 0.5) * 2.0);
          a *= 1.0 + vElev * 0.01;
          gl_FragColor = vec4(c, a);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebGeo, nebMat);
    nebula.position.z = -1050;
    refs.scene.add(nebula);
    refs.nebula = nebula;

    /* Mountains — brand darks */
    const mountainLayers = [
      { distance: -50,  height: 60,  color: 0x0f0505, opacity: 1   },
      { distance: -100, height: 80,  color: 0x1a0203, opacity: 0.8 },
      { distance: -150, height: 100, color: 0x260000, opacity: 0.6 },
      { distance: -200, height: 120, color: 0x3d0005, opacity: 0.4 },
    ];

    mountainLayers.forEach((layer, idx) => {
      const points: THREE.Vector2[] = [];
      const segs = 50;
      for (let i = 0; i <= segs; i++) {
        const x = (i / segs - 0.5) * 1000;
        const y =
          Math.sin(i * 0.1) * layer.height +
          Math.sin(i * 0.05) * layer.height * 0.5 +
          Math.random() * layer.height * 0.2 -
          100;
        points.push(new THREE.Vector2(x, y));
      }
      points.push(new THREE.Vector2(5000, -300));
      points.push(new THREE.Vector2(-5000, -300));

      const shape = new THREE.Shape(points);
      const geo = new THREE.ShapeGeometry(shape);
      const mat = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        side: THREE.DoubleSide,
      });
      const mountain = new THREE.Mesh(geo, mat);
      mountain.position.z = layer.distance;
      mountain.position.y = layer.distance;
      mountain.userData = { baseZ: layer.distance, index: idx };
      refs.scene.add(mountain);
      refs.mountains.push(mountain);
    });

    /* Store initial mountain z positions */
    refs.locations = refs.mountains.map((m) => m.position.z);

    /* Atmosphere — brand crimson tint */
    const atmGeo = new THREE.SphereGeometry(600, 32, 32);
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal; uniform float time;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 atmosphere = vec3(0.46, 0.0, 0.024) * intensity; // crimson
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          atmosphere *= pulse;
          gl_FragColor = vec4(atmosphere, intensity * 0.3);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    refs.scene.add(new THREE.Mesh(atmGeo, atmMat));

    /* Animation loop */
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      // Skip all scene work when the hero is scrolled out of view.
      if (!renderActive.current) return;
      const time = Date.now() * 0.001;

      refs.stars.forEach((sf) => {
        if ((sf.material as THREE.ShaderMaterial).uniforms) {
          (sf.material as THREE.ShaderMaterial).uniforms.time.value = time;
        }
      });

      if (refs.nebula) {
        (refs.nebula.material as THREE.ShaderMaterial).uniforms.time.value = time * 0.5;
      }

      if (refs.camera && refs.targetCameraX !== undefined) {
        const s = 0.05;
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * s;
        smoothCameraPos.current.y += (refs.targetCameraY! - smoothCameraPos.current.y) * s;
        smoothCameraPos.current.z += (refs.targetCameraZ! - smoothCameraPos.current.z) * s;

        const floatX = Math.sin(time * 0.1) * 2;
        const floatY = Math.cos(time * 0.15) * 1;
        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      refs.mountains.forEach((m, i) => {
        const pf = 1 + i * 0.5;
        m.position.x = Math.sin(time * 0.1) * 2 * pf;
        m.position.y = 50 + Math.cos(time * 0.15) * 1 * pf;
      });

      refs.composer?.render();
    };

    animate();
    setIsReady(true);

    const handleResize = () => {
      if (!refs.camera || !refs.renderer || !refs.composer) return;
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);
      refs.stars.forEach((s) => { s.geometry.dispose(); (s.material as THREE.Material).dispose(); });
      refs.mountains.forEach((m) => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      if (refs.nebula) { refs.nebula.geometry.dispose(); (refs.nebula.material as THREE.Material).dispose(); }
      refs.renderer?.dispose();
    };
  }, []);

  /* ── GSAP entrance animations (subtitle + scroll cue, once) ── */
  useEffect(() => {
    if (!isReady) return;
    const tl = gsap.timeline();

    if (subtitleRef.current) {
      const lines = subtitleRef.current.querySelectorAll(".subtitle-line");
      tl.from(lines, { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
    }
    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, { opacity: 0, y: 50, duration: 1, ease: "power2.out" }, "-=0.5");
    }

    return () => { tl.kill(); };
  }, [isReady]);

  /* ── Title: animate the chars in on every section change ── */
  useEffect(() => {
    if (!isReady || !titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".title-char");
    // fromTo guarantees the end state is opacity:1 / y:0 — no stale invisibility.
    const tween = gsap.fromTo(
      chars,
      { y: 140, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.04, ease: "power4.out", overwrite: true }
    );
    return () => { tween.kill(); gsap.set(chars, { opacity: 1, y: 0 }); };
  }, [isReady, currentSection]);

  /* ── Scroll handler ── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Progress is relative to the hero container's own scroll range,
      // NOT the whole document (the page has sections below the hero).
      const heroH = containerRef.current?.offsetHeight ?? window.innerHeight;
      const heroScrollRange = Math.max(heroH - window.innerHeight, 1);
      const progress = Math.min(Math.max(scrollY / heroScrollRange, 0), 1);
      setScrollProgress(progress);
      setCurrentSection(Math.min(Math.floor(progress * totalSections), totalSections - 1));
      setIsInHero(scrollY < heroScrollRange + 2);
      // Keep the WebGL loop active only while any part of the hero is visible.
      renderActive.current = scrollY < heroH + 100;

      const refs = threeRefs.current;
      const totalProgress = progress * totalSections;
      const sectionProgress = totalProgress % 1;
      const sectionIdx = Math.floor(totalProgress);

      const camPos = [
        { x: 0, y: 30, z: 300  },
        { x: 0, y: 40, z: -50  },
        { x: 0, y: 50, z: -700 },
        { x: 0, y: 60, z: -1200 },
      ];
      const cur = camPos[sectionIdx] ?? camPos[0];
      const nxt = camPos[sectionIdx + 1] ?? cur;

      refs.targetCameraX = cur.x + (nxt.x - cur.x) * sectionProgress;
      refs.targetCameraY = cur.y + (nxt.y - cur.y) * sectionProgress;
      refs.targetCameraZ = cur.z + (nxt.z - cur.z) * sectionProgress;

      refs.mountains.forEach((m, i) => {
        const speed = 1 + i * 0.9;
        if (refs.nebula) {
          refs.nebula.position.z = (m.userData.baseZ + scrollY * speed * 0.5 + progress * speed * 0.01) - 100;
        }
        m.position.z = progress > 0.7 ? 600000 : refs.locations[i];
      });

      if (refs.nebula && refs.mountains[3]) {
        refs.nebula.position.z = refs.mountains[3].position.z;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalSections]);

  const splitTitle = (text: string) =>
    text.split("").map((char, i) => (
      <span key={`${text}-${i}`} className="title-char" style={{ display: "inline-block" }}>
        {char}
      </span>
    ));

  const sect = SECTIONS[currentSection] ?? SECTIONS[0];

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", background: "#000" }}
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "sticky", top: 0, width: "100%", height: "100dvh", display: "block", zIndex: 0 }}
      />

      {/* Overlay UI — fixed, hidden once hero scrolled past */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          display: isInHero ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 clamp(1.25rem, 5vw, 3rem)",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        {/* Eyebrow — brand amber */}
        <span
          className="subtitle-line"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.6rem, 1vw, 0.78rem)",
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#d98038",
            marginBottom: "clamp(1rem, 2vw, 1.6rem)",
          }}
        >
          Insight · Strategy · Impact
        </span>

        {/* Main title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 11vw, 12rem)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#f5f2ec",
            margin: 0,
            padding: "0 5vw",
            width: "100%",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {splitTitle(sect.title)}
        </h1>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          style={{
            marginTop: "clamp(1.5rem, 3vw, 2.5rem)",
            textAlign: "center",
          }}
        >
          <p
            className="subtitle-line"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)",
              color: "rgba(245,228,205,0.78)",
              letterSpacing: "0.04em",
              margin: "0 0 0.3rem",
            }}
          >
            {sect.line1}
          </p>
          <p
            className="subtitle-line"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)",
              color: "rgba(245,228,205,0.78)",
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            {sect.line2}
          </p>
        </div>

        {/* CTAs — only on first section */}
        {currentSection === 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "clamp(2rem, 4vw, 3rem)",
              maxWidth: "92vw",
              pointerEvents: "auto",
            }}
          >
            <Button href="/#contact" variant="primary" magnetic>
              Start a project
            </Button>
            <Button href="/#work" variant="outline">
              Our work
            </Button>
          </div>
        )}
      </div>

      {/* Scroll progress bar */}
      <div
        ref={scrollProgressRef}
        style={{
          position: "fixed",
          display: isInHero ? undefined : "none",
          bottom: "clamp(1.5rem, 3vw, 2.5rem)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "rgba(245,242,236,0.3)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "120px",
            height: "1px",
            background: "rgba(245,242,236,0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${scrollProgress * 100}%`,
              background: "#d98038",
              transition: "width 0.1s linear",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            color: "rgba(245,242,236,0.22)",
          }}
        >
          {String(currentSection + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll height — gives room for all 3 tagline sections */}
      <div className="hero-scroll-spacer" style={{ marginTop: "-100vh", pointerEvents: "none" }} />

      <style>{`
        .hero-scroll-spacer { height: ${totalSections * 100}vh; }
        @media (max-width: 768px) {
          .hero-scroll-spacer { height: ${totalSections * 72}vh; }
        }
      `}</style>
    </div>
  );
}
