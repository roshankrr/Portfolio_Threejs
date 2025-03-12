import { Text, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

export const SectionTwo = ({ z }: { z: number }) => {
  const gltf = useGLTF("/human.glb");
  const linkedInTexture = useTexture("/linkedin.svg");
  const githubTexture = useTexture("/github.png");
  const instaTexture = useTexture("/instagram.jpg");
  const leftGroupRef = useRef<any>();
  const linkedInRef = useRef<any>();
  const githubRef = useRef<any>();
  const instaRef = useRef<any>();
  const [direction, setDirection] = useState(1);
  const [totalRotation, setTotalRotation] = useState(0);
  const baseRotation = 0.9;
  const [linkedInHovered, setLinkedInHovered] = useState(false);
  const [githubHovered, setGithubHovered] = useState(false);
  const [instaHovered, setInstaHovered] = useState(false);
  const roles = [
    "Software Engineer",
    "Graphic Designer",
    "Web Developer",
    "UI/UX Designer",
    "Full Stack Developer",
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 1000;

    if (!isDeleting && displayText === currentRole) {
      // Pause at full word before deleting
      const timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeoutId);
    }

    if (isDeleting && displayText === "") {
      // Move to next word after fully deleted
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeoutId = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          // Deleting
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeoutId);
  }, [displayText, currentRoleIndex, isDeleting]);

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

    // Rotate the social media cubes with slower rotation when hovered
    if (linkedInRef.current) {
      linkedInRef.current.rotation.y += delta * (linkedInHovered ? 0.1 : 0.5);
    }
    if (githubRef.current) {
      githubRef.current.rotation.y += delta * (githubHovered ? 0.1 : 0.5);
    }
    if (instaRef.current) {
      instaRef.current.rotation.y += delta * (instaHovered ? 0.1 : 0.5);
    }
  });

  return (
    <>
      <group position={[0, 0, z]}>
        {/* Left Section */}
        <group
          ref={leftGroupRef}
          position={[-5, 0, 0]}
          rotation={[0, baseRotation, 0]}
        >
          <primitive object={gltf.scene} castShadow />
        </group>

        {/* Right Section */}
        <group position={[5, 0, 0]}>
          <Text color="Black" position={[0, 1, 0]} fontSize={0.7}>
            Hey, I'm Roshan Kumar
          </Text>
          <Text color="Black" fontSize={0.7}>
            I'm a {displayText}
          </Text>
          <group rotation={[1, 0, 0]} position={[0, -1, 0]}>
            <mesh
              ref={linkedInRef}
              position={[-1, -1, 0]}
              onPointerOver={() => setLinkedInHovered(true)}
              onPointerOut={() => setLinkedInHovered(false)}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/roshan-kumar-09b143205/",
                  "_linkedIn"
                )
              }
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                roughness={0}
                metalness={1}
                map={linkedInTexture}
              />
            </mesh>
            <mesh
              ref={githubRef}
              position={[0.5, -1, 0]}
              onPointerOver={() => setGithubHovered(true)}
              onPointerOut={() => setGithubHovered(false)}
              onClick={() =>
                window.open("https://github.com/roshankrr", "_github")
              }
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                roughness={0}
                metalness={1}
                map={githubTexture}
              />
            </mesh>
            <mesh
              ref={instaRef}
              position={[2, -1, 0]}
              onPointerOver={() => setInstaHovered(true)}
              onPointerOut={() => setInstaHovered(false)}
              onClick={() =>
                window.open(
                  "https://www.instagram.com/roshan_k_y?igsh=MWF6Yzh3czBvZG5qdw==",
                  "_insta"
                )
              }
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                roughness={0}
                metalness={1}
                map={instaTexture}
              />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
};
