# InternPilot AI — Project Story

## Inspiration
Every internship season, students face the same grind: read a dense job description, figure out
which of their skills and projects actually matter, and then rewrite a cover letter, a recruiter
email, and a LinkedIn message from scratch — for every single role. It's repetitive, anxiety-inducing
work, and the students who most need a foot in the door are often the ones with the least time and
guidance to do it well. We wanted an *autopilot* for that journey — something that does the heavy
lifting while keeping the student firmly in command.

## What it does
InternPilot AI turns a resume and a job description into a tailored application package. The student
pastes both into the studio and runs the autopilot. Seven chained agents then take over: a Resume
Parser structures the candidate's profile, a Job Description Analyzer extracts what the employer
actually wants, a Skill Match agent scores the fit from 0–100 and honestly flags missing skills, a
Portfolio Recommender picks the strongest projects to highlight, and a Pack Generator drafts a cover
letter, recruiter email, LinkedIn message, and pre-submit checklist. A human review checkpoint then
hands control back — the student edits anything until it sounds like them and approves before
exporting. Nothing is ever sent automatically. Finally, an application memory remembers the roles
they target and the skills they keep missing, so each new application starts smarter than the last.

## How we built it
We built InternPilot as a full Next.js 14 web application in TypeScript, with Tailwind CSS and Framer
Motion for the interface and a react-three-fiber WebGL "navigation core" as the signature visual. The
reasoning runs on **Qwen (`qwen-plus`) through Alibaba Cloud Model Studio**: a single Next.js backend
route calls the OpenAI-compatible DashScope endpoint with a strict JSON contract for each stage, so
every agent's output is structured and chains cleanly into the next. The memory layer persists each
run and aggregates recurring skill gaps across sessions. We added a light/dark theme toggle modeled on
a cockpit instrument panel, and a demo mode so the whole flow is clickable even before an API key is
added.

## Challenges we ran into
Getting reliable structured output from a reasoning model was the central challenge — we solved it
with per-stage system prompts, JSON response formatting, and a recovery parser that salvages valid
JSON from imperfect responses. Designing a genuine human-in-the-loop checkpoint, rather than a
fully-automated black box, meant making every generated field editable and gating export behind
explicit approval. Keeping the 3D hero performant and accessible required honoring reduced-motion
preferences and rendering the canvas client-side only.

## Accomplishments that we're proud of
We shipped a real, modular agent pipeline — not a single prompt — where each stage is independently
inspectable and replaceable. The fit-score and honest "missing skills" feedback give students
something genuinely useful even before they send anything. And the human checkpoint plus cross-session
memory make it feel like a responsible assistant rather than an autopilot that flies off on its own.

## What we learned
Chaining focused agents with strict contracts beats one giant prompt for reliability and
debuggability. We also learned how naturally Alibaba Cloud Model Studio drops into an OpenAI-compatible
workflow, which made the cloud integration fast and clean.

## What's next for InternPilot AI
Direct resume-file (PDF) ingestion, an interview-prep agent that builds on the skill gaps memory finds,
and an optional Alibaba Cloud database so memory and history sync across devices.
