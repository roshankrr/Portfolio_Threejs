import { SectionFive } from "./Sections/SectionFive";
import { SectionFour } from "./Sections/SectionFour";
import { SectionOne } from "./Sections/SectionOne";
import { SectionSix } from "./Sections/SectionSix";
import { SectionThree } from "./Sections/SectionThree";
import { SectionTwo } from "./Sections/SectionTwo";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const Scene = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 505;

    // Prevent default scrolling behavior
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("wheel", preventDefault, { passive: false });
    document.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      document.removeEventListener("wheel", preventDefault);
      document.removeEventListener("touchmove", preventDefault);
    };
  }, [camera]);

  return (
    <>
      <SectionOne z={500} />
      <SectionTwo z={400} />
      <SectionThree z={300} />
      <SectionFour z={50} />
      <SectionSix z={0} />
      <SectionFive z={0} />
    </>
  );
};

export default Scene;