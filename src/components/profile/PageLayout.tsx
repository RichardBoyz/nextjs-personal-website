import { ScrollContext } from "@/app/[locale]/profile/contexts/ScrollContext";
import { useScroll } from "motion/react";
import { ReactNode, useRef } from "react";
export const PageLayout = ({ children }: { children: ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"],
  });

  return (
    <ScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={ref}
        data-scroll-container
        className="bg-profile-bg min-h-dvh overflow-y-auto overflow-x-hidden transition-colors duration-200"
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
};
