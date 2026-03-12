'use client';

import { useEffect, useRef } from 'react';

interface Ring {
  r: number;
  maxR: number;
  alpha: number;
  speed: number;
  width: number;
}

export function PulseRings({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const parent = canvas.parentElement!;

    let w = 0, h = 0;
    const rings: Ring[] = [];

    const spawnRing = () => {
      rings.push({
        r:     0,
        maxR:  Math.max(w, h) * 0.65,
        alpha: 0.45,
        speed: 0.5 + Math.random() * 0.4,
        width: 1 + Math.random() * 1.2,
      });
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width  = w;
      canvas.height = h;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    // Stagger initial rings
    for (let i = 0; i < 4; i++) {
      setTimeout(() => spawnRing(), i * 1200);
    }

    // Spawn new ring every 1.2s
    const spawnInterval = setInterval(spawnRing, 1200);

    const cx = () => w / 2;
    const cy = () => h / 2;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r     += ring.speed;
        ring.alpha  = 0.45 * (1 - ring.r / ring.maxR);

        if (ring.alpha <= 0 || ring.r >= ring.maxR) {
          rings.splice(i, 1);
          continue;
        }

        // Outer glow
        const glow = ctx.createRadialGradient(cx(), cy(), Math.max(0, ring.r - 6), cx(), cy(), ring.r + 6);
        glow.addColorStop(0,   `rgba(16,185,129,0)`);
        glow.addColorStop(0.5, `rgba(16,185,129,${(ring.alpha * 0.35).toFixed(3)})`);
        glow.addColorStop(1,   `rgba(16,185,129,0)`);

        ctx.beginPath();
        ctx.arc(cx(), cy(), ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = glow;
        ctx.lineWidth   = ring.width + 8;
        ctx.stroke();

        // Crisp ring line
        ctx.beginPath();
        ctx.arc(cx(), cy(), ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(52,211,153,${ring.alpha.toFixed(3)})`;
        ctx.lineWidth   = ring.width;
        ctx.stroke();
      }

      // Center dot
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.003);
      const dotGlow = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), 28);
      dotGlow.addColorStop(0,   `rgba(52,211,153,${(0.3 * pulse).toFixed(3)})`);
      dotGlow.addColorStop(1,   'rgba(52,211,153,0)');
      ctx.beginPath();
      ctx.arc(cx(), cy(), 28, 0, Math.PI * 2);
      ctx.fillStyle = dotGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx(), cy(), 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(110,231,183,${(0.7 + 0.3 * pulse).toFixed(3)})`;
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(spawnInterval);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full"
      />
      {/* Edge fades so rings dissolve rather than hard-clip */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent z-[1]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-[1]" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-[1]" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-[1]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
