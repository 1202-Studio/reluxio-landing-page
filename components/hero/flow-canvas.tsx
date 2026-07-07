"use client";

import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

/* ---------------------------------------------------------------------------
   The Flow of Commerce — monochrome, real-time.
   White merchant hubs scattered along a corridor in depth; light "parcels"
   stream along curved threads between them. Scroll progress (0→1) flies the
   camera downstream and ignites hubs progressively.
--------------------------------------------------------------------------- */

type FlowProps = {
  progressRef: RefObject<number>;
};

/** Deterministic PRNG so the network is identical on every visit. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HUB_COUNT = 54;
const PARTICLE_COUNT = 460;
const CORRIDOR_DEPTH = 72;

function buildNetwork() {
  const rand = mulberry32(20260707);

  // Hubs along a widening corridor, front (z≈4) to deep (z≈-68).
  const hubs: THREE.Vector3[] = [];
  for (let i = 0; i < HUB_COUNT; i++) {
    const t = i / (HUB_COUNT - 1);
    const spread = 7 + t * 17; // corridor widens with depth
    hubs.push(
      new THREE.Vector3(
        (rand() - 0.5) * spread * 2,
        (rand() - 0.5) * 9,
        4 - t * CORRIDOR_DEPTH + (rand() - 0.5) * 5,
      ),
    );
  }

  // Each hub links to its 2 nearest deeper hubs → curved threads.
  const curves: THREE.CubicBezierCurve3[] = [];
  for (let i = 0; i < HUB_COUNT; i++) {
    const a = hubs[i];
    const deeper = hubs
      .map((p, j) => ({ p, j }))
      .filter(({ p, j }) => j !== i && p.z < a.z - 2)
      .sort((m, n) => m.p.distanceTo(a) - n.p.distanceTo(a))
      .slice(0, 2);
    for (const { p: b } of deeper) {
      const mid1 = a.clone().lerp(b, 0.33);
      const mid2 = a.clone().lerp(b, 0.66);
      const bow = 1.5 + rand() * 2.5;
      mid1.y += (rand() - 0.5) * bow * 2;
      mid1.x += (rand() - 0.5) * bow;
      mid2.y += (rand() - 0.5) * bow * 2;
      mid2.x += (rand() - 0.5) * bow;
      curves.push(new THREE.CubicBezierCurve3(a, mid1, mid2, b));
    }
  }

  // Particles: each rides one curve with its own phase + speed.
  const particleCurve = new Uint16Array(PARTICLE_COUNT);
  const particlePhase = new Float32Array(PARTICLE_COUNT);
  const particleSpeed = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particleCurve[i] = Math.floor(rand() * curves.length);
    particlePhase[i] = rand();
    particleSpeed[i] = 0.035 + rand() * 0.075;
  }

  // Static line geometry sampled from the curves.
  const SEGMENTS = 22;
  const linePositions = new Float32Array(curves.length * SEGMENTS * 2 * 3);
  let o = 0;
  const pt = new THREE.Vector3();
  const prev = new THREE.Vector3();
  for (const curve of curves) {
    curve.getPoint(0, prev);
    for (let s = 1; s <= SEGMENTS; s++) {
      curve.getPoint(s / SEGMENTS, pt);
      linePositions[o++] = prev.x;
      linePositions[o++] = prev.y;
      linePositions[o++] = prev.z;
      linePositions[o++] = pt.x;
      linePositions[o++] = pt.y;
      linePositions[o++] = pt.z;
      prev.copy(pt);
    }
  }

  return { hubs, curves, particleCurve, particlePhase, particleSpeed, linePositions };
}

/** Soft radial sprite so points read as glowing orbs (fake bloom, zero post). */
function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(0.6, "rgba(255,255,255,0.12)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function FlowScene({ progressRef }: FlowProps) {
  const network = useMemo(buildNetwork, []);
  const glowTex = useMemo(makeGlowTexture, []);

  const hubPositions = useMemo(() => {
    const arr = new Float32Array(HUB_COUNT * 3);
    network.hubs.forEach((h, i) => {
      arr[i * 3] = h.x;
      arr[i * 3 + 1] = h.y;
      arr[i * 3 + 2] = h.z;
    });
    return arr;
  }, [network]);

  const hubColors = useMemo(() => new Float32Array(HUB_COUNT * 3).fill(0.3), []);
  const particlePositions = useMemo(
    () => new Float32Array(PARTICLE_COUNT * 3),
    [],
  );

  const hubGlowRef = useRef<THREE.Points>(null);
  const hubCoreRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const timeRef = useRef(0);
  const v = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }, dt) => {
    const clamped = Math.min(dt, 1 / 30); // avoid jumps after tab switch
    timeRef.current += clamped;
    const t = timeRef.current;
    const p = progressRef.current ?? 0;
    const eased = easeInOutCubic(p);

    // --- Camera: fly downstream with gentle sway + ambient drift.
    const z = 9 - eased * 48;
    const swayX = Math.sin(eased * Math.PI) * 2.6 + Math.sin(t * 0.14) * 0.5;
    const swayY = Math.sin(eased * Math.PI * 0.8) * 1.1 + Math.cos(t * 0.11) * 0.3;
    camera.position.set(swayX, swayY, z);
    camera.lookAt(swayX * 0.35, swayY * 0.3, z - 18);

    // --- Particles ride their curves.
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const curve = network.curves[network.particleCurve[i]];
        const u =
          (network.particlePhase[i] + t * network.particleSpeed[i]) % 1;
        curve.getPoint(u, v);
        arr[i * 3] = v.x;
        arr[i * 3 + 1] = v.y;
        arr[i * 3 + 2] = v.z;
      }
      pos.needsUpdate = true;
    }

    // --- Hubs ignite front-to-back as scroll progresses.
    if (hubGlowRef.current) {
      const col = hubGlowRef.current.geometry.attributes.color;
      const carr = col.array as Float32Array;
      for (let i = 0; i < HUB_COUNT; i++) {
        const stagger = i / HUB_COUNT;
        const ignition = smoothstep(stagger * 0.85, stagger * 0.85 + 0.18, eased);
        const pulse = 0.85 + Math.sin(t * 1.6 + i * 2.1) * 0.15;
        const intensity = (0.22 + ignition * 0.78) * pulse;
        carr[i * 3] = intensity;
        carr[i * 3 + 1] = intensity;
        carr[i * 3 + 2] = intensity;
      }
      col.needsUpdate = true;
    }

    // --- Threads brighten slightly as the network wakes up.
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.07 + eased * 0.09;
    }
  });

  return (
    <group>
      {/* Connection threads */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[network.linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.07}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Hub glow halos (per-point brightness via vertex colors) */}
      <points ref={hubGlowRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hubPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[hubColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={2.1}
          map={glowTex}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Hub cores — small bright centers */}
      <points ref={hubCoreRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hubPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          map={glowTex}
          color="#ffffff"
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Parcels of light streaming hub-to-hub */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          map={glowTex}
          color="#ffffff"
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

type FlowCanvasProps = FlowProps & {
  active: boolean;
};

export default function FlowCanvas({ progressRef, active }: FlowCanvasProps) {
  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 58, near: 0.1, far: 140, position: [0, 0, 9] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#0b0b0b"]} />
      <fogExp2 attach="fog" args={["#0b0b0b", 0.026]} />
      <FlowScene progressRef={progressRef} />
    </Canvas>
  );
}
