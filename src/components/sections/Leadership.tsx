"use client";

import { leadership } from "@/data/leadership";
import { Users, Star, Calendar } from "lucide-react";

export default function Leadership() {
  const featured = leadership.filter((l) => l.featured);
  const others = leadership.filter((l) => !l.featured);

  return (
    <section id="leadership" className="section" style={{ backgroundColor: "transparent" }}>
      <div className="container">
        <div className="section-label" aria-hidden>Leadership</div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          Leadership & Community
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "500px", marginBottom: "48px", lineHeight: 1.7 }}>
          Organizational experience through student bodies, technical clubs, and community initiatives.
        </p>

        {/* Featured */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "20px" }} className="leadership-grid">
          {featured.map((item, idx) => (
            <div key={idx} className="card" style={{ padding: "24px", position: "relative", overflow: "hidden" }}>
              {/* Accent stripe */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "4px",
                  height: "100%",
                  background: "linear-gradient(to bottom, var(--accent-cyan), var(--accent-violet))",
                  borderRadius: "4px 0 0 4px",
                }}
              />
              <div style={{ paddingLeft: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <Star size={14} style={{ color: "#f59e0b" }} />
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#f59e0b", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Featured
                  </span>
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "2px" }}>
                  {item.role}
                </h3>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--accent-cyan)", marginBottom: "6px" }}>
                  {item.organization}
                  {item.institution && ` · ${item.institution}`}
                </p>
                {"duration" in item && item.duration && (
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
                    <Calendar size={11} style={{ color: "var(--text-muted)" }} />
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>{item.duration}</span>
                  </div>
                )}
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Others */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }} className="leadership-grid">
          {others.map((item, idx) => (
            <div key={idx} className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  aria-hidden
                >
                  <Users size={16} style={{ color: "var(--text-muted)" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "2px" }}>
                    {item.role}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>
                    {item.organization}
                    {item.institution && ` · ${item.institution}`}
                  </p>
                  {"duration" in item && item.duration && (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
                      <Calendar size={10} style={{ color: "var(--text-muted)" }} />
                      <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>{item.duration}</span>
                    </div>
                  )}
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .leadership-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
