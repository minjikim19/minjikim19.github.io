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
  const isInternal = href.startsWith("/");
  const isExternal = !isAnchor && !isInternal;
  const finalTarget = isExternal ? target ?? "_blank" : target;
  const finalRel = isExternal ? rel ?? "noreferrer" : rel;

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
