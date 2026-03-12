'use client';

import { useEffect, useRef } from 'react';

export function CountdownGrid({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const parent = canvas.parentElement!;

    let w = 0, h = 0;
    const CELL = 48;
    const flashes: Map<string, number> = new Map();

    const resize = () => {
      const r = parent.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w; canvas.height = h;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    const spawnFlash = () => {
      const cols = Math.floor(w / CELL);
      const rows = Math.floor(h / CELL);
      const key = `${Math.floor(Math.random() * cols)},${Math.floor(Math.random() * rows)}`;
      flashes.set(key, 1.0);
    };

    const flashInterval = setInterval(spawnFlash, 120);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / CELL) + 1;
      const rows = Math.ceil(h / CELL) + 1;

      // Grid lines
      ctx.strokeStyle = 'rgba(52,211,153,0.07)';
      ctx.lineWidth = 0.5;
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, h); ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(w, r * CELL); ctx.stroke();
      }

      // Flashing cells
      for (const [key, alpha] of flashes) {
        const [c, r] = key.split(',').map(Number);
        ctx.fillStyle = `rgba(16,185,129,${(alpha * 0.15).toFixed(3)})`;
        ctx.fillRect(c * CELL + 0.5, r * CELL + 0.5, CELL - 1, CELL - 1);
        const newAlpha = alpha - 0.018;
        if (newAlpha <= 0) flashes.delete(key);
        else flashes.set(key, newAlpha);
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); clearInterval(flashInterval); ro.disconnect(); };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 w-full h-full" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
