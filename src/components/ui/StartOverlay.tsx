// src/components/ui/StartOverlay.tsx
"use client";

import { useStartStore } from "@/stores/useStartStore";

export default function StartOverlay({ onStart }: { onStart: () => void }) {
  const handleStart = () => {
    useStartStore.getState().start();
    onStart();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9,
        pointerEvents: "auto",
        color: "white",
        fontSize: "1.5rem",
        flexDirection: "column",
      }}
    >
      <p style={{ pointerEvents: "none" }}>點擊開始進入互動體驗</p>
      <button
        style={{
          marginTop: 16,
          padding: "12px 24px",
          fontSize: "1rem",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
        onClick={handleStart}
      >
        開始探索
      </button>
    </div>
  );
}
