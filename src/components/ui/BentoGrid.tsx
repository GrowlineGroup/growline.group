import { MagicCard } from '@/components/ui/magic-card';
import { BorderBeam } from '@/components/ui/border-beam';

interface BentoItem {
  id: string;
  title: string;
  body: string;
  size: string;
}

interface Props {
  items: BentoItem[];
  magic?: boolean;
}

export function BentoGrid({ items, magic = false }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const isMetric = item.size === 'metric';
        const isLarge  = item.size === 'large';
        const isWide   = item.size === 'wide';

        const colSpan = isLarge ? 'sm:col-span-2' : isWide ? 'sm:col-span-3' : '';

        // ── Metric tile ─────────────────────────────────────
        if (isMetric) {
          return (
            <div
              key={item.id}
              className={`${colSpan} relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 items-start justify-between p-6 min-h-36 overflow-hidden`}
            >
              {magic && (
                <BorderBeam size={120} duration={10} colorFrom="#34d399" colorTo="transparent" />
              )}
              <span className="font-mono text-3xl sm:text-5xl font-bold text-emerald-400 leading-none">{item.title}</span>
              <span className="text-xs text-zinc-500 mt-2">{item.body}</span>
            </div>
          );
        }

        // ── Wide tile ────────────────────────────────────────
        if (isWide) {
          if (magic) {
            return (
              <div key={item.id} className={`${colSpan}`}>
                <MagicCard
                  className="rounded-2xl w-full"
                  gradientColor="rgba(16,185,129,0.07)"
                  gradientFrom="#34d399"
                  gradientTo="#2dd4bf"
                  gradientSize={300}
                >
                  <div className="flex flex-col justify-between gap-3 px-7 py-7">
                    <p className="text-base font-semibold text-white">{item.title}</p>
                    <p className="text-xs leading-relaxed text-zinc-500">{item.body}</p>
                  </div>
                </MagicCard>
              </div>
            );
          }
          return (
            <div key={item.id} className={`${colSpan} flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 justify-between gap-3 px-7 py-7`}>
              <p className="text-base font-semibold text-white">{item.title}</p>
              <p className="text-xs leading-relaxed text-zinc-500">{item.body}</p>
            </div>
          );
        }

        // ── Large + Small tiles ──────────────────────────────
        if (magic) {
          return (
            <div key={item.id} className={`${colSpan}`}>
              <MagicCard
                className={`rounded-2xl w-full ${isLarge ? 'min-h-48' : 'min-h-40'}`}
                gradientColor="rgba(16,185,129,0.09)"
                gradientFrom="#34d399"
                gradientTo="#2dd4bf"
                gradientSize={isLarge ? 280 : 180}
              >
                {isLarge && (
                  <BorderBeam
                    size={200}
                    duration={11}
                    colorFrom="#34d399"
                    colorTo="transparent"
                    delay={2}
                  />
                )}
                <div className={`flex flex-col justify-between gap-3 p-6 ${isLarge ? 'min-h-48' : 'min-h-40'}`}>
                  <p className={`font-semibold text-white leading-snug ${isLarge ? 'text-lg' : 'text-sm'}`}>
                    {item.title}
                  </p>
                  <p className="text-xs leading-relaxed text-zinc-500">{item.body}</p>
                </div>
              </MagicCard>
            </div>
          );
        }

        return (
          <div key={item.id} className={`${colSpan} flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 justify-between gap-3 p-6 ${isLarge ? 'min-h-48' : 'min-h-40'}`}>
            <p className={`font-semibold text-white leading-snug ${isLarge ? 'text-lg' : 'text-sm'}`}>
              {item.title}
            </p>
            <p className="text-xs leading-relaxed text-zinc-500">{item.body}</p>
          </div>
        );
      })}
    </div>
  );
}
