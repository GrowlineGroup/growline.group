'use client';

import { useEffect, useRef } from 'react';

interface WavyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
  waveWidth?: number;
  blur?: number;
  speed?: 'slow' | 'fast';
  waveOpacity?: number;
}

// Smooth pseudo-noise via layered sines — no external dependency needed
function noise3(x: number, y: number, t: number) {
  return (
    Math.sin(x * 1.1 + t * 1.7 + y * 0.4) * 0.5 +
    Math.sin(x * 0.6 - t * 1.3 + y * 0.9) * 0.3 +
    Math.sin(x * 2.1 + t * 0.8 - y * 0.3) * 0.2
  );
}

export function WavyBackground({
  children,
  className = '',
  colors = ['#10b981', '#34d399', '#6ee7b7', '#14b8a6', '#2dd4bf'],
  waveWidth = 50,
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
}: WavyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement!;
    const spd = speed === 'fast' ? 0.002 : 0.001;
    let nt = 0;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width  = width;
      canvas.height = height;
      ctx.filter = `blur(${blur}px)`;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    const WAVE_COUNT = 22;

    const draw = () => {
      nt += spd;
      const { width: w, height: h } = canvas;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < WAVE_COUNT; i++) {
        const t = i / WAVE_COUNT;
        ctx.beginPath();
        ctx.lineWidth = 0.7;
        ctx.strokeStyle = colors[i % colors.length];
        ctx.globalAlpha = waveOpacity * (0.3 + 0.7 * t);

        for (let x = 0; x < w; x += 3) {
          const y = noise3(x / 600, 0.3 * i, nt + i * 0.12) * 70;
          if (x === 0) ctx.moveTo(x, y + h * (0.25 + t * 0.5));
          else ctx.lineTo(x, y + h * (0.25 + t * 0.5));
        }
        ctx.stroke();
        ctx.closePath();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [blur, speed, waveOpacity, colors, waveWidth]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 w-full h-full"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
