import type {
  Stage,
  ResumeProfile,
  JobAnalysis,
  SkillMatch,
  PortfolioRecommendation,
  ApplicationPack,
  RunRecord,
  Preferences,
  ApiResult,
} from "./types";

export async function runStage<T>(
  stage: Stage,
  ctx: Record<string, unknown>
): Promise<ApiResult<T>> {
  const res = await fetch("/api/qwen", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stage, ctx }),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || `Stage ${stage} failed`);
  return json as ApiResult<T>;
}

// Typed convenience wrappers for each agent.
export const Agents = {
  parseResume: (resume: string) =>
    runStage<ResumeProfile>("parse_resume", { resume }),
  analyzeJob: (jd: string) =>
    runStage<JobAnalysis>("analyze_jd", { jd }),
  skillMatch: (profile: ResumeProfile, job: JobAnalysis) =>
    runStage<SkillMatch>("skill_match", { profile, job }),
  recommendPortfolio: (profile: ResumeProfile, job: JobAnalysis, match: SkillMatch) =>
    runStage<PortfolioRecommendation>("recommend_portfolio", { profile, job, match }),
  generatePack: (
    profile: ResumeProfile,
    job: JobAnalysis,
    match: SkillMatch,
    portfolio: PortfolioRecommendation,
    prefs: Preferences
  ) => runStage<ApplicationPack>("generate_pack", { profile, job, match, portfolio, prefs }),
};

// ── Memory layer (browser localStorage) ──────────────────────────────────────
// Persists application history + learned preferences across sessions. Stores
// only what's useful (roles, recurring gaps) — never raw resume text.
const HISTORY_KEY = "internpilot:history";
const PREFS_KEY = "internpilot:prefs";

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function safeWrite(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full / disabled — non-fatal */
  }
}

export const Memory = {
  getHistory: (): RunRecord[] => safeRead<RunRecord[]>(HISTORY_KEY, []),

  getPrefs: (): Preferences =>
    safeRead<Preferences>(PREFS_KEY, { name: "", targetRoles: [], recurringGaps: {} }),

  recordRun(record: RunRecord, name: string) {
    const history = [record, ...Memory.getHistory()].slice(0, 50);
    safeWrite(HISTORY_KEY, history);

    const prefs = Memory.getPrefs();
    if (name && !prefs.name) prefs.name = name;
    if (record.role && !prefs.targetRoles.includes(record.role)) {
      prefs.targetRoles = [record.role, ...prefs.targetRoles].slice(0, 8);
    }
    for (const gap of record.missing) {
      prefs.recurringGaps[gap] = (prefs.recurringGaps[gap] || 0) + 1;
    }
    safeWrite(PREFS_KEY, prefs);
  },

  // Skills missed across 2+ past applications — the "learns over time" signal.
  topRecurringGaps(min = 2): { skill: string; count: number }[] {
    const prefs = Memory.getPrefs();
    return Object.entries(prefs.recurringGaps)
      .filter(([, c]) => c >= min)
      .sort((a, b) => b[1] - a[1])
      .map(([skill, count]) => ({ skill, count }));
  },

  clear() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(HISTORY_KEY);
    window.localStorage.removeItem(PREFS_KEY);
  },
};
