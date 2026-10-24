"use client";

import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { profile } from "@/data/profile";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(6, 182, 212, 0.15)",
        background: "rgba(5, 14, 34, 0.75)",
        backdropFilter: "blur(20px)",
        padding: "48px 0 36px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container">
        <div
          className="footer-content"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* Left: Branding */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, rgba(6,182,212,0.25), rgba(139,92,246,0.25))",
                  border: "1px solid rgba(34,211,238,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 900,
                  color: "#22d3ee",
                }}
              >
                RK
              </div>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#f8fafc" }}>
                Rupam Kumar
              </span>
            </div>
            <p style={{ fontSize: "12.5px", color: "var(--text-muted)", maxWidth: "340px", lineHeight: 1.6 }}>
              Aspiring Software Engineer & Data / AI Engineer. Built to solve problems.
            </p>
          </div>

          {/* Socials & Back to Top */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              aria-label="GitHub profile"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "var(--text-secondary)",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
            >
              <GithubIcon size={18} />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              aria-label="LinkedIn profile"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "var(--text-secondary)",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
            >
              <LinkedinIcon size={18} />
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="footer-link"
              aria-label="Email Rupam Kumar"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "var(--text-secondary)",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
            >
              <Mail size={18} />
            </a>

            <button
              onClick={scrollToTop}
              className="footer-link"
              aria-label="Scroll back to top"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 16px",
                borderRadius: "12px",
                background: "rgba(6, 182, 212, 0.1)",
                border: "1px solid rgba(6, 182, 212, 0.25)",
                color: "#22d3ee",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
              }}
            >
              <ArrowUp size={14} />
              Top
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
          className="footer-bottom"
        >
          <span>© {new Date().getFullYear()} Rupam Kumar. All rights reserved.</span>
          <span>Designed & Engineered with Next.js & TypeScript</span>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: #22d3ee !important;
          border-color: rgba(34, 211, 238, 0.5) !important;
          background: rgba(6, 182, 212, 0.15) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 640px) {
          .footer-content {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
          }
        }
      `}</style>
    </footer>
  );
}
