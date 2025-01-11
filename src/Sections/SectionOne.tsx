import { OrbitControls, Environment, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
export const SectionOne = ({ z }: any) => {
  const meshref = useRef<any>();
  const [speed, setSpeed] = useState<number>(1);
  const colors = ["skyblue", "hotpink", "lime", "orange", "purple", "white"];
  const [colorIndex, setColorIndex] = useState<number>(0);
  const rotationRef = useRef({ x: 0, y: 0, z: 0 });
  useFrame((_, delta) => {
    rotationRef.current.x += delta * speed;
    rotationRef.current.y += delta * speed;
    rotationRef.current.z += delta * speed;

    meshref.current.rotation.x = rotationRef.current.x;
    meshref.current.rotation.y = rotationRef.current.y;
    meshref.current.rotation.z = rotationRef.current.z;
  });

  const handleColorChange = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  function Box() {
    return (
      <group
        onPointerEnter={() => setSpeed(0.3)}
        onPointerLeave={() => setSpeed(1)}
        position={[0, 0, z]}
      >
        <mesh ref={meshref} onClick={handleColorChange}>
          <torusGeometry args={[2, 0.6, 26, 55]} />
          <meshPhysicalMaterial
            color={colors[colorIndex]}
            reflectivity={1}
            clearcoat={1}
            roughness={0}
          />
        </mesh>
        <Text color={"black"} fontSize={2}>
          Porfolio
        </Text>
      </group>
    );
  }
  return (
    <>
      <Environment preset="sunset" />
      <Box />
      {/* <OrbitControls /> */}
    </>
  );
};
