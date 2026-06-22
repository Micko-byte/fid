"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  color?: string;
  count?: number;
  opacity?: number;
  className?: string;
}

export default function ParticleField({ color = "#750006", count = 140, opacity = 0.55, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.clientWidth || 800;
    const H = canvas.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 5;

    const positions = new Float32Array(count * 3);
    const vels: number[] = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      vels.push(
        (Math.random() - 0.5) * 0.0018,
        (Math.random() - 0.5) * 0.0014,
        0,
      );
    }

    const geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    geo.setAttribute("position", posAttr);

    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.045,
      transparent: true,
      opacity,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Line segments connecting nearby particles
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: opacity * 0.2,
    });

    let animId: number;
    let frame = 0;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      frame++;

      const pos = posAttr.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3]     += vels[i * 3];
        pos[i * 3 + 1] += vels[i * 3 + 1];
        // Wrap-around so particles stay in frame
        if (pos[i * 3] > 5)     pos[i * 3] = -5;
        if (pos[i * 3] < -5)    pos[i * 3] = 5;
        if (pos[i * 3 + 1] > 3.5)  pos[i * 3 + 1] = -3.5;
        if (pos[i * 3 + 1] < -3.5) pos[i * 3 + 1] = 3.5;
      }
      posAttr.needsUpdate = true;

      // Rebuild connection lines every 30 frames for performance
      if (frame % 30 === 0) {
        const lineVerts: number[] = [];
        const threshold = 2.2;
        for (let i = 0; i < count; i++) {
          for (let j = i + 1; j < count; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < threshold) {
              lineVerts.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
              lineVerts.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
            }
          }
        }
        const linesGeo = new THREE.BufferGeometry();
        linesGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
        // Remove old lines mesh and add new one
        const old = scene.getObjectByName("lines");
        if (old) { (old as THREE.LineSegments).geometry.dispose(); scene.remove(old); }
        const lines = new THREE.LineSegments(linesGeo, lineMat);
        lines.name = "lines";
        scene.add(lines);
      }

      points.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const W2 = canvas.clientWidth;
      const H2 = canvas.clientHeight;
      if (!W2 || !H2) return;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      geo.dispose(); mat.dispose(); lineMat.dispose();
      renderer.dispose();
    };
  }, [color, count, opacity]);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} />;
}
