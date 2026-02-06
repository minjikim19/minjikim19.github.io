"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AccordionItemProps = {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  toggleLabel: string;
  children: ReactNode;
};

export function AccordionItem({
  id,
  title,
  subtitle,
  isOpen,
  onToggle,
  toggleLabel,
  children,
}: AccordionItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="accordion-item">
      <button
        type="button"
        className="accordion-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        aria-label={toggleLabel}
      >
        <div>
          <div className="card-title">{title}</div>
          {subtitle ? <div className="experience-meta">{subtitle}</div> : null}
        </div>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? <path d="M5 12h14" /> : <path d="M12 5v14M5 12h14" />}
        </svg>
      </button>
      <motion.div
        id={`${id}-content`}
        className="accordion-content"
        initial={false}
        animate={isOpen ? "open" : "collapsed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          collapsed: { height: 0, opacity: 0 },
        }}
        transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: "easeOut" }}
        style={{ overflow: "hidden" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
