import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css";
import Scene from "./Scene";

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

function App() {
  return (
    <div className="h-screen  w-full">
      <Canvas
        className="h-screen w-full bg-white  overflow-hidden"
        camera={{ position: [0, 0, 4] }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
