"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, Rocket, FileUp, AlertTriangle, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Gauge } from "@/components/ui/Gauge";
import { StageRail, type StageView, type StageStatus } from "@/components/studio/StageRail";
import { MemoryPanel } from "@/components/studio/MemoryPanel";
import { PackEditor } from "@/components/studio/PackEditor";
import { Agents, Memory } from "@/lib/pipeline";
import { SAMPLE_RESUME, SAMPLE_JD } from "@/lib/samples";
import type {
  ResumeProfile, JobAnalysis, SkillMatch, PortfolioRecommendation, ApplicationPack, RunRecord,
} from "@/lib/types";

const STAGE_DEFS: { key: string; label: string }[] = [
  { key: "parse_resume", label: "Parsing resume" },
  { key: "analyze_jd", label: "Analyzing job description" },
  { key: "skill_match", label: "Matching skills" },
  { key: "recommend_portfolio", label: "Recommending projects" },
  { key: "generate_pack", label: "Generating application pack" },
];

function Chips({ items, tone }: { items: string[]; tone: "ok" | "warn" | "danger" }) {
  const cls = {
    ok: "border-ok/40 bg-ok/[0.08] text-ok",
    warn: "border-warn/40 bg-warn/[0.08] text-warn",
    danger: "border-danger/40 bg-danger/[0.08] text-danger",
  }[tone];
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.length === 0 && <span className="text-xs text-muted">None</span>}
      {items.map((s) => (
        <span key={s} className={`readout rounded-full border px-2.5 py-1 text-xs ${cls}`}>{s}</span>
      ))}
    </div>
  );
}

export function StudioClient() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);

  const [stages, setStages] = useState<StageView[]>(
    STAGE_DEFS.map((s) => ({ ...s, status: "idle" as StageStatus }))
  );

  const [profile, setProfile] = useState<ResumeProfile | null>(null);
  const [job, setJob] = useState<JobAnalysis | null>(null);
  const [match, setMatch] = useState<SkillMatch | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioRecommendation | null>(null);
  const [pack, setPack] = useState<ApplicationPack | null>(null);
  const [approved, setApproved] = useState(false);

  const [gaps, setGaps] = useState<{ skill: string; count: number }[]>([]);
  const [history, setHistory] = useState<RunRecord[]>([]);

  const refreshMemory = () => { setGaps(Memory.topRecurringGaps()); setHistory(Memory.getHistory()); };
  useEffect(refreshMemory, []);

  const setStage = (key: string, status: StageStatus) =>
    setStages((prev) => prev.map((s) => (s.key === key ? { ...s, status } : s)));

  async function run() {
    if (!resume.trim() || !jd.trim()) { setError("Add both a resume and a job description first."); return; }
    setRunning(true); setError(null); setApproved(false);
    setProfile(null); setJob(null); setMatch(null); setPortfolio(null); setPack(null);
    setStages(STAGE_DEFS.map((s) => ({ ...s, status: "idle" as StageStatus })));

    try {
      setStage("parse_resume", "running");
      const p = await Agents.parseResume(resume);
      setDemo(p.meta.demo); setProfile(p.data); setStage("parse_resume", "done");

      setStage("analyze_jd", "running");
      const j = await Agents.analyzeJob(jd);
      setJob(j.data); setStage("analyze_jd", "done");

      setStage("skill_match", "running");
      const m = await Agents.skillMatch(p.data, j.data);
      setMatch(m.data); setStage("skill_match", "done");

      setStage("recommend_portfolio", "running");
      const r = await Agents.recommendPortfolio(p.data, j.data, m.data);
      setPortfolio(r.data); setStage("recommend_portfolio", "done");

      setStage("generate_pack", "running");
      const pk = await Agents.generatePack(p.data, j.data, m.data, r.data, Memory.getPrefs());
      setPack(pk.data); setStage("generate_pack", "done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "The autopilot hit an error. Try again.");
      setStages((prev) => prev.map((s) => (s.status === "running" ? { ...s, status: "error" } : s)));
    } finally {
      setRunning(false);
    }
  }

  function approveAndExport() {
    if (!pack || !job || !match) return;
    const md = [
      `# Application Package - ${job.role}${job.company ? ` @ ${job.company}` : ""}`,
      `Fit score: ${match.match_score}/100`,
      ``,
      `## Cover letter\n\n${pack.cover_letter}`,
      ``,
      `## Recruiter email\n\n**Subject:** ${pack.recruiter_email.subject}\n\n${pack.recruiter_email.body}`,
      ``,
      `## LinkedIn outreach\n\n${pack.linkedin_message}`,
      ``,
      `## Pre-submit checklist\n\n${pack.checklist.map((c) => `- [ ] ${c}`).join("\n")}`,
    ].join("\n");

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `internpilot-${job.role.toLowerCase().replace(/\s+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);

    const record: RunRecord = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      role: job.role,
      company: job.company,
      matchScore: match.match_score,
      missing: match.missing_skills || [],
      approved: true,
    };
    Memory.recordRun(record, profile?.name || "");
    setApproved(true);
    refreshMemory();
  }

  const started = stages.some((s) => s.status !== "idle");

  return (
    <div className="min-h-screen">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <Navigation className="h-4 w-4 text-hud" />
            <span className="font-display text-sm font-bold">InternPilot <span className="text-hud">AI</span></span>
            <span className="eyebrow ml-2 hidden text-[0.6rem] sm:inline">studio</span>
          </Link>
          <div className="flex items-center gap-3">
            {demo && (
              <span className="readout hidden items-center gap-1 rounded-full border border-amber/40 bg-amber/[0.08] px-2.5 py-1 text-xs text-amber sm:inline-flex">
                <Sparkles className="h-3 w-3" /> demo data - add API key for live Qwen
              </span>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[340px_1fr]">
        {/* left: inputs + memory */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-line bg-panel p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="eyebrow">Inputs</span>
              <button
                onClick={() => { setResume(SAMPLE_RESUME); setJd(SAMPLE_JD); }}
                className="inline-flex items-center gap-1 text-xs text-hud transition-colors hover:brightness-110"
              >
                <FileUp className="h-3.5 w-3.5" /> Load sample
              </button>
            </div>
            <label className="eyebrow text-[0.6rem]">Resume</label>
            <textarea
              value={resume} onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume text here..."
              rows={7}
              className="mt-1.5 w-full resize-y rounded-xl border border-line bg-paper p-3 text-sm outline-none transition-colors focus:border-hud/70"
            />
            <label className="eyebrow mt-4 block text-[0.6rem]">Job description</label>
            <textarea
              value={jd} onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the internship job description here..."
              rows={7}
              className="mt-1.5 w-full resize-y rounded-xl border border-line bg-paper p-3 text-sm outline-none transition-colors focus:border-hud/70"
            />
            <button
              onClick={run} disabled={running}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-hud px-5 py-3 text-sm font-semibold text-ink transition-all hover:brightness-110 disabled:opacity-50"
            >
              <Rocket className="h-4 w-4" /> {running ? "Autopilot engaged..." : "Run autopilot"}
            </button>
            {error && (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-danger">
                <AlertTriangle className="h-3.5 w-3.5" /> {error}
              </p>
            )}
          </div>

          {started && (
            <div className="rounded-2xl border border-line bg-panel p-5">
              <span className="eyebrow">Flight status</span>
              <div className="mt-3"><StageRail stages={stages} /></div>
            </div>
          )}

          <MemoryPanel gaps={gaps} history={history} onClear={() => { Memory.clear(); refreshMemory(); }} />
        </div>

        {/* right: results */}
        <div className="space-y-6">
          {!started && (
            <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-panel/40 p-10 text-center">
              <Navigation className="h-8 w-8 text-hud" />
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight">Ready for takeoff</h2>
              <p className="mt-2 max-w-sm text-sm text-muted">
                Load the sample or paste your own resume and a job description, then run the autopilot.
                Each agent reports in as it completes.
              </p>
            </div>
          )}

          <AnimatePresence>
            {match && (
              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-line bg-panel p-6">
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
                  <Gauge value={match.match_score} />
                  <div className="flex-1">
                    {job && <h2 className="font-display text-xl font-bold tracking-tight">{job.role}{job.company ? ` - ${job.company}` : ""}</h2>}
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{match.summary}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div><p className="eyebrow mb-2 text-[0.6rem] text-ok">Matched</p><Chips items={match.matched_skills} tone="ok" /></div>
                  <div><p className="eyebrow mb-2 text-[0.6rem] text-warn">Partial</p><Chips items={match.partial_skills} tone="warn" /></div>
                  <div><p className="eyebrow mb-2 text-[0.6rem] text-danger">Missing</p><Chips items={match.missing_skills} tone="danger" /></div>
                </div>
              </motion.section>
            )}

            {portfolio && portfolio.recommended?.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-line bg-panel p-6">
                <span className="eyebrow">Projects to highlight</span>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {portfolio.recommended.map((p) => (
                    <div key={p.project} className="rounded-xl border border-line bg-paper p-4">
                      <h3 className="font-display font-semibold">{p.project}</h3>
                      <p className="mt-1 text-sm text-muted">{p.why}</p>
                      <ul className="mt-2 space-y-1">
                        {p.talking_points.map((t, i) => (
                          <li key={i} className="flex gap-2 text-sm"><span className="text-hud">-</span>{t}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {pack && (
              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-line bg-panel p-6">
                <span className="eyebrow">Application pack</span>
                <p className="mt-1 mb-5 text-sm text-muted">Generated draft - review and make it yours before exporting.</p>
                <PackEditor pack={pack} setPack={setPack} approved={approved} onApprove={approveAndExport} />
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
