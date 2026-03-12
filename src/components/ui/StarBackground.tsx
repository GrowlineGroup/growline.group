'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
  phase: number;
  color: string;
}

const EMERALD_COLORS = [
  'rgba(52,211,153,',   // emerald-400
  'rgba(110,231,183,',  // emerald-300
  'rgba(167,243,208,',  // emerald-200
  'rgba(255,255,255,',  // white
  'rgba(255,255,255,',  // white (more common)
  'rgba(255,255,255,',  // white (most common)
];

export function StarBackground({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const starsRef  = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement!;

    const buildStars = (w: number, h: number) => {
      const count = Math.floor((w * h) / 3000);
      starsRef.current = Array.from({ length: count }, () => ({
        x:       Math.random() * w,
        y:       Math.random() * h,
        r:       Math.random() * 1.4 + 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        speed:   Math.random() * 0.8 + 0.3,
        phase:   Math.random() * Math.PI * 2,
        color:   EMERALD_COLORS[Math.floor(Math.random() * EMERALD_COLORS.length)],
      }));
    };

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width  = width;
      canvas.height = height;
      buildStars(width, height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    let t = 0;
    const draw = () => {
      t += 0.016;
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);

      for (const star of starsRef.current) {
        const twinkle = star.opacity * (0.5 + 0.5 * Math.sin(t * star.speed + star.phase));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${twinkle.toFixed(3)})`;
        ctx.fill();

        // subtle glow for slightly bigger stars
        if (star.r > 1.0) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 4);
          glow.addColorStop(0, `${star.color}${(twinkle * 0.4).toFixed(3)})`);
          glow.addColorStop(1, `${star.color}0)`);
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

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
