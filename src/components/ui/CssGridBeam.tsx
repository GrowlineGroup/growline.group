// CssGridBeam — pure CSS, no external libraries.
// Each beam lives in its own absolutely-positioned div so CSS % placement works correctly.

import React from 'react';

const BEAMS = [
  // Horizontal — slow travel, well staggered
  { id:  1, left:  '0%', top: '12%', w: 160, h:  2, path: 'M0 1 H160',              delay:  '0.0s', dur: '11.7s' },
  { id:  2, left: '25%', top: '28%', w: 220, h:  2, path: 'M0 1 H220',              delay:  '2.6s', dur: '9.5s' },
  { id:  3, left: '55%', top: '18%', w: 180, h:  2, path: 'M180 1 H0',              delay:  '1.3s', dur: '9.1s' },
  { id:  4, left:  '5%', top: '55%', w: 140, h:  2, path: 'M0 1 H140',              delay:  '4.2s', dur: '8.3s' },
  { id:  5, left: '40%', top: '72%', w: 200, h:  2, path: 'M200 1 H0',              delay:  '1.9s', dur: '9.9s' },
  { id:  6, left: '70%', top: '42%', w: 150, h:  2, path: 'M0 1 H150',              delay:  '6.5s', dur: '8.9s' },
  { id:  7, left: '10%', top: '85%', w: 250, h:  2, path: 'M0 1 H250',              delay:  '3.4s', dur: '9.3s' },
  { id:  8, left: '60%', top: '62%', w: 130, h:  2, path: 'M130 1 H0',              delay:  '8.2s', dur: '8.5s' },
  { id: 26, left: '15%', top: '48%', w: 170, h:  2, path: 'M0 1 H170',              delay:  '5.8s', dur: '9.0s' },
  { id: 27, left: '45%', top: '90%', w: 140, h:  2, path: 'M140 1 H0',              delay:  '0.7s', dur: '8.4s' },
  { id: 28, left: '80%', top: '30%', w: 120, h:  2, path: 'M0 1 H120',              delay:  '7.1s', dur: '8.8s' },

  // Vertical — slow, staggered
  { id:  9, left: '18%', top:  '0%', w:  2, h: 160, path: 'M1 0 V160',              delay:  '0.8s', dur: '9.1s' },
  { id: 10, left: '45%', top: '10%', w:  2, h: 200, path: 'M1 200 V0',              delay:  '5.0s', dur: '9.7s' },
  { id: 11, left: '72%', top:  '5%', w:  2, h: 140, path: 'M1 0 V140',              delay:  '2.2s', dur: '8.5s' },
  { id: 12, left: '88%', top: '30%', w:  2, h: 180, path: 'M1 180 V0',              delay:  '7.4s', dur: '9.3s' },
  { id: 13, left: '33%', top: '50%', w:  2, h: 150, path: 'M1 0 V150',              delay:  '1.6s', dur: '11.7s' },
  { id: 29, left:  '6%', top: '20%', w:  2, h: 130, path: 'M1 0 V130',              delay:  '9.0s', dur: '8.9s' },
  { id: 30, left: '58%', top: '40%', w:  2, h: 110, path: 'M1 110 V0',              delay:  '3.8s', dur: '8.3s' },

  // L-shapes — slower
  { id: 14, left:  '3%', top:  '8%', w: 100, h:  80, path: 'M0 1 H100 V80',         delay:  '3.0s', dur: '10.0s' },
  { id: 15, left: '50%', top: '35%', w:  80, h:  60, path: 'M0 1 H80 V60',          delay:  '0.4s', dur: '9.3s' },
  { id: 16, left: '78%', top: '55%', w: 120, h:  70, path: 'M0 1 H120 V70',         delay:  '5.6s', dur: '11.7s' },
  { id: 17, left: '15%', top: '40%', w:  90, h:  70, path: 'M0 70 H90 V0',          delay:  '7.0s', dur: '9.5s' },
  { id: 18, left: '62%', top: '15%', w: 110, h:  80, path: 'M0 80 H110 V0',         delay:  '2.0s', dur: '9.1s' },
  { id: 19, left: '30%', top: '60%', w: 100, h:  60, path: 'M100 1 H0 V60',         delay:  '8.8s', dur: '9.3s' },
  { id: 20, left: '65%', top: '78%', w:  80, h:  50, path: 'M80 1 H0 V50',          delay:  '1.0s', dur: '8.5s' },
  { id: 21, left:  '8%', top: '20%', w:  80, h: 100, path: 'M1 0 V100 H80',         delay:  '4.6s', dur: '10.3s' },
  { id: 22, left: '48%', top:  '5%', w:  60, h:  90, path: 'M1 90 V0 H60',          delay:  '3.6s', dur: '8.9s' },
  { id: 23, left: '82%', top: '22%', w:  70, h: 110, path: 'M1 0 V110 H70',         delay:  '0.6s', dur: '9.7s' },

  // Z-shapes — slowest
  { id: 24, left: '20%', top: '75%', w: 120, h:  50, path: 'M0 50 H60 V0 M60 0 H120', delay: '6.0s', dur: '10.7s' },
  { id: 25, left: '55%', top: '48%', w: 100, h:  80, path: 'M0 0 H50 V80 M50 40 H100', delay: '10.2s', dur: '10.3s' },
  { id: 31, left: '35%', top: '15%', w: 140, h:  60, path: 'M0 60 H70 V0 M70 0 H140', delay:  '4.4s', dur: '10.5s' },
];

export function CssGridBeam({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Grid — bleeds 10rem above and below, fades at edges via mask */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0"
        style={{
          top: '-10rem',
          bottom: '-10rem',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
        }}
      />

      {/* Animated beams — each in its own positioned HTML div */}
      {BEAMS.map((beam) => (
        <svg
          key={beam.id}
          aria-hidden
          className="pointer-events-none absolute"
          width={beam.w + 4}
          height={beam.h + 4}
          viewBox={`0 0 ${beam.w + 4} ${beam.h + 4}`}
          style={{
            left: beam.left,
            top: beam.top,
            overflow: 'visible',
          }}
        >
          <defs>
            <filter id={`glow-${beam.id}`}>
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id={`grad-${beam.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="rgba(16,185,129,0)" />
              <stop offset="40%"  stopColor="rgba(52,211,153,0.9)" />
              <stop offset="60%"  stopColor="rgba(110,231,183,1)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0)" />
            </linearGradient>
          </defs>
          <path
            d={beam.path}
            fill="none"
            stroke={`url(#grad-${beam.id})`}
            strokeWidth={1.5}
            filter={`url(#glow-${beam.id})`}
            strokeDasharray={`60 ${beam.w + beam.h + 60}`}
            style={{
              animation: `beamTravel ${beam.dur} ease-in-out ${beam.delay} infinite`,
            }}
          />
        </svg>
      ))}

      {/* Center mask — dims beams behind text for readability */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(9,9,11,0.97) 0%, rgba(9,9,11,0.92) 30%, rgba(9,9,11,0.6) 55%, transparent 78%)',
        }}
      />
      {/* Mobile: stronger flat overlay so beams don't bleed through text */}
      <div
        aria-hidden
        className="sm:hidden pointer-events-none absolute inset-0"
        style={{ background: 'rgba(9,9,11,0.78)' }}
      />

      {/* Section content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
