'use client';

import { useEffect, useRef } from 'react';

export function AuroraGlow({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const parent = canvas.parentElement!;

    let w = 0, h = 0;
    const resize = () => {
      const r = parent.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w; canvas.height = h;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    let t = 0;
    const BLOBS = [
      { ox: 0.3, oy: 0.4, color: '16,185,129' },
      { ox: 0.7, oy: 0.5, color: '20,184,166' },
      { ox: 0.5, oy: 0.7, color: '52,211,153' },
    ];

    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, w, h);
      for (const b of BLOBS) {
        const x = (b.ox + Math.sin(t * 0.7 + b.ox * 10) * 0.18) * w;
        const y = (b.oy + Math.cos(t * 0.5 + b.oy * 8)  * 0.15) * h;
        const r = Math.min(w, h) * (0.45 + Math.sin(t + b.ox * 5) * 0.05);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${b.color},0.18)`);
        g.addColorStop(1, `rgba(${b.color},0)`);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 w-full h-full" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
