import clsx from "clsx";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Modal = ({
  children,
  open,
  onClose,
}: {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          onClick={onClose}
          className={clsx(
            "absolute inset-0 z-50 flex items-center justify-center transition-opacity duration-300",
          )}
          initial={{ opacity: 0, scale: 0, backgroundColor: "transparent" }}
          animate={{ opacity: 1, scale: 1, backgroundColor: "rgba(0,0,0,0.7)" }}
          exit={{ opacity: 0, scale: 0, backgroundColor: "transparent" }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
  return createPortal(modalContent, document.body);
};
