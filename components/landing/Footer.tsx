import { Navigation } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Navigation className="h-4 w-4 text-hud" />
          <span className="font-display text-sm font-semibold">InternPilot AI</span>
        </div>
        <p className="readout text-xs text-muted">
          Global AI Hackathon - Qwen Cloud - Track 4: Autopilot Agent
        </p>
        <p className="text-xs text-muted">MIT Licensed - Open Source</p>
      </div>
    </footer>
  );
}
