"use client";
import { Reveal } from "@/components/ui/Reveal";
import {
  FileSearch, Crosshair, GitCompareArrows, FolderGit2, FileText, UserCheck, BrainCircuit,
} from "lucide-react";

const STAGES = [
  { n: "01", icon: FileSearch, title: "Resume Parser", desc: "Extracts skills, education, projects, experience, and achievements into a clean profile." },
  { n: "02", icon: Crosshair, title: "Job Description Analyzer", desc: "Pulls required vs. preferred skills, responsibilities, and the ATS keywords worth mirroring." },
  { n: "03", icon: GitCompareArrows, title: "Skill Match", desc: "Scores fit 0-100 and splits skills into matched, partial, and missing - honestly." },
  { n: "04", icon: FolderGit2, title: "Portfolio Recommender", desc: "Chooses the 2-3 projects that best prove fit and writes talking points for each." },
  { n: "05", icon: FileText, title: "Application Pack Generator", desc: "Drafts a tailored cover letter, recruiter email, LinkedIn note, and pre-submit checklist." },
  { n: "06", icon: UserCheck, title: "Human Review Checkpoint", desc: "You read, edit, and approve. Nothing is finalized or sent without your sign-off." },
  { n: "07", icon: BrainCircuit, title: "Application Memory", desc: "Remembers your roles and recurring skill gaps, so each next application starts smarter." },
];

export function Pipeline() {
  return (
    <section id="pipeline" className="relative mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <p className="eyebrow">Flight plan</p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          Seven agents, one course from job post to application.
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Each stage is a focused agent that hands structured output to the next - not one
          monolithic prompt. That is what makes it debuggable, extendable, and production-shaped.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {STAGES.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.05}>
            <div className="group relative h-full rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-hud/60">
              <div className="flex items-center justify-between">
                <span className="readout text-sm text-muted">{s.n}</span>
                <s.icon className="h-5 w-5 text-hud transition-transform group-hover:scale-110" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.35}>
          <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-hud/40 bg-hud/[0.04] p-6">
            <p className="readout text-sm text-amber">destination</p>
            <h3 className="mt-3 font-display text-lg font-semibold">A package you would actually send.</h3>
            <p className="mt-2 text-sm text-muted">Tailored, keyword-aware, and approved by you.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
