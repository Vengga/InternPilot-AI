"use client";
import { Check, Loader2, Circle, AlertTriangle } from "lucide-react";

export type StageStatus = "idle" | "running" | "done" | "error";
export interface StageView { key: string; label: string; status: StageStatus }

const ICON = {
  idle: <Circle className="h-4 w-4 text-muted/50" />,
  running: <Loader2 className="h-4 w-4 animate-spin text-hud" />,
  done: <Check className="h-4 w-4 text-ok" />,
  error: <AlertTriangle className="h-4 w-4 text-danger" />,
};

export function StageRail({ stages }: { stages: StageView[] }) {
  return (
    <ol className="space-y-1">
      {stages.map((s, i) => (
        <li key={s.key} className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="readout w-6 text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-paper">
            {ICON[s.status]}
          </span>
          <span className={`text-sm ${s.status === "done" ? "text-fg" : s.status === "running" ? "text-hud" : "text-muted"}`}>
            {s.label}
          </span>
        </li>
      ))}
    </ol>
  );
}
