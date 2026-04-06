'use client';

import { useRef, Children, ReactNode, useEffect, useCallback, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const HEADER_H = 72;
const EASE = [0.22, 1, 0.36, 1] as const;

// How much of total scroll each slide gets
// slides.length × PER_SLIDE = 1.0 progress (the PER_SLIDE is 1/n)
// OVERLAP: how much of each transition overlaps (fraction of a single slot)
const OVERLAP = 0.30;

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
  const isFirst = index === 0;
  const isLast  = index === total - 1;
  const per     = 1 / total;
  const start   = index * per;
  const end     = (index + 1) * per;
  const overlap = per * OVERLAP;

  const keyframes = [
    Math.max(0, start - overlap),
    Math.min(1, start),
    Math.max(0, end - overlap),
    Math.min(1, end),
  ].map(v => Math.max(0, Math.min(1, v)));

  // ── opacity ────────────────────────────────────────────────────────────────
  const opacity = useTransform(
    progress,
    keyframes,
    isFirst ? [1, 1, 1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );

  // ── y ─────────────────────────────────────────────────────────────────────
  const y = useTransform(
    progress,
    keyframes,
    isFirst ? ['0%', '0%', '0%', '-4%'] : isLast ? ['5%', '0%', '0%', '0%'] : ['5%', '0%', '0%', '-4%'],
  );

  // ── scale ──────────────────────────────────────────────────────────────────
  const scale = useTransform(
    progress,
    keyframes,
    isFirst ? [1, 1, 1, 0.97] : isLast ? [0.97, 1, 1, 1] : [0.97, 1, 1, 0.97],
  );

  // Panels with opacity ≈ 0 get visibility:hidden → pauses canvas repaints
  const visibility = useTransform(opacity, v => v < 0.02 ? 'hidden' : 'visible');

  return (
    <motion.div
      style={{ opacity, y, scale, visibility }}
      className="absolute inset-0 will-change-[transform,opacity]"
    >
      {children}
    </motion.div>
  );
}

// ── Progress dot — imperative update avoids per-scroll useTransform overhead ──
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
  const ref = useRef<HTMLSpanElement>(null);
  const per = 1 / total;
  const mid = index * per + per / 2;
  const band = per * 0.5;

  useEffect(() => {
    return progress.on('change', v => {
      const el = ref.current;
      if (!el) return;
      const t = Math.max(0, Math.min(1, (v - (mid - band)) / (2 * band)));
      const bell = t < 0.5 ? 2 * t : 2 * (1 - t);
      el.style.height = `${6 + bell * 16}px`;
      el.style.opacity = `${0.25 + bell * 0.75}`;
      el.style.backgroundColor = bell > 0.5 ? '#34d399' : '#52525b';
    });
  }, [progress, mid, band]);

  return (
    <button
      onClick={() => scrollTo(index)}
      aria-label={`Slide ${index + 1}`}
      className="flex items-center justify-center w-6 h-6"
    >
      <span
        ref={ref}
        className="block w-[2px] rounded-full transition-none"
        style={{ height: 6, opacity: 0.25, backgroundColor: '#52525b' }}
      />
    </button>
  );
}

// ── Counter — imperative to avoid extra MotionValue subscriptions ─────────────
function Counter({ progress, total }: { progress: MotionValue<number>; total: number }) {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    return progress.on('change', v => {
      setCur(Math.min(total - 1, Math.floor(v * total)));
    });
  }, [progress, total]);

  return (
    <div className="flex items-center gap-2.5">
      <span className="font-mono text-[11px] tabular-nums tracking-widest text-zinc-500">
        {String(cur + 1).padStart(2, '0')}
      </span>
      <span className="h-px w-6 bg-zinc-800" />
      <span className="font-mono text-[11px] text-zinc-800 tracking-widest">
        {String(total).padStart(2, '0')}
      </span>
    </div>
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

  // Scroll to a specific slide
  const scrollTo = useCallback((index: number) => {
    const el = trackerRef.current;
    if (!el) return;
    const target = el.offsetTop + (el.offsetHeight * index) / total;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }, [total]);

  // Snap to nearest clean slide after scroll stops
  const isSnapping = useRef(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      if (isSnapping.current) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const el = trackerRef.current;
        if (!el) return;

        // Only snap when tracker is in view
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        const progress = scrollYProgress.get();

        // Don't snap at the very start or end — user is entering/leaving the tracker
        if (progress <= 0.01 || progress >= 0.99) return;

        const nearest = Math.min(total - 1, Math.round(progress * total));
        const targetProgress = nearest / total;

        // Skip if already close enough (within 1.5% of snap point)
        if (Math.abs(progress - targetProgress) < 0.015) return;

        isSnapping.current = true;
        scrollTo(nearest);
        setTimeout(() => { isSnapping.current = false; }, 900);
      }, 220);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, [total, scrollYProgress, scrollTo]);

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
          style={{ top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)`, transform: 'translateZ(0)' }}
        >
          {/* Slides stacked */}
          <div className="relative h-full" style={{ contain: 'strict' }}>
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
