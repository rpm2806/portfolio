"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const STAR_COLORS = [
  "#ffffff", "#e0f7ff", "#c4e8ff", "#b8d4ff",
  "#d4c4ff", "#ffd4e8", "#22d3ee", "#818cf8",
];

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(false);

  // Watch for .dark class on <html>
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;

    const resize = () => {
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();

    const NUM_STARS = Math.min(Math.floor((width * height) / 8000), 280);
    const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random(),
      size: Math.random() * 1.8 + 0.2,
      opacity: Math.random() * 0.7 + 0.1,
      speed: Math.random() * 0.12 + 0.02,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.018 + 0.006,
    }));

    const nebulas = [
      { x: width * 0.15, y: height * 0.10, r: 320, color: "rgba(34,211,238,0.028)" },
      { x: width * 0.80, y: height * 0.25, r: 280, color: "rgba(129,140,248,0.032)" },
      { x: width * 0.50, y: height * 0.55, r: 350, color: "rgba(244,114,182,0.022)" },
      { x: width * 0.10, y: height * 0.75, r: 260, color: "rgba(52,211,153,0.025)" },
      { x: width * 0.90, y: height * 0.85, r: 300, color: "rgba(34,211,238,0.020)" },
    ];

    const shootingStars: ShootingStar[] = [];

    const spawnShootingStar = () => {
      const angle = (Math.random() * 30 + 15) * (Math.PI / 180);
      const speed = Math.random() * 8 + 6;
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 120 + 60,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 50 + 40,
      });
    };

    const shootInterval = setInterval(() => {
      if (Math.random() < 0.6 && document.documentElement.classList.contains("dark")) {
        spawnShootingStar();
      }
    }, 2800);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const dark = document.documentElement.classList.contains("dark");
      if (!dark) {
        animFrameId = requestAnimationFrame(draw);
        return;
      }

      // Nebulas
      nebulas.forEach(({ x, y, r, color }) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Stars
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.35 + 0.65;
        const alpha = star.opacity * twinkle;

        star.x += star.speed * 0.08;
        if (star.x > width + 2) star.x = -2;

        const size = star.size * (0.5 + star.z * 0.5);

        if (star.opacity > 0.55 && star.size > 1.0) {
          ctx.save();
          ctx.shadowColor = star.color;
          ctx.shadowBlur = size * 6;
          ctx.globalAlpha = alpha * 0.5;
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        s.opacity = 1 - s.life / s.maxLife;
        if (s.life >= s.maxLife) { shootingStars.splice(i, 1); continue; }

        const tailX = s.x - s.vx * (s.length / 12);
        const tailY = s.y - s.vy * (s.length / 12);
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.6, `rgba(200,240,255,${s.opacity * 0.5})`);
        grad.addColorStop(1, `rgba(255,255,255,${s.opacity})`);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#22d3ee";
        ctx.shadowBlur = 8;
        ctx.globalAlpha = s.opacity;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearInterval(shootInterval);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: isDark ? 0.95 : 0,
        transition: "opacity 0.8s ease",
      }}
    />
  );
}
