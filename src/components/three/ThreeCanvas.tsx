"use client";

import { useDevice } from "@/contexts/DeviceContext";
import { HighlightProvider } from "@/contexts/HighlightContext";
import PersonalScene from "@/scenes/PersonalScene";
import { useStartStore } from "@/stores/useStartStore";
import { Physics } from "@react-three/cannon";
import { PointerLockControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { PointerLockControls as PointerLockControlsImpl } from "three-stdlib";
import { InteractionUI } from "../ui/InteractionUI";
import StartOverlay from "../ui/StartOverlay";
import { InteractionHandler } from "./InteractionHandler";
import MobileControlLogic from "./MobileControlLogic";
import MobileControlUI from "./MobileControlUI";
import MobileLookControl from "./MobileLookControl";
import Player from "./Player";

export default function ThreeCanvas() {
  const controlsRef = useRef<PointerLockControlsImpl | null>(null);
  const moveDirRef = useRef<{ x: number; z: number }>({ x: 0, z: 0 });
  const { started, start, end } = useStartStore();
  const { isTouchDevice } = useDevice();

  // 監聽 pointer lock 事件
  useEffect(() => {
    const handlePointerLockChange = () => {
      if (document.pointerLockElement === null) {
        end(); // 離開控制狀態，顯示 StartOverlay
      }
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange,
      );
    };
  }, [end]);

  return (
    <HighlightProvider>
      {!started && (
        <StartOverlay
          onStart={() =>
            setTimeout(() => {
              controlsRef.current?.lock();
            }, 100)
          }
        />
      )}
      {/* 手機控制 */}
      {isTouchDevice && <MobileControlUI moveDirRef={moveDirRef} />}
      <Canvas
        id="canvas-area"
        camera={{ position: [0, 1.6, 5], fov: 75 }}
        shadows
        style={{ width: "100vw", height: "100vh" }}
      >
        <hemisphereLight args={["#9900ff", "#444444", 0.7]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7.5]} intensity={1} castShadow />

        <Suspense fallback={null}>
          <Physics>
            <PersonalScene />
            <Player moveDirRef={moveDirRef} isMobile={isTouchDevice} />
          </Physics>
        </Suspense>
        {started && !isTouchDevice && <PointerLockControls ref={controlsRef} />}
        {/* 手機控制邏輯 */}
        {isTouchDevice && <MobileControlLogic moveDirRef={moveDirRef} />}
        {isTouchDevice && started && <MobileLookControl />}
        <InteractionHandler />
      </Canvas>
      <InteractionUI />
      {isTouchDevice && <div className="fixed right-2 top-2">close</div>}
    </HighlightProvider>
  );
}
