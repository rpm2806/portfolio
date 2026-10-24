"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X, Download } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { profile } from "@/data/profile";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#leadership", label: "Leadership" },
  { href: "#resumes", label: "Resumes" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [logoHovered, setLogoHovered] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);

    // Active section tracking
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    for (const sectionId of [...sections].reverse()) {
      const el = document.getElementById(sectionId);
      if (el && window.scrollY >= el.offsetTop - 120) {
        setActiveSection(sectionId);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow)" : "none",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "68px",
          }}
        >
          {/* Logo — Beautified Rupam Kumar Branding */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: logoHovered ? "translateY(-1px) scale(1.02)" : "translateY(0) scale(1)",
            }}
            aria-label="Rupam Kumar - Back to top"
          >
            {/* RK Holographic Monogram Emblem */}
            <div
              style={{
                position: "relative",
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: logoHovered
                  ? "linear-gradient(135deg, rgba(6,182,212,0.32), rgba(139,92,246,0.32))"
                  : "linear-gradient(135deg, rgba(6,182,212,0.18), rgba(139,92,246,0.18))",
                border: logoHovered
                  ? "1.5px solid rgba(34,211,238,0.85)"
                  : "1.5px solid rgba(6,182,212,0.45)",
                boxShadow: logoHovered
                  ? "0 0 24px rgba(6,182,212,0.55), 0 0 12px rgba(139,92,246,0.35), inset 0 1px 2px rgba(255,255,255,0.4)"
                  : "0 0 16px rgba(6,182,212,0.25), inset 0 1px 2px rgba(255,255,255,0.2)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                flexShrink: 0,
              }}
            >
              {/* Outer ambient glow ring */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: "-2px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(6,182,212,0.4), rgba(139,92,246,0.4))",
                  filter: "blur(4px)",
                  opacity: logoHovered ? 0.7 : 0.2,
                  transition: "opacity 0.3s ease",
                  zIndex: -1,
                }}
              />
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(135deg, #ffffff 0%, #67e8f9 55%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 1px 4px rgba(6,182,212,0.4))",
                }}
              >
                RK
              </span>
            </div>

            {/* Typography Stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                  fontSize: "17px",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                }}
              >
                <span
                  style={{
                    color: "#f8fafc",
                    textShadow: logoHovered ? "0 0 12px rgba(255,255,255,0.4)" : "none",
                    transition: "text-shadow 0.25s ease",
                  }}
                >
                  Rupam
                </span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #22d3ee 0%, #818cf8 60%, #c084fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: logoHovered ? "drop-shadow(0 0 12px rgba(34,211,238,0.55))" : "drop-shadow(0 0 6px rgba(34,211,238,0.2))",
                    transition: "filter 0.3s ease",
                  }}
                >
                  Kumar
                </span>
              </div>

              {/* Subtitle status badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "10.5px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                }}
              >
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                    display: "inline-block",
                  }}
                />
                <span style={{ color: "rgba(142, 195, 222, 0.85)", whiteSpace: "nowrap" }}>
                  Built to Solve Problems
                </span>
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                    backgroundColor: isActive ? "var(--accent-cyan-soft)" : "transparent",
                    transition: "all 0.15s ease",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color = "var(--text-primary)";
                      (e.target as HTMLElement).style.backgroundColor = "var(--bg-secondary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color = "var(--text-secondary)";
                      (e.target as HTMLElement).style.backgroundColor = "transparent";
                    }
                  }}
                  aria-current={isActive ? "true" : undefined}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Divider */}
            <div style={{ width: "1px", height: "20px", background: "linear-gradient(to bottom, rgba(6,182,212,0.3), rgba(139,92,246,0.3))", margin: "0 8px" }} aria-hidden />

            {/* Resume download button — always active */}
            <a
              href={profile.resumeUrl || "/resumes/Rupam_Kumar_Resume.pdf"}
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 16px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#22d3ee",
                border: "1.5px solid rgba(6,182,212,0.4)",
                borderRadius: "10px",
                background: "rgba(6,182,212,0.08)",
                backdropFilter: "blur(8px)",
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 0 12px rgba(6,182,212,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(6,182,212,0.18)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(6,182,212,0.3)";
                e.currentTarget.style.borderColor = "rgba(6,182,212,0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(6,182,212,0.08)";
                e.currentTarget.style.boxShadow = "0 0 12px rgba(6,182,212,0.1)";
                e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)";
              }}
              aria-label="Download resume"
            >
              <Download size={14} />
              Resume
            </a>

            {/* Theme toggle removed – night mode only */}
          </div>

          {/* Mobile: hamburger only */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="mobile-nav-controls">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "8px",
                cursor: "pointer",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          role="menu"
          style={{
            backgroundColor: "var(--nav-bg)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: "1px solid var(--border)",
            padding: "12px 0 16px",
          }}
        >
          <div className="container">
            {navLinks.map((link) => (
              <button
                key={link.href}
                role="menuitem"
                onClick={() => handleNavClick(link.href)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "10px 4px",
                  fontSize: "15px",
                  color: activeSection === link.href.replace("#", "") ? "var(--accent-cyan)" : "var(--text-primary)",
                  fontWeight: activeSection === link.href.replace("#", "") ? 600 : 400,
                  fontFamily: "inherit",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {link.label}
              </button>
            ))}
            <div className="mobile-menu-actions" style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
              {profile.resumeAvailable ? (
                <a
                  href={profile.resumeUrl}
                  download
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Download size={14} /> Download Resume
                </a>
              ) : null}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ flex: 1, justifyContent: "center" }}
              >
                <GithubIcon size={14} /> GitHub
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav-controls { display: none !important; }
        }
        @media (max-width: 899px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-controls { display: flex !important; }
        }
        @media (max-width: 440px) {
          .mobile-menu-actions {
            flex-direction: column !important;
          }
        }
      `}</style>
    </nav>
  );
}
