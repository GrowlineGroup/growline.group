'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  size: number;
  color: string;
}

const COLORS = ['#10b981', '#14b8a6', '#6ee7b7', '#34d399'];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function makeParticle(w: number, h: number): Particle {
  return {
    x: rand(0, w),
    y: rand(0, h),
    vx: rand(-0.15, 0.15),
    vy: rand(-0.35, -0.1),
    alpha: 0,
    targetAlpha: rand(0.08, 0.26),
    size: rand(0.6, 1.8),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export function SparklesCore({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const safeCtx = ctx;

    let animId: number;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    function resize() {
      w = canvas!.offsetWidth;
      h = canvas!.offsetHeight;
      canvas!.width = w;
      canvas!.height = h;
    }

    function init() {
      const count = Math.min(65, Math.round((w * h) / 9500));
      particles = Array.from({ length: count }, () => {
        const p = makeParticle(w, h);
        p.alpha = rand(0, p.targetAlpha); // scatter on init
        return p;
      });
    }

    function draw() {
      safeCtx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Smooth alpha toward target
        p.alpha += (p.targetAlpha - p.alpha) * 0.035;
        // Subtle flicker
        p.targetAlpha += rand(-0.003, 0.003);
        p.targetAlpha = Math.max(0.04, Math.min(0.28, p.targetAlpha));

        safeCtx.globalAlpha = p.alpha;
        safeCtx.fillStyle = p.color;
        safeCtx.beginPath();
        safeCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        safeCtx.fill();

        p.x += p.vx;
        p.y += p.vy;

        // Wrap horizontally, respawn at bottom when off top
        if (p.y < -4) {
          Object.assign(p, makeParticle(w, h));
          p.y = h + 4;
          p.alpha = 0;
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
      }

      safeCtx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
