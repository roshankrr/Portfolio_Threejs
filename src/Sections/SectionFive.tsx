import { Text, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export const SectionFive = ({ z }: { z: number }) => {
  const gltf = useGLTF("/macbook.glb");
  const leftGroupRef = useRef<any>();
  const [direction, setDirection] = useState(1);
  const [totalRotation, setTotalRotation] = useState(0);
  const baseRotation = 0.9;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useFrame((_, delta) => {
    if (leftGroupRef.current) {
      const rotationAmount = delta * 0.2 * direction;
      const newRotation = totalRotation + rotationAmount;

      if (
        (direction === 1 && newRotation <= 0.4) ||
        (direction === -1 && newRotation >= -0.4)
      ) {
        leftGroupRef.current.rotation.y = baseRotation + newRotation;
        setTotalRotation(newRotation);
      } else {
        setDirection((prev) => prev * -1);
      }
    }
  });

  const handleSubmit = () => {
    console.log({ name, email, message });
    // Handle form submission
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <group position={[0, 0, z]}>
        {/* Left Section */}
        <group
          // ref={leftGroupRef}
          position={[-5, -2, 0]}
          rotation={[0, baseRotation, 0]}
        >
          <primitive object={gltf.scene} castShadow />
        </group>

        {/* Right Section - Contact Form */}
        <group position={[5, 0, 0]}>
          <Text color="Black" position={[0, 2, 0]} fontSize={0.7}>
            Contact Me
          </Text>

          {/* Name Input */}
          <group position={[0, 1, 0]}>
            <Text
              color="Black"
              position={[-1.5, 0, 0]}
              fontSize={0.3}
              anchorX="left"
            >
              Name:
            </Text>
            <mesh
              position={[0, -0.1, 0]}
              onPointerOver={() => setIsHovered("name")}
              onPointerOut={() => setIsHovered(null)}
              onClick={() => setName("User input would go here")}
            >
              <planeGeometry args={[3, 0.4]} />
              <meshStandardMaterial
                color={isHovered === "name" ? "#e0e0e0" : "white"}
              />
            </mesh>
          </group>

          {/* Email Input */}
          <group position={[0, 0, 0]}>
            <Text
              color="Black"
              position={[-1.5, 0, 0]}
              fontSize={0.3}
              anchorX="left"
            >
              Email:
            </Text>
            <mesh
              position={[0, -0.1, 0]}
              onPointerOver={() => setIsHovered("email")}
              onPointerOut={() => setIsHovered(null)}
              onClick={() => setEmail("user@example.com")}
            >
              <planeGeometry args={[3, 0.4]} />
              <meshStandardMaterial
                color={isHovered === "email" ? "#e0e0e0" : "white"}
              />
            </mesh>
          </group>

          {/* Message Input */}
          <group position={[0, -1.2, 0]}>
            <Text
              color="Black"
              position={[-1.5, 0, 0]}
              fontSize={0.3}
              anchorX="left"
            >
              Message:
            </Text>
            <mesh
              position={[0, -0.5, 0]}
              onPointerOver={() => setIsHovered("message")}
              onPointerOut={() => setIsHovered(null)}
              onClick={() => setMessage("Your message here")}
            >
              <planeGeometry args={[3, 1]} />
              <meshStandardMaterial
                color={isHovered === "message" ? "#e0e0e0" : "white"}
              />
            </mesh>
          </group>

          {/* Submit Button */}
          <group position={[0, -2.5, 0]}>
            <mesh
              onPointerOver={() => setIsHovered("submit")}
              onPointerOut={() => setIsHovered(null)}
              onClick={handleSubmit}
            >
              <planeGeometry args={[1.5, 0.4]} />
              <meshStandardMaterial
                color={isHovered === "submit" ? "#4CAF50" : "#45a049"}
              />
            </mesh>
            <Text color="white" position={[0, 0, 0.1]} fontSize={0.2}>
              Submit
            </Text>
          </group>
        </group>
      </group>
    </>
  );
};
