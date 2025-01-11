import { SectionFive } from "./Sections/SectionFive";
import { SectionFour } from "./Sections/SectionFour";
import { SectionOne } from "./Sections/SectionOne";
import { SectionSix } from "./Sections/SectionSix";
import { SectionThree } from "./Sections/SectionThree";
import { SectionTwo } from "./Sections/SectionTwo";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

const Scene = () => {
  const { camera } = useThree();
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    camera.position.z = 505;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.1;
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchEnd = e.touches[0].clientY;
      const delta = touchStart - touchEnd;
      camera.position.z += delta * 0.1;
      setTouchStart(touchEnd);
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [camera, touchStart]);

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
