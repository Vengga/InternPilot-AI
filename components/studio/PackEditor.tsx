"use client";
import { useState } from "react";
import { Copy, Check, ShieldCheck, Download } from "lucide-react";
import type { ApplicationPack } from "@/lib/types";

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(text); setDone(true); setTimeout(() => setDone(false), 1400); }}
      className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-hud"
    >
      {done ? <Check className="h-3.5 w-3.5 text-ok" /> : <Copy className="h-3.5 w-3.5" />}
      {done ? "Copied" : "Copy"}
    </button>
  );
}

function Field({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="eyebrow text-[0.62rem]">{label}</span>
        <CopyBtn text={value} />
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full resize-y rounded-xl border border-line bg-paper p-3 text-sm leading-relaxed outline-none transition-colors focus:border-hud/70"
      />
    </div>
  );
}

export function PackEditor({
  pack, setPack, approved, onApprove,
}: {
  pack: ApplicationPack;
  setPack: (p: ApplicationPack) => void;
  approved: boolean;
  onApprove: () => void;
}) {
  const upd = (patch: Partial<ApplicationPack>) => setPack({ ...pack, ...patch });

  return (
    <div className="space-y-5">
      <Field label="Cover letter" value={pack.cover_letter} rows={10}
        onChange={(v) => upd({ cover_letter: v })} />

      <Field label="Recruiter email - subject" value={pack.recruiter_email.subject} rows={2}
        onChange={(v) => upd({ recruiter_email: { ...pack.recruiter_email, subject: v } })} />
      <Field label="Recruiter email - body" value={pack.recruiter_email.body} rows={7}
        onChange={(v) => upd({ recruiter_email: { ...pack.recruiter_email, body: v } })} />

      <Field label="LinkedIn outreach" value={pack.linkedin_message} rows={4}
        onChange={(v) => upd({ linkedin_message: v })} />

      <div>
        <span className="eyebrow text-[0.62rem]">Pre-submit checklist</span>
        <ul className="mt-2 space-y-1.5">
          {pack.checklist.map((c, i) => (
            <li key={i} className="flex items-start gap-2 rounded-lg border border-line bg-paper px-3 py-2 text-sm">
              <span className="mt-0.5 text-hud">-</span>
              <input
                value={c}
                onChange={(e) => { const next = [...pack.checklist]; next[i] = e.target.value; upd({ checklist: next }); }}
                className="w-full bg-transparent outline-none"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-hud/40 bg-hud/[0.05] p-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-hud" />
          <span className="font-display text-sm font-semibold">Human review checkpoint</span>
        </div>
        <p className="mt-1.5 text-sm text-muted">
          Edit anything above until it sounds like you. Nothing is finalized until you approve.
          InternPilot never sends or submits on your behalf.
        </p>
        <button
          onClick={onApprove}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-hud px-5 py-2.5 text-sm font-medium text-ink transition-all hover:brightness-110"
        >
          {approved ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
          {approved ? "Approved - download again" : "Approve & export package"}
        </button>
        {approved && <p className="readout mt-2 text-xs text-ok">Saved to memory and downloaded as Markdown.</p>}
      </div>
    </div>
  );
}
