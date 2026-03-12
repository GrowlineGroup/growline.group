'use client';

import { Fragment, useRef, useState, useEffect } from 'react';

type QueryState = 'idle' | 'user' | 'thinking' | 'done';

interface Query {
  user: string;
  ai: string;
  highlight: string;
}

interface GeoDemoProps {
  queries: Query[];
  aiLabel: string;
}

// [userAppears, thinkingAppears, responseAppears] in ms after viewport entry
const TIMINGS: [number, number, number][] = [
  [600,   1600,  4000],
  [7000,  8200,  11700],
  [14700, 15900, 19400],
];

// Splits text into word tokens and one highlight token (no trailing spaces in highlight)
function buildTokens(text: string, highlight: string) {
  const parts = text.split(highlight);
  const tokens: { type: 'word' | 'highlight'; content: string }[] = [];
  parts.forEach((part, pi) => {
    part.split(' ').forEach(word => {
      if (word) tokens.push({ type: 'word', content: word });
    });
    if (pi < parts.length - 1) {
      tokens.push({ type: 'highlight', content: highlight });
    }
  });
  return tokens;
}

export function GeoDemo({ queries, aiLabel }: GeoDemoProps) {
  const [states, setStates] = useState<QueryState[]>(queries.map(() => 'idle'));
  const [typingVisible, setTypingVisible] = useState<boolean[]>(queries.map(() => false));
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  // Auto-scroll to bottom whenever states update
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [states]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();

          queries.forEach((_, i) => {
            const [t0, t1, t2] = TIMINGS[i] ?? [
              400 + i * 3600,
              1100 + i * 3600,
              2600 + i * 3600,
            ];

            timeouts.push(
              setTimeout(
                () => setStates(prev => prev.map((s, idx) => (idx === i ? 'user' : s))),
                t0
              ),
              setTimeout(
                () => setStates(prev => prev.map((s, idx) => (idx === i ? 'thinking' : s))),
                t1
              ),
              setTimeout(
                () => setStates(prev => prev.map((s, idx) => (idx === i ? 'done' : s))),
                t2
              ),
              // Show human typing indicator 1s after AI response, only for non-last queries
              ...(i < queries.length - 1 ? [
                setTimeout(
                  () => setTypingVisible(prev => prev.map((v, idx) => (idx === i ? true : v))),
                  t2 + 1000
                ),
              ] : [])
            );
          });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, [queries]);

  return (
    <div
      ref={containerRef}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/70 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
    >
      {/* App-like header bar */}
      <div className="flex items-center gap-2.5 border-b border-zinc-800 bg-zinc-900 px-5 py-3.5">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-glow-pulse" />
        <span className="text-xs font-semibold tracking-wide text-zinc-400">{aiLabel}</span>
      </div>

      {/* Scrollable conversation */}
      <div
        ref={scrollRef}
        className="flex flex-col gap-6 p-5 max-h-[380px] sm:max-h-[480px] overflow-y-auto no-scrollbar min-h-[64px] scroll-smooth"
      >
        {queries.map((query, i) => {
          const state = states[i];

          if (state === 'idle') return null;

          const tokens = buildTokens(query.ai, query.highlight);

          return (
            <div key={i} className="flex flex-col gap-2 animate-chat-enter">

              {/* User bubble */}
              <div className="flex justify-end">
                <div className="max-w-[78%] rounded-2xl rounded-tr-sm bg-zinc-700/70 px-4 py-3">
                  <p className="text-sm text-zinc-200">{query.user}</p>
                </div>
              </div>

              {/* Thinking dots — grid-row collapse */}
              <div
                className={`grid transition-all duration-300 ease-out ${
                  state === 'thinking'
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden min-h-0">
                  <div className="flex justify-start pl-1 pt-1 pb-0.5">
                    <div className="flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-zinc-800/60 px-3 py-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70 animate-thinking-1" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70 animate-thinking-2" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70 animate-thinking-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI response — slides in, words reveal one by one */}
              {state === 'done' && (
                <div className="flex justify-start animate-chat-slide">
                  <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-emerald-500/15 bg-zinc-950/80 px-4 py-3.5">
                    <p className="text-sm leading-relaxed text-zinc-300">
                      {tokens.map((token, wi) =>
                        token.type === 'highlight' ? (
                          <Fragment key={wi}>
                            <span
                              className="rounded-sm bg-emerald-500/25 px-1 py-0.5 font-semibold text-emerald-300 animate-word-reveal"
                              style={{ animationDelay: `${wi * 70}ms` }}
                            >
                              {token.content}
                            </span>{' '}
                          </Fragment>
                        ) : (
                          <span
                            key={wi}
                            className="animate-word-reveal"
                            style={{ animationDelay: `${wi * 70}ms` }}
                          >
                            {token.content}{' '}
                          </span>
                        )
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* Human typing indicator — appears 1s after AI response, disappears when next query starts */}
              {typingVisible[i] && states[i + 1] === 'idle' && (
                <div className="flex justify-end animate-chat-enter">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tr-sm bg-zinc-700/50 px-4 py-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400/70 animate-thinking-1" />
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400/70 animate-thinking-2" />
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400/70 animate-thinking-3" />
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}
