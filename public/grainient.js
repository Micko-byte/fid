// ════════════════════════════════════════════════════════════════════
// Grainient — animated WebGL gradient (ported from React Bits / ogl)
// Self-contained ES module. Mounts on #grainient.
// ════════════════════════════════════════════════════════════════════
import { Renderer, Program, Mesh, Triangle } from 'https://esm.sh/ogl@1.0.11';

const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!r) return [1, 1, 1];
  return [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255];
};

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);
  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;
  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);
  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));
  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;
  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);
  o=vec4(col,1.0);
}
void main(){ vec4 o=vec4(0.0); mainImage(o,gl_FragCoord.xy); fragColor=o; }
`;

// ── Brand-tuned configuration ──────────────────────────────────────
// Honors the supplied spec, dialled to FID's "quiet luxury" tempo.
const CONFIG = {
  color1: '#260000',   // deep maroon
  color2: '#750006',   // oxblood (replaces orange-heavy blend for richer brand feel)
  color3: '#D98038',   // burnt-orange accent
  timeSpeed: 0.32,
  colorBalance: -0.08,
  warpStrength: 0.9,
  warpFrequency: 5.0,
  warpSpeed: 1.2,
  warpAmplitude: 50.0,
  blendAngle: 18.0,
  blendSoftness: 0.18,
  rotationAmount: 420.0,
  noiseScale: 2.0,
  grainAmount: 0.085,
  grainScale: 2.0,
  grainAnimated: false,
  contrast: 1.6,
  gamma: 1.0,
  saturation: 1.02,
  centerX: 0.0,
  centerY: 0.0,
  zoom: 0.92
};

function mount(container) {
  const renderer = new Renderer({
    webgl: 2, alpha: true, antialias: false,
    dpr: Math.min(window.devicePixelRatio || 1, 2)
  });
  const gl = renderer.gl;
  const canvas = gl.canvas;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex, fragment,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new Float32Array([1, 1]) },
      uTimeSpeed: { value: CONFIG.timeSpeed },
      uColorBalance: { value: CONFIG.colorBalance },
      uWarpStrength: { value: CONFIG.warpStrength },
      uWarpFrequency: { value: CONFIG.warpFrequency },
      uWarpSpeed: { value: CONFIG.warpSpeed },
      uWarpAmplitude: { value: CONFIG.warpAmplitude },
      uBlendAngle: { value: CONFIG.blendAngle },
      uBlendSoftness: { value: CONFIG.blendSoftness },
      uRotationAmount: { value: CONFIG.rotationAmount },
      uNoiseScale: { value: CONFIG.noiseScale },
      uGrainAmount: { value: CONFIG.grainAmount },
      uGrainScale: { value: CONFIG.grainScale },
      uGrainAnimated: { value: CONFIG.grainAnimated ? 1.0 : 0.0 },
      uContrast: { value: CONFIG.contrast },
      uGamma: { value: CONFIG.gamma },
      uSaturation: { value: CONFIG.saturation },
      uCenterOffset: { value: new Float32Array([CONFIG.centerX, CONFIG.centerY]) },
      uZoom: { value: CONFIG.zoom },
      uColor1: { value: new Float32Array(hexToRgb(CONFIG.color1)) },
      uColor2: { value: new Float32Array(hexToRgb(CONFIG.color2)) },
      uColor3: { value: new Float32Array(hexToRgb(CONFIG.color3)) }
    }
  });
  const mesh = new Mesh(gl, { geometry, program });

  const setSize = () => {
    const rect = container.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);
    // Guard: if the container hasn't been laid out yet, retry next frame
    // so ogl can't permanently lock the drawing buffer to 1px.
    if (w < 2 || h < 2) { requestAnimationFrame(setSize); return; }
    renderer.setSize(w, h);
    // ogl rewrites the canvas inline style to pixel values — re-assert
    // fluid sizing so it always fills the hero.
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    const res = program.uniforms.iResolution.value;
    res[0] = gl.drawingBufferWidth;
    res[1] = gl.drawingBufferHeight;
    renderer.render({ scene: mesh });
  };
  const ro = new ResizeObserver(setSize);
  ro.observe(container);
  setSize();

  let raf = 0, isVisible = true, isPageVisible = !document.hidden;
  const t0 = performance.now();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Pointer interactivity (minute, damped) ──────────────────────
  // Cursor nudges the gradient centre + blend axis by a hair, then
  // eases back to rest. Magnitudes intentionally tiny.
  const POINTER_MAX = 0.028;   // max centre offset (in shader uv units)
  const ANGLE_MAX = 5.0;       // max extra blend angle (degrees)
  const EASE = 0.045;          // lerp factor — low = slow, luxe drift
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  const baseCX = CONFIG.centerX, baseCY = CONFIG.centerY, baseAngle = CONFIG.blendAngle;

  const onPointer = (e) => {
    const rect = container.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 .. 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    targetX = Math.max(-0.5, Math.min(0.5, nx)) * 2;
    targetY = Math.max(-0.5, Math.min(0.5, ny)) * 2;
  };
  const onLeave = () => { targetX = 0; targetY = 0; };
  if (!reduced) {
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerout', onLeave, { passive: true });
  }

  const loop = (t) => {
    program.uniforms.iTime.value = (t - t0) * 0.001;
    // Damp toward the cursor target
    curX += (targetX - curX) * EASE;
    curY += (targetY - curY) * EASE;
    const off = program.uniforms.uCenterOffset.value;
    off[0] = baseCX + curX * POINTER_MAX;
    off[1] = baseCY + curY * POINTER_MAX;
    program.uniforms.uBlendAngle.value = baseAngle + curX * ANGLE_MAX;
    renderer.render({ scene: mesh });
    raf = requestAnimationFrame(loop);
  };
  const start = () => { if (isVisible && isPageVisible && raf === 0 && !reduced) raf = requestAnimationFrame(loop); };
  const stop = () => { if (raf !== 0) { cancelAnimationFrame(raf); raf = 0; } };

  const io = new IntersectionObserver(([e]) => { isVisible = e.isIntersecting; isVisible ? start() : stop(); }, { threshold: 0 });
  io.observe(container);
  document.addEventListener('visibilitychange', () => { isPageVisible = !document.hidden; isPageVisible ? start() : stop(); });

  if (reduced) renderer.render({ scene: mesh }); // single static frame
  start();
}

const el = document.getElementById('grainient');
if (el) {
  try { mount(el); }
  catch (err) { console.warn('Grainient failed to initialise:', err); el.classList.add('grainient-fallback'); }
}
