"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { siteData } from "../../content/siteData";

export default function NavbarShell() {
  const pathname = usePathname();
  const isBlogRoute = pathname.startsWith("/blog");
  const [activeSection, setActiveSection] = useState<string | null>(
    isBlogRoute ? null : "hero",
  );
  const activeSectionRef = useRef<string | null>(activeSection);

  useEffect(() => {
    if (isBlogRoute) {
      setActiveSection(null);
      return;
    }
    setActiveSection("hero");
  }, [isBlogRoute]);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    if (isBlogRoute) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-observe='true']"),
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleAtCenter = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          )[0];

        if (
          visibleAtCenter &&
          visibleAtCenter.target.id !== activeSectionRef.current
        ) {
          setActiveSection(visibleAtCenter.target.id);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isBlogRoute]);

  return (
    <Navbar
      items={siteData.nav}
      activeId={isBlogRoute ? null : activeSection}
      brand={siteData.meta.title}
      ui={siteData.ui}
      mode={isBlogRoute ? "blog" : "portfolio"}
    />
  );
}
