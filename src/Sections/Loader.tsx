import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { Html } from "@react-three/drei";

export const Loader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const { active, progress } = useProgress();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Only complete when progress is 100 and loading is no longer active
    if (progress === 100 && !active && !isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        onLoadComplete();
      }, 500);
    }
  }, [progress, active, isComplete, onLoadComplete]);

  // Add console logs to debug progress
  useEffect(() => {
    console.log("Loading progress:", progress);
    console.log("Loading active:", active);
  }, [progress, active]);

  return (
    <Html center>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
        <div
          style={{
            color: "black",
            fontSize: "2rem",
            fontFamily: "monospace",
            textAlign: "center",
          }}
        >
          Loading... {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
};
