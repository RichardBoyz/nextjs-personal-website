import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

export type PopoverPlacement = "top" | "left" | "bottom" | "right";

export const Popover = ({
  children,
  placement = "bottom",
  content,
  className,
}: {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  placement?: PopoverPlacement;
}) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // 點擊外部關閉 Popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={popoverRef} className="relative inline-block">
      <div
        className={clsx("cursor-pointer", className)}
        onClick={() => setOpen((prev) => !prev)}
      >
        {children}
      </div>

      {/* Popover 內容 */}
      {open && (
        <div
          className={clsx(
            "bg-tooltip-background text-tooltip-text absolute rounded-md p-3 shadow-lg transition-all duration-200 ease-out",
            {
              "bottom-full left-1/2 mb-2 -translate-x-1/2": placement === "top",
              "left-1/2 top-full mt-2 -translate-x-1/2": placement === "bottom",
              "right-full top-1/2 mr-2 -translate-y-1/2": placement === "left",
              "left-full top-1/2 ml-2 -translate-y-1/2": placement === "right",
            },
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
