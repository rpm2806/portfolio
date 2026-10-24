export const profile = {
  name: "Rupam Kumar",
  headline: "Aspiring Software Engineer | Data & AI Engineer",
  tagline:
    "I build software and data-driven solutions that connect application development, backend systems, analytics, and AI.",
  bio: `I'm a mechanical engineering graduate from NIT Durgapur with a strong interest in software development, data engineering, and applied AI. During my time at college, I shifted from designing mechanical systems to building software — writing Python scripts, training ML models, developing full-stack web applications, and experimenting with LLM-based tools.

My internship at GPB CALIBERIDX gave me hands-on experience with SQL, Python, and Power BI in a real business environment. My personal projects span sentiment analysis, crop recommendation, retrieval-augmented generation, and a full-stack student management portal.

I enjoy understanding problems thoroughly before choosing tools, writing maintainable code, and building things that actually work.`,
  email: "rupamkr2040@gmail.com",
  linkedin: "https://linkedin.com/in/rupam-kumar-86a999254",
  github: "https://github.com/rpm2806",
  location: "India",
  resumeUrl: "/resumes/Rupam_Kumar_Resume.pdf",
  resumeAvailable: true,
  whatsappNumber: "916206449375", // India country code + number
  whatsappConfigured: true,
  web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "1604db40-a80b-46a7-a01c-1420a93303e3",
  avatarUrl: "/images/headshot.jpg", // Replace with real headshot
  avatarAvailable: false, // Set to true when headshot is placed in /public/images/
  buildingThemes: [
    {
      icon: "BarChart3",
      title: "Data Analytics & Decision Support",
      description:
        "Turning raw data into structured insights that support informed decisions. SQL queries, dashboards, and analysis pipelines.",
    },
    {
      icon: "Database",
      title: "Backend Systems & Data Pipelines",
      description:
        "Building reliable applications and data workflows. APIs, database integration, automation, and reproducible data processing.",
    },
    {
      icon: "Brain",
      title: "Machine Learning & AI Applications",
      description:
        "Training and deploying ML models for classification, recommendation, and language understanding. Practical AI, not just experimentation.",
    },
  ],
};
