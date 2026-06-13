"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel transition-colors hover:border-hud/70"
    >
      {/* Avoid hydration mismatch: render a neutral icon until mounted */}
      {!mounted ? (
        <span className="h-4 w-4" />
      ) : isDark ? (
        <Sun className="h-4 w-4 text-amber transition-transform group-hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-hud transition-transform group-hover:-rotate-12" />
      )}
    </button>
  );
}
