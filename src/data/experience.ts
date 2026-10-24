export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  current: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    company: "Reliance Industries Limited",
    role: "Graduate Engineer Trainee (GET), CES Rotary",
    period: "September 2026 – Present",
    location: "Nagothane, Maharashtra, India",
    description:
      "Engineering graduate trainee program at one of India's largest industrial conglomerates. Working within the CES Rotary division with a focus on engineering fundamentals, operational systems, and practical industrial training.",
    highlights: [
      "Participating in structured engineering rotations across operational departments",
      "Applying engineering problem-solving and analytical skills in an industrial setting",
      "Building understanding of large-scale industrial systems and processes",
    ],
    skills: ["Engineering Systems", "Analytical Thinking", "Problem Solving"],
    current: true,
  },
  {
    company: "GPB CALIBERIDX PRIVATE LIMITED",
    role: "Data Analyst Intern",
    period: "May 19, 2025 – July 18, 2025",
    location: "Gaya, Bihar, India",
    description:
      "Two-month data analytics internship focused on business intelligence, KPI reporting, and data pipeline development for stakeholder reporting.",
    highlights: [
      "Developed five Power BI dashboards for KPI reporting used by 15+ stakeholders",
      "Cleaned and analyzed 100,000+ rows of business data using SQL and Python",
      "Improved reporting efficiency by approximately 35% through automation",
      "Reduced manual reporting effort by approximately 8 hours per week",
    ],
    skills: ["Power BI", "SQL", "Python", "Pandas", "Data Cleaning", "KPI Reporting"],
    current: false,
  },
];
