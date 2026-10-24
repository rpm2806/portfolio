"use client";

import { useEffect, useRef } from "react";

/*
  MorphingBlobs — animated organic blob shapes that float & morph across the full page.
  Rendered on a fixed canvas so they appear behind all sections.
  Each blob:
    - moves slowly on a Lissajous-like path
    - morphs its border-radius independently via SVG path animation
    - pulses in size
*/

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: [number, number, number];   // RGB
  alpha: number;
  phase: number;
  phaseSpeed: number;
  morphPhase: number;
  morphSpeed: number;
  sizeBase: number;
  sizeAmp: number;
  lissA: number;
  lissB: number;
  lissPhaseX: number;
  lissPhaseY: number;
  lissSpeedX: number;
  lissSpeedY: number;
  lissAmpX: number;
  lissAmpY: number;
  cx: number;   // centre of Lissajous path
  cy: number;
}

function makeBlob(w: number, h: number): Blob {
  const colors: [number, number, number][] = [
    [34, 211, 238],   // cyan
    [129, 140, 248],  // indigo
    [244, 114, 182],  // pink
    [52, 211, 153],   // green
    [251, 191, 36],   // amber
    [99, 102, 241],   // violet
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const cx = w * (0.1 + Math.random() * 0.8);
  const cy = h * (0.1 + Math.random() * 0.8);
  return {
    x: cx, y: cy, vx: 0, vy: 0,
    r: 0,
    color,
    alpha: 0.04 + Math.random() * 0.07,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.003 + Math.random() * 0.005,
    morphPhase: Math.random() * Math.PI * 2,
    morphSpeed: 0.006 + Math.random() * 0.01,
    sizeBase: 140 + Math.random() * 180,
    sizeAmp: 30 + Math.random() * 60,
    lissA: 2 + Math.floor(Math.random() * 3),
    lissB: 1 + Math.floor(Math.random() * 3),
    lissPhaseX: Math.random() * Math.PI * 2,
    lissPhaseY: Math.random() * Math.PI * 2,
    lissSpeedX: (0.0003 + Math.random() * 0.0006) * (Math.random() < 0.5 ? 1 : -1),
    lissSpeedY: (0.0002 + Math.random() * 0.0005) * (Math.random() < 0.5 ? 1 : -1),
    lissAmpX: w * (0.12 + Math.random() * 0.18),
    lissAmpY: h * (0.08 + Math.random() * 0.14),
    cx, cy,
  };
}

/* Draw a morphing organic blob using a closed Bezier path */
function drawMorphBlob(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  r: number,
  morphPhase: number,
  color: [number, number, number],
  alpha: number,
) {
  const points = 6;
  const angleStep = (Math.PI * 2) / points;
  const cp: { x: number; y: number; r: number }[] = [];

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep;
    // Each point radius varies with morphPhase
    const rr = r * (0.72 + 0.28 * Math.sin(morphPhase + i * 1.3));
    cp.push({ x: x + Math.cos(angle) * rr, y: y + Math.sin(angle) * rr, r: rr });
  }

  ctx.beginPath();
  for (let i = 0; i < points; i++) {
    const curr = cp[i];
    const next = cp[(i + 1) % points];
    const mid = {
      x: (curr.x + next.x) / 2,
      y: (curr.y + next.y) / 2,
    };
    if (i === 0) ctx.moveTo(mid.x, mid.y);
    ctx.quadraticCurveTo(next.x, next.y,
      (next.x + cp[(i + 2) % points].x) / 2,
      (next.y + cp[(i + 2) % points].y) / 2);
  }
  ctx.closePath();

  const [R, G, B] = color;
  const grad = ctx.createRadialGradient(x - r * 0.2, y - r * 0.2, 0, x, y, r * 1.2);
  grad.addColorStop(0, `rgba(${R},${G},${B},${alpha})`);
  grad.addColorStop(0.6, `rgba(${R},${G},${B},${alpha * 0.5})`);
  grad.addColorStop(1, `rgba(${R},${G},${B},0)`);
  ctx.fillStyle = grad;
  ctx.fill();
}

export default function MorphingBlobs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = window.innerWidth;
    let h = document.documentElement.scrollHeight;

    const resize = () => {
      w = window.innerWidth;
      h = document.documentElement.scrollHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();

    // Create 7 blobs spread across the full page
    const blobs: Blob[] = Array.from({ length: 7 }, () => makeBlob(w, h));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      blobs.forEach((b) => {
        // Lissajous-based slow drift
        b.lissPhaseX += b.lissSpeedX;
        b.lissPhaseY += b.lissSpeedY;
        b.x = b.cx + Math.sin(b.lissA * b.lissPhaseX) * b.lissAmpX;
        b.y = b.cy + Math.sin(b.lissB * b.lissPhaseY) * b.lissAmpY;

        // Pulsing size
        b.phase += b.phaseSpeed;
        b.morphPhase += b.morphSpeed;
        b.r = b.sizeBase + Math.sin(b.phase) * b.sizeAmp;

        // Draw with blur (multiple passes at lower alpha for soft glow)
        ctx.filter = "blur(48px)";
        drawMorphBlob(ctx, b.x, b.y, b.r, b.morphPhase, b.color, b.alpha);
        ctx.filter = "blur(24px)";
        drawMorphBlob(ctx, b.x, b.y, b.r * 0.55, b.morphPhase + 1.2, b.color, b.alpha * 0.6);
        ctx.filter = "none";
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        mixBlendMode: "screen",
        opacity: 0.85,
      }}
    />
  );
}
