'use client';

import { NumberTicker } from '@/components/ui/number-ticker';
import { FadeIn } from '@/components/ui/FadeIn';

function MetricDisplay({ metric }: { metric: string }) {
  const numMatch = metric.match(/[\d.]+/);
  if (!numMatch) return <>{metric}</>;
  const num = parseFloat(numMatch[0]);
  const prefix = metric.slice(0, numMatch.index);
  const suffix = metric.slice((numMatch.index ?? 0) + numMatch[0].length);
  const decimalPlaces = numMatch[0].includes('.') ? numMatch[0].split('.')[1].length : 0;
  return (
    <>
      {prefix}
      <NumberTicker value={num} decimalPlaces={decimalPlaces} className="text-emerald-400" />
      {suffix}
    </>
  );
}

export function WebDevMetrics({
  points,
}: {
  points: { metric: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12">
      {points.map((point, i) => (
        <FadeIn key={point.label} delay={i * 80}>
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-4xl font-bold text-emerald-400 sm:text-5xl">
              <MetricDisplay metric={point.metric} />
            </span>
            <span className="text-xs leading-snug text-zinc-500">{point.label}</span>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
