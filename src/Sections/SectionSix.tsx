import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const SectionSix = ({ z }: any) => {
  const particlesCount = 10000;
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const initialPositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      // Generate points on a sphere using spherical coordinates
      const radius = 20;
      const theta = Math.random() * Math.PI * 2; // Azimuthal angle
      const phi = Math.acos(2 * Math.random() - 1); // Polar angle

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }

    return {
      positions,
      colors,
      initialPositions,
    };
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += delta * 0.1;
      particlesRef.current.rotation.y += delta * 0.15;

      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < particlesCount; i++) {
        const x = i * 3;
        const y = i * 3 + 1;
        const z = i * 3 + 2;

        // Add wave motion
        positions[y] += Math.sin(state.clock.elapsedTime + positions[x]) * 0.01;

        // Gradually return to initial position
        positions[x] += (particles.initialPositions[x] - positions[x]) * 0.01;
        positions[y] += (particles.initialPositions[y] - positions[y]) * 0.01;
        positions[z] += (particles.initialPositions[z] - positions[z]) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} position={[0, 0, z]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};
