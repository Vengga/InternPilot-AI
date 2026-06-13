"use client";
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-all focus-visible:outline-2";
const styles: Record<Variant, string> = {
  primary:
    "bg-hud text-ink hover:brightness-110 shadow-[0_0_0_1px_rgb(var(--hud)/0.4),0_8px_30px_-12px_rgb(var(--hud)/0.7)]",
  ghost: "border border-line text-fg hover:border-hud/70 hover:text-hud",
};

export function Button({
  children, href, onClick, variant = "primary", type = "button", disabled,
}: {
  children: ReactNode; href?: string; onClick?: () => void;
  variant?: Variant; type?: "button" | "submit"; disabled?: boolean;
}) {
  const cls = `${base} ${styles[variant]} ${disabled ? "opacity-50 pointer-events-none" : ""}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{children}</button>;
}
