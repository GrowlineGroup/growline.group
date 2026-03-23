'use client';

import { useRef, Children, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const HEADER_H = 72;
const EASE = [0.22, 1, 0.36, 1] as const;

// How much of total scroll each slide gets
// slides.length × PER_SLIDE = 1.0 progress (the PER_SLIDE is 1/n)
// OVERLAP: how much of each transition overlaps (fraction of a single slot)
const OVERLAP = 0.35;

// ── Individual slide panel ────────────────────────────────────────────────────
function Panel({
  children,
  progress,
  index,
  total,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const per     = 1 / total;
  const start   = index * per;
  const end     = (index + 1) * per;
  const overlap = per * OVERLAP;

  // ── opacity ────────────────────────────────────────────────────────────────
  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - overlap),  // entering: fade in starts
      Math.min(1, start),            // fully visible
      Math.max(0, end - overlap),    // fade out starts
      Math.min(1, end),              // gone
    ].map(v => Math.max(0, Math.min(1, v))),
    index === 0
      ? [1, 1, 1, 0]
      : [0, 1, 1, 0],
  );

  // ── y ─────────────────────────────────────────────────────────────────────
  const y = useTransform(
    progress,
    [
      Math.max(0, start - overlap),
      Math.min(1, start),
      Math.max(0, end - overlap),
      Math.min(1, end),
    ].map(v => Math.max(0, Math.min(1, v))),
    index === 0
      ? ['0%', '0%', '0%', '-4%']
      : ['5%', '0%', '0%', '-4%'],
  );

  // ── scale ──────────────────────────────────────────────────────────────────
  const scale = useTransform(
    progress,
    [
      Math.max(0, start - overlap),
      Math.min(1, start),
      Math.max(0, end - overlap),
      Math.min(1, end),
    ].map(v => Math.max(0, Math.min(1, v))),
    index === 0
      ? [1, 1, 1, 0.97]
      : [0.97, 1, 1, 0.97],
  );

  // ── blur ───────────────────────────────────────────────────────────────────
  const blurPx = useTransform(
    progress,
    [
      Math.max(0, start - overlap),
      Math.min(1, start),
      Math.max(0, end - overlap),
      Math.min(1, end),
    ].map(v => Math.max(0, Math.min(1, v))),
    index === 0
      ? [0, 0, 0, 10]
      : [16, 0, 0, 10],
  );

  const filter = useTransform(blurPx, v => `blur(${v}px)`);

  return (
    <motion.div
      style={{ opacity, y, scale, filter }}
      className="absolute inset-0 will-change-transform"
    >
      {children}
    </motion.div>
  );
}

// ── Progress dot ──────────────────────────────────────────────────────────────
function Dot({
  progress,
  index,
  total,
  scrollTo,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  scrollTo: (i: number) => void;
}) {
  const per   = 1 / total;
  const mid   = index * per + per / 2;
  const band  = per * 0.5;

  const height  = useTransform(progress, [Math.max(0, mid - band), mid, Math.min(1, mid + band)], [6, 22, 6]);
  const opacity = useTransform(progress, [Math.max(0, mid - band), mid, Math.min(1, mid + band)], [0.25, 1, 0.25]);
  const bg      = useTransform(progress, [Math.max(0, mid - band), mid, Math.min(1, mid + band)], ['#52525b', '#34d399', '#52525b']);

  return (
    <button
      onClick={() => scrollTo(index)}
      aria-label={`Slide ${index + 1}`}
      className="flex items-center justify-center w-6 h-6 group"
    >
      <motion.span
        style={{ height, opacity, backgroundColor: bg }}
        className="block w-[2px] rounded-full"
      />
    </button>
  );
}

// ── Counter ───────────────────────────────────────────────────────────────────
function Counter({ progress, total }: { progress: MotionValue<number>; total: number }) {
  const cur = useTransform(progress, v => Math.min(total - 1, Math.floor(v * total)));
  // Round to nearest integer for display
  return (
    <div className="flex items-center gap-2.5">
      <motion.span className="font-mono text-[11px] tabular-nums tracking-widest text-zinc-500">
        {Array.from({ length: total }, (_, i) => (
          <SlideCountNum key={i} progress={progress} index={i} total={total} />
        ))}
      </motion.span>
      <span className="h-px w-6 bg-zinc-800" />
      <span className="font-mono text-[11px] text-zinc-800 tracking-widest">
        {String(total).padStart(2, '0')}
      </span>
    </div>
  );
}

function SlideCountNum({ progress, index, total }: { progress: MotionValue<number>; index: number; total: number }) {
  const per = 1 / total;
  const mid = index * per + per / 2;
  const band = per * 0.4;
  const opacity = useTransform(
    progress,
    [Math.max(0, mid - band), mid, Math.min(1, mid + band)],
    [0, 1, 0],
  );
  return (
    <motion.span style={{ opacity }} className="absolute">
      {String(index + 1).padStart(2, '0')}
    </motion.span>
  );
}

// ── Top progress bar ──────────────────────────────────────────────────────────
function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, [0, 1], ['0%', '100%']);
  return (
    <div className="absolute inset-x-0 top-0 h-[1px] bg-zinc-800/80 z-50">
      <motion.div style={{ width }} className="h-full bg-emerald-500/60" />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function StickySlideShow({ children }: { children: ReactNode }) {
  const slides    = Children.toArray(children);
  const total     = slides.length;
  const trackerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the full tracker div
  const { scrollYProgress } = useScroll({
    target: trackerRef,
    offset: ['start start', 'end end'],
  });

  // Scroll to a specific slide (for dot clicks)
  const scrollTo = (index: number) => {
    const el = trackerRef.current;
    if (!el) return;
    const target = el.offsetTop + (el.offsetHeight * index) / total;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Tracker in normal document flow → creates the scrollbar ─────── */}
      <div
        ref={trackerRef}
        style={{ height: `${total * 100}vh` }}
        className="relative"
      >
        {/* ── Fixed display → always fills viewport below header ─────────── */}
        <div
          className="sticky overflow-hidden"
          style={{ top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
        >
          {/* Slides stacked */}
          <div className="relative h-full">
            {slides.map((slide, i) => (
              <Panel key={i} progress={scrollYProgress} index={i} total={total}>
                {slide}
              </Panel>
            ))}
          </div>

          {/* ── Progress bar top ─────────────────────────────────────────── */}
          <ProgressBar progress={scrollYProgress} />

          {/* ── Dot nav right ────────────────────────────────────────────── */}
          <nav
            aria-label="Slide navigation"
            className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2"
          >
            {slides.map((_, i) => (
              <Dot
                key={i}
                progress={scrollYProgress}
                index={i}
                total={total}
                scrollTo={scrollTo}
              />
            ))}
          </nav>

          {/* ── Counter bottom left ───────────────────────────────────────── */}
          <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-8 z-50 relative h-4 flex items-center">
            <Counter progress={scrollYProgress} total={total} />
          </div>

          {/* ── Scroll hint (bottom right) ────────────────────────────────── */}
          <div className="absolute bottom-5 sm:bottom-7 right-16 z-50 hidden sm:flex items-center gap-2">
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="text-zinc-800 text-xs"
            >
              ↓
            </motion.span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-800 uppercase">Scroll</span>
          </div>
        </div>
      </div>
    </>
  );
}
