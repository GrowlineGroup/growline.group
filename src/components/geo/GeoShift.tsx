'use client';

import { useRef, useState, useCallback } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import IsoLevelWarp from '@/components/ui/IsoLevelWarp';

interface GeoShiftProps {
  eyebrow: string;
  headline: string;
  body: string;
}

const LOGOS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    color: '#10a37f',
    pos: { x: 6, y: 14 },
    depth: 28,
    rotate: -8,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
      </svg>
    ),
  },
  {
    id: 'gemini',
    name: 'Gemini',
    color: '#4285f4',
    pos: { x: 80, y: 10 },
    depth: 38,
    rotate: 10,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12"/>
      </svg>
    ),
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    color: '#20b2aa',
    pos: { x: 74, y: 66 },
    depth: 22,
    rotate: -5,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M22.026 8.418h-7.344l5.29-5.29-1.061-1.06-5.911 5.91V1.01h-1.5v6.968L5.59 2.068 4.528 3.128l5.29 5.29H2.474v1.5h6.146l-6.146 5.6v2.046h1.5v-1.296l5.526-5.04v6.766h1.5v-6.766l5.526 5.04v1.296h1.5v-2.046l-6.146-5.6h6.146z"/>
      </svg>
    ),
  },
  {
    id: 'claude',
    name: 'Claude',
    color: '#d97757',
    pos: { x: 8, y: 68 },
    depth: 32,
    rotate: 12,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128-1.048-.204-3.352-1.02-2.456-1.814-.976-2.306.532-2.436 1.96-1.56 2.856-.204 2.232.94 3.12 3.224.588-.202.06-.323L12.29 4.95l-.414-2.812L13.27.596l2.248-.572 2.136.88 1.176 2.336-.518 2.298-1.784 1.338-3.212.588-.052.43 2.89 3.148.664 2.882-.61 2.556-2.248 1.53-2.684.022-2.408-1.508-.398-1.024-2.408 1.366-2.782-.11-2.01-1.414-.618-2.442.624-2.118 1.882-1.146h.004z"/>
      </svg>
    ),
  },
  {
    id: 'copilot',
    name: 'Copilot',
    color: '#0078d4',
    pos: { x: 50, y: 5 },
    depth: 16,
    rotate: -3,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-1 3v2H9v2h2v2H9v2h2v2h2v-2h2v-2h-2v-2h2V9h-2V7h-2z"/>
      </svg>
    ),
  },
  {
    id: 'meta',
    name: 'Meta AI',
    color: '#0668E1',
    pos: { x: 87, y: 44 },
    depth: 42,
    rotate: 7,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 2.062-.37 2.763-1.065.303-.292.547-.644.74-1.052.196-.41.32-.876.415-1.398.093-.528.144-1.081.144-1.67 0-2.916-.655-5.48-1.913-7.286-1.246-1.79-3.032-2.96-5.22-2.96-1.07 0-2.09.4-3.006 1.04-.61.424-1.15.938-1.595 1.453A4.92 4.92 0 0 0 9.28 5.5C8.247 4.548 7.137 4.03 6.915 4.03zm-.056 2.112c.406 0 .975.274 1.59.914.346.36.696.82 1.024 1.371a20.596 20.596 0 0 0-1.18 2.08 13.39 13.39 0 0 0-.96 2.913c-.814-1.326-1.48-2.42-1.9-3.127-.405-.68-.623-1.165-.623-1.669 0-.87.527-2.482 2.049-2.482zm8.979.307c1.578 0 2.858.868 3.793 2.29.94 1.43 1.485 3.558 1.485 6.154 0 .912-.098 1.553-.26 1.978-.16.423-.367.633-.617.633-.236 0-.712-.14-1.397-.82-.549-.55-1.302-1.624-2.077-2.906L15.3 11.4a38.836 38.836 0 0 0-.97-1.56 13.528 13.528 0 0 1 1.121-2.299c.49-.763.98-1.092 1.387-1.092zM8.698 11.45l-.15.275c-1.393 2.575-2.355 4.143-2.946 5.035-.593.898-.989 1.141-1.373 1.141-.375 0-.887-.271-1.227-.866a4.83 4.83 0 0 1-.384-2.586c.16-2.062.739-4.015 1.727-5.417.373-.533.776-.905 1.16-1.098L8.698 11.45z"/>
      </svg>
    ),
  },
];

// Pre-defined scatter offsets per logo when any other logo is hovered.
// Each entry: [scatterX, scatterY] in px — gives each logo a unique "jump" direction.
const SCATTER: Record<string, [number, number]> = {
  chatgpt:    [-18, -12],
  gemini:     [ 16, -14],
  perplexity: [ 14,  16],
  claude:     [-16,  18],
  copilot:    [  6, -20],
  meta:       [ 20,   8],
};

export function GeoShift({ eyebrow, headline, body }: GeoShiftProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0.5, y: 0.5 });
    setHoveredId(null);
  }, []);

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-zinc-950 py-48 select-none"
    >
      {/* Gradient fades top + bottom so edges blend into adjacent sections */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-zinc-950 to-transparent z-20" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent z-20" />

      {/* Animated topographic grid background */}
      <IsoLevelWarp aria-hidden className="pointer-events-none" />

      {/* Floating AI logo chips */}
      {LOGOS.map((logo) => {
        const isHovered = hoveredId === logo.id;
        const isOtherHovered = hoveredId !== null && !isHovered;

        // Cursor parallax
        const dx = (mouse.x - 0.5) * logo.depth;
        const dy = (mouse.y - 0.5) * logo.depth;

        // Scatter when another chip is hovered
        const [sx, sy] = isOtherHovered ? SCATTER[logo.id] : [0, 0];

        const scale = isHovered ? 1.28 : 1;

        return (
          <div
            key={logo.id}
            onMouseEnter={() => setHoveredId(logo.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute flex items-center gap-3 rounded-full border px-5 py-3 backdrop-blur-sm cursor-default"
            style={{
              left: `${logo.pos.x}%`,
              top: `${logo.pos.y}%`,
              transform: `translate(${dx + sx}px, ${dy + sy}px) rotate(${logo.rotate}deg) scale(${scale})`,
              transition: isHovered
                ? 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)'
                : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              borderColor: `${logo.color}30`,
              backgroundColor: isHovered ? `${logo.color}22` : `${logo.color}12`,
              boxShadow: isHovered
                ? `0 8px 32px ${logo.color}40, inset 0 1px 0 ${logo.color}30`
                : `0 4px 24px ${logo.color}25, inset 0 1px 0 ${logo.color}20`,
              color: logo.color,
              zIndex: isHovered ? 20 : 10,
            }}
          >
            {logo.icon}
            <span className="text-sm font-semibold whitespace-nowrap" style={{ color: logo.color }}>
              {logo.name}
            </span>
          </div>
        );
      })}

      {/* Text content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 flex flex-col items-center text-center gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {headline.split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>
        <p className="text-base leading-relaxed text-zinc-400 max-w-xl">{body}</p>
      </div>
    </div>
  );
}
