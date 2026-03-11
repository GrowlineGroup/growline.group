interface Props {
  children: React.ReactNode;
  /** 'dark' for dark-bg sections (emerald tint), 'light' for white-bg sections (zinc) */
  theme?: 'dark' | 'light';
  className?: string;
}

export function Eyebrow({ children, theme = 'dark', className }: Props) {
  const lineColor = theme === 'dark' ? 'bg-emerald-400/60' : 'bg-zinc-400/40';
  const textColor = theme === 'dark' ? 'text-emerald-400/70' : 'text-zinc-500';

  return (
    <div className={`flex items-center gap-3${className ? ` ${className}` : ''}`}>
      <span className={`h-px w-6 shrink-0 ${lineColor}`} />
      <span className={`text-xs font-semibold uppercase tracking-[0.14em] ${textColor}`}>
        {children}
      </span>
    </div>
  );
}
