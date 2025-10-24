"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeChanger({
  className,
  moonIconClassName,
}: {
  className?: string;
  moonIconClassName?: string;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx(
        "group absolute z-20 w-fit cursor-pointer p-2 outline-none transition-colors duration-200 hover:bg-gray-500 dark:hover:bg-gray-700",
        className,
      )}
    >
      {isDark ? (
        <SunIcon className="icon-button-basic text-yellow-500" />
      ) : (
        <MoonIcon
          className={clsx(
            "icon-button-basic text-black group-hover:text-white dark:text-white",
            moonIconClassName,
          )}
        />
      )}
    </button>
  );
}
