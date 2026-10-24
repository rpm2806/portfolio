export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    icon: "Code2",
    skills: ["Python", "SQL", "TypeScript", "C++", "MATLAB"],
  },
  {
    name: "Software & Web Development",
    icon: "Monitor",
    skills: ["Next.js", "React", "FastAPI", "HTML & CSS", "REST APIs", "Git", "GitHub", "VS Code"],
  },
  {
    name: "Data & Analytics",
    icon: "BarChart3",
    skills: ["Pandas", "NumPy", "Matplotlib", "Power BI", "Excel", "SQL Queries", "Data Cleaning"],
  },
  {
    name: "Machine Learning & AI",
    icon: "Brain",
    skills: ["Scikit-learn", "TensorFlow", "Keras", "Transformers", "NLTK", "Random Forest", "SVM"],
  },
  {
    name: "AI & Retrieval Systems",
    icon: "Cpu",
    skills: ["LangChain", "SentenceTransformers", "FAISS", "Ollama", "Groq API", "Hugging Face", "RAG", "Streamlit"],
  },
  {
    name: "Databases & Infrastructure",
    icon: "Database",
    skills: ["MySQL", "PostgreSQL", "Prisma ORM", "Neon", "Cloudinary", "Jupyter Notebook", "Google Colab"],
  },
];
