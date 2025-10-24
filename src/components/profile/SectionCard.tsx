"use client";
import clsx from "clsx";
import { ReactNode } from "react";

type SectionCardProps = {
  className?: string;
  id?: string;
  children: ReactNode;
};

export const SectionCard = ({ className, id, children }: SectionCardProps) => {
  return (
    <div id={id} className={clsx("flex h-dvh", className)}>
      {children}
    </div>
  );
};
