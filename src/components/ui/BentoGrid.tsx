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
        const isLarge = item.size === 'large';
        const isWide = item.size === 'wide';

        const colSpan = isLarge ? 'sm:col-span-2' : isWide ? 'sm:col-span-3' : '';

        return (
          <div
            key={item.id}
            className={`${colSpan} flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-6 ${isLarge ? 'min-h-44' : isMetric ? 'min-h-28' : isWide ? '' : 'min-h-28'}`}
          >
            {isMetric ? (
              <div className="flex h-full flex-col justify-between">
                <span className="font-mono text-5xl font-bold text-emerald-400">{item.title}</span>
                <span className="text-xs text-zinc-500">{item.body}</span>
              </div>
            ) : (
              <>
                <p className={`font-semibold text-white ${isLarge ? 'text-xl' : 'text-sm'}`}>
                  {item.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{item.body}</p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
