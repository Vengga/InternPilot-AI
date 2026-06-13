# Devpost submission checklist

- [ ] **Public GitHub repo** with an open-source **LICENSE** (MIT included) visible in the About section
- [ ] **Text description** of features/functionality (use the elevator pitch + README intro)
- [ ] **Track identified:** Track 4 — Autopilot Agent
- [ ] **Architecture diagram** included (`docs/architecture-diagram.svg`)
- [ ] **Proof of Alibaba Cloud:** link to `app/api/qwen/route.ts` (+ optional ECS deploy + clip)
- [ ] **Demo video < 3 min** on YouTube/Vimeo, public, no copyrighted music
- [ ] **Working project link or test build** + instructions (note demo-mode works without a key)
- [ ] _(Optional, bonus prize)_ a published blog/social post on your build journey, link in the submission
- [ ] All materials in **English**

## Project description (paste-ready)
**Elevator pitch:** An AI autopilot agent that helps students turn job descriptions into tailored
internship application packages using Qwen Cloud.

**What it does:** Paste a resume and a job description. Seven chained Qwen agents parse the resume,
analyze the role, score the fit, recommend your strongest projects, and draft a full application
package (cover letter, recruiter email, LinkedIn message, checklist). A human review checkpoint lets
you edit and approve before exporting — nothing is sent automatically. Memory remembers your target
roles and recurring skill gaps so each next application starts smarter. Built on Next.js with the
backend calling Qwen on Alibaba Cloud Model Studio.
