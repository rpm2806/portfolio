"use client";

import { GraduationCap, Calendar, Award, MapPin } from "lucide-react";
import { education } from "@/data/education";

export default function Education() {
  return (
    <section id="education" className="section" style={{ backgroundColor: "transparent" }}>
      <div className="container">
        <div className="section-label" aria-hidden>Education</div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          Academic Background
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "560px", marginBottom: "40px", lineHeight: 1.7 }}>
          Formal educational milestones and foundational studies across engineering and schooling.
        </p>

        {/* 3 Separate Long Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {education.map((ed, idx) => (
            <div
              key={idx}
              className="card ed-card"
              style={{
                padding: "24px 28px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.35)";
                e.currentTarget.style.boxShadow = "0 12px 36px rgba(0, 0, 0, 0.35), 0 0 24px rgba(6, 182, 212, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "var(--shadow-card)";
              }}
            >
              {/* Left glowing accent line */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "4px",
                  height: "100%",
                  background:
                    idx === 0
                      ? "linear-gradient(to bottom, #06b6d4, #8b5cf6)"
                      : idx === 1
                      ? "linear-gradient(to bottom, #8b5cf6, #f472b6)"
                      : "linear-gradient(to bottom, #10b981, #06b6d4)",
                  borderRadius: "4px 0 0 4px",
                }}
              />

              {/* Main row: Title & Institution on left, Badges on right */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "14px",
                  flexWrap: "wrap",
                }}
              >
                {/* Left info */}
                <div style={{ flex: "1 1 280px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "rgba(6, 182, 212, 0.12)",
                        color: "#22d3ee",
                        flexShrink: 0,
                      }}
                    >
                      <GraduationCap size={16} />
                    </span>
                    <h3 style={{ fontSize: "16.5px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                      {ed.degree}
                    </h3>
                  </div>

                  <div className="ed-subline" style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", paddingLeft: "36px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent-cyan)" }}>
                      {ed.institution}
                    </span>
                    <span style={{ color: "var(--border)" }}>•</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "var(--text-secondary)" }}>
                      <MapPin size={12} style={{ color: "var(--text-muted)" }} />
                      {ed.location}
                    </span>
                  </div>
                </div>

                {/* Right badges: Year & Grade */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  {/* Year duration badge */}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "5px 12px",
                      borderRadius: "10px",
                      background: "rgba(6, 182, 212, 0.1)",
                      border: "1px solid rgba(6, 182, 212, 0.25)",
                      color: "#67e8f9",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                    }}
                  >
                    <Calendar size={13} style={{ color: "#22d3ee" }} />
                    {ed.period}
                  </span>

                  {/* Grade badge */}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "5px 12px",
                      borderRadius: "10px",
                      background: "rgba(139, 92, 246, 0.1)",
                      border: "1px solid rgba(139, 92, 246, 0.25)",
                      color: "#c4b5fd",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    <Award size={13} style={{ color: "#a78bfa" }} />
                    {ed.grade}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p
                className="ed-desc"
                style={{
                  fontSize: "13.5px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  paddingLeft: "36px",
                  margin: 0,
                }}
              >
                {ed.description}
              </p>

              {/* Highlights pills */}
              {ed.highlights && ed.highlights.length > 0 && (
                <div
                  className="ed-pills"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    paddingLeft: "36px",
                  }}
                >
                  {ed.highlights.map((h, i) => (
                    <span
                      key={i}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        fontSize: "12px",
                        fontWeight: 500,
                        padding: "3px 10px",
                        borderRadius: "8px",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .ed-card {
            padding: 20px 16px !important;
          }
          .ed-subline, .ed-desc, .ed-pills {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
