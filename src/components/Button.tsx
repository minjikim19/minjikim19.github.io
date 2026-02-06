import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  label: string;
  href: string;
  ariaLabel: string;
  variant?: "primary" | "secondary";
  target?: "_blank" | "_self";
  rel?: string;
  icon?: ReactNode;
};

export default function Button({
  label,
  href,
  ariaLabel,
  variant = "primary",
  target,
  rel,
  icon,
}: ButtonProps) {
  const className = variant === "secondary" ? "button secondary" : "button";
  const isAnchor = href.startsWith("#");
  const finalTarget = isAnchor ? target : "_blank";
  const finalRel = isAnchor ? rel : "noreferrer";

  return (
    <Link
      className={className}
      href={href}
      aria-label={ariaLabel}
      target={finalTarget}
      rel={finalRel}
    >
      {icon ? <span className="button-icon">{icon}</span> : null}
      <span>{label}</span>
    </Link>
  );
}
