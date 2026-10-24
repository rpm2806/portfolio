"use client";

import { useState, useEffect } from "react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    setAnimating(true);
    onToggle();
    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      title={isDark ? "Switch to day mode ☀️" : "Switch to night mode 🌙"}
      style={{
        position: "relative",
        width: "48px",
        height: "28px",
        borderRadius: "999px",
        border: `1.5px solid ${isDark ? "rgba(129,140,248,0.5)" : "rgba(251,191,36,0.6)"}`,
        background: isDark
          ? "linear-gradient(135deg, #0f172a, #1e1b4b)"
          : "linear-gradient(135deg, #fef3c7, #fed7aa)",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        transition: "all 0.4s ease",
        boxShadow: isDark
          ? "0 0 12px rgba(129,140,248,0.25), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 0 12px rgba(251,191,36,0.35), inset 0 1px 0 rgba(255,255,255,0.5)",
        flexShrink: 0,
      }}
    >
      {/* Track stars (night) or clouds (day) */}
      {isDark ? (
        <>
          <span style={{ position: "absolute", top: "5px", left: "7px", width: "2px", height: "2px", borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
          <span style={{ position: "absolute", top: "14px", left: "12px", width: "1.5px", height: "1.5px", borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
          <span style={{ position: "absolute", top: "8px", left: "18px", width: "1px", height: "1px", borderRadius: "50%", background: "rgba(255,255,255,0.6)" }} />
        </>
      ) : (
        <>
          <span style={{ position: "absolute", top: "6px", right: "8px", width: "6px", height: "3px", borderRadius: "999px", background: "rgba(255,255,255,0.7)" }} />
          <span style={{ position: "absolute", bottom: "7px", right: "6px", width: "4px", height: "2px", borderRadius: "999px", background: "rgba(255,255,255,0.5)" }} />
        </>
      )}

      {/* Sliding thumb */}
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: isDark ? "calc(100% - 25px)" : "3px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          transition: "left 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: animating ? "scale(0.85)" : "scale(1)",
          background: isDark
            ? "linear-gradient(135deg, #c7d2fe, #a5b4fc)"
            : "linear-gradient(135deg, #fbbf24, #f59e0b)",
          boxShadow: isDark
            ? "0 0 8px rgba(165,180,252,0.6), 0 2px 6px rgba(0,0,0,0.4)"
            : "0 0 12px rgba(251,191,36,0.8), 0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        {isDark ? <MoonSVG /> : <SunSVG />}
      </span>
    </button>
  );
}

function SunSVG() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.5" fill="#fff" opacity="0.95" />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="12"
          x2={12 + 8.5 * Math.cos((deg * Math.PI) / 180)}
          y2={12 + 8.5 * Math.sin((deg * Math.PI) / 180)}
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
      ))}
    </svg>
  );
}

function MoonSVG() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      {/* Crescent */}
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        fill="#fff"
        opacity="0.95"
      />
      {/* Craters */}
      <circle cx="14" cy="8" r="1" fill="rgba(165,180,252,0.5)" />
      <circle cx="17" cy="13" r="0.6" fill="rgba(165,180,252,0.4)" />
    </svg>
  );
}
