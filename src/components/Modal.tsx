"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  titleIcon?: React.ReactNode;
  onClose: () => void;
  closeLabel: string;
  children: React.ReactNode;
};

const focusableSelector =
  'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Modal({
  isOpen,
  title,
  titleIcon,
  onClose,
  closeLabel,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const modalNode = modalRef.current;
    const focusables = modalNode
      ? (Array.from(modalNode.querySelectorAll(focusableSelector)) as HTMLElement[])
      : [];

    if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) return;
    if (lastFocusedRef.current) {
      lastFocusedRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title">
            {titleIcon ? <span className="modal-title-icon">{titleIcon}</span> : null}
            <h3>{title}</h3>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label={closeLabel}
          >
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
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
