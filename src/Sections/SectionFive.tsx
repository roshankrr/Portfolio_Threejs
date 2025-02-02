import { Text, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

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
  const [isInputActive, setIsInputActive] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false); // New state for form submission

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isInputActive) return;

      if (e.key === "Enter") {
        setIsInputActive(null);
        return;
      }

      if (e.key === "Backspace") {
        switch (isInputActive) {
          case "name":
            setName((prev) => prev.slice(0, -1));
            break;
          case "email":
            setEmail((prev) => prev.slice(0, -1));
            break;
          case "message":
            setMessage((prev) => prev.slice(0, -1));
            break;
        }
        return;
      }

      if (e.key.length === 1) {
        switch (isInputActive) {
          case "name":
            setName((prev) => prev + e.key);
            break;
          case "email":
            setEmail((prev) => prev + e.key);
            break;
          case "message":
            setMessage((prev) => prev + e.key);
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isInputActive]);

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

  const handleSubmit = async () => {
    if (name && email && message) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Remove the Access-Control-Allow-Origin header
          },
          body: JSON.stringify({
            access_key: "0681ef46-faa7-4e81-8c23-65fafed62885",
            name,
            email,
            message,
          }),
        });

        if (response.ok) {
          setName("");
          setEmail("");
          setMessage("");
          setFormSubmitted(true); // Set form submitted state to true
        } else {
          console.error("Failed to submit form");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <group position={[0, 0, z]}>
      {/* Left Section */}
      <group
        ref={leftGroupRef}
        position={[-5, -2, 0]}
        rotation={[0, baseRotation, 0]}
      >
        <primitive object={gltf.scene} castShadow />
      </group>

      {/* Right Section - Form */}

      {formSubmitted ? (
        <>
          <group position={[5, 0, 0]}>
            <mesh position={[0, 0, -0.1]}>
              <boxGeometry args={[7, 10, 0.2]} />
              <meshStandardMaterial
                color="lightgreen"
                metalness={1}
                roughness={0.3}
              />
            </mesh>

            <group position={[0, 3, 0]}>
              <Text color="#333" fontSize={0.6} anchorX="center">
                Form Submitted
              </Text>
              <Text
                color="#333"
                position={[0, -0.7, 0]}
                fontSize={0.6}
                anchorX="center"
              >
                Successfully!
              </Text>
            </group>

            <group position={[0, 1.5, 0]}>
              <Text color="#444" fontSize={0.4} anchorX="center">
                Thank you for your submission!
              </Text>
            </group>
            <Text
              color="#444"
              position={[0, -1, 0]}
              fontSize={1}
              anchorX="center"
            >
              ✅
            </Text>

            <group position={[0, -3, 0]}>
              <mesh
                position={[0, 0, 0]}
                onPointerEnter={() => setIsHovered("return")}
                onPointerLeave={() => setIsHovered(null)}
                onClick={() => setFormSubmitted(false)} // Reset submission state
              >
                <boxGeometry args={[3.5, 0.8, 0.2]} />
                <meshStandardMaterial
                  color={isHovered === "return" ? "#2196f3" : "#1976d2"}
                />
              </mesh>
              <Text position={[0, 0, 0.2]} color="white" fontSize={0.4}>
                Return to Form
              </Text>
            </group>
          </group>
        </>
      ) : (
        <>
          <group position={[5, 0, 0]}>
            {/* Form Background */}
            <mesh position={[0, 0, -0.1]}>
              <boxGeometry args={[7, 10, 0.2]} />
              <meshStandardMaterial
                color="skyblue"
                metalness={1}
                roughness={0.3}
              />
            </mesh>

            {/* Form Header */}
            <group position={[0, 3, 0]}>
              <Text color="#333" fontSize={0.6} anchorX="center">
                Contact Form
              </Text>
            </group>

            {/* Form Fields */}
            <group position={[0, 1.5, 0]}>
              {/* Name Field */}
              <group position={[0, 0.5, 0]}>
                <Text
                  color="#444"
                  position={[-2.5, 0, 0]}
                  fontSize={0.4}
                  anchorX="left"
                >
                  Name:
                </Text>
                <mesh
                  position={[0, -0.3, 0]}
                  onPointerEnter={() => setIsHovered("name")}
                  onPointerLeave={() => setIsHovered(null)}
                  onClick={() => setIsInputActive("name")}
                >
                  <planeGeometry args={[4.5, 0.8]} />
                  <meshStandardMaterial
                    color={isInputActive === "name" ? "#e3f2fd" : "white"}
                  />
                </mesh>
                <Text
                  position={[0, -0.3, 0.1]}
                  color={"#333"}
                  fontSize={0.35}
                  anchorX="center"
                >
                  {name || (isInputActive === "name" ? "_" : "")}
                </Text>
              </group>

              {/* Email Field */}
              <group position={[0, -1, 0]}>
                <Text
                  color="#444"
                  position={[-2.5, 0, 0]}
                  fontSize={0.4}
                  anchorX="left"
                >
                  Email:
                </Text>
                <mesh
                  position={[0, -0.3, 0]}
                  onPointerEnter={() => setIsHovered("email")}
                  onPointerLeave={() => setIsHovered(null)}
                  onClick={() => setIsInputActive("email")}
                >
                  <planeGeometry args={[4.5, 0.8]} />
                  <meshStandardMaterial
                    color={isInputActive === "email" ? "#e3f2fd" : "white"}
                  />
                </mesh>
                <Text
                  position={[0, -0.3, 0.1]}
                  color={"#333"}
                  fontSize={0.35}
                  anchorX="center"
                >
                  {email || (isInputActive === "email" ? "_" : "")}
                </Text>
              </group>

              {/* Message Field */}
              <group position={[0, -3, 0]}>
                <Text
                  color="#444"
                  position={[-2.5, 0, 0]}
                  fontSize={0.4}
                  anchorX="left"
                >
                  Message:
                </Text>
                <mesh
                  position={[0, -0.8, 0]}
                  onPointerEnter={() => setIsHovered("message")}
                  onPointerLeave={() => setIsHovered(null)}
                  onClick={() => setIsInputActive("message")}
                >
                  <planeGeometry args={[4.5, 2]} />
                  <meshStandardMaterial
                    color={isInputActive === "message" ? "#e3f2fd" : "white"}
                  />
                </mesh>
                <Text
                  position={[0, -0.8, 0.1]}
                  fontSize={0.35}
                  color={"#333"}
                  anchorX="center"
                >
                  {message || (isInputActive === "message" ? "_" : "")}
                </Text>
              </group>
            </group>

            {/* Submit Button */}
            <group position={[0, -4, 0]}>
              <mesh
                position={[0, 0, 0]}
                onPointerEnter={() => setIsHovered("submit")}
                onPointerLeave={() => setIsHovered(null)}
                onClick={handleSubmit}
              >
                <boxGeometry args={[2, 0.8, 0.2]} />
                <meshStandardMaterial
                  color={isHovered === "submit" ? "#2196f3" : "#1976d2"}
                />
              </mesh>
              <Text position={[0, 0, 0.2]} color="white" fontSize={0.4}>
                Submit
              </Text>
            </group>
          </group>
        </>
      )}
    </group>
  );
};
