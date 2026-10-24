export type ProjectCategory = "Software Engineering" | "AI & Machine Learning" | "Data Analytics";
export type ProjectStatus = "live" | "repo-only" | "notebook";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  liveUrl?: string;
  githubUrl: string;
  tech: string[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "vsf",
    title: "Vriksh Students Federation Portal",
    tagline: "Full‑stack portal for student federation management",
    description:
      "A Next.js 15 application with TypeScript, Prisma ORM, PostgreSQL, and Cloudinary integration. Enables event creation, volunteer management, and media uploads.",
    categories: ["Software Engineering"],
    status: "live",
    liveUrl: "https://vriksh-sf.vercel.app",
    githubUrl: "https://github.com/rpm2806/VSF",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Cloudinary", "Tailwind CSS"],
    highlights: [
      "Server‑side rendering with incremental static regeneration",
      "Role‑based access control",
      "Responsive UI with dark mode",
      "CI/CD via Vercel",
    ],
  },
  {
    id: "gita-guide",
    title: "GitaGuideAI",
    tagline: "AI‑powered personal teacher inspired by Bhagavad Gita",
    description:
      "Next.js front‑end with FastAPI backend, Groq LLM API, LangChain, and Retrieval‑Augmented Generation (RAG). Provides interactive Q&A on Gita verses.",
    categories: ["AI & Machine Learning"],
    status: "live",
    liveUrl: "https://gita-guide-ai.vercel.app",
    githubUrl: "https://github.com/rpm2806/GitaGuideAI",
    tech: ["Next.js", "FastAPI", "Python", "LangChain", "Groq", "Tailwind CSS"],
    highlights: [
      "Semantic search over curated Gita knowledge base",
      "Streaming responses with token‑by‑token display",
      "Dockerized backend for reproducible deployment",
    ],
  },
  {
    id: "sentiment140",
    title: "Sentiment140 ML System",
    tagline: "Linear SVM + TF‑IDF sentiment classifier",
    description:
      "A Streamlit web app that classifies tweets as positive or negative with ~89% accuracy using Scikit‑learn.",
    categories: ["Data Analytics", "AI & Machine Learning"],
    status: "repo-only",
    githubUrl: "https://github.com/rpm2806/Sentiment140-ML-System",
    tech: ["Python", "Scikit‑learn", "Streamlit", "SVM", "TF‑IDF"],
    highlights: [
      "End‑to‑end pipeline: data loading → preprocessing → model training → UI",
      "Supports custom tweet input and model retraining",
      "Dockerfile for containerized deployment",
    ],
  },
  {
    id: "crop-recommend",
    title: "Crop Recommendation ML",
    tagline: "Random Forest classifier for agricultural recommendations",
    description:
      "Streamlit app that suggests optimal crops based on soil parameters and environmental data using a Random Forest model.",
    categories: ["Data Analytics"],
    status: "repo-only",
    githubUrl: "https://github.com/rpm2806/crop-recommendation-ml",
    tech: ["Python", "Scikit‑learn", "Streamlit", "Random Forest"],
    highlights: [
      "Interactive sliders for soil input",
      "Model explainability with feature importance plots",
    ],
  },
  {
    id: "walmart-sales",
    title: "Walmart Sales Data Analysis",
    tagline: "SQL analysis of 10 K sales records",
    description:
      "SQL scripts and Jupyter notebooks performing exploratory data analysis on Walmart sales data, uncovering trends and insights.",
    categories: ["Data Analytics"],
    status: "repo-only",
    githubUrl: "https://github.com/rpm2806/Walmart-Sales-Data-Analysis--SQL-Project",
    tech: ["SQL", "PostgreSQL", "Python", "Jupyter"],
    highlights: [
      "Aggregated sales by region and product category",
      "Identified seasonal patterns and growth opportunities",
    ],
  },
];
