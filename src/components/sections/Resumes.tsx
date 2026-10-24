"use client";

import { Download, FileText, Briefcase, Database, BarChart3, Code2 } from "lucide-react";
import { useState, useRef } from "react";

interface ResumeVariant {
  id: string;
  role: string;
  description: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  color: string;
  gradient: string;
  glowColor: string;
  fileName: string;
  available: boolean;
  tags: string[];
  floatDelay: string;
}

const overallResume = {
  id: "A",
  fileName: "/resumes/Rupam_Kumar_Resume.pdf",
  available: true,
};

const resumeVariants: ResumeVariant[] = [
  {
    id: "Soft",
    role: "Software Engineering",
    description: "Full-stack development, system design, APIs, and engineering principles.",
    icon: Code2,
    color: "#22d3ee",
    gradient: "linear-gradient(135deg, #0e7490 0%, #164e63 100%)",
    glowColor: "rgba(34,211,238,0.35)",
    fileName: "/resumes/Rupam_Kumar_SoftwareEngineering.pdf",
    available: true,
    tags: ["Next.js", "TypeScript", "REST APIs", "PostgreSQL"],
    floatDelay: "0s",
  },
  {
    id: "DE",
    role: "Data Engineering",
    description: "ETL pipelines, database design, and large-scale data processing systems.",
    icon: Database,
    color: "#34d399",
    gradient: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
    glowColor: "rgba(52,211,153,0.35)",
    fileName: "/resumes/Rupam_Kumar_DataEngineering.pdf",
    available: true,
    tags: ["Python", "SQL", "ETL", "Pipelines"],
    floatDelay: "0.6s",
  },
  {
    id: "DA",
    role: "Data Analyst",
    description: "Dashboards, SQL queries, EDA, and business intelligence insights.",
    icon: BarChart3,
    color: "#fbbf24",
    gradient: "linear-gradient(135deg, #92400e 0%, #78350f 100%)",
    glowColor: "rgba(251,191,36,0.35)",
    fileName: "/resumes/Rupam_Kumar_DataAnalyst.pdf",
    available: true,
    tags: ["SQL", "Power BI", "Pandas", "EDA"],
    floatDelay: "1.2s",
  },
  {
    id: "DS",
    role: "Data Scientist",
    description: "ML experimentation, statistical modelling, and predictive analytics.",
    icon: Briefcase,
    color: "#f472b6",
    gradient: "linear-gradient(135deg, #831843 0%, #701a75 100%)",
    glowColor: "rgba(244,114,182,0.35)",
    fileName: "/resumes/Rupam_Kumar_DataScientist.pdf",
    available: true,
    tags: ["Scikit-learn", "Python", "ML Models", "Statistics"],
    floatDelay: "1.8s",
  },
];

function ResumeCard({ variant }: { variant: ResumeVariant }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setRotation({ x: -dy * 12, y: dx * 12 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleDownload = () => {
    if (!variant.available) return;
    const link = document.createElement("a");
    link.href = variant.fileName;
    link.download = variant.fileName.split("/").pop() || "resume.pdf";
    link.click();
  };

  const Icon = variant.icon;

  return (
    <div
      style={{
                    perspective: "1000px",
                    animationDelay: variant.floatDelay,
                    height: "100%",
                  }}
      className="resume-float-wrapper"
    >
      <div
        ref={cardRef}
        className="resume-variant-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? "scale(1.04)" : "scale(1)"}`,
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.1s ease" : "transform 0.5s ease",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${isHovered ? variant.color + "60" : "rgba(255,255,255,0.08)"}`,
          backdropFilter: "blur(20px)",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          cursor: "default",
          position: "relative",
          overflow: "hidden",
          height: "100%",
          boxShadow: isHovered
            ? `0 20px 60px ${variant.glowColor}, 0 0 0 1px ${variant.color}30`
            : "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        {/* Glow blob on hover */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: variant.glowColor,
            filter: "blur(40px)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        />

        {/* Top row: icon + ID badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "14px",
              background: variant.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 20px ${variant.glowColor}`,
              transform: "translateZ(20px)",
            }}
          >
            <Icon size={22} style={{ color: "#fff" }} />
          </div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.12em",
              padding: "4px 12px",
              borderRadius: "999px",
              background: `${variant.color}18`,
              color: variant.color,
              border: `1px solid ${variant.color}35`,
              transform: "translateZ(15px)",
            }}
          >
            {variant.id}
          </span>
        </div>

        {/* Title */}
        <div style={{ transform: "translateZ(10px)" }}>
          <h3
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "6px",
              letterSpacing: "-0.01em",
            }}
          >
            {variant.role}
          </h3>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
            {variant.description}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", transform: "translateZ(8px)" }}>
          {variant.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            padding: "12px 16px",
            borderRadius: "12px",
            border: `1.5px solid ${variant.color}50`,
            background: isHovered ? `${variant.color}18` : "transparent",
            color: variant.color,
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.2s ease",
            transform: "translateZ(12px)",
            letterSpacing: "0.02em",
          }}
          aria-label={`Download ${variant.role} resume`}
        >
          <Download size={14} />
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default function Resumes() {
  const [overallHovered, setOverallHovered] = useState(false);
  const overallRef = useRef<HTMLDivElement>(null);
  const [overallRot, setOverallRot] = useState({ x: 0, y: 0 });

  const handleOverallMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = overallRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setOverallRot({ x: -dy * 6, y: dx * 6 });
  };

  const handleOverallDownload = () => {
    const link = document.createElement("a");
    link.href = overallResume.fileName;
    link.download = "Rupam_Kumar_Resume.pdf";
    link.click();
  };

  return (
    <section
      id="resumes"
      className="section"
      style={{
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient orbs */}
      <div aria-hidden className="resume-orb resume-orb-1" />
      <div aria-hidden className="resume-orb resume-orb-2" />
      <div aria-hidden className="resume-orb resume-orb-3" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="section-label" aria-hidden>Resumes</div>
        <div style={{ marginBottom: "56px", maxWidth: "560px" }}>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: "14px",
              lineHeight: 1.1,
            }}
          >
            Download My{" "}
            <span style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Resume
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.75, fontSize: "15px" }}>
            Pick the version tailored to your role — or grab the comprehensive one that covers everything.
          </p>
        </div>

        {/* Overall Resume (A) — Wide 3D card */}
        <div style={{ perspective: "1200px", marginBottom: "48px" }}>
          <div
            ref={overallRef}
            className="resume-overall-card"
            onMouseMove={handleOverallMove}
            onMouseEnter={() => setOverallHovered(true)}
            onMouseLeave={() => { setOverallHovered(false); setOverallRot({ x: 0, y: 0 }); }}
            style={{
              transform: `rotateX(${overallRot.x}deg) rotateY(${overallRot.y}deg) ${overallHovered ? "scale(1.015)" : "scale(1)"}`,
              transformStyle: "preserve-3d",
              transition: overallHovered ? "transform 0.12s ease" : "transform 0.6s ease",
              borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(129,140,248,0.12) 100%)",
              border: `1px solid ${overallHovered ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.1)"}`,
              backdropFilter: "blur(24px)",
              padding: "40px 44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "28px",
              flexWrap: "wrap",
              position: "relative",
              overflow: "hidden",
              boxShadow: overallHovered
                ? "0 24px 80px rgba(34,211,238,0.2), 0 0 0 1px rgba(34,211,238,0.2)"
                : "0 8px 40px rgba(0,0,0,0.4)",
              cursor: "default",
            }}
          >
            {/* Glow */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(34,211,238,0.06) 0%, rgba(129,140,248,0.06) 100%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(34,211,238,0.1)", filter: "blur(60px)", opacity: overallHovered ? 1 : 0.4, transition: "opacity 0.4s", pointerEvents: "none" }} />

            <div className="resume-overall-info" style={{ display: "flex", alignItems: "center", gap: "24px", position: "relative", transform: "translateZ(20px)" }}>
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #22d3ee, #818cf8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 8px 30px rgba(34,211,238,0.4)",
                }}
              >
                <FileText size={30} style={{ color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "6px" }}>
                  Complete Profile · A
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "6px", letterSpacing: "-0.02em" }}>
                  Overall Resume
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                  Covers all skills — Software Engineering, Data Analytics, Data Science & leadership in one document.
                </p>
              </div>
            </div>

            <button
              onClick={handleOverallDownload}
              className="resume-overall-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "15px 32px",
                borderRadius: "14px",
                border: "none",
                background: "linear-gradient(135deg, #22d3ee, #818cf8)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "15px",
                cursor: "pointer",
                fontFamily: "inherit",
                flexShrink: 0,
                boxShadow: overallHovered ? "0 8px 30px rgba(34,211,238,0.45)" : "0 4px 16px rgba(34,211,238,0.25)",
                transform: "translateZ(24px)",
                transition: "box-shadow 0.3s ease",
                letterSpacing: "0.01em",
              }}
              aria-label="Download overall resume"
            >
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>

        {/* Divider label */}
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "28px" }}>
          Role-Specific Versions
        </p>

        {/* 3D Cards Grid */}
        <div className="resume-3d-grid">
          {resumeVariants.map((variant) => (
            <ResumeCard key={variant.id} variant={variant} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.97); }
        }
        .resume-float-wrapper {
          animation: float 5s ease-in-out infinite;
          height: 100%;
        }
        .resume-3d-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          align-items: stretch;
        }
        .resume-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: orbFloat 12s ease-in-out infinite;
        }
        .resume-orb-1 {
          width: 400px; height: 400px;
          background: rgba(34,211,238,0.07);
          top: -100px; left: -100px;
          animation-delay: 0s;
        }
        .resume-orb-2 {
          width: 350px; height: 350px;
          background: rgba(129,140,248,0.07);
          bottom: -80px; right: -80px;
          animation-delay: 4s;
        }
        .resume-orb-3 {
          width: 250px; height: 250px;
          background: rgba(244,114,182,0.05);
          top: 50%; left: 50%;
          animation-delay: 8s;
        }
        @media (max-width: 1100px) {
          .resume-3d-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 680px) {
          .resume-overall-card {
            padding: 24px 18px !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 20px !important;
          }
          .resume-overall-info {
            gap: 16px !important;
          }
          .resume-overall-btn {
            width: 100% !important;
            justify-content: center !important;
            padding: 14px 20px !important;
            font-size: 14px !important;
          }
          .resume-variant-card {
            padding: 22px 18px !important;
          }
          .resume-3d-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 580px) {
          .resume-3d-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
