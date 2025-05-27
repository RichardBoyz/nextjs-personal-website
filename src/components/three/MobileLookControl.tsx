"use client";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

export default function MobileLookControl() {
  const { camera } = useThree();
  const isDragging = useRef(false);
  const lastTouch = useRef<{ x: number; y: number } | null>(null);
  const look = useRef({ x: 0, y: 0 });
  camera.rotation.order = "YXZ";

  useEffect(() => {
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

      // 限制上下轉動角度（pitch）
      look.current.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, look.current.x)
      );

      camera.rotation.set(look.current.x, look.current.y, 0);
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
      lastTouch.current = null;
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [camera]);

  return null;
}
