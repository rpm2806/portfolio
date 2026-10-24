"use client";

import { useState } from "react";
import { ExternalLink, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { projects, type ProjectCategory } from "@/data/projects";

const categories: ProjectCategory[] = ["Software Engineering", "AI & Machine Learning", "Data Analytics"];

const categoryColors: Record<ProjectCategory, { text: string; bg: string; border: string }> = {
  "Software Engineering": {
    text: "var(--accent-cyan)",
    bg: "rgba(6,182,212,0.12)",
    border: "rgba(6,182,212,0.3)",
  },
  "AI & Machine Learning": {
    text: "#a78bfa",
    bg: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.3)",
  },
  "Data Analytics": {
    text: "#fbbf24",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.3)",
  },
};

const statusLabels: Record<string, string> = {
  live: "Live",
  "repo-only": "Code Only",
  notebook: "Notebook",
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "All">("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <section id="projects" className="section" style={{ backgroundColor: "transparent" }}>
      <div className="container">
        <div className="section-label" aria-hidden>Projects</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: "8px",
              }}
            >
              Featured Projects
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "480px" }}>
              A selection of software, data, and AI projects — each with a real repository and documented implementation.
            </p>
          </div>

                  {/* Filter tabs */}
          <div
            style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
            role="tablist"
            aria-label="Filter projects by category"
          >
            {(["All", ...categories] as const).map((cat) => {
              const isActive = activeFilter === cat;
              const colors = cat !== "All" ? categoryColors[cat as ProjectCategory] : null;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(cat as ProjectCategory | "All")}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "999px",
                    border: "1.5px solid",
                    borderColor: isActive
                      ? colors ? colors.border : "rgba(34,211,238,0.5)"
                      : "rgba(255,255,255,0.1)",
                    background: isActive
                      ? colors ? colors.bg : "rgba(34,211,238,0.08)"
                      : "transparent",
                    color: isActive
                      ? colors ? colors.text : "var(--accent-cyan)"
                      : "rgba(255,255,255,0.4)",
                    fontSize: "12px",
                    fontWeight: isActive ? 700 : 400,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.02em",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "var(--text-muted)",
              fontSize: "15px",
            }}
          >
            No projects in this category yet.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
            }}
            className="projects-grid"
          >
            {filtered.map((project) => (
              <article
                key={project.id}
                className="card project-card"
                style={{ padding: "28px", display: "flex", flexDirection: "column" }}
              >
                {/* Header */}
                <div style={{ marginBottom: "16px" }}>
                  {/* Categories + Status */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {project.categories.map((cat) => {
                        const c = categoryColors[cat];
                        return (
                          <span
                            key={cat}
                            style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              letterSpacing: "0.05em",
                              color: c.text,
                              background: c.bg,
                              border: `1px solid ${c.border}`,
                              borderRadius: "999px",
                              padding: "3px 10px",
                            }}
                          >
                            {cat}
                          </span>
                        );
                      })}
                    </div>
                    {project.status === "live" && (
                      <div className="status-live">{statusLabels[project.status]}</div>
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "4px",
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--accent-cyan)", fontWeight: 500, marginBottom: "12px" }}>
                    {project.tagline}
                  </p>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                    {project.description}
                  </p>
                </div>

                {/* Highlights */}
                <div style={{ marginBottom: "16px", flex: 1 }}>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {project.highlights.slice(0, 3).map((h, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          padding: "4px 0",
                          fontSize: "13px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <ChevronRight size={14} style={{ color: "var(--accent-cyan)", flexShrink: 0, marginTop: "2px" }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                  {project.tech.slice(0, 5).map((t) => (
                    <span key={t} className="tech-pill" style={{ fontSize: "11px" }}>
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="tech-pill" style={{ fontSize: "11px", opacity: 0.6 }}>
                      +{project.tech.length - 5} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: "13px", padding: "8px 16px", flex: 1, justifyContent: "center" }}
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <GithubIcon size={14} />
                    Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ fontSize: "13px", padding: "8px 16px", flex: 1, justifyContent: "center" }}
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* All repos link */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <a
            href="https://github.com/rpm2806"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            aria-label="View all repositories on GitHub"
          >
            <GithubIcon size={16} />
            View All Repositories on GitHub
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 640px) {
          .project-card {
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
