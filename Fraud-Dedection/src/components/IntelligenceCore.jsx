import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { Shield } from "lucide-react";
import { detectionModules } from "../data/mockData";

export function IntelligenceCore({ compact = false }) {
  return (
    <div className={`core ${compact ? "compact" : ""}`}>
      <div className="core-grid" />
      {detectionModules.map((module, index) => (
        <div
          className={`core-node n${index}`}
          style={{ "--node": module.color }}
          key={module.key}
        >
          <module.icon size={compact ? 12 : 15} />
          <span>{module.name.split(" ")[0]}</span>
        </div>
      ))}
      <div className="core-ring r1" />
      <div className="core-ring r2" />
      <div className="core-center">
        <Shield size={compact ? 24 : 34} />
        <strong>CORE</strong>
        <small>LIVE INTELLIGENCE</small>
      </div>
    </div>
  );
}

export function ThreeScene({ count = 90 }) {
  return (
    <div className="three-scene">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <Sparkles
          count={count}
          scale={7}
          size={1.7}
          speed={0.3}
          color="#3b82f6"
        />
      </Canvas>
    </div>
  );
}
