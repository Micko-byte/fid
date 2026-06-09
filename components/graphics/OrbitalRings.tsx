"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  color?: string;
  opacity?: number;
  className?: string;
}

export default function OrbitalRings({ color = "#D9AB88", opacity = 0.1, className = "" }: Props) {
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
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 7;

    const ringDefs = [
      { radius: 1.4, tube: 0.007, rx: 0,              ry: 0,    dz: 0.0025 },
      { radius: 2.1, tube: 0.006, rx: Math.PI / 3,    ry: 0.3,  dz: -0.0018 },
      { radius: 2.9, tube: 0.005, rx: Math.PI / 5,    ry: -0.5, dz: 0.0013 },
      { radius: 1.0, tube: 0.008, rx: Math.PI / 2,    ry: 0.8,  dz: -0.0032 },
      { radius: 3.6, tube: 0.004, rx: Math.PI / 7,    ry: 1.2,  dz: 0.0009 },
    ];

    const rings: Array<THREE.Mesh & { _dz: number }> = [];
    ringDefs.forEach(({ radius, tube, rx, ry, dz }) => {
      const geo = new THREE.TorusGeometry(radius, tube, 8, 120);
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity });
      const mesh = new THREE.Mesh(geo, mat) as THREE.Mesh & { _dz: number };
      mesh.rotation.x = rx;
      mesh.rotation.y = ry;
      mesh._dz = dz;
      scene.add(mesh);
      rings.push(mesh);
    });

    // Central glow dot
    const dotGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const dotMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: opacity * 2.5 });
    scene.add(new THREE.Mesh(dotGeo, dotMat));

    let animId: number;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      rings.forEach((r) => { r.rotation.z += r._dz; });
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
      rings.forEach((r) => { r.geometry.dispose(); (r.material as THREE.Material).dispose(); });
      dotGeo.dispose(); dotMat.dispose();
      renderer.dispose();
    };
  }, [color, opacity]);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} />;
}
