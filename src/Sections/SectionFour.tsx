import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export const SectionFour = ({ z }: { z: number }) => {
  const cubesRef = useRef<any[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { camera } = useThree();

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      camera.position.z += event.deltaY * 0.01;
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [camera]);

  const cubes = [
    { title: "Cube 1", position: [-4, 2, z + 0] },
    { title: "Cube 2", position: [-4, -2, z + 20] },
    { title: "Cube 3", position: [-4, 2, z + 40] },
    { title: "Cube 4", position: [-4, -2, z + 60] },
    { title: "Cube 5", position: [4, 2, z + 10] },
    { title: "Cube 6", position: [4, -2, z + 30] },
    { title: "Cube 7", position: [4, 2, z + 50] },
    { title: "Cube 8", position: [4, -2, z + 70] },
    { title: "Cube 9", position: [-4, 2, z + 80] },
    { title: "Cube 10", position: [-4, -2, z + 100] },
    { title: "Cube 11", position: [4, 2, z + 90] },
    { title: "Cube 12", position: [4, -2, z + 110] },
  ];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const cameraZ = state.camera.position.z;

    cubesRef.current.forEach((cube, index) => {
      if (cube) {
        // Calculate opacity based on distance from camera
        const distanceFromCamera = Math.abs(cube.position.z - cameraZ);
        const opacity = Math.max(
          0,
          Math.min(1, 1 - (distanceFromCamera - 10) / 30)
        );
        if (cube.material) {
          cube.material.opacity = opacity;
          cube.material.transparent = true;
        }

        if (selectedIndex === index) {
          const targetX = 0;
          const targetY = 0;
          const targetZ = z + state.camera.position.z - (z + 5);

          const distanceX = Math.abs(cube.position.x - targetX);
          const distanceY = Math.abs(cube.position.y - targetY);
          const distanceZ = Math.abs(cube.position.z - targetZ);

          cube.position.x += (targetX - cube.position.x) * 0.1;
          cube.position.y += (targetY - cube.position.y) * 0.1;
          cube.position.z += (targetZ - cube.position.z) * 0.1;
          cube.rotation.x = 0;
          cube.rotation.y = 0;
          cube.scale.x = 1.5;
          cube.scale.y = 1.5;
          cube.scale.z = 1.5;

          if (distanceX < 0.01 && distanceY < 0.01 && distanceZ < 0.01) {
            setIsTransitioning(false);
          } else {
            setIsTransitioning(true);
          }
        } else {
          const targetX = cubes[index].position[0];
          const targetY = cubes[index].position[1];
          const targetZ = cubes[index].position[2];

          cube.position.x += (targetX - cube.position.x) * 0.1;
          cube.position.y += (targetY - cube.position.y) * 0.1;
          cube.position.z += (targetZ - cube.position.z) * 0.1;

          cube.rotation.x = Math.sin(time + index) * 0.5;
          cube.rotation.y = Math.cos(time + index) * 0.5;
          cube.scale.x = 1 + Math.sin(time * 1.5 + index) * 0.02;
          cube.scale.y = 1 + Math.cos(time * 1.5 + index) * 0.02;
          cube.scale.z = 1 + Math.sin(time * 1.5 + index) * 0.02;
          cube.position.y += Math.sin(time * 0.5 + index) * 0.0005;

          if (hoveredIndex === index && !isTransitioning) {
            cube.rotation.x *= 2;
            cube.rotation.y *= 2;
            cube.scale.x = 1.2 + Math.sin(time * 3 + index) * 0.05;
            cube.scale.y = 1.2 + Math.cos(time * 3 + index) * 0.05;
            cube.scale.z = 1.2 + Math.sin(time * 3 + index) * 0.05;
            cube.position.y += Math.sin(time + index) * 0.001;
          }
        }
      }
    });
  });

  const handleCubeClick = (index: number) => {
    if (!isTransitioning) {
      if (selectedIndex === index) {
        setSelectedIndex(null);
      } else {
        setSelectedIndex(index);
      }
    }
  };

  const handleBackgroundClick = (e: any) => {
    if (e.target === e.currentTarget && !isTransitioning) {
      setSelectedIndex(null);
    }
  };

  return (
    <group onClick={handleBackgroundClick}>
      <Text
        position={[0, 0, z + 120]}
        fontSize={1}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Tech Skills
      </Text>
      {cubes.map((cube, index) => (
        <group
          key={index}
          position={[cube.position[0], cube.position[1], cube.position[2]]}
          ref={(el) => (cubesRef.current[index] = el)}
          onPointerEnter={() => !isTransitioning && setHoveredIndex(index)}
          onPointerLeave={() => !isTransitioning && setHoveredIndex(null)}
          onClick={() => handleCubeClick(index)}
        >
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
              color={hoveredIndex === index ? "hotpink" : "skyblue"}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={1}
            />
          </mesh>
          {/* <Text
            position={[0, -1.5, 0]}
            fontSize={0.3}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            {cube.title}
          </Text> */}
        </group>
      ))}
    </group>
  );
};
