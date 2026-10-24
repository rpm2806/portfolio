export interface EducationItem {
  degree: string;
  level: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  description: string;
  highlights?: string[];
}

export const education: EducationItem[] = [
  {
    degree: "B.Tech in Mechanical Engineering",
    level: "Undergraduate Degree",
    institution: "National Institute of Technology Durgapur",
    location: "Durgapur, West Bengal",
    period: "2022 – 2026",
    grade: "CGPA: 6.95 / 10",
    description: "Core curriculum in engineering principles, quantitative problem-solving, and analytical modeling. Transitioned into software systems, data engineering, machine learning, and full-stack development through rigorous coursework and personal projects.",
    highlights: [
      "Chairperson – ISTE Students’ Chapter NIT Durgapur",
      "Secretary – Vriksh Students Federation (Ongoing Active Member)",
      "Graphics Design Head – PRAKRITI Fest",
      "Senior Coordinator – Recstacy 2025",
    ],
  },
  {
    degree: "Senior Secondary (Class XII) – Science (PCM)",
    level: "Senior Secondary School",
    institution: "Pragya Bharti Public School",
    location: "Gaya, Bihar",
    period: "2021 – 2022",
    grade: "Score: 89%",
    description: "Focused on Physics, Chemistry, and Mathematics (PCM). Built strong analytical and quantitative foundations, qualifying for the prestigious JEE Advanced examination.",
    highlights: [
      "Qualified JEE Advanced",
      "Academic Excellence in Mathematics & Sciences",
    ],
  },
  {
    degree: "Secondary Education (Class X)",
    level: "Secondary School",
    institution: "Pragya Bharti Public School",
    location: "Gaya, Bihar",
    period: "2019 – 2020",
    grade: "Score: 90%",
    description: "Completed secondary education with top honors across Mathematics, Science, and Social Sciences. Active in school science exhibitions, design, and co-curricular competitions.",
    highlights: [
      "Passed with Distinction (90%)",
      "Foundational skills in logical reasoning and science",
    ],
  },
];
