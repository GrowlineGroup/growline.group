'use client';

import { useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';

interface Project {
  label: string;
  type: string;
  hint: string;
  tech: string[];
}

interface WebDevProjectsProps {
  projects: Project[];
  eyebrow: string;
  headline: string;
  note: string;
}

export function WebDevProjects({ projects, eyebrow, headline, note }: WebDevProjectsProps) {
  const [active, setActive] = useState(0);

  function prev() {
    setActive(i => (i - 1 + projects.length) % projects.length);
  }

  function next() {
    setActive(i => (i + 1) % projects.length);
  }

  const project = projects[active];

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{headline}</h2>
        <p className="text-sm text-zinc-500">{note}</p>
      </div>

      {/* Main project card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        {/* Preview area */}
        <div className="relative aspect-[16/7] w-full flex items-center justify-center bg-zinc-950/80 border-b border-zinc-800">
          <span className="text-xs text-zinc-700 text-center px-6">{project.hint}</span>
          {/* Nav arrows */}
          <button
            onClick={prev}
            aria-label="Vorheriges Projekt"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-400 hover:border-zinc-500 hover:text-white transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Nächstes Projekt"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-400 hover:border-zinc-500 hover:text-white transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Project info */}
        <div className="flex items-start justify-between gap-6 px-4 sm:px-8 py-5 sm:py-7">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-white">{project.label}</span>
              <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">
                {project.type}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Counter */}
          <span className="shrink-0 text-sm text-zinc-600 tabular-nums">
            {active + 1} / {projects.length}
          </span>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Projekt ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'bg-emerald-400 w-6' : 'bg-zinc-700 w-1.5 hover:bg-zinc-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
