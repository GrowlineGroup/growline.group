'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  speed: number;
  phase: number;
  color: string;
}

const EMERALD_COLORS = [
  'rgba(52,211,153,',
  'rgba(110,231,183,',
  'rgba(167,243,208,',
  'rgba(255,255,255,',
  'rgba(255,255,255,',
  'rgba(255,255,255,',
];

interface StarBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  /** px² per star — higher = sparser. Default 2800 */
  density?: number;
  /** Enable mouse repulsion. Default true */
  interactive?: boolean;
  /** Canvas opacity. Default 1 */
  opacity?: number;
  /** Twinkle speed multiplier — lower = slower. Default 1 */
  twinkleSpeed?: number;
}

export function StarBackground({
  children,
  className = '',
  density = 2800,
  interactive = true,
  opacity = 1,
  twinkleSpeed = 1,
}: StarBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const starsRef  = useRef<Star[]>([]);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement!;

    const buildStars = (w: number, h: number) => {
      const count = Math.floor((w * h) / density);
      starsRef.current = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x, y, ox: x, oy: y,
          vx: 0, vy: 0,
          r:       Math.random() * 1.5 + 0.2,
          opacity: Math.random() * 0.6 + 0.2,
          speed:   Math.random() * 0.7 + 0.2,
          phase:   Math.random() * Math.PI * 2,
          color:   EMERALD_COLORS[Math.floor(Math.random() * EMERALD_COLORS.length)],
        };
      });
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

    let onMouseMove: ((e: MouseEvent) => void) | undefined;
    let onMouseLeave: (() => void) | undefined;

    if (interactive) {
      onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      };
      onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
      parent.addEventListener('mousemove', onMouseMove);
      parent.addEventListener('mouseleave', onMouseLeave);
    }

    let t = 0;
    const tStep = 0.016 * twinkleSpeed;
    const REPEL_RADIUS = 90;
    const REPEL_FORCE  = 0.38;
    const FRICTION     = 0.88;
    const RETURN       = 0.06;

    const draw = () => {
      t += tStep;
      const { width, height } = canvas;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, width, height);

      for (const star of starsRef.current) {
        if (interactive) {
          const dx = star.x - mx;
          const dy = star.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
            star.vx += (dx / dist) * force * REPEL_FORCE * (star.r + 0.5);
            star.vy += (dy / dist) * force * REPEL_FORCE * (star.r + 0.5);
          }
          star.vx += (star.ox - star.x) * RETURN;
          star.vy += (star.oy - star.y) * RETURN;
          star.vx *= FRICTION;
          star.vy *= FRICTION;
          star.x  += star.vx;
          star.y  += star.vy;
        }

        const mx2 = mouseRef.current.x;
        const my2 = mouseRef.current.y;
        const pdx = star.x - mx2;
        const pdy = star.y - my2;
        const proximity = Math.max(0, 1 - Math.sqrt(pdx * pdx + pdy * pdy) / REPEL_RADIUS);

        const baseTwinkle = star.opacity * (0.5 + 0.5 * Math.sin(t * star.speed + star.phase));
        const twinkle = Math.min(1, baseTwinkle + proximity * 0.5);
        const topFade = Math.min(1, star.oy / (height * 0.2));
        const finalAlpha = twinkle * topFade;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${finalAlpha.toFixed(3)})`;
        ctx.fill();

        const glowSize = star.r * (4 + proximity * 6);
        if (star.r > 0.9 || proximity > 0.1) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowSize);
          glow.addColorStop(0, `${star.color}${(finalAlpha * (0.4 + proximity * 0.4)).toFixed(3)})`);
          glow.addColorStop(1, `${star.color}0)`);
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
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
      if (onMouseMove)  parent.removeEventListener('mousemove', onMouseMove);
      if (onMouseLeave) parent.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [density, interactive, twinkleSpeed]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full"
        style={{ opacity }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
