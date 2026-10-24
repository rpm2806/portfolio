export interface LeadershipItem {
  role: string;
  organization: string;
  institution?: string;
  period?: string;
  description: string;
  featured: boolean;
}

export const leadership: LeadershipItem[] = [
  {
    role: "Chairperson",
    organization: "ISTE Students' Chapter",
    institution: "NIT Durgapur",
    description:
      "Led the Indian Society for Technical Education student chapter, coordinating technical events, workshops, and professional development activities for members.",
    featured: true,
  },
  {
    role: "Secretary",
    organization: "Vriksh Students Federation",
    description:
      "Managed organizational coordination and communication for the federation. Also developed the VSF Portal, a full-stack web application, to digitize the federation's student management and donation tracking workflows.",
    featured: true,
  },
  {
    role: "Graphic Design Head",
    organization: "PRAKRITI – The Techno Environmental Club",
    institution: "NIT Durgapur",
    description:
      "Headed the design team for the techno-environmental club, creating visual communications for events, campaigns, and awareness initiatives.",
    featured: false,
  },
  {
    role: "Senior Coordinator",
    organization: "Recstacy 2025",
    description:
      "Senior coordinator for Recstacy 2025, handling logistics, team coordination, and event planning for the cultural and technical fest.",
    featured: false,
  },
];
