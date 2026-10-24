export type ProjectCategory = "Software Engineering" | "AI & Machine Learning" | "Data Analytics";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  categories: ProjectCategory[];
  githubUrl: string;
  liveUrl?: string;
  highlights: string[];
  status: "live" | "repo-only" | "notebook";
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "vsf-portal",
    title: "Vriksh Students Federation Portal",
    tagline: "Full-stack student management & donation verification platform",
    description:
      "An enterprise-grade, full-stack web application for the Vriksh Students Federation. Digitizes the organization's directory, secures personal identification documents, automates transactional accounting workflows, and sends real-time email alerts with PDF receipts.",
    problem:
      "The federation managed student records, membership verification, and donation tracking manually, creating administrative overhead and security risks around sensitive personal documents.",
    solution:
      "A secure Next.js web application with role-based access control, Cloudinary private storage for sensitive documents, automated email workflows with dynamic PDF receipts, and a Neon PostgreSQL database managed through Prisma ORM.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Prisma ORM", "PostgreSQL (Neon)", "Cloudinary", "NextAuth.js", "Tailwind CSS", "Nodemailer"],
    categories: ["Software Engineering"],
    githubUrl: "https://github.com/rpm2806/VSF",
    liveUrl: "https://vriksh-sf.vercel.app",
    highlights: [
      "Role-based access control with NextAuth.js v5 (student & admin roles)",
      "Secure document storage — Aadhaar cards and profile photos served only to authenticated admins via server-side proxy",
      "Automated email engine — student approval triggers unique Federation ID email; payment verification generates and emails dynamic PDF receipts",
      "Client-side Excel export for administrative reporting",
      "Deployed on Vercel with Neon serverless PostgreSQL",
    ],
    status: "live",
    featured: true,
  },
  {
    id: "gita-guide-ai",
    title: "GitaGuide AI",
    tagline: "AI chatbot delivering wisdom from the Bhagavad Gita using RAG",
    description:
      "A full-stack AI application that answers life questions with wisdom drawn from the Bhagavad Gita. Combines a Next.js frontend with a FastAPI backend. Uses Retrieval-Augmented Generation (RAG) to fetch relevant Sanskrit verses and return contextually grounded, mood-aware guidance.",
    problem:
      "Making ancient philosophical text accessible and searchable through natural language conversation, while grounding every response in actual scripture rather than generalized LLM output.",
    solution:
      "A RAG pipeline that embeds the Gita's verses using Hugging Face Inference API (BAAI/bge-small-en-v1.5), retrieves semantically relevant passages for each query, and passes them to Groq's Llama-3-8b model for fast inference. The frontend supports English and Hindi responses, and mood-based answer tones.",
    tech: ["Next.js 15", "TypeScript", "FastAPI", "Python", "Groq API (Llama-3)", "RAG", "Hugging Face Inference API", "Tailwind CSS 4", "Vercel", "Render"],
    categories: ["Software Engineering", "AI & Machine Learning"],
    githubUrl: "https://github.com/rpm2806/GitaGuideAI",
    liveUrl: "https://gita-guide-ai.vercel.app",
    highlights: [
      "RAG pipeline retrieves relevant Gita verses before every LLM response",
      "Multilingual support — English and Hindi response modes",
      "Mood-aware response tailoring (Sad, Anxious, Seeking Purpose, etc.)",
      "Every response includes Sanskrit shlokas, transliterations, and translations",
      "Full-stack: Next.js frontend on Vercel, FastAPI backend on Render",
      "1 GitHub star",
    ],
    status: "live",
    featured: true,
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis AI",
    tagline: "Tweet sentiment classifier using Linear SVM + TF-IDF",
    description:
      "A lightweight, CPU-efficient text classification system that predicts positive or negative sentiment from input text. Built with a Linear SVM and TF-IDF vectorization after evaluating multiple models including Logistic Regression, LSTM, and DistilBERT.",
    problem:
      "Building a sentiment classifier that runs efficiently on a standard laptop without a GPU, while achieving competitive accuracy on a tweet dataset.",
    solution:
      "After experimentation with transformer models (which failed to converge without GPU), chose Linear SVM with TF-IDF features — achieving ~89% accuracy on the test set with near-instant inference. Deployed as an interactive Streamlit web app.",
    tech: ["Python", "Scikit-learn", "Linear SVM", "TF-IDF", "NLTK", "Streamlit", "Pandas", "NumPy"],
    categories: ["AI & Machine Learning"],
    githubUrl: "https://github.com/rpm2806/Sentiment140-ML-System",
    highlights: [
      "~89% accuracy on tweet sentiment test set",
      "Evaluated Logistic Regression, SVM, LSTM, and DistilBERT — chose SVM for CPU-efficiency",
      "Model retrains in seconds; runs on any CPU without a GPU",
      "Interactive Streamlit interface for real-time inference",
      "Documented engineering decision: why SVM outperformed BERT for this use case",
    ],
    status: "notebook",
    featured: true,
  },
  {
    id: "crop-recommendation",
    title: "Crop Recommendation System",
    tagline: "ML-powered crop suggestion from soil and weather inputs",
    description:
      "A machine learning application that recommends the most suitable crop to plant based on 7 soil and environmental parameters. Implemented as a multiclass Random Forest classifier with a Streamlit web interface for practical use.",
    problem:
      "Farmers and agricultural planners need data-driven guidance for crop selection based on local soil chemistry and weather patterns.",
    solution:
      "A Random Forest classifier trained on labeled agricultural data using 7 features: Nitrogen (N), Phosphorus (P), Potassium (K), Temperature, Humidity, Soil pH, and Rainfall. The trained model is serialized and served through a Streamlit application.",
    tech: ["Python", "Scikit-learn", "Random Forest", "Streamlit", "Pandas", "NumPy", "Matplotlib", "Jupyter Notebook"],
    categories: ["AI & Machine Learning"],
    githubUrl: "https://github.com/rpm2806/crop-recommendation-ml",
    highlights: [
      "Multiclass classification across multiple crop types",
      "7 input features: N, P, K, Temperature, Humidity, pH, Rainfall",
      "Random Forest Classifier with accuracy evaluation, confusion matrix, and cross-validation",
      "Trained model serialized to .pkl for reuse",
      "Streamlit web app for interactive crop recommendations",
    ],
    status: "notebook",
    featured: false,
  },
  {
    id: "walmart-sql-analysis",
    title: "Walmart Sales Data Analysis",
    tagline: "SQL-driven analysis of retail sales across three branches",
    description:
      "A structured SQL analysis of Walmart's retail sales data from Kaggle's Walmart Sales Forecasting Competition. Investigates branch performance, product line revenue, customer behavior, and time-based sales trends across three branches in Myanmar.",
    problem:
      "Understanding which branches, product lines, and customer segments drive the most value — and when sales peak — to inform retail strategy.",
    solution:
      "A comprehensive set of SQL queries covering product analysis, sales trends, customer segmentation, and revenue breakdowns. The dataset spans 1,000 transactions across Mandalay, Yangon, and Naypyitaw branches with 17 columns including VAT, COGS, payment method, and customer type.",
    tech: ["SQL", "MySQL", "Data Analysis", "Kaggle Dataset"],
    categories: ["Data Analytics"],
    githubUrl: "https://github.com/rpm2806/Walmart-Sales-Data-Analysis--SQL-Project",
    highlights: [
      "Analyzed 1,000 sales transactions across 3 Walmart branches",
      "17-column schema covering invoices, product lines, customer types, VAT, COGS",
      "Branch performance comparison: Mandalay, Yangon, Naypyitaw",
      "Product line revenue, customer type segmentation, and time-based trend analysis",
      "Dataset sourced from Kaggle Walmart Sales Forecasting Competition",
    ],
    status: "repo-only",
    featured: false,
  },
];
