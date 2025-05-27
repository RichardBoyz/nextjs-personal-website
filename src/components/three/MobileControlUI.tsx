// src/components/three/MobileControlUI.tsx
"use client";

import { RefObject } from "react";

export default function MobileControlUI({
  moveDirRef,
}: {
  moveDirRef: RefObject<{ x: number; z: number }>;
}) {
  return (
    <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 1000 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 50px)",
          gap: 4,
        }}
      >
        <button
          onTouchStart={() => (moveDirRef.current!.z = -1)}
          onTouchEnd={() => (moveDirRef.current!.z = 0)}
        >
          ↑
        </button>
        <div></div>
        <button
          onTouchStart={() => (moveDirRef.current!.z = 1)}
          onTouchEnd={() => (moveDirRef.current!.z = 0)}
        >
          ↓
        </button>
        <button
          onTouchStart={() => (moveDirRef.current!.x = -1)}
          onTouchEnd={() => (moveDirRef.current!.x = 0)}
        >
          ←
        </button>
        <div></div>
        <button
          onTouchStart={() => (moveDirRef.current!.x = 1)}
          onTouchEnd={() => (moveDirRef.current!.x = 0)}
        >
          →
        </button>
      </div>
    </div>
  );
}
