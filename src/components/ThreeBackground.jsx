import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

/* -------------------------------------------------------------------
   Particle Galaxy – Main 3D background element
   ------------------------------------------------------------------- */
function ParticleGalaxy({ count = 6000 }) {
  const ref = useRef();
  const colorRef = useRef();

  // Generate random sphere positions
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    random.inSphere(pos, { radius: 2.5 });

    // Create gradient colors (purple → blue → cyan)
    const cols = new Float32Array(count * 3);
    const color1 = new THREE.Color("#7c3aed"); // Purple
    const color2 = new THREE.Color("#0ea5e9"); // Blue
    const color3 = new THREE.Color("#22d3ee"); // Cyan

    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const c = t < 0.5 ? color1.clone().lerp(color2, t * 2) : color2.clone().lerp(color3, (t - 0.5) * 2);
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }

    return [pos, cols];
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
        <bufferAttribute
          attach="geometry-attributes-color"
          args={[colors, 3]}
        />
      </Points>
    </group>
  );
}

/* -------------------------------------------------------------------
   Floating Orbs – Accent elements
   ------------------------------------------------------------------- */
function FloatingOrbs({ count = 15 }) {
  const mesh = useRef();

  const orbs = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 2,
      ],
      scale: Math.random() * 0.08 + 0.02,
      speed: Math.random() * 0.5 + 0.2,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  return (
    <>
      {orbs.map((orb, i) => (
        <FloatingOrb key={i} {...orb} />
      ))}
    </>
  );
}

function FloatingOrb({ position, scale, speed, offset }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.3;
      ref.current.position.x =
        position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5 + offset) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color="#7c3aed"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------
   Mouse Parallax Camera Controller
   ------------------------------------------------------------------- */
function CameraController() {
  const { camera, mouse } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame(() => {
    // Smooth mouse follow
    target.current.x += (mouse.x * 0.3 - target.current.x) * 0.05;
    target.current.y += (mouse.y * 0.3 - target.current.y) * 0.05;

    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* -------------------------------------------------------------------
   Post-Processing Effects
   ------------------------------------------------------------------- */
function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0008, 0.0008]}
        radialModulation={true}
        modulationOffset={0.5}
      />
      <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.1} darkness={0.8} />
    </EffectComposer>
  );
}

/* -------------------------------------------------------------------
   Main ThreeBackground Component
   ------------------------------------------------------------------- */
const ThreeBackground = ({ className = "" }) => {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reduce particle count on mobile
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isMobile ? 3000 : 6000;

  return (
    <div
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ background: "linear-gradient(180deg, #030014 0%, #0a0118 50%, #030014 100%)" }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <ParticleGalaxy count={prefersReducedMotion ? 1000 : particleCount} />
          {!prefersReducedMotion && <FloatingOrbs count={isMobile ? 8 : 15} />}
          {!prefersReducedMotion && <CameraController />}
          {!prefersReducedMotion && <Effects />}
        </Suspense>
        <Preload all />
      </Canvas>
      
      {/* Gradient overlay for content readability */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(3, 0, 20, 0.4) 70%)",
        }}
      />
    </div>
  );
};

export default ThreeBackground;
