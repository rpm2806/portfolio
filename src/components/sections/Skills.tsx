"use client";

import { skillCategories } from "@/data/skills";
import { Code2, Monitor, BarChart3, Brain, Cpu, Database } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Code2,
  Monitor,
  BarChart3,
  Brain,
  Cpu,
  Database,
};

export default function Skills() {
  return (
    <section id="skills" className="section" style={{ backgroundColor: "transparent" }}>
      <div className="container">
        <div className="section-label" aria-hidden>Technical Skills</div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          Skills & Technologies
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "520px", marginBottom: "56px", lineHeight: 1.7 }}>
          Tools and technologies I have used in projects, academic coursework, and professional work.
          Proficiency levels vary — listed honestly.
        </p>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
          className="skills-grid"
        >
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon] || Code2;
            return (
              <div key={category.name} className="card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "var(--accent-cyan-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} style={{ color: "var(--accent-cyan)" }} />
                  </div>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                    {category.name}
                  </h3>
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
