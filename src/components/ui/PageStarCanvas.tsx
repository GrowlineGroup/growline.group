'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number;
  r: number; opacity: number;
  speed: number; phase: number;
  color: string;
}

interface ShootingStar {
  x: number; y: number;
  vx: number; vy: number;
  trailLen: number;
  life: number;
  maxLife: number;
  width: number;
}

const COLORS = [
  'rgba(52,211,153,',
  'rgba(110,231,183,',
  'rgba(255,255,255,',
  'rgba(255,255,255,',
  'rgba(255,255,255,',
];

function spawnShooter(w: number, h: number): ShootingStar {
  // Spawn from top edge or top-right area, fly diagonally downward
  const angle = (Math.PI / 5) + (Math.random() - 0.5) * (Math.PI / 6); // ~36° ± 15° below horizontal
  const speed = 10 + Math.random() * 8;
  const dir = Math.random() > 0.4 ? -1 : 1; // mostly left-to-right
  return {
    x: dir === -1 ? w * (0.5 + Math.random() * 0.6) : w * Math.random() * 0.5,
    y: Math.random() * h * 0.45,
    vx: Math.cos(angle) * speed * dir,
    vy: Math.sin(angle) * speed,
    trailLen: 90 + Math.random() * 110,
    life: 0,
    maxLife: 55 + Math.random() * 35,
    width: 1.2 + Math.random() * 1,
  };
}

export function PageStarCanvas() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const rafRef      = useRef<number>(0);
  const starsRef    = useRef<Star[]>([]);
  const shootersRef = useRef<ShootingStar[]>([]);
  const nextSpawnRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const parent = canvas.parentElement!;

    const build = (w: number, h: number) => {
      starsRef.current = Array.from({ length: Math.floor((w * h) / 7000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        opacity: Math.random() * 0.45 + 0.1,
        speed: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width  = width;
      canvas.height = height;
      build(width, height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    // First shooting star after 4-10s
    nextSpawnRef.current = 240 + Math.random() * 360;

    let frame = 0;
    let t = 0;
    const draw = () => {
      t += 0.016;
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // ── Static stars ──
      for (const s of starsRef.current) {
        const a = s.opacity * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${a.toFixed(3)})`;
        ctx.fill();
      }

      // ── Spawn shooting stars (every 5-14s) ──
      if (frame >= nextSpawnRef.current) {
        shootersRef.current.push(spawnShooter(w, h));
        nextSpawnRef.current = frame + 300 + Math.random() * 540;
      }

      // ── Draw & advance shooting stars ──
      shootersRef.current = shootersRef.current.filter((s) => s.life <= s.maxLife);
      for (const s of shootersRef.current) {
        s.life++;
        s.x += s.vx;
        s.y += s.vy;

        const progress = s.life / s.maxLife;
        // Opacity: fast ramp-up, long hold, fade at end
        const opacity = progress < 0.15
          ? progress / 0.15
          : progress > 0.7
            ? 1 - (progress - 0.7) / 0.3
            : 1;

        const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        const nx = s.vx / speed;
        const ny = s.vy / speed;
        const tailX = s.x - nx * s.trailLen;
        const tailY = s.y - ny * s.trailLen;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(200,240,255,${(opacity * 0.3).toFixed(3)})`);
        grad.addColorStop(1, `rgba(255,255,255,${(opacity * 0.9).toFixed(3)})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright head glow
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.width * 3);
        glow.addColorStop(0, `rgba(255,255,255,${(opacity * 0.9).toFixed(3)})`);
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
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
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
