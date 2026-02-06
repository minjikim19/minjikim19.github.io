"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`card${className ? ` ${className}` : ""}`}
      whileHover={reduceMotion ? undefined : { y: -4, boxShadow: "var(--shadow)" }}
      transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
    >
      {children}
    </motion.div>
  );
}
