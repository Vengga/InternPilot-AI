"use client";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const ROWS = [
  ["Reasoning", "Qwen (qwen-plus) via Alibaba Cloud Model Studio"],
  ["Backend", "Next.js Route Handler -> DashScope OpenAI-compatible API"],
  ["Frontend", "Next.js 14 - TypeScript - Tailwind - Framer Motion"],
  ["3D", "react-three-fiber + drei (WebGL nav core)"],
  ["Memory", "Browser-persistent history + learned preferences"],
];

export function Stack() {
  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="eyebrow">Instrument panel</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Built on Qwen, running on Alibaba Cloud.
          </h2>
          <p className="mt-3 max-w-md text-muted">
            The reasoning for every stage is served by Qwen on Alibaba Cloud Model Studio.
            The backend route is the proof - swap in your key and the same code runs live.
          </p>
          <div className="mt-7">
            <Button href="/studio">Try it now <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-line bg-panel">
            {ROWS.map(([k, v], i) => (
              <div key={k} className={`flex items-center justify-between gap-4 px-6 py-4 ${i !== ROWS.length - 1 ? "border-b border-line" : ""}`}>
                <span className="eyebrow">{k}</span>
                <span className="readout text-right text-sm text-fg">{v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
