"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

export function ThemeChanger() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");

  // 在組件掛載後才渲染，避免服務器端渲染與客戶端不匹配的問題
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label={t("switcher.aria")}
      className="rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <SunIcon className="size-5 text-yellow-500" />
      ) : (
        <MoonIcon className="size-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  );
}
