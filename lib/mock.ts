import type { Stage } from "./types";

// Deterministic fallbacks used ONLY when DASHSCOPE_API_KEY is absent, so the
// site is fully runnable for reviewers before credits are wired up. Every
// response carries meta.demo = true and the UI badges it clearly.
export const MOCK: Record<Stage, unknown> = {
  parse_resume: {
    name: "Alex Tan",
    skills: ["Python", "JavaScript", "React", "SQL", "Git", "REST APIs", "Communication", "Teamwork"],
    education: ["BSc Computer Science, National University (expected 2026)"],
    projects: [
      { name: "StudySync", description: "A collaborative study-planner web app with real-time sync.", tech: ["React", "Node.js", "WebSocket", "MongoDB"] },
      { name: "LeafGuard", description: "A plant-disease classifier mobile app using a CNN.", tech: ["Python", "TensorFlow", "Flask"] },
      { name: "CampusEats", description: "Food-ordering platform for campus vendors.", tech: ["Next.js", "PostgreSQL", "Stripe"] },
    ],
    experience: ["Frontend volunteer, university hackathon committee (2025)"],
    achievements: ["1st place, University AppJam 2025", "Google IT Support Certificate"],
  },
  analyze_jd: {
    role: "Software Engineering Intern",
    company: "Nimbus Labs",
    seniority: "Internship",
    required_skills: ["JavaScript", "React", "REST APIs", "Git", "Problem solving"],
    preferred_skills: ["TypeScript", "Cloud (AWS/Alibaba Cloud)", "CI/CD", "Testing"],
    responsibilities: [
      "Build and maintain features in the customer web app",
      "Write clean, tested, reviewable code",
      "Collaborate with designers and backend engineers",
    ],
    keywords: ["React", "TypeScript", "REST", "agile", "code review", "cloud"],
  },
  skill_match: {
    match_score: 78,
    matched_skills: ["JavaScript", "React", "REST APIs", "Git", "Problem solving"],
    partial_skills: ["TypeScript", "Cloud (AWS/Alibaba Cloud)"],
    missing_skills: ["CI/CD", "Testing"],
    summary:
      "Strong core match for a frontend-leaning internship. The candidate covers all required skills and shows real project depth. Closing the testing and CI/CD gaps would push this from a strong to an exceptional fit.",
  },
  recommend_portfolio: {
    recommended: [
      {
        project: "StudySync",
        why: "Directly mirrors the role's React + REST + real-time web work.",
        talking_points: [
          "Built real-time sync with WebSockets under a React frontend",
          "Owned the full feature loop from UI to API",
        ],
      },
      {
        project: "CampusEats",
        why: "Shows production patterns: Next.js, a real database, and payments.",
        talking_points: [
          "Shipped a Next.js app backed by PostgreSQL",
          "Integrated a third-party API (Stripe) end to end",
        ],
      },
    ],
  },
  generate_pack: {
    cover_letter:
      "Dear Nimbus Labs Hiring Team,\n\nI'm applying for the Software Engineering Intern role because building dependable, user-facing web software is exactly where I do my best work. In StudySync, I built a collaborative study planner in React with real-time sync over WebSockets, owning the feature from interface to API. That experience maps closely to your need for someone who can build and maintain features in a customer web app and write code that's clean and reviewable.\n\nMy CampusEats project pushed me further into production patterns: a Next.js frontend, a PostgreSQL database, and a Stripe integration handled end to end. I'm comfortable in JavaScript and React, work fluently with REST APIs and Git, and I'm actively leveling up my TypeScript and cloud skills.\n\nI'd be glad to bring that momentum to your team, learn your review and testing practices quickly, and contribute from week one.\n\nThank you for your consideration.\n\nWarm regards,\nAlex Tan",
    recruiter_email: {
      subject: "Software Engineering Intern — Alex Tan (React/REST)",
      body:
        "Hi,\n\nI'm Alex, a final-year CS student applying for the Software Engineering Intern role at Nimbus Labs. I build React web apps with REST APIs and Git, and recently shipped a real-time React app (StudySync) and a Next.js + PostgreSQL platform (CampusEats). I'd love to contribute to your customer web app and learn your testing and review practices.\n\nMy resume and portfolio are attached. Thank you for your time.\n\nBest,\nAlex Tan",
    },
    linkedin_message:
      "Hi — I'm a final-year CS student keen on the Software Engineering Intern role at Nimbus Labs. I build React/REST web apps (recently a real-time study planner and a Next.js + Postgres platform) and would love to connect and learn more about the team. Thank you!",
    checklist: [
      "Mirror the JD keywords (React, TypeScript, REST) in your resume summary",
      "Add one line of measurable impact to the StudySync bullet",
      "Start a short testing tutorial to close the CI/CD + testing gap",
      "Tailor the cover letter opening to a specific Nimbus product",
      "Proofread for the company name and role title before sending",
      "Connect with one Nimbus engineer on LinkedIn before applying",
    ],
  },
};
