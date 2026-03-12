'use client';

import { useEffect, useRef } from 'react';

interface Particle { x: number; y: number; speed: number; size: number; alpha: number; lane: number; }

export function ParticleFlow({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const parent = canvas.parentElement!;

    let w = 0, h = 0;
    const particles: Particle[] = [];
    const LANES = 8;

    const resize = () => {
      const r = parent.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w; canvas.height = h;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    const spawn = () => {
      const lane = Math.floor(Math.random() * LANES);
      particles.push({
        x: -10,
        y: (lane / LANES) * h + (h / LANES) * 0.5 + (Math.random() - 0.5) * 20,
        speed: 0.6 + Math.random() * 1.2,
        size: 1 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.5,
        lane,
      });
    };

    for (let i = 0; i < 40; i++) {
      spawn();
      particles[particles.length - 1].x = Math.random() * w;
    }

    const spawnInterval = setInterval(spawn, 180);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Lane guide lines
      for (let l = 0; l < LANES; l++) {
        const y = (l / LANES) * h + (h / LANES) * 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(w, y);
        ctx.strokeStyle = 'rgba(52,211,153,0.04)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speed;

        // Trail
        const grad = ctx.createLinearGradient(p.x - p.size * 12, p.y, p.x, p.y);
        grad.addColorStop(0, `rgba(16,185,129,0)`);
        grad.addColorStop(1, `rgba(52,211,153,${(p.alpha * 0.4).toFixed(3)})`);
        ctx.beginPath();
        ctx.moveTo(p.x - p.size * 12, p.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = p.size * 0.6;
        ctx.stroke();

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110,231,183,${p.alpha.toFixed(3)})`;
        ctx.fill();

        if (p.x > w + 20) particles.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); clearInterval(spawnInterval); ro.disconnect(); };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 w-full h-full" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
