interface BentoItem {
  id: string;
  title: string;
  body: string;
  size: string;
}

interface Props {
  items: BentoItem[];
}

export function BentoGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const isMetric = item.size === 'metric';
        const isLarge  = item.size === 'large';
        const isWide   = item.size === 'wide';

        const colSpan = isLarge ? 'sm:col-span-2' : isWide ? 'sm:col-span-3' : '';

        const base = `${colSpan} flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900`;

        if (isMetric) {
          return (
            <div key={item.id} className={`${base} items-start justify-between p-6 min-h-36`}>
              <span className="font-mono text-3xl sm:text-5xl font-bold text-emerald-400 leading-none">{item.title}</span>
              <span className="text-xs text-zinc-500 mt-2">{item.body}</span>
            </div>
          );
        }

        if (isWide) {
          return (
            <div key={item.id} className={`${base} justify-between gap-3 px-7 py-7`}>
              <p className="text-base font-semibold text-white">{item.title}</p>
              <p className="text-xs leading-relaxed text-zinc-500">{item.body}</p>
            </div>
          );
        }

        return (
          <div key={item.id} className={`${base} justify-between gap-3 p-6 ${isLarge ? 'min-h-48' : 'min-h-40'}`}>
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
