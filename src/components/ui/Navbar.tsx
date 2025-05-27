"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [initialized, setInitialized] = useState(false);

  // 檢查滾動方向
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!initialized) {
        setInitialized(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // 向下滑動 => 隱藏
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShow(false);
      }
      // 向上滑動 => 顯示
      else if (currentScrollY < lastScrollY) {
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, initialized]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="navbar"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-3 left-1/2 -translate-x-1/2 w-fit bg-white dark:bg-blue-950/50 shadow z-50 px-6 py-3 rounded-2xl"
        >
          <div className="max-w-screen-xl mx-auto gap-1 flex items-center justify-between">
            <Link href="/skill">Skill</Link>
            <Link href="/about">About</Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
