"use client";
import { BrainCircuit, History, Trash2 } from "lucide-react";
import type { RunRecord } from "@/lib/types";

export function MemoryPanel({
  gaps, history, onClear,
}: {
  gaps: { skill: string; count: number }[];
  history: RunRecord[];
  onClear: () => void;
}) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-4 w-4 text-hud" />
          <span className="eyebrow">Agent memory</span>
        </div>
        {history.length > 0 && (
          <button onClick={onClear} className="text-muted transition-colors hover:text-danger" aria-label="Clear memory">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {gaps.length > 0 ? (
        <div className="mt-4">
          <p className="text-xs text-muted">Skills you keep missing across applications:</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {gaps.map((g) => (
              <span key={g.skill} className="readout rounded-full border border-amber/40 bg-amber/[0.08] px-2.5 py-1 text-xs text-amber">
                {g.skill} - {g.count}x
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-xs text-muted">
          Run a few applications and InternPilot will surface the skills you repeatedly miss here.
        </p>
      )}

      <div className="mt-5 flex items-center gap-2">
        <History className="h-3.5 w-3.5 text-muted" />
        <span className="eyebrow text-[0.6rem]">Recent runs</span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {history.length === 0 && <li className="text-xs text-muted">No applications yet.</li>}
        {history.slice(0, 5).map((r) => (
          <li key={r.id} className="flex items-center justify-between rounded-lg border border-line bg-paper px-3 py-2">
            <span className="truncate text-xs text-fg">{r.role || "Untitled"}{r.company ? ` - ${r.company}` : ""}</span>
            <span className="readout shrink-0 pl-2 text-xs" style={{ color: r.matchScore >= 75 ? "rgb(var(--ok))" : r.matchScore >= 50 ? "rgb(var(--warn))" : "rgb(var(--danger))" }}>
              {r.matchScore}{r.approved ? " ✓" : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
