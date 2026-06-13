"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";

// 3D core is client-only to avoid SSR/window issues.
const NavCore = dynamic(() => import("@/components/three/NavCore"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.5, 0.3, 1] } },
};

export function Hero() {
  return (
    <section className="flightgrid relative overflow-hidden pt-32 pb-20 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1">
            <Plane className="h-3.5 w-3.5 text-amber" />
            <span className="eyebrow text-[0.65rem]">Track 4 · Autopilot Agent · Qwen Cloud</span>
          </motion.div>

          <motion.h1 variants={item} className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Autopilot for your
            <br />
            <span className="text-hud">internship applications.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-muted">
            Paste a resume and a job description. InternPilot plots the course —
            parsing, matching, picking your best projects, and drafting the whole
            application package. You stay the pilot: review and approve before anything ships.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/studio">Launch the studio <ArrowRight className="h-4 w-4" /></Button>
            <Button href="#pipeline" variant="ghost">See the pipeline</Button>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex items-center gap-6 text-sm text-muted">
            <div><span className="readout text-fg">7</span> chained agents</div>
            <div className="h-4 w-px bg-line" />
            <div><span className="readout text-fg">1</span> human checkpoint</div>
            <div className="h-4 w-px bg-line" />
            <div><span className="readout text-fg">∞</span> roles, remembered</div>
          </motion.div>
        </motion.div>

        {/* Signature: the navigation core inside an instrument frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="ticks relative aspect-square w-full max-w-[460px] justify-self-center rounded-2xl border border-line bg-panel/40"
        >
          <div className="absolute left-4 top-4 eyebrow text-[0.6rem] text-hud/80">nav core · online</div>
          <div className="absolute right-4 top-4 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-blip rounded-full bg-ok" />
            <span className="eyebrow text-[0.6rem]">live</span>
          </div>
          <div className="absolute inset-0">
            <NavCore />
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
            <span className="readout text-xs text-muted">course: role → offer</span>
            <span className="readout text-xs text-amber">plotting…</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
