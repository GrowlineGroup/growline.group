'use client';

import { useState } from 'react';

interface Item {
  title: string;
  body: string;
}

interface Props {
  items: Item[];
}

export function LegalNoteLinks({ items }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const active = openIdx !== null ? items[openIdx] : null;

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setOpenIdx(i)}
            className="text-xs text-zinc-600 underline underline-offset-2 decoration-zinc-800 hover:text-zinc-400 hover:decoration-zinc-600 transition-colors"
          >
            {item.title}
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm p-4 sm:items-center"
          onClick={() => setOpenIdx(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenIdx(null)}
              aria-label="Schließen"
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-colors text-xs"
            >
              ✕
            </button>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">
              Rohfassung
            </p>
            <h3 className="mb-4 text-sm font-semibold text-zinc-200">{active.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{active.body}</p>
          </div>
        </div>
      )}
    </>
  );
}
