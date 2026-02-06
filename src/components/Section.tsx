"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  title,
  children,
  className,
}: SectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`section${className ? ` ${className}` : ""}`}
      data-observe="true"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: "easeOut" }}
    >
      <div className="container">
        {title ? <h2 className="section-title">{title}</h2> : null}
        {children}
      </div>
    </motion.section>
  );
}
