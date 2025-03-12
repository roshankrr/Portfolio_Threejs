import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Plane, Text } from "@react-three/drei";
import project1Img from "/images/Project1.jpeg";
import project2Img from "/images/Project2.jpeg";
import project3Img from "/images/Project3.jpeg";
import project4Img from "/images/Project4.jpeg";
import project5Img from "/images/Project5.jpeg";
import project6Img from "/images/Project6.jpeg";
import project7Img from "/images/Project7.jpeg";
import project8Img from "/images/Project8.jpeg";
import project9Img from "/images/Project9.jpeg";
import project10Img from "/images/Project10.jpeg";
import project11Img from "/images/Project11.jpeg";
import project12Img from "/images/Project12.jpeg";
import { TextureLoader } from "three";

export const SectionThree = ({ z }: { z: number }) => {
  const projectsRef = useRef<any[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const projects = [
    {
      title: "Project 1",
      position: [-4, 2, z + 0],
      image: project1Img,
      link: "https://roshankrr.github.io/Upflares_projectt/",
    },
    {
      title: "Project 2",
      position: [-4, -2, z + 5],
      image: project2Img,
      link: "https://example.com/project2",
    },
    {
      title: "Project 3",
      position: [-4, 2, z + 10],
      image: project3Img,
      link: "https://uber-hospital-4ikz15mpp-roshan-kumars-projects-6bfd45a7.vercel.app/",
    },
    {
      title: "Project 4",
      position: [-4, -2, z + 15],
      image: project4Img,
      link: "https://sahaara-app.vercel.app/",
    },
    {
      title: "Project 5",
      position: [4, 2, z + 0],
      image: project5Img,
      link: "https://avikya.vercel.app/",
    },
    {
      title: "Project 6",
      position: [4, -2, z + 5],
      image: project6Img,
      link: "https://portfolio-threejs-one-teal.vercel.app/",
    },
    {
      title: "Project 7",
      position: [4, 2, z + 10],
      image: project7Img,
      link: "https://jobsco-rho.vercel.app/",
    },
    {
      title: "Project 8",
      position: [4, -2, z + 15],
      image: project8Img,
      link: "https://reviewsmatter-ui.vercel.app/",
    },
    {
      title: "Project 9",
      position: [-4, 2, z + 20],
      image: project9Img,
      link: "https://recipy-api.vercel.app/",
    },
    {
      title: "Project 10",
      position: [-4, -2, z + 25],
      image: project10Img,
      link: "https://otchi-clone.vercel.app/",
    },
    {
      title: "Project 11",
      position: [4, 2, z + 20],
      image: project11Img,
      link: "https://apple-website-clone-mu-ruby.vercel.app/",
    },
    {
      title: "Project 12",
      position: [4, -2, z + 25],
      image: project12Img,
      link: "https://uberbyroshan.vercel.app/",
    },
  ];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    projectsRef.current.forEach((project, index) => {
      if (project) {
        if (selectedIndex === index) {
          // Move selected project to center with smooth transition
          const targetX = 0;
          const targetY = 0;
          const targetZ = z + state.camera.position.z - (z + 5);

          const distanceX = Math.abs(project.position.x - targetX);
          const distanceY = Math.abs(project.position.y - targetY);
          const distanceZ = Math.abs(project.position.z - targetZ);

          project.position.x += (targetX - project.position.x) * 0.1;
          project.position.y += (targetY - project.position.y) * 0.1;
          project.position.z += (targetZ - project.position.z) * 0.1;
          project.rotation.x = 0;
          project.rotation.y = 0;
          project.scale.x = 1.5;
          project.scale.y = 1.5;

          // Check if project has reached target position
          if (distanceX < 0.01 && distanceY < 0.01 && distanceZ < 0.01) {
            setIsTransitioning(false);
          } else {
            setIsTransitioning(true);
          }
        } else {
          // Return to original position if not selected
          const targetX = projects[index].position[0];
          const targetY = projects[index].position[1];
          const targetZ = projects[index].position[2];

          project.position.x += (targetX - project.position.x) * 0.1;
          project.position.y += (targetY - project.position.y) * 0.1;
          project.position.z += (targetZ - project.position.z) * 0.1;

          // Default light animation for non-selected projects
          project.rotation.x = Math.sin(time + index) * 0.05;
          project.rotation.y = Math.cos(time + index) * 0.05;
          project.scale.x = 1 + Math.sin(time * 1.5 + index) * 0.02;
          project.scale.y = 1 + Math.cos(time * 1.5 + index) * 0.02;
          project.position.y += Math.sin(time * 0.5 + index) * 0.0005;

          // Additional animation when hovered
          if (hoveredIndex === index && !isTransitioning) {
            project.rotation.x *= 2;
            project.rotation.y *= 2;
            project.scale.x = 1 + Math.sin(time * 3 + index) * 0.05;
            project.scale.y = 1 + Math.cos(time * 3 + index) * 0.05;
            project.position.y += Math.sin(time + index) * 0.001;
          }
        }
      }
    });
  });

  const handleProjectClick = (index: number) => {
    if (!isTransitioning) {
      if (selectedIndex === index) {
        setSelectedIndex(null);
      } else {
        setSelectedIndex(index);
      }
    }
  };

  const handleBackgroundClick = (e: any) => {
    // Only trigger if clicking on the background, not on a project, and not transitioning
    if (e.target === e.currentTarget && !isTransitioning) {
      setSelectedIndex(null);
    }
  };

  return (
    <group onClick={handleBackgroundClick}>
      <Text
        position={[0, 0, z + 45]}
        fontSize={1}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Projects
      </Text>
      {projects.map((project, index) => (
        <group
          key={index}
          position={[
            project.position[0],
            project.position[1],
            project.position[2],
          ]}
          ref={(el) => (projectsRef.current[index] = el)}
          onPointerEnter={() => !isTransitioning && setHoveredIndex(index)}
          onPointerLeave={() => !isTransitioning && setHoveredIndex(null)}
          onClick={() => handleProjectClick(index)}
        >
          <Plane args={[3, 2]}>
            <meshStandardMaterial
              metalness={1}
              roughness={0.5}
              map={useLoader(TextureLoader, project.image)}
            />
          </Plane>
          {selectedIndex === index && !isTransitioning && (
            <group position={[0, -1.5, 0]}>
              <Text
                position={[-1, 0, 0.1]}
                fontSize={0.3}
                color="black"
                anchorX="center"
                anchorY="middle"
                onClick={() => setSelectedIndex(null)}
              >
                Close
              </Text>
              <Text
                position={[1, 0, 0.1]}
                fontSize={0.3}
                color="black"
                anchorX="center"
                anchorY="middle"
                onClick={() => window.open(project.link, "_blank")}
              >
                Visit
              </Text>
            </group>
          )}
        </group>
      ))}
    </group>
  );
};
