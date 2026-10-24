export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  period: string;
  cgpa: string;
  location: string;
  highlights: string[];
}

export const education: EducationItem[] = [
  {
    institution: "National Institute of Technology Durgapur",
    degree: "Bachelor of Technology",
    field: "Mechanical Engineering",
    period: "2022 – May 2026",
    cgpa: "6.95 / 10",
    location: "Durgapur, West Bengal, India",
    highlights: [
      "Developed interest in data systems, software development, and applied AI alongside core engineering coursework",
      "Built personal projects in machine learning, NLP, and full-stack web development",
      "Active in student leadership and technical organizations",
    ],
  },
];
