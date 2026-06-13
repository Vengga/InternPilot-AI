// Shared types for the InternPilot agent pipeline.

export type Stage =
  | "parse_resume"
  | "analyze_jd"
  | "skill_match"
  | "recommend_portfolio"
  | "generate_pack";

export interface ResumeProfile {
  name: string;
  skills: string[];
  education: string[];
  projects: { name: string; description: string; tech: string[] }[];
  experience: string[];
  achievements: string[];
}

export interface JobAnalysis {
  role: string;
  company: string;
  seniority: string;
  required_skills: string[];
  preferred_skills: string[];
  responsibilities: string[];
  keywords: string[];
}

export interface SkillMatch {
  match_score: number; // 0–100
  matched_skills: string[];
  partial_skills: string[];
  missing_skills: string[];
  summary: string;
}

export interface PortfolioPick {
  project: string;
  why: string;
  talking_points: string[];
}

export interface PortfolioRecommendation {
  recommended: PortfolioPick[];
}

export interface ApplicationPack {
  cover_letter: string;
  recruiter_email: { subject: string; body: string };
  linkedin_message: string;
  checklist: string[];
}

export interface RunRecord {
  id: string;
  createdAt: number;
  role: string;
  company: string;
  matchScore: number;
  missing: string[];
  approved: boolean;
}

export interface Preferences {
  name: string;
  targetRoles: string[];
  recurringGaps: Record<string, number>; // skill -> times seen missing
}

export interface QwenMeta {
  demo: boolean; // true when no API key is configured and mock data was returned
  model?: string;
  usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
}

export interface ApiResult<T> {
  ok: boolean;
  stage: Stage;
  data: T;
  meta: QwenMeta;
  error?: string;
}
