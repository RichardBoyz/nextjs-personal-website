"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { OrbitControls, PointerLockControls } from "@react-three/drei";
import PersonalScene from "@/scenes/PersonalScene";
import Player from "./Player";
import MobileControlLogic from "./MobileControlLogic";
import StartOverlay from "../ui/StartOverlay";
import { PointerLockControls as PointerLockControlsImpl } from "three-stdlib";
import MobileControlUI from "./MobileControlUI";
import { useStartStore } from "@/stores/useStartStore";
import useMobile from "@/hooks/useMobile";
import MobileLookControl from "./MobileLookControl";
import CenterHighlight from "./CenterHighlight";
import { HighlightProvider } from "@/contexts/HighlightContext";

export default function ThreeCanvas() {
  const controlsRef = useRef<PointerLockControlsImpl | null>(null);
  const moveDirRef = useRef<{ x: number; z: number }>({ x: 0, z: 0 });
  const { started, start, end } = useStartStore();
  const isMobile = useMobile();

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
        handlePointerLockChange
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
      {isMobile && <MobileControlUI moveDirRef={moveDirRef} />}
      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 75 }}
        shadows
        style={{ width: "100vw", height: "100vh" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7.5]} intensity={1} castShadow />

        {/* 使用 Suspense 包裝非同步載入內容（如模型） */}
        <Suspense fallback={null}>
          <PersonalScene />
        </Suspense>

        {/* 開發階段可以先用 OrbitControls，之後用 PointerLockControls 取代 */}
        {/* <OrbitControls /> */}
        {started && !isMobile && <PointerLockControls ref={controlsRef} />}

        {/* 手機控制邏輯 */}
        {isMobile && <MobileControlLogic moveDirRef={moveDirRef} />}

        {isMobile && started && <MobileLookControl />}

        {/* 使用者 */}
        <Player />

        {/* 顯示 HighLight */}
        <CenterHighlight />
      </Canvas>
    </HighlightProvider>
  );
}
