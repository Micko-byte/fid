// ════════════════════════════════════════════════════════════════════
// Radar — animated WebGL radar sweep (ported from React Bits / ogl)
// Self-contained ES module. Mounts on #ctaRadar.
// Tuned to FID brand colours (sand sweep over oxblood).
// ════════════════════════════════════════════════════════════════════
import { Renderer, Program, Mesh, Triangle } from 'https://esm.sh/ogl@1.0.11';

const hexToVec3 = (hex) => {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ];
};

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0, 1); }
`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uRingCount;
uniform float uSpokeCount;
uniform float uRingThickness;
uniform float uSpokeThickness;
uniform float uSweepSpeed;
uniform float uSweepWidth;
uniform float uSweepLobes;
uniform vec3 uColor;
uniform vec3 uColor2;
uniform vec3 uBgColor;
uniform float uFalloff;
uniform float uBrightness;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;
#define TAU 6.28318530718
void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st = st * 2.0 - 1.0;
  st.x *= uResolution.x / uResolution.y;
  if (uEnableMouse) {
    vec2 mShift = (uMouse * 2.0 - 1.0);
    mShift.x *= uResolution.x / uResolution.y;
    st -= mShift * uMouseInfluence;
  }
  st *= uScale;
  float dist = length(st);
  float theta = atan(st.y, st.x);
  float t = uTime * uSpeed;

  float ringPhase = dist * uRingCount - t;
  float ringDist = abs(fract(ringPhase) - 0.5);
  float ringGlow = 1.0 - smoothstep(0.0, uRingThickness, ringDist);

  float spokeAngle = abs(fract(theta * uSpokeCount / TAU + 0.5) - 0.5) * TAU / uSpokeCount;
  float arcDist = spokeAngle * dist;
  float spokeGlow = (1.0 - smoothstep(0.0, uSpokeThickness, arcDist)) * smoothstep(0.0, 0.1, dist);

  float sweepPhase = t * uSweepSpeed;
  float sweepBeam = pow(max(0.5 * sin(uSweepLobes * theta + sweepPhase) + 0.5, 0.0), uSweepWidth);

  float fade = smoothstep(1.05, 0.85, dist) * pow(max(1.0 - dist, 0.0), uFalloff);

  float grid = (ringGlow + spokeGlow) * fade * uBrightness;
  float beam = sweepBeam * fade * uBrightness;
  // sweep beam leans into the warmer accent colour
  vec3 col = uColor * grid + mix(uColor, uColor2, 0.7) * beam + uBgColor;
  float alpha = clamp(max(grid, beam) * 1.15, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

const CONFIG = {
  speed: 0.55,
  scale: 0.62,
  ringCount: 9.0,
  spokeCount: 12.0,
  ringThickness: 0.045,
  spokeThickness: 0.008,
  sweepSpeed: 0.6,
  sweepWidth: 2.4,
  sweepLobes: 1.0,
  color: '#D9AB88',        // sand — the radar grid
  color2: '#F0C089',       // warm sand highlight for the sweep
  backgroundColor: '#000000',
  falloff: 1.7,
  brightness: 1.18,
  mouseInfluence: 0.06
};

function mount(container) {
  const renderer = new Renderer({ alpha: true, premultipliedAlpha: false, dpr: Math.min(window.devicePixelRatio || 1, 2) });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  const canvas = gl.canvas;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: [1, 1, 1] },
      uSpeed: { value: CONFIG.speed },
      uScale: { value: CONFIG.scale },
      uRingCount: { value: CONFIG.ringCount },
      uSpokeCount: { value: CONFIG.spokeCount },
      uRingThickness: { value: CONFIG.ringThickness },
      uSpokeThickness: { value: CONFIG.spokeThickness },
      uSweepSpeed: { value: CONFIG.sweepSpeed },
      uSweepWidth: { value: CONFIG.sweepWidth },
      uSweepLobes: { value: CONFIG.sweepLobes },
      uColor: { value: hexToVec3(CONFIG.color) },
      uColor2: { value: hexToVec3(CONFIG.color2) },
      uBgColor: { value: hexToVec3(CONFIG.backgroundColor) },
      uFalloff: { value: CONFIG.falloff },
      uBrightness: { value: CONFIG.brightness },
      uMouse: { value: new Float32Array([0.5, 0.5]) },
      uMouseInfluence: { value: CONFIG.mouseInfluence },
      uEnableMouse: { value: true }
    }
  });
  const mesh = new Mesh(gl, { geometry, program });

  const setSize = () => {
    const rect = container.getBoundingClientRect();
    const w = Math.floor(rect.width), h = Math.floor(rect.height);
    if (w < 2 || h < 2) { requestAnimationFrame(setSize); return; }
    renderer.setSize(w, h);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, gl.drawingBufferWidth / gl.drawingBufferHeight];
    renderer.render({ scene: mesh });
  };
  const ro = new ResizeObserver(setSize);
  ro.observe(container);
  setSize();

  // Mouse parallax (subtle, damped)
  let cur = [0.5, 0.5], tgt = [0.5, 0.5];
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    tgt = [(e.clientX - r.left) / r.width, 1.0 - (e.clientY - r.top) / r.height];
  };
  const onLeave = () => { tgt = [0.5, 0.5]; };
  if (!reduced) {
    container.addEventListener('mousemove', onMove, { passive: true });
    container.addEventListener('mouseleave', onLeave, { passive: true });
  }

  let raf = 0, isVisible = true, isPageVisible = !document.hidden;
  const t0 = performance.now();
  const loop = (t) => {
    program.uniforms.uTime.value = (t - t0) * 0.001;
    cur[0] += 0.05 * (tgt[0] - cur[0]);
    cur[1] += 0.05 * (tgt[1] - cur[1]);
    program.uniforms.uMouse.value[0] = cur[0];
    program.uniforms.uMouse.value[1] = cur[1];
    renderer.render({ scene: mesh });
    raf = requestAnimationFrame(loop);
  };
  const start = () => { if (isVisible && isPageVisible && raf === 0 && !reduced) raf = requestAnimationFrame(loop); };
  const stop = () => { if (raf !== 0) { cancelAnimationFrame(raf); raf = 0; } };
  const io = new IntersectionObserver(([e]) => { isVisible = e.isIntersecting; isVisible ? start() : stop(); }, { threshold: 0 });
  io.observe(container);
  document.addEventListener('visibilitychange', () => { isPageVisible = !document.hidden; isPageVisible ? start() : stop(); });
  if (reduced) renderer.render({ scene: mesh });
  start();
}

const el = document.getElementById('ctaRadar');
if (el) {
  try { mount(el); }
  catch (err) { console.warn('Radar failed to initialise:', err); }
}
