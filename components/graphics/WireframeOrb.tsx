"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  color?: string;
  accentColor?: string;
  opacity?: number;
  speed?: number;
  className?: string;
}

export default function WireframeOrb({
  color = "#5B0E14",
  accentColor = "#5B0E14",
  opacity = 0.14,
  speed = 1,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.clientWidth || 600;
    const H = canvas.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.z = 5.5;

    // Main icosahedron wireframe
    const geoMain = new THREE.IcosahedronGeometry(2, 1);
    const matMain = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity,
    });
    const mesh = new THREE.Mesh(geoMain, matMain);
    scene.add(mesh);

    // Inner sphere (denser wireframe)
    const geoInner = new THREE.IcosahedronGeometry(1.3, 2);
    const matInner = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      wireframe: true,
      transparent: true,
      opacity: opacity * 0.5,
    });
    const inner = new THREE.Mesh(geoInner, matInner);
    scene.add(inner);

    // Equatorial ring
    const geoRing = new THREE.TorusGeometry(2.5, 0.007, 8, 100);
    const matRing = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: opacity * 0.6,
    });
    const ring = new THREE.Mesh(geoRing, matRing);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Polar ring
    const geoRing2 = new THREE.TorusGeometry(2.5, 0.005, 8, 100);
    const matRing2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: opacity * 0.4,
    });
    const ring2 = new THREE.Mesh(geoRing2, matRing2);
    ring2.rotation.y = Math.PI / 2.5;
    scene.add(ring2);

    let animId: number;
    let t = 0;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      t += 0.004 * speed;
      mesh.rotation.x = t * 0.38;
      mesh.rotation.y = t * 0.55;
      inner.rotation.x = -t * 0.25;
      inner.rotation.y = t * 0.4;
      ring.rotation.z = t * 0.15;
      ring2.rotation.y = t * 0.1;
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
      geoMain.dispose(); matMain.dispose();
      geoInner.dispose(); matInner.dispose();
      geoRing.dispose(); matRing.dispose();
      geoRing2.dispose(); matRing2.dispose();
      renderer.dispose();
    };
  }, [color, accentColor, opacity, speed]);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} />;
}
