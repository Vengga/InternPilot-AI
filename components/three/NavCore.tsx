"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles, Float } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function usePalette() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";
  return dark
    ? { core: "#38d3e6", wire: "#7fe9f5", accent: "#ff963c", spark: "#bfe9ff", bg: "#060a16" }
    : { core: "#0e7490", wire: "#178ba6", accent: "#c16808", spark: "#1d4e6b", bg: "#ebf0f8" };
}

function reduceMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function Core({ palette }: { palette: ReturnType<typeof usePalette> }) {
  const group = useRef<THREE.Group>(null);
  const slow = reduceMotion() ? 0 : 1;

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.18 * slow;
  });

  return (
    <group ref={group}>
      {/* The distorted reasoning core */}
      <Float speed={1.1 * slow} rotationIntensity={0.5 * slow} floatIntensity={0.7 * slow}>
        <mesh>
          <icosahedronGeometry args={[1.25, 6]} />
          <MeshDistortMaterial
            color={palette.core}
            emissive={palette.core}
            emissiveIntensity={0.25}
            roughness={0.25}
            metalness={0.35}
            distort={0.32}
            speed={1.6 * slow}
          />
        </mesh>
        {/* Wireframe overlay reads as an instrument shell */}
        <mesh scale={1.04}>
          <icosahedronGeometry args={[1.25, 2]} />
          <meshBasicMaterial color={palette.wire} wireframe transparent opacity={0.18} />
        </mesh>
      </Float>
    </group>
  );
}

function Trajectory({ palette }: { palette: ReturnType<typeof usePalette> }) {
  const ring = useRef<THREE.Group>(null);
  const marker = useRef<THREE.Mesh>(null);
  const slow = reduceMotion() ? 0 : 1;
  const radius = 2.35;

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.4 * slow;
    if (ring.current) ring.current.rotation.z = t * 0.25;
    if (marker.current) {
      marker.current.position.x = Math.cos(t) * radius;
      marker.current.position.y = Math.sin(t) * radius;
    }
  });

  return (
    <group rotation={[Math.PI / 2.6, 0.3, 0]}>
      <group ref={ring}>
        <mesh>
          <torusGeometry args={[radius, 0.012, 16, 160]} />
          <meshBasicMaterial color={palette.accent} transparent opacity={0.55} />
        </mesh>
        <mesh ref={marker}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshBasicMaterial color={palette.accent} />
        </mesh>
      </group>
    </group>
  );
}

export default function NavCore() {
  const palette = usePalette();
  const sparkColor = useMemo(() => new THREE.Color(palette.spark), [palette.spark]);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 5]} intensity={1.1} color={palette.core} />
      <pointLight position={[-5, -3, 2]} intensity={0.7} color={palette.accent} />
      <Core palette={palette} />
      <Trajectory palette={palette} />
      <Sparkles count={70} scale={9} size={2.2} speed={reduceMotion() ? 0 : 0.4} color={sparkColor} opacity={0.7} />
    </Canvas>
  );
}
