'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Beam {
  x: number;
  y: number;
  speed: number;
  width: number;
  length: number;
  opacity: number;
  hue: number; // offset for color variation
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  hue: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function makeBeam(w: number): Beam {
  return {
    x: rand(0, w),
    y: rand(-300, 0),
    speed: rand(1.2, 2.8),
    width: rand(1, 3),
    length: rand(80, 180),
    opacity: rand(0.5, 1),
    hue: rand(-20, 20),
  };
}

function makeExplosion(x: number, y: number, count: number): Particle[] {
  return Array.from({ length: count }, () => {
    const angle = rand(Math.PI, 2 * Math.PI); // fan upward
    const speed = rand(0.5, 3.5);
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: rand(0.6, 1),
      size: rand(1, 3.5),
      hue: rand(-30, 30),
    };
  });
}

export function BackgroundBeamsWithCollision({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const beamsRef = useRef<Beam[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  const init = useCallback((w: number, h: number) => {
    beamsRef.current = Array.from({ length: 14 }, () => makeBeam(w));
    // stagger start positions
    beamsRef.current.forEach((b, i) => {
      b.y = rand(-h * 1.2, 0) - i * (h / 14) * 0.6;
    });
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      canvas.width = width;
      canvas.height = height;
      init(width, height);
    });
    resizeObserver.observe(canvas.parentElement!);

    const { width, height } = canvas.parentElement!.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    init(width, height);

    function draw() {
      rafRef.current = requestAnimationFrame(draw);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const h = canvas!.height;
      const w = canvas!.width;
      const floorY = h - 1;

      // Draw beams
      beamsRef.current.forEach((beam) => {
        beam.y += beam.speed;

        // Gradient along beam (tail → head)
        const grad = ctx!.createLinearGradient(beam.x, beam.y - beam.length, beam.x, beam.y);
        grad.addColorStop(0, `rgba(16, 185, 129, 0)`);
        grad.addColorStop(0.6, `rgba(52, 211, 153, ${beam.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(110, 231, 183, ${beam.opacity})`);

        ctx!.save();
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = beam.width;
        ctx!.beginPath();
        ctx!.moveTo(beam.x, beam.y - beam.length);
        ctx!.lineTo(beam.x, beam.y);
        ctx!.stroke();
        ctx!.restore();

        // Collision: beam head reached floor
        if (beam.y >= floorY) {
          // Spawn explosion
          const burst = makeExplosion(beam.x, floorY, Math.floor(rand(8, 18)));
          particlesRef.current.push(...burst);
          // Reset beam from top
          Object.assign(beam, makeBeam(w));
          beam.y = rand(-200, -50);
        }
      });

      // Draw explosion particles
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.02);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.vx *= 0.98;
        p.alpha -= 0.018;
        p.size *= 0.97;

        ctx!.save();
        ctx!.globalAlpha = Math.max(0, p.alpha);
        ctx!.fillStyle = `rgba(52, 211, 153, 1)`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, Math.max(0.1, p.size), 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      });

      // Floor glow line — subtle
      const floorGrad = ctx!.createLinearGradient(0, floorY - 1, 0, floorY + 2);
      floorGrad.addColorStop(0, 'rgba(52,211,153,0.25)');
      floorGrad.addColorStop(1, 'rgba(52,211,153,0)');
      ctx!.fillStyle = floorGrad;
      ctx!.fillRect(0, floorY - 1, w, 3);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, [init]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
