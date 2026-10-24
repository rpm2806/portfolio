"use client";

/**
 * AquaSpaceCanvas
 * ─────────────────────────────────────────────────────────────────────
 * Full-page fixed canvas merging deep-sea bioluminescence with cosmic space:
 *  • Deep abyss cosmic gradient with undulating ocean light refractions
 *  • Bioluminescent marine plankton & drifting cosmic stars (twinkling)
 *  • Interactive touch & click water shockwaves (smooth expanding ripples)
 *  • Interactive cursor / touch glowing bio-trail (reacts to movement)
 *  • Aurora curtains (flowing celestial/oceanic wave reflections)
 *  • Cosmic rays / shooting stars
 * 
 * Clean, seamless ambient aesthetic — no rigid or regular polygonal shapes.
 */

import { useEffect, useRef } from "react";

/* ─── Helpers ─────────────────────────────────────────────────────── */
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function randInt(min: number, max: number) {
  return Math.floor(rand(min, max + 1));
}

/* ─── Types ───────────────────────────────────────────────────────── */
interface Plankton {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  alpha: number;
  twinkle: number;
  twinkleSpeed: number;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
  hue: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  alpha: number;
  hue: number;
  life: number;
}

interface MouseTrail {
  x: number;
  y: number;
  r: number;
  alpha: number;
  hue: number;
}

/* ─── Component ───────────────────────────────────────────────────── */
export default function AquaSpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* resize */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Plankton & Stars (reduced by 20%: 280 -> 224) ── */
    const plankton: Plankton[] = Array.from({ length: 224 }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      vx: rand(-0.15, 0.15),
      vy: rand(-0.22, 0.04),
      r: rand(0.5, 2.2),
      hue: rand(170, 310),
      alpha: rand(0.2, 0.75),
      twinkle: rand(0, Math.PI * 2),
      twinkleSpeed: rand(0.012, 0.038),
    }));

    /* ── Interactive Ripples ── */
    const ripples: Ripple[] = [];

    /* ── Shooting Stars / Cosmic Rays ── */
    const shootingStars: ShootingStar[] = [];
    let nextShoot = 60;

    /* ── Mouse / Touch Trail ── */
    const trail: MouseTrail[] = [];
    const pointer = { x: -999, y: -999, hue: 190, active: false };

    /* Spawn expanding water ripple on touch/click */
    const spawnRipple = (x: number, y: number) => {
      const baseHue = rand(175, 290);
      const maxR = rand(100, 200);
      // Outer ripple
      ripples.push({ x, y, r: 0, maxR, alpha: 0.7, hue: baseHue });
      // Inner delay ripples for concentric water effect
      ripples.push({ x, y, r: 0, maxR: maxR * 0.65, alpha: 0.45, hue: (baseHue + 20) % 360 });
      ripples.push({ x, y, r: 0, maxR: maxR * 0.35, alpha: 0.3, hue: (baseHue + 40) % 360 });
    };

    /* Event handlers */
    const onPointerMove = (e: MouseEvent | Touch) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      pointer.hue = (pointer.hue + 0.4) % 360;
      trail.push({
        x: e.clientX,
        y: e.clientY,
        r: rand(2, 4.5),
        alpha: 0.6,
        hue: pointer.hue,
      });
      if (trail.length > 70) trail.shift();
    };

    const handleMouseMove = (e: MouseEvent) => onPointerMove(e);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) onPointerMove(e.touches[0]);
    };

    const handlePointerDown = (e: PointerEvent) => {
      spawnRipple(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      Array.from(e.touches).forEach((t) => spawnRipple(t.clientX, t.clientY));
    };

    // Attach to window so clicks & touch are detected over any page content
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    /* ── Draw celestial/oceanic aurora curtains ── */
    function drawAurora(t: number) {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;

      for (let layer = 0; layer < 3; layer++) {
        const hue = 175 + layer * 45 + Math.sin(t * 0.003 + layer) * 20;
        const grad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
        grad.addColorStop(0, `hsla(${hue}, 85%, 60%, ${0.05 - layer * 0.012})`);
        grad.addColorStop(0.5, `hsla(${hue + 25}, 75%, 50%, 0.018)`);
        grad.addColorStop(1, "transparent");

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const steps = 24;
        for (let s = 0; s <= steps; s++) {
          const sx = (s / steps) * w;
          const sy = Math.sin((s / steps) * Math.PI * 3 + t * 0.004 + layer * 1.1) * 35
                   + Math.cos((s / steps) * Math.PI * 2 + t * 0.006) * 18;
          ctx.lineTo(sx, sy + h * 0.12 + layer * 16);
        }
        ctx.lineTo(w, 0);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }
    }

    /* ─── Main animation loop ─────────────────────────────────────── */
    let raf: number;
    let frame = 0;

    const draw = () => {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      frame++;

      /* Lighter luminous cosmic navy background */
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0,   "#091836");
      bg.addColorStop(0.35, "#0d2348");
      bg.addColorStop(0.7, "#0b1c3c");
      bg.addColorStop(1,   "#0c1630");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      /* Aurora curtains */
      drawAurora(frame);

      /* Twinkling Plankton & Stars */
      plankton.forEach((p) => {
        p.x += p.vx + Math.sin(frame * 0.005 + p.twinkle) * 0.08;
        p.y += p.vy;
        p.twinkle += p.twinkleSpeed;
        if (p.y < -5) { p.y = h + 5; p.x = rand(0, w); }
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;

        const a = p.alpha * (0.45 + Math.sin(p.twinkle) * 0.55);
        ctx.save();
        ctx.globalAlpha = a;
        ctx.shadowColor = `hsl(${p.hue}, 100%, 70%)`;
        ctx.shadowBlur = p.r > 1.4 ? 7 : 2;
        ctx.fillStyle = `hsl(${p.hue}, 90%, 75%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      /* Interactive Glowing Mouse/Touch Trail */
      trail.forEach((dot, i) => {
        dot.alpha *= 0.93;
        dot.r *= 0.98;
        ctx.save();
        ctx.globalAlpha = dot.alpha;
        ctx.shadowColor = `hsl(${dot.hue}, 100%, 70%)`;
        ctx.shadowBlur = 10;
        ctx.fillStyle = `hsl(${dot.hue}, 100%, 75%)`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        if (dot.alpha < 0.015) trail.splice(i, 1);
      });

      /* Interactive Water Ripples on Click / Touch */
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += (rp.maxR - rp.r) * 0.045 + 1.2;
        rp.alpha *= 0.955;
        if (rp.alpha < 0.01 || rp.r > rp.maxR) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = rp.alpha;
        ctx.strokeStyle = `hsl(${rp.hue}, 100%, 72%)`;
        ctx.shadowColor  = `hsl(${rp.hue}, 100%, 70%)`;
        ctx.shadowBlur   = 14;
        ctx.lineWidth    = 1.5;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      /* Shooting Stars / Cosmic Rays */
      if (frame > nextShoot) {
        nextShoot = frame + randInt(110, 260);
        const fromTop = Math.random() > 0.5;
        shootingStars.push({
          x: fromTop ? rand(0, w) : rand(-40, 0),
          y: fromTop ? rand(-40, 0) : rand(0, h * 0.45),
          vx: rand(4.5, 9),
          vy: fromTop ? rand(2, 5.5) : rand(-0.5, 2.5),
          len: rand(70, 150),
          alpha: 0.85,
          hue: rand(175, 290),
          life: rand(30, 55),
        });
      }
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.alpha *= 0.965;
        ss.life--;
        if (ss.life <= 0 || ss.alpha < 0.02) {
          shootingStars.splice(i, 1);
          continue;
        }

        const hyp = Math.hypot(ss.vx, ss.vy);
        const tailX = ss.x - (ss.vx / hyp) * ss.len;
        const tailY = ss.y - (ss.vy / hyp) * ss.len;
        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, `hsla(${ss.hue}, 100%, 80%, ${ss.alpha})`);

        ctx.save();
        ctx.shadowColor = `hsl(${ss.hue}, 100%, 70%)`;
        ctx.shadowBlur  = 10;
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        // Bright leading comet spark
        ctx.globalAlpha = ss.alpha;
        ctx.fillStyle   = `hsl(${ss.hue}, 100%, 92%)`;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      /* Subtle bioluminescent cursor follow */
      if (pointer.active && pointer.x > 0 && pointer.y > 0) {
        const cHue = 180 + (frame * 0.4) % 130;
        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = `hsl(${cHue}, 100%, 82%)`;
        ctx.shadowColor = `hsl(${cHue}, 100%, 70%)`;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = `hsl(${cHue}, 100%, 72%)`;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("touchstart", handleTouchStart);
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
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
