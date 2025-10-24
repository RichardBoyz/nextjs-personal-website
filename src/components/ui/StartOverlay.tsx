// src/components/ui/StartOverlay.tsx
"use client";

import { useStartStore } from "@/stores/useStartStore";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { GameButton } from "./GameButton";

export default function StartOverlay({ onStart }: { onStart: () => void }) {
  const router = useRouter();

  const handleStart = () => {
    useStartStore.getState().start();
    onStart();
  };
  const t = useTranslations();

  return (
    <>
      <div className="pointer-events-auto fixed inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-transparent text-xl text-white">
        <div className="flex w-4/5 flex-col items-stretch gap-2 rounded-2xl border bg-black p-4 sm:w-3/4 md:w-1/2">
          <GameButton onClick={handleStart} label={t("common.startExplore")} />
          <GameButton
            label={t("common.directToMyPage")}
            onClick={() => router.push("/profile")}
          />
        </div>
      </div>
    </>
  );
}
