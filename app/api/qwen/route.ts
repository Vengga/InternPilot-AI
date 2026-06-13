// ─────────────────────────────────────────────────────────────────────────────
//  ALIBABA CLOUD PROOF + BACKEND
//  This server-side route is InternPilot's backend. It calls Qwen models hosted
//  on Alibaba Cloud Model Studio (DashScope) via the OpenAI-compatible endpoint.
//  The presence and use of `dashscope-intl.aliyuncs.com` here is the demonstrable
//  proof that the backend runs against Alibaba Cloud services and APIs.
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPTS, buildUserPrompt } from "@/lib/prompts";
import { MOCK } from "@/lib/mock";
import type { Stage } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE_URL =
  process.env.DASHSCOPE_BASE_URL ||
  "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";
const MODEL = process.env.QWEN_MODEL || "qwen-plus";

const VALID_STAGES: Stage[] = [
  "parse_resume",
  "analyze_jd",
  "skill_match",
  "recommend_portfolio",
  "generate_pack",
];

function extractJson(text: string): unknown {
  // Models occasionally wrap JSON in prose or fences; recover the object safely.
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return JSON.parse(candidate.slice(start, end + 1));
  }
  return JSON.parse(candidate);
}

export async function POST(request: Request) {
  let body: { stage?: Stage; ctx?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const stage = body.stage as Stage;
  const ctx = body.ctx ?? {};

  if (!stage || !VALID_STAGES.includes(stage)) {
    return NextResponse.json({ ok: false, error: `Unknown stage: ${stage}` }, { status: 400 });
  }

  const apiKey = process.env.DASHSCOPE_API_KEY;

  // Demo fallback — runnable without credits. Clearly flagged via meta.demo.
  if (!apiKey) {
    return NextResponse.json({
      ok: true,
      stage,
      data: MOCK[stage],
      meta: { demo: true },
    });
  }

  try {
    const client = new OpenAI({ apiKey, baseURL: BASE_URL });

    const completion = await client.chat.completions.create({
      model: MODEL,
      temperature: stage === "generate_pack" ? 0.6 : 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPTS[stage] },
        { role: "user", content: buildUserPrompt(stage, ctx) },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const data = extractJson(raw);

    return NextResponse.json({
      ok: true,
      stage,
      data,
      meta: {
        demo: false,
        model: completion.model,
        usage: completion.usage,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Qwen request failed";
    return NextResponse.json(
      { ok: false, stage, error: message, meta: { demo: false } },
      { status: 502 }
    );
  }
}
