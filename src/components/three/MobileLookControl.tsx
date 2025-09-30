"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function MobileLookControl() {
  const { camera } = useThree();
  const isDragging = useRef(false);
  const lastTouch = useRef<{ x: number; y: number } | null>(null);
  const look = useRef({ x: 0, y: 0 });
  camera.rotation.order = "YXZ";

  useEffect(() => {
    const element = document.getElementById("canvas-area");
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      lastTouch.current = { x: touch.clientX, y: touch.clientY };
      look.current.x = camera.rotation.x;
      look.current.y = camera.rotation.y;
      isDragging.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDragging.current || !lastTouch.current) return;
      const touch = e.touches[0];

      const deltaX = touch.clientX - lastTouch.current.x;
      const deltaY = touch.clientY - lastTouch.current.y;

      lastTouch.current = { x: touch.clientX, y: touch.clientY };

      const sensitivity = 0.002;

      look.current.x -= deltaY * sensitivity;
      look.current.y -= deltaX * sensitivity;

      look.current.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, look.current.x)
      );
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
      lastTouch.current = null;
    };

    // ✅ 綁定在 canvas-area
    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [camera]);

  useFrame(() => {
    camera.rotation.set(look.current.x, look.current.y, 0);
  });

  return null;
}
