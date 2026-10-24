"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, ArrowDown, Code2, Database, Brain, BarChart3 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { profile } from "@/data/profile";

/* ─── Floating 3D tech badge ─────────────────────────────────────── */
function FloatingBadge({
  icon, label, color, style,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 16px",
        borderRadius: "14px",
        background: "rgba(15,23,42,0.75)",
        border: `1px solid ${color}40`,
        backdropFilter: "blur(16px)",
        fontSize: "12px",
        fontWeight: 600,
        color: "#e2e8f0",
        boxShadow: hovered
          ? `0 8px 32px ${color}50, 0 0 0 1px ${color}60`
          : `0 4px 16px rgba(0,0,0,0.4)`,
        transform: hovered ? "scale(1.08) translateY(-2px)" : "scale(1)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        zIndex: 10,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <span style={{ color }}>{icon}</span>
      {label}
    </div>
  );
}

/* ─── Orbiting ring element ─────────────────────────────────────── */
function OrbitRing({
  size, duration, tilt, color, delay,
}: {
  size: number; duration: number; tilt: number; color: string; delay: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: `${size}px`,
        height: `${size}px`,
        marginTop: `-${size / 2}px`,
        marginLeft: `-${size / 2}px`,
        borderRadius: "50%",
        border: `1px solid ${color}`,
        transform: `rotateX(${tilt}deg) rotateY(${tilt * 0.4}deg)`,
        animation: `orbitSpin ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
        pointerEvents: "none",
      }}
    >
      {/* Orbiting dot */}
      <div
        style={{
          position: "absolute",
          top: "-5px",
          left: "50%",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 12px ${color}, 0 0 24px ${color}60`,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}

/* ─── Stable Floating Tech Badges (anchored with subtle vibrating float) ── */
interface BadgeConfig {
  label: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  border: string;
  style: React.CSSProperties;
  delay: string;
}

const STABLE_BADGES: BadgeConfig[] = [
  {
    label: "Data Systems",
    icon: <Database size={13} />,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.45)",
    border: "rgba(34,211,238,0.55)",
    style: { top: "18px", left: "-32px" },
    delay: "0s",
  },
  {
    label: "ML / AI",
    icon: <Brain size={13} />,
    color: "#f472b6",
    glow: "rgba(244,114,182,0.45)",
    border: "rgba(244,114,182,0.55)",
    style: { top: "42px", right: "-36px" },
    delay: "1.1s",
  },
  {
    label: "Full-Stack & AI",
    icon: <Code2 size={13} />,
    color: "#a5b4fc",
    glow: "rgba(129,140,248,0.45)",
    border: "rgba(129,140,248,0.55)",
    style: { bottom: "20px", right: "-28px" },
    delay: "2.2s",
  },
];

function StableFloatingBadges() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <>
      {STABLE_BADGES.map((cfg, idx) => {
        const isHovered = hoveredIdx === idx;
        return (
          <div
            key={cfg.label}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              position: "absolute",
              zIndex: isHovered ? 30 : 20,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 16px",
              borderRadius: "14px",
              fontSize: "12px",
              fontWeight: 700,
              color: cfg.color,
              background: "rgba(13, 28, 60, 0.88)",
              border: `1.5px solid ${isHovered ? cfg.color : cfg.border}`,
              backdropFilter: "blur(16px)",
              boxShadow: isHovered
                ? `0 10px 30px ${cfg.glow}, 0 0 15px ${cfg.color}80`
                : `0 6px 22px ${cfg.glow}, inset 0 1px 0 rgba(255,255,255,0.12)`,
              whiteSpace: "nowrap",
              letterSpacing: "0.02em",
              cursor: "pointer",
              animation: `badgeVibe 3.6s ease-in-out infinite`,
              animationDelay: cfg.delay,
              transform: isHovered ? "scale(1.08) translateY(-4px)" : "scale(1)",
              transition: "transform 0.25s ease, border-color 0.25s, box-shadow 0.25s",
              ...cfg.style,
            }}
          >
            <span style={{ color: cfg.color, display: "flex", alignItems: "center" }}>{cfg.icon}</span>
            {cfg.label}
          </div>
        );
      })}
    </>
  );
}

/* ─── 3D Earth Sphere ────────────────────────────────────────────── */
function AvatarSphere() {
  const sphereRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const SIZE = 300; // container size
  const CX = SIZE / 2;
  const CY = SIZE / 2;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sphereRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -16;
    const y = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 16;
    setRot({ x, y });
  };

  return (
    <div
      ref={sphereRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      style={{
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        position: "relative",
        cursor: "grab",
      }}
    >
      {/* Stable floating tech badges with gentle vibration */}
      <StableFloatingBadges />

      {/* Earth sphere */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: "220px", height: "220px",
          marginTop: "-110px", marginLeft: "-110px",
          borderRadius: "50%",
          transform: `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: "transform 0.18s ease",
          animation: "earthFloat 6s ease-in-out infinite",
          zIndex: 10,
          overflow: "hidden",
          boxShadow: "0 0 80px rgba(6,182,212,0.32), 0 0 150px rgba(6,182,212,0.08), inset -18px -18px 55px rgba(0,0,50,0.85)",
        }}
      >
        {/* Ocean base */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%",
          background:"radial-gradient(circle at 40% 35%, #1a5276 0%, #1b4f72 25%, #154360 50%, #0a2342 80%, #050d1a 100%)" }} />
        {/* Continents */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%",
          background:`radial-gradient(ellipse 75px 48px at 35% 38%, rgba(34,139,34,0.78) 0%, transparent 70%),
                      radial-gradient(ellipse 48px 32px at 60% 32%, rgba(85,107,47,0.72) 0%, transparent 65%),
                      radial-gradient(ellipse 62px 38px at 72% 58%, rgba(46,125,50,0.68) 0%, transparent 65%),
                      radial-gradient(ellipse 38px 28px at 25% 62%, rgba(34,139,34,0.62) 0%, transparent 60%),
                      radial-gradient(ellipse 52px 22px at 80% 72%, rgba(160,82,45,0.52) 0%, transparent 60%)` }} />
        {/* Atmosphere highlight */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%",
          background:"radial-gradient(circle at 30% 28%, rgba(100,180,255,0.35) 0%, transparent 50%)" }} />
        {/* Clouds */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%",
          background:`radial-gradient(ellipse 65px 14px at 42% 22%, rgba(255,255,255,0.42) 0%, transparent 70%),
                      radial-gradient(ellipse 48px 10px at 65% 45%, rgba(255,255,255,0.32) 0%, transparent 65%),
                      radial-gradient(ellipse 38px 12px at 30% 55%, rgba(255,255,255,0.26) 0%, transparent 60%)` }} />
        {/* Night shadow */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%",
          background:"radial-gradient(circle at 75% 60%, transparent 30%, rgba(0,0,10,0.72) 70%, rgba(0,0,5,0.95) 100%)" }} />
        {/* City lights */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%",
          background:`radial-gradient(circle 2px at 76% 48%, rgba(255,220,100,0.92) 0%, transparent 100%),
                      radial-gradient(circle 1.5px at 80% 55%, rgba(255,200,80,0.82) 0%, transparent 100%),
                      radial-gradient(circle 2px at 74% 62%, rgba(255,210,90,0.88) 0%, transparent 100%),
                      radial-gradient(circle 1px at 83% 45%, rgba(255,230,120,0.72) 0%, transparent 100%)` }} />
        {/* Specular */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%",
          background:"radial-gradient(circle at 32% 30%, rgba(180,220,255,0.22) 0%, transparent 40%)" }} />
        {/* Atmosphere rim */}
        <div style={{ position:"absolute", inset:"-4px", borderRadius:"50%",
          border:"2px solid rgba(100,180,255,0.28)",
          boxShadow:"0 0 24px rgba(34,211,238,0.38), inset 0 0 16px rgba(34,211,238,0.05)",
          pointerEvents:"none" }} />
      </div>

      <style>{`
        @keyframes earthFloat {
          0%,100% { margin-top: -110px; }
          50%      { margin-top: -124px; }
        }
      `}</style>
    </div>
  );
}

/* ─── Animated typewriter subtitle ─────────────────────────────── */
const ROLES = [
  "Software Engineer",
  "Data & AI Engineer",
  "ML Engineer",
  "Data Analyst",
  "Full-Stack Developer",
];

function TypeWriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span style={{
      background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #f472b6)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      fontWeight: 700,
    }}>
      {displayed}
      <span style={{
        WebkitTextFillColor: "#06b6d4",
        animation: "blink 1s step-end infinite",
        marginLeft: "2px",
      }}>|</span>
    </span>
  );
}

/* ─── Skill building card ───────────────────────────────────────── */
const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  BarChart3, Database, Brain,
};
const cardColors: Record<string, { color: string; glow: string; grad: string }> = {
  BarChart3: { color: "#f59e0b", glow: "rgba(245,158,11,0.3)", grad: "linear-gradient(135deg,#92400e,#78350f)" },
  Database:  { color: "#22d3ee", glow: "rgba(34,211,238,0.3)",  grad: "linear-gradient(135deg,#0e7490,#164e63)" },
  Brain:     { color: "#818cf8", glow: "rgba(129,140,248,0.3)", grad: "linear-gradient(135deg,#3730a3,#312e81)" },
};

function BuildCard({ theme, index }: { theme: typeof profile.buildingThemes[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const Icon = iconMap[theme.icon] || Code2;
  const colors = cardColors[theme.icon] ?? { color: "#22d3ee", glow: "rgba(34,211,238,0.3)", grad: "linear-gradient(135deg,#0e7490,#164e63)" };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    setRot({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setRot({ x: 0, y: 0 }); }}
      style={{
        perspective: "800px",
        animationDelay: `${index * 0.15}s`,
      }}
    >
      <div
        style={{
          padding: "28px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? colors.color + "50" : "rgba(255,255,255,0.07)"}`,
          backdropFilter: "blur(20px)",
          transform: `perspective(800px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) ${hovered ? "scale(1.03)" : "scale(1)"}`,
          transition: hovered ? "transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s" : "transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s",
          boxShadow: hovered ? `0 20px 60px ${colors.glow}` : "0 4px 24px rgba(0,0,0,0.3)",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
      >
        {/* bg glow */}
        <div style={{
          position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px",
          borderRadius: "50%", background: colors.glow, filter: "blur(40px)",
          opacity: hovered ? 0.8 : 0.2, transition: "opacity 0.4s", pointerEvents: "none",
        }} />

        <div style={{
          width: "48px", height: "48px", borderRadius: "14px", background: colors.grad,
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px",
          boxShadow: `0 4px 16px ${colors.glow}`,
        }}>
          <Icon size={22} style={{ color: "#fff" }} />
        </div>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9", marginBottom: "8px" }}>{theme.title}</h3>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{theme.description}</p>
      </div>
    </div>
  );
}

/* ─── Particle canvas (local, layered under hero only) ──────────── */
function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Static background stars
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      opacity: Math.random() * 0.6 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      color: ["#ffffff","#c4e8ff","#b8d4ff","#22d3ee","#818cf8"][Math.floor(Math.random() * 5)],
    }));

    // Rising particles
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.1),
      opacity: Math.random() * 0.5 + 0.1,
      color: ["#22d3ee","#818cf8","#f472b6","#ffffff"][Math.floor(Math.random() * 4)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Twinkling stars
      stars.forEach((s) => {
        s.twinkle += s.twinkleSpeed;
        const alpha = s.opacity * (Math.sin(s.twinkle) * 0.35 + 0.65);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.r > 1 ? 6 : 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Rising particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < -5 || p.x > canvas.width + 5) p.x = Math.random() * canvas.width;
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}

/* ─── Main Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 0 80px",
        position: "relative",
        overflow: "hidden",
        /* Transparent — AquaSpaceCanvas renders beneath */
        background: "transparent",
      }}
    >
      {/* Depth haze — soft luminous oceanic ambient light */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 120% 60% at 50% 100%, rgba(6,182,212,0.08) 0%, transparent 70%)",
      }} />

      {/* Bioluminescent grid — like a sonar grid from a submarine */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(6,182,212,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,182,212,0.035) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 80%)",
      }} />

      {/* Abyss glow right side (space nebula / deep water bloom) */}
      <div aria-hidden style={{
        position: "absolute", top: "5%", right: "-8%",
        width: "650px", height: "650px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.11) 0%, rgba(6,182,212,0.07) 40%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
        animation: "depthGlow 8s ease-in-out infinite",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "-5%", left: "-8%",
        width: "550px", height: "550px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(20,184,166,0.05) 50%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
        animation: "depthGlow 10s ease-in-out infinite 3s",
      }} />

      {/* Aqua water-world planet — top right */}
      <div aria-hidden style={{
        position: "absolute", top: "8%", right: "5%",
        width: "180px", height: "180px", borderRadius: "50%",
        background: "radial-gradient(circle at 38% 35%, #134e6f 0%, #0c2b48 50%, #081a34 100%)",
        border: "1px solid rgba(6,182,212,0.35)",
        boxShadow: "0 0 60px rgba(6,182,212,0.25), 0 0 120px rgba(6,182,212,0.1), inset 0 0 30px rgba(20,184,166,0.15)",
        opacity: 0.9, zIndex: 0, pointerEvents: "none",
        animation: "sphereFloat 10s ease-in-out infinite",
      }}>
        {/* Ocean swirls */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: `radial-gradient(ellipse 60px 30px at 40% 55%, rgba(6,182,212,0.25) 0%, transparent 70%),
                       radial-gradient(ellipse 40px 20px at 65% 35%, rgba(20,184,166,0.2) 0%, transparent 65%)`,
        }} />
        {/* Atmosphere glow */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "radial-gradient(circle at 32% 30%, rgba(6,182,212,0.25) 0%, transparent 50%)",
        }} />
        {/* Planet ring — aqua */}
        <div style={{
          position: "absolute", top: "46%", left: "-28%",
          width: "156%", height: "32px",
          border: "1.5px solid rgba(6,182,212,0.35)",
          borderRadius: "50%",
          transform: "translateY(-50%) rotateX(72deg)",
          boxShadow: "0 0 12px rgba(6,182,212,0.3)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Bioluminescent floating orbs (replace old asteroids) */}
      <div aria-hidden style={{
        position: "absolute", bottom: "18%", left: "4%",
        width: "22px", height: "22px", borderRadius: "50%",
        background: "radial-gradient(circle at 40% 35%, rgba(6,182,212,0.8), rgba(6,182,212,0.1))",
        boxShadow: "0 0 16px rgba(6,182,212,0.6), 0 0 32px rgba(6,182,212,0.2)",
        zIndex: 0, pointerEvents: "none",
        animation: "badgeFloat 8s ease-in-out infinite 2s",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "30%", left: "6%",
        width: "12px", height: "12px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.9), rgba(139,92,246,0.1))",
        boxShadow: "0 0 12px rgba(139,92,246,0.6), 0 0 24px rgba(139,92,246,0.2)",
        zIndex: 0, pointerEvents: "none",
        animation: "badgeFloat 6s ease-in-out infinite",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "60%", right: "3%",
        width: "16px", height: "16px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(244,114,182,0.8), rgba(244,114,182,0.1))",
        boxShadow: "0 0 14px rgba(244,114,182,0.6), 0 0 28px rgba(244,114,182,0.2)",
        zIndex: 0, pointerEvents: "none",
        animation: "badgeFloat 7s ease-in-out infinite 1s",
      }} />

      {/* ── Content ── */}
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* Left: Text */}
          <div>
            {/* Availability badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)",
              fontSize: "12px", fontWeight: 600,
              color: "#34d399", marginBottom: "28px",
              backdropFilter: "blur(8px)",
              animation: "fadeInUp 0.6s ease both",
            }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%", background: "#10b981",
                boxShadow: "0 0 8px #10b981",
                animation: "pulse-glow 2s ease infinite",
                display: "block",
              }} />
              Open to new opportunities
            </div>

            {/* Name */}
            <h1 style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              marginBottom: "16px",
              color: "#f8fafc",
              textShadow: "0 0 60px rgba(34,211,238,0.15)",
              animation: "fadeInUp 0.6s 0.1s ease both",
            }}>
              {profile.name}
            </h1>

            {/* Typewriter role */}
            <h2 style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
              fontWeight: 400,
              marginBottom: "28px",
              lineHeight: 1.3,
              color: "rgba(255,255,255,0.5)",
              animation: "fadeInUp 0.6s 0.2s ease both",
            }}>
              Aspiring{" "}<TypeWriter />
            </h2>

            {/* Description */}
            <p style={{
              fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8,
              maxWidth: "540px", marginBottom: "40px",
              animation: "fadeInUp 0.6s 0.3s ease both",
            }}>
              {profile.tagline} With a mechanical engineering foundation from NIT Durgapur and hands-on experience in
              Python, SQL, full-stack development, machine learning, and LLM-based applications.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "40px", animation: "fadeInUp 0.6s 0.4s ease both" }}>
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "14px 28px", borderRadius: "14px", border: "none",
                  background: "linear-gradient(135deg, #22d3ee, #818cf8)",
                  color: "#fff", fontWeight: 700, fontSize: "15px",
                  cursor: "pointer", textDecoration: "none", fontFamily: "inherit",
                  boxShadow: "0 8px 32px rgba(34,211,238,0.35)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                Explore Projects
                <ArrowDown size={16} />
              </a>

              <a
                href="/resumes/Rupam_Kumar_Resume.pdf"
                download
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "14px 28px", borderRadius: "14px",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(8px)",
                  color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "15px",
                  cursor: "pointer", textDecoration: "none", fontFamily: "inherit",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(34,211,238,0.5)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Download Resume
              </a>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", animation: "fadeInUp 0.6s 0.5s ease both" }}>
              {[
                { href: profile.github, icon: <GithubIcon size={16} />, label: "GitHub" },
                { href: profile.linkedin, icon: <LinkedinIcon size={16} />, label: "LinkedIn" },
                { href: `mailto:${profile.email}`, icon: <Mail size={16} />, label: "Email" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    fontSize: "14px", fontWeight: 500,
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#22d3ee")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  aria-label={label}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: 3D Sphere */}
          <div className="hero-sphere-wrap" style={{ position: "relative", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AvatarSphere />
          </div>
        </div>

        {/* ── What I build ── */}
        <div style={{ marginTop: "100px" }}>
          <p style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "24px",
          }}>
            What I enjoy building
          </p>
          <div
            className="building-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}
          >
            {profile.buildingThemes.map((theme, i) => (
              <BuildCard key={theme.title} theme={theme} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        opacity: scrolled ? 0 : 0.4, transition: "opacity 0.4s", pointerEvents: "none", zIndex: 2,
      }}>
        <span style={{ fontSize: "11px", fontWeight: 500, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div style={{
          width: "1px", height: "40px",
          background: "linear-gradient(to bottom, rgba(34,211,238,0.8), transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes orbitSpin {
          from { transform: rotateX(var(--tilt,70deg)) rotateZ(0deg); }
          to   { transform: rotateX(var(--tilt,70deg)) rotateZ(360deg); }
        }
        @keyframes sphereFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes badgeFloat {
          0%,100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes badgeVibe {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-4px) rotate(0.8deg);
          }
          50% {
            transform: translateY(-7px) rotate(-0.5deg);
          }
          75% {
            transform: translateY(-3px) rotate(0.6deg);
          }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes scrollPulse {
          0%,100% { opacity: 0.4; transform: scaleY(1); }
          50%      { opacity: 1;   transform: scaleY(1.1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes depthGlow {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes pulse-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          50%      { box-shadow: 0 0 12px 4px rgba(16,185,129,0.2); }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            text-align: center;
          }
          .hero-sphere-wrap {
            order: -1;
            width: 100%;
          }
          .building-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 640px) and (max-width: 900px) {
          .building-grid {
            grid-template-columns: repeat(2,1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
