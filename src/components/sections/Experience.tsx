import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { Building2, MapPin, Calendar } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="section" style={{ backgroundColor: "transparent" }}>
      <div className="container">
        <div className="section-label" aria-hidden>Work Experience</div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          Professional Experience
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "520px", marginBottom: "56px", lineHeight: 1.7 }}>
          Real-world exposure across industrial engineering and data analytics.
        </p>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "56px" }}>
          {/* Vertical line */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "19px",
              top: "24px",
              bottom: "24px",
              width: "2px",
              background: "linear-gradient(to bottom, var(--accent-cyan), var(--accent-violet))",
              opacity: 0.3,
              borderRadius: "1px",
            }}
          />

          {experiences.map((exp, idx) => (
            <div
              key={idx}
              style={{ position: "relative", marginBottom: idx < experiences.length - 1 ? "40px" : 0 }}
            >
              {/* Timeline dot */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: "-46px",
                  top: "24px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: exp.current
                    ? "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))"
                    : "var(--bg-secondary)",
                  border: "2px solid var(--accent-cyan)",
                  zIndex: 1,
                }}
              />

              {/* Card */}
              <div className="card" style={{ padding: "28px 32px" }}>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "16px",
                    marginBottom: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    {exp.current && (
                      <div className="status-live" style={{ marginBottom: "10px" }}>
                        Current Role
                      </div>
                    )}
                    <h3
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: "4px",
                      }}
                    >
                      {exp.role}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                      <Building2 size={14} style={{ color: "var(--accent-cyan)" }} />
                      <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--accent-cyan)" }}>
                        {exp.company}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        marginBottom: "4px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Calendar size={13} />
                      {exp.period}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "13px",
                        color: "var(--text-muted)",
                        justifyContent: "flex-end",
                      }}
                    >
                      <MapPin size={13} />
                      {exp.location}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7, marginBottom: "16px" }}>
                  {exp.description}
                </p>

                {/* Highlights */}
                <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: "20px" }}>
                  {exp.highlights.map((h, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        padding: "6px 0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        borderBottom: i < exp.highlights.length - 1 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "var(--accent-cyan)",
                          flexShrink: 0,
                          marginTop: "8px",
                        }}
                        aria-hidden
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Skills */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {exp.skills.map((s) => (
                    <span key={s} className="tech-pill">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
