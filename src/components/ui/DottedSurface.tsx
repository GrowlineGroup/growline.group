'use client';

import { useEffect, useRef } from 'react';

const SEPARATION = 50;
const AMOUNTX   = 110;
const AMOUNTY   = 160;

// Camera position (matches original Three.js setup)
const CAM_Y = 355;
const CAM_Z = 1220;
const F     = 1.732; // 1/tan(30°) — fov 60°

export function DottedSurface({
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

    const resize = () => {
      const r = parent.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width  = w;
      canvas.height = h;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    let count = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const aspect = w / h;
      const halfW  = w / 2;
      const halfH  = h / 2;
      // Focal length in pixels for size attenuation
      const focal  = halfH / Math.tan((30 * Math.PI) / 180);

      // Collect dots with depth for back-to-front sort
      const dots: { sx: number; sy: number; size: number; alpha: number }[] = [];

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const x3 =  ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          const z3 =  iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          const y3 =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;

          // Camera-space
          const ry = y3 - CAM_Y;
          const rz = z3 - CAM_Z; // negative = in front

          if (rz >= -1) continue; // behind or at camera
          const depth = -rz;

          // Perspective project
          const sx = (x3 / depth) * (F / aspect) * halfW + halfW;
          const sy = -(ry  / depth) *  F            * halfH + halfH;

          if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue;

          // Size attenuation (matches Three.js PointsMaterial size:8)
          const size  = Math.max(0.2, (0.7 * focal) / depth);
          // Fade with distance
          const alpha = Math.max(0, Math.min(0.75, 1 - depth / 6000));

          dots.push({ sx, sy, size, alpha });
        }
      }

      // Draw (already ordered back-to-front because iy goes 0→max = far→near)
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.sx, d.sy, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52,211,153,${d.alpha.toFixed(3)})`;
        ctx.fill();
      }

      count += 0.03;
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
