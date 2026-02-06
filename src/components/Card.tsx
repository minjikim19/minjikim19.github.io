"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hoverY?: number;
  hoverShadow?: string;
};

export default function Card({
  children,
  className,
  hoverY = -4,
  hoverShadow = "var(--shadow)",
}: CardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`card${className ? ` ${className}` : ""}`}
      whileHover={reduceMotion ? undefined : { y: hoverY, boxShadow: hoverShadow }}
      transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
    >
      {children}
    </motion.div>
  );
}
