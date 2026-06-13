# InternPilot AI 🛩️

**Repository:** https://github.com/Vengga/InternPilot-AI

**An AI autopilot agent that turns any job description into a tailored internship application package — powered by Qwen on Alibaba Cloud.**

> Global AI Hackathon Series with Qwen Cloud · **Track 4: Autopilot Agent**

InternPilot AI is a production-shaped agent workflow, not a single chatbot prompt. A student
pastes a resume and a job description; seven chained agents parse, analyze, score, recommend,
and draft a complete application package — then hand control back to the human for review and
approval before anything is exported. It remembers your roles and recurring skill gaps so each
next application starts smarter.

---

## ✨ What it does

| # | Agent | Responsibility |
|---|-------|----------------|
| 01 | Resume Parser | Extracts skills, education, projects, experience, achievements |
| 02 | Job Description Analyzer | Pulls required vs. preferred skills, responsibilities, ATS keywords |
| 03 | Skill Match | Scores fit 0–100; splits skills into matched / partial / missing |
| 04 | Portfolio Recommender | Picks the 2–3 best projects and writes talking points |
| 05 | Application Pack Generator | Drafts cover letter, recruiter email, LinkedIn note, checklist |
| 06 | Human Review Checkpoint | You edit and approve — nothing is auto-sent |
| 07 | Application Memory | Remembers target roles and recurring gaps across sessions |

## 🧰 Tech stack

- **Reasoning:** Qwen (`qwen-plus`) via **Alibaba Cloud Model Studio** (DashScope), OpenAI-compatible API
- **Backend:** Next.js Route Handler (`app/api/qwen/route.ts`) → DashScope
- **Frontend:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion
- **3D:** react-three-fiber + drei (the WebGL "navigation core" hero)
- **Theme:** light / dark toggle via `next-themes`
- **Memory:** browser-persistent application history + learned preferences

## 🚀 Quick start

```bash
# 1. Install
npm install

# 2. Add your Alibaba Cloud Model Studio key
cp .env.example .env.local
#   then edit .env.local and paste your DASHSCOPE_API_KEY

# 3. Run
npm run dev      # http://localhost:3000  (studio at /studio)
```

> **No key yet?** The app still runs. Without `DASHSCOPE_API_KEY` every stage returns
> clearly-labelled **demo data** so reviewers can click through the full flow. Add the key
> and the exact same code calls live Qwen.

### Environment variables

| Variable | Default | Notes |
|----------|---------|-------|
| `DASHSCOPE_API_KEY` | — | Your Model Studio key (`sk-...`) |
| `DASHSCOPE_BASE_URL` | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1` | Singapore/international endpoint — correct for Malaysia |
| `QWEN_MODEL` | `qwen-plus` | Any Qwen text model on Model Studio |

## ☁️ Alibaba Cloud proof

The single file **`app/api/qwen/route.ts`** is the backend and the proof: it instantiates an
OpenAI-compatible client pointed at `dashscope-intl.aliyuncs.com` (Alibaba Cloud Model Studio)
and calls Qwen for every pipeline stage. See [`docs/alibaba_cloud_proof.md`](docs/alibaba_cloud_proof.md)
for the exact lines to cite in the submission, and [`docs/deployment-alibaba-ecs.md`](docs/deployment-alibaba-ecs.md)
to host the whole app on an Alibaba Cloud ECS instance.

## 📁 Structure

```
app/
  page.tsx              landing (3D hero, pipeline, stack)
  studio/page.tsx       the working agent studio
  api/qwen/route.ts     backend → Qwen on Alibaba Cloud  ← proof
components/             landing / studio / three / theme / ui
lib/
  prompts.ts            one system prompt per agent
  pipeline.ts           client orchestrator + memory layer
  mock.ts               demo fallback (no key needed)
  types.ts  samples.ts
docs/                   architecture, proof, deployment, demo script, checklist
```

## 📄 License

MIT — see [LICENSE](LICENSE).
