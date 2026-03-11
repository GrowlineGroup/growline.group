'use client';

import { useEffect, useRef, useCallback } from 'react';

const COLORS = [
  'rgba(16,185,129,',   // emerald-500
  'rgba(20,184,166,',   // teal-500
  'rgba(52,211,153,',   // emerald-400
  'rgba(6,182,212,',    // cyan-500
  'rgba(110,231,183,',  // emerald-300
];

interface Balloon {
  x: number;
  y: number;
  radius: number;
  speed: number;
  swayAmp: number;
  swaySpeed: number;
  swayPhase: number;
  colorBase: string;
  alpha: number;
  popping: boolean;
  popProgress: number; // 0 → 1 when popping
  popParticles: PopParticle[];
}

interface PopParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  colorBase: string;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function makeBalloon(w: number, h: number, fromBottom = false): Balloon {
  const radius = rand(14, 32);
  return {
    x: rand(radius, w - radius),
    y: fromBottom ? h + radius * 2 : rand(h * 0.2, h + radius * 2),
    radius,
    speed: rand(0.35, 0.85),
    swayAmp: rand(8, 28),
    swaySpeed: rand(0.4, 0.9),
    swayPhase: rand(0, Math.PI * 2),
    colorBase: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: rand(0.18, 0.42),
    popping: false,
    popProgress: 0,
    popParticles: [],
  };
}

function makePopParticles(balloon: Balloon): PopParticle[] {
  const count = Math.floor(rand(8, 14));
  return Array.from({ length: count }, () => {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(1, 4);
    return {
      x: balloon.x,
      y: balloon.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: rand(0.5, 0.9),
      size: rand(2, 5),
      colorBase: balloon.colorBase,
    };
  });
}

function drawBalloon(ctx: CanvasRenderingContext2D, b: Balloon) {
  const { x, y, radius, colorBase, alpha } = b;

  ctx.save();
  ctx.globalAlpha = alpha;

  // Balloon body
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = `${colorBase}0.9)`;
  ctx.fill();

  // Shine highlight
  ctx.beginPath();
  ctx.arc(x - radius * 0.28, y - radius * 0.3, radius * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.fill();

  // Knot at bottom
  ctx.beginPath();
  ctx.arc(x, y + radius, radius * 0.14, 0, Math.PI * 2);
  ctx.fillStyle = `${colorBase}0.7)`;
  ctx.fill();

  // String
  ctx.beginPath();
  ctx.moveTo(x, y + radius + radius * 0.14);
  ctx.bezierCurveTo(
    x + 6,  y + radius + 20,
    x - 4,  y + radius + 40,
    x + 2,  y + radius + 60
  );
  ctx.strokeStyle = `${colorBase}0.3)`;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.restore();
}

export function BalloonPopBackground({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const balloonsRef = useRef<Balloon[]>([]);
  const tRef = useRef<number>(0);

  const init = useCallback((w: number, h: number) => {
    balloonsRef.current = Array.from({ length: 18 }, () => makeBalloon(w, h, false));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement!;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      canvas.width = width;
      canvas.height = height;
      init(width, height);
    });
    resizeObserver.observe(parent);

    const { width, height } = parent.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    init(width, height);

    function draw() {
      rafRef.current = requestAnimationFrame(draw);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const w = canvas!.width;
      const h = canvas!.height;
      tRef.current += 0.016;
      const t = tRef.current;

      balloonsRef.current = balloonsRef.current.map((b) => {
        if (b.popping) {
          // Advance pop animation
          b.popProgress += 0.06;
          b.popParticles = b.popParticles
            .map((p) => ({
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              vy: p.vy + 0.1,
              alpha: p.alpha - 0.045,
              size: p.size * 0.95,
            }))
            .filter((p) => p.alpha > 0);

          // Draw remaining particles
          b.popParticles.forEach((p) => {
            ctx!.save();
            ctx!.globalAlpha = Math.max(0, p.alpha);
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, Math.max(0.1, p.size), 0, Math.PI * 2);
            ctx!.fillStyle = `${p.colorBase}1)`;
            ctx!.fill();
            ctx!.restore();
          });

          if (b.popProgress >= 1 && b.popParticles.length === 0) {
            return makeBalloon(w, h, true); // respawn from bottom
          }
          return b;
        }

        // Move balloon up with sway
        const newY = b.y - b.speed;
        const swayX = b.x + Math.sin(t * b.swaySpeed + b.swayPhase) * 0.6;

        // Draw balloon
        const drawn = { ...b, x: swayX, y: newY };
        drawBalloon(ctx!, drawn);

        // Pop when it floats above the section
        if (newY + b.radius < -20) {
          return { ...drawn, popping: true, popParticles: makePopParticles(drawn) };
        }

        // Random pop mid-air (occasional)
        if (!b.popping && Math.random() < 0.0003) {
          return { ...drawn, popping: true, popParticles: makePopParticles(drawn) };
        }

        return { ...b, x: swayX, y: newY };
      });
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, [init]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
