"use client";
import { Reveal } from "@/components/ui/Reveal";
import { ShieldCheck, Layers, Repeat2 } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "You stay the pilot",
    body: "A mandatory human checkpoint sits before anything is finalized. Personal documents are never auto-sent - InternPilot drafts, you decide.",
  },
  {
    icon: Layers,
    title: "Real workflow, not a chatbot",
    body: "Inputs flow through discrete agents with structured JSON between them. Every stage is inspectable, testable, and replaceable on its own.",
  },
  {
    icon: Repeat2,
    title: "It gets sharper over time",
    body: "Memory tracks the roles you target and the skills you keep missing, surfacing recurring gaps so each application starts from what it learned last time.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-5 py-12">
      <div className="grid gap-5 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-line bg-panel p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-hud/40 bg-hud/[0.06]">
                <f.icon className="h-5 w-5 text-hud" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
