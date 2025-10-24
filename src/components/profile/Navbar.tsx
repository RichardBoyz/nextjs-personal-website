"use client";
import { Bars2Icon } from "@heroicons/react/24/outline";
import * as motion from "motion/react-client";
import { ThemeChanger } from "../ui";

export const NavBar = () => {
  // const isMobile = useMobile();

  // if (isMobile === null) {
  //   return null;
  // }

  // if (isMobile) {
  return (
    <motion.div
      className="fixed z-10 overflow-hidden rounded-full bg-transparent p-1 outline outline-1 outline-black backdrop-blur-md dark:outline-white"
      initial={{ right: "-20px", height: "48px" }}
      animate={{ right: "16px", top: "16px" }}
      whileHover={{ height: "88px" }}
      transition={{ duration: 0.2 }}
    >
      <div className="icon-container hover:bg-transparent">
        <Bars2Icon className="icon-button-basic" />
      </div>

      <ThemeChanger className="relative rounded-full bg-transparent" />
    </motion.div>
  );
  // }

  // return (
  //   <nav className="fixed left-1/2 top-4 z-10 h-10 w-1/2 -translate-x-1/2 rounded-full border border-black shadow backdrop-blur-md dark:bg-black/80">
  //     <div className="flex h-full items-center justify-center">
  //       {Object.values(PROFILE_SECTION).map((section) => (
  //         <div key={section} className="flex flex-1 justify-center">
  //           <a
  //             href={PROFILE_NAV_HREF[section]}
  //             className="text-gray-700 transition hover:text-blue-500 dark:text-gray-200"
  //           >
  //             {section}
  //           </a>
  //         </div>
  //       ))}
  //     </div>
  //   </nav>
  // );
};
