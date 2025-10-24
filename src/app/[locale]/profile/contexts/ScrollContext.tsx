// ScrollContext.tsx
"use client";
import { MotionValue } from "framer-motion";
import { createContext, useContext } from "react";

type ScrollContextType = {
  scrollYProgress: MotionValue<number> | null;
};

export const ScrollContext = createContext<ScrollContextType>({
  scrollYProgress: null,
});

export const useScrollContext = () => useContext(ScrollContext);
