"use client";
import { EXCLUDE_HIGHLIGHT_NAMES } from "@/constants/highlight";
import { HighlightContext } from "@/contexts/HighlightContext";
import useCenterRaycast from "@/hooks/useCenterRaycast";
import { useStartStore } from "@/stores/useStartStore";
import { useThree } from "@react-three/fiber";
import { useContext, useEffect } from "react";
import * as THREE from "three";

export default function CenterHighlight() {
  const { camera, gl, scene } = useThree();
  const focused: THREE.Object3D | null = useCenterRaycast(); // 每幀命中物件
  const { started } = useStartStore();

  const { setCurrent, current } = useContext(HighlightContext);

  useEffect(() => {
    if (!focused || EXCLUDE_HIGHLIGHT_NAMES.has(focused.name)) {
      setCurrent(null);
      return;
    }
    setCurrent(focused);
  }, [focused]);

  // 支援桌面 click 及手機 tap 的聚焦物件點擊事件
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const deltaX = Math.abs(touch.clientX - startX);
      const deltaY = Math.abs(touch.clientY - startY);
      const isTap = deltaX < 10 && deltaY < 10;
      if (!isTap) return;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const clicked = intersects[0].object;
        // if (clicked.uuid === current?.uuid) {
        //   console.log(
        //     "你點擊了聚焦物件（手機）:",
        //     clicked.name || clicked.uuid
        //   );
        // }
      }
    };

    const handleClick = () => {
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const clicked = intersects[0].object;
        // if (clicked.uuid === current?.uuid) {
        //   console.log(
        //     "你點擊了聚焦物件（桌面）:",
        //     clicked.name || clicked.uuid
        //   );
        // }
      }
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [current]);

  if (!started) return null;
  return null;
}
