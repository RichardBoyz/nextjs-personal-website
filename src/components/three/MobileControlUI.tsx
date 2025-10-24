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

  const buttonClass = "bg-black/50 text-white rounded-full select-none";

  return (
    <div className="bottom-t fixed bottom-5 left-5 z-10">
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
          className={buttonClass}
        >
          ↑
        </button>
        <button
          style={{ gridArea: "down" }}
          onTouchStart={() => (moveDirRef.current!.z = 1)}
          onTouchEnd={() => (moveDirRef.current!.z = 0)}
          className={buttonClass}
        >
          ↓
        </button>
        <button
          style={{ gridArea: "left" }}
          onTouchStart={() => (moveDirRef.current!.x = -1)}
          onTouchEnd={() => (moveDirRef.current!.x = 0)}
          className={buttonClass}
        >
          ←
        </button>
        <button
          style={{ gridArea: "right" }}
          onTouchStart={() => (moveDirRef.current!.x = 1)}
          onTouchEnd={() => (moveDirRef.current!.x = 0)}
          className={buttonClass}
        >
          →
        </button>
      </div>
    </div>
  );
}
