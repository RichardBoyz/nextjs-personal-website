// src/components/three/MobileControlUI.tsx
"use client";

import { useStartStore } from "@/stores/useStartStore";
import { RefObject } from "react";

export default function MobileControlUI({
  moveDirRef,
}: {
  moveDirRef: RefObject<{ x: number; z: number }>;
}) {
  const started = useStartStore((state) => state.started);
  if (!started) return null; // 如果未開始操作，則不顯示控制UI
  return (
    <div style={{ position: "fixed", left: 20, bottom: 20, zIndex: 1000 }}>
      <div
        style={{
          display: "grid",
          gridTemplateAreas: `
            ".    up    ."
            "left  .  right"
            ".   down   ."
          `,
          gridTemplateColumns: "repeat(3, 50px)",
          gridTemplateRows: "repeat(3, 50px)",
          gap: 4,
        }}
      >
        <button
          style={{ gridArea: "up" }}
          onTouchStart={() => (moveDirRef.current!.z = -1)}
          onTouchEnd={() => (moveDirRef.current!.z = 0)}
          className="bg-blue-500 rounded-full"
        >
          ↑
        </button>
        <button
          style={{ gridArea: "down" }}
          onTouchStart={() => (moveDirRef.current!.z = 1)}
          onTouchEnd={() => (moveDirRef.current!.z = 0)}
        >
          ↓
        </button>
        <button
          style={{ gridArea: "left" }}
          onTouchStart={() => (moveDirRef.current!.x = -1)}
          onTouchEnd={() => (moveDirRef.current!.x = 0)}
        >
          ←
        </button>
        <button
          style={{ gridArea: "right" }}
          onTouchStart={() => (moveDirRef.current!.x = 1)}
          onTouchEnd={() => (moveDirRef.current!.x = 0)}
        >
          →
        </button>
      </div>
    </div>
  );
}
