"use client";
import { motion } from "framer-motion";

// Circular fit-score readout styled like a cockpit instrument.
export function Gauge({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  const r = 52, c = 2 * Math.PI * r;
  const tone = v >= 75 ? "var(--ok)" : v >= 50 ? "var(--warn)" : "var(--danger)";
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgb(var(--line))" strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r={r} fill="none" stroke={`rgb(${tone})`} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * v) / 100 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="readout text-3xl font-semibold" style={{ color: `rgb(${tone})` }}>{v}</span>
        <span className="eyebrow mt-0.5 text-[0.6rem]">fit score</span>
      </div>
    </div>
  );
}
