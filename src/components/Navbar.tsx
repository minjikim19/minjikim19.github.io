"use client";

import { useState } from "react";
import Image from "next/image";
import type { NavItem, UiLabels } from "../../content/siteData";
import logo from "../../content/logo.png";

type NavbarProps = {
  items: NavItem[];
  activeId: string | null;
  brand: string;
  ui: UiLabels;
};

export default function Navbar({ items, activeId, brand, ui }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#hero" className="brand" aria-label={brand}>
          <Image src={logo} alt={`logo`} height={55} />
        </a>
        <nav aria-label={ui.navLabel}>
          <div className="nav-links">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link${activeId === item.id ? " active" : ""}`}
                aria-label={item.label}
                aria-current={activeId === item.id ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
        <button
          className="menu-button"
          type="button"
          onClick={handleToggle}
          aria-label={open ? ui.menuClose : ui.menuOpen}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>
      <div className="container">
        <div
          id="mobile-menu"
          className={`mobile-menu${open ? " open" : ""}`}
          role="menu"
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link${activeId === item.id ? " active" : ""}`}
              aria-label={item.label}
              onClick={handleClose}
              role="menuitem"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
