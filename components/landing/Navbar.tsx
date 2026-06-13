"use client";
import Link from "next/link";
import { Navigation } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-hud/50 bg-panel">
            <Navigation className="h-4 w-4 text-hud" />
          </span>
          <span className="font-display text-[1.05rem] font-bold tracking-tight">InternPilot<span className="text-hud"> AI</span></span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          <a href="#pipeline" className="transition-colors hover:text-fg">Pipeline</a>
          <a href="#features" className="transition-colors hover:text-fg">Why it works</a>
          <a href="#stack" className="transition-colors hover:text-fg">Stack</a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button href="/studio">Launch studio</Button>
        </div>
      </div>
    </header>
  );
}
