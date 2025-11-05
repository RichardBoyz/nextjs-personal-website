"use client";

import { PROFILE_SECTION } from "@/constants/profile";
import { scrollToSection } from "@/utils/scrollToSection";
import clsx from "clsx";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";

export const Overview = () => {
  const [isFixed, setIsFixed] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const blockOriginTop = useRef<number | null>(null);
  const [blockHeight, setBlockHeight] = useState(0);
  const t = useTranslations();

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!blockRef.current) return;
      const scrollParent = blockRef.current.closest(
        "[data-scroll-container]",
      ) as HTMLElement | null;
      const spacer = blockRef.current
        .previousElementSibling as HTMLElement | null;
      if (!spacer) return;

      const spacerRect = spacer.getBoundingClientRect();
      const parentRect = scrollParent
        ? scrollParent.getBoundingClientRect()
        : { top: 0, left: 0 };

      blockOriginTop.current = spacerRect.top - parentRect.top - 8;
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (blockRef.current) {
        setBlockHeight(blockRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const scrollParent =
      blockRef.current?.closest("[data-scroll-container]") || window;

    const handleScroll = () => {
      if (!spacerRef.current) return;

      const parentRect =
        scrollParent instanceof Window
          ? { top: 0 }
          : (scrollParent as HTMLElement).getBoundingClientRect();
      const spacerRect = spacerRef.current.getBoundingClientRect();

      // 計算 spacer 相對於 scrollParent 頂端的距離
      const offset = spacerRect.top - parentRect.top;

      setIsFixed((prev) => {
        if (offset <= 8 && !prev) return true;
        if (offset > 8 && prev) return false;
        return prev;
      });
    };

    handleScroll();
    scrollParent.addEventListener("scroll", handleScroll);
    return () => scrollParent.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col items-center p-4 pt-[5rem]">
        <div className="flex w-full">
          <div className="relative flex w-1/2 flex-col gap-2">
            <h1 className="text-xl font-bold md:text-3xl">
              {t("about.title")}
            </h1>
            <p className="mb-auto">{t("about.content")}</p>

            {/* spacer for fixed block height */}
            <div
              ref={spacerRef}
              style={{ height: isFixed ? blockHeight : 0 }}
            />
            <motion.div
              ref={blockRef}
              animate={{
                top: isFixed ? "16px" : "8px",
              }}
              className={clsx(
                "z-50 flex flex-col gap-4 bg-transparent",
                isFixed && "fixed",
              )}
            >
              {isFixed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isFixed ? 1 : 0 }}
                  transition={{ opacity: { delay: 0.2 } }}
                  className="fixed left-3 top-4 h-10 w-32 rounded-lg backdrop-blur-md"
                ></motion.div>
              )}
              <motion.div
                initial={{
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  gap: "0.5rem",
                  width: "fit-content",
                  borderWidth: 1,
                }}
                animate={{
                  borderColor: isFixed ? "transparent" : "",
                  gap: isFixed ? 0 : "0.5rem",
                  paddingLeft: isFixed ? "0.5rem" : "1rem",
                  paddingRight: isFixed ? "0.5rem" : "1rem",
                  borderWidth: isFixed ? 0 : 1,
                }}
                transition={{
                  paddingLeft: { delay: 0.2 },
                  paddingRight: { delay: 0.2 },
                }}
                className="flex cursor-pointer items-center justify-start overflow-hidden rounded-lg border border-black py-2 transition duration-200 hover:scale-105 dark:border-white"
              >
                <FaDownload
                  className={clsx(
                    "shrink-0 transition-all duration-200",
                    isFixed && "z-50 size-5",
                  )}
                />
                <motion.div
                  className="shrink-0 overflow-hidden text-nowrap"
                  animate={{
                    width: isFixed ? 0 : "fit-content",
                  }}
                  transition={{
                    width: isFixed ? {} : { delay: 0.2 },
                  }}
                >
                  <a
                    href="https://drive.google.com/file/d/10TMQlO-eU5Ht3NumHg2XQWDFxfmjAeoQ/view?usp=sharing"
                    target="_blank"
                    download
                    rel="noopener noreferrer"
                  >
                    {t("common.downloadResume")}
                  </a>
                </motion.div>
              </motion.div>
              <motion.div
                className={clsx(
                  "relative flex gap-2",
                  isFixed && "fixed gap-4",
                )}
                animate={{
                  top: isFixed ? "-3.125rem" : 0,
                  left: isFixed ? "3rem" : 0,
                }}
                transition={{
                  left: isFixed ? {} : { delay: 0.2 },
                  top: isFixed ? { delay: 0.2 } : {},
                }}
              >
                <FaGithub
                  onClick={() =>
                    window.open("https://github.com/RichardBoyz", "_blank")
                  }
                  className="icon-hover"
                  size={24}
                />
                <FaLinkedin
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/richardboyz/",
                      "_blank",
                    )
                  }
                  className="icon-hover"
                  size={24}
                />
              </motion.div>
            </motion.div>
          </div>
          <div className="relative flex w-1/2 items-center justify-center">
            <motion.img
              initial={{ rotate: -5, x: 100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                rotate: [-2, 2, -2],
                y: [0, -5, 0],
              }}
              transition={{
                x: {
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                  duration: 0.6,
                },
                opacity: { duration: 0.4 },
                y: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 5,
                  ease: "easeInOut",
                },
                rotate: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 5,
                  easse: "easeInOut",
                },
              }}
              src="https://hackmd.io/_uploads/BksxgoCc6.jpg"
              className="aspect-square w-3/5 max-w-96 shrink-0 rounded-xl bg-blue-300 shadow-xl"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-grow items-center justify-center p-4">
        <div className="flex h-full w-full flex-col gap-6 rounded-3xl bg-overview-card-bg p-8 text-overview-card-text">
          <h1 className="text-3xl font-bold">{t("about.card.title")}</h1>

          <div className="flex flex-col gap-4">
            <p>{t("about.card.description.part1")}</p>
            <p>{t("about.card.description.part2")}</p>
          </div>
          <div className="flex gap-2.5">
            <div
              onClick={() => scrollToSection(PROFILE_SECTION.EXPERIENCE)}
              className="cursor-pointer select-none rounded-full border-2 border-[#2d2d40] px-4 py-2 text-[#2d2d40] transition-all duration-200 hover:scale-105 dark:border-black dark:text-white dark:hover:bg-black dark:hover:text-white"
            >
              {t("about.card.actions.experience")}
            </div>
            <div className="cursor-pointer select-none rounded-full border-2 border-[#2d2d40] bg-[#2d2d40] px-4 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-[#404057] dark:border-black dark:bg-black dark:text-white dark:hover:bg-[#1a1a1a]">
              {t("about.card.actions.contact")}
            </div>
          </div>
          <img
            className="flex-1 self-center justify-self-center object-contain"
            src="/gifs/me.gif"
          />
        </div>
      </div>
    </div>
  );
};
