"use client";

import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="section" style={{ backgroundColor: "transparent" }}>
      <div className="container">
        <div className="section-label" aria-hidden>About Me</div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "48px",
          }}
        >
          Who I Am
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "64px", alignItems: "start" }} className="about-grid">
          {/* Left: Bio */}
          <div>
            {profile.bio.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: "20px",
                }}
              >
                {para}
              </p>
            ))}

            {/* Building themes summary */}
            <div style={{ marginTop: "32px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "var(--text-primary)" }}>
                What I enjoy building
              </h3>
              {profile.buildingThemes.map((theme) => (
                <div
                  key={theme.title}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    marginBottom: "14px",
                    padding: "14px 16px",
                    background: "rgba(4, 14, 35, 0.65)",
                    borderRadius: "14px",
                    border: "1px solid rgba(6,182,212,0.15)",
                    backdropFilter: "blur(16px)",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "var(--accent-cyan)",
                      boxShadow: "0 0 8px var(--accent-cyan)",
                      flexShrink: 0,
                      marginTop: "6px",
                    }}
                    aria-hidden
                  />
                  <div>
                    <strong style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: 600 }}>
                      {theme.title}
                    </strong>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px", lineHeight: 1.6 }}>
                      {theme.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Key facts */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div
              style={{
                padding: "28px",
                background: "rgba(4, 14, 35, 0.72)",
                borderRadius: "20px",
                border: "1px solid rgba(6,182,212,0.18)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(6,182,212,0.08)",
              }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "20px", color: "var(--text-primary)" }}>
                Quick Profile
              </h3>
              {[
                { label: "Location", value: "India" },
                { label: "Education", value: "B.Tech Mechanical Engineering, NIT Durgapur" },
                { label: "Current Role", value: "Graduate Engineer Trainee, Reliance Industries" },
                { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
                { label: "GitHub", value: "github.com/rpm2806", href: profile.github },
                { label: "LinkedIn", value: "linkedin.com/in/rupam-kumar-86a999254", href: profile.linkedin },
              ].map(({ label, value, href }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(6,182,212,0.1)",
                  }}
                >
                  <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      className="link-hover"
                      style={{ fontSize: "13px", wordBreak: "break-all" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
