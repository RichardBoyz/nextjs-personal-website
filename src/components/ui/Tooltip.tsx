import clsx from "clsx";
import { ReactNode } from "react";

export type TooltipPlacement = "top" | "left" | "bottom" | "right";

export const Tooltip = ({
  children,
  placement = "bottom",
  content,
  className,
}: {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  placement?: TooltipPlacement;
}) => {
  return (
    <div className="relative">
      <div className={clsx("group relative", className)}>
        {children}
        <div
          className={clsx(
            "bg-tooltip-background text-tooltip-text pointer-events-none absolute scale-50 rounded-md p-1 opacity-0 transition-all duration-200 ease-out",
            "group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100",
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
      </div>
    </div>
  );
};
