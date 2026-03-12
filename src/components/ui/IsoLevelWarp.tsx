'use client';

import React, { useRef, useEffect } from 'react';

interface IsoLevelWarpProps extends React.HTMLAttributes<HTMLDivElement> {
  /** RGB values string, e.g. "16, 185, 129". Default: emerald-500 */
  color?: string;
  /** Animation speed multiplier. Default: 1 */
  speed?: number;
  /** Grid density — lower = larger cells. Default: 44 */
  density?: number;
}

const IsoLevelWarp = ({
  className,
  color = '16, 185, 129', // emerald-500
  speed = 0.7,
  density = 44,
  ...props
}: IsoLevelWarpProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    let animationFrameId: number;

    const mouse = { x: -2000, y: -2000, targetX: -2000, targetY: -2000 };
    let time = 0;

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      time += 0.008 * speed;

      const rows = Math.ceil(height / density) + 6;
      const cols = Math.ceil(width / density) + 6;

      // Horizontal lines — topographic contour feel
      ctx.beginPath();
      for (let row = 0; row <= rows; row++) {
        let moved = false;
        for (let col = 0; col <= cols; col++) {
          const baseX = col * density - density * 2;
          const baseY = row * density - density * 2;

          // Layered waves for organic depth
          const wave =
            Math.sin(col * 0.18 + time) * Math.cos(row * 0.14 + time * 0.8) * 14 +
            Math.sin(col * 0.08 - time * 0.6) * 6;

          // Mouse push-up
          const dx = baseX - mouse.x;
          const dy = baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, (280 - dist) / 280);
          const interactionY = -(force * force) * 70;

          const finalX = baseX;
          const finalY = baseY + wave + interactionY;

          if (!moved) {
            ctx.moveTo(finalX, finalY);
            moved = true;
          } else {
            ctx.lineTo(finalX, finalY);
          }
        }
      }

      // Gradient: fades in from left, bright center, fades out to right
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, `rgba(${color}, 0)`);
      grad.addColorStop(0.35, `rgba(${color}, 0.18)`);
      grad.addColorStop(0.65, `rgba(${color}, 0.18)`);
      grad.addColorStop(1, `rgba(${color}, 0)`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, speed, density]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden${className ? ` ${className}` : ''}`}
      {...props}
    >
      <canvas ref={canvasRef} className="block w-full h-full opacity-70" />
      {/* Top fade */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgb(9,9,11) 0%, transparent 100%)' }} />
      {/* Bottom fade */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, rgb(9,9,11) 0%, transparent 100%)' }} />
      {/* Side vignette */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 100% at 50% 50%, transparent 40%, rgba(9,9,11,0.7) 100%)' }} />
    </div>
  );
};

export default IsoLevelWarp;
