import type { Metadata } from 'next';
import { PulseRings } from '@/components/ui/PulseRings';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
import { NeuralNet } from '@/components/ui/NeuralNet';
import { AuroraGlow } from '@/components/ui/AuroraGlow';
import { CountdownGrid } from '@/components/ui/CountdownGrid';
import { ParticleFlow } from '@/components/ui/ParticleFlow';

const options = [
  { label: '1 – PulseRings', desc: 'Sonar-Ringe, pulsierender Mittelpunkt', Bg: PulseRings },
  { label: '2 – NeuralNet', desc: 'KI-Netzwerk, Punkte + Verbindungen', Bg: NeuralNet },
  { label: '3 – AuroraGlow', desc: 'Fließende Farbwolken, organisch', Bg: AuroraGlow },
  { label: '4 – CountdownGrid', desc: 'Gitter mit zufällig aufleuchtenden Zellen', Bg: CountdownGrid },
  { label: '5 – ParticleFlow', desc: 'Datenstrom, Partikel fließen von links', Bg: ParticleFlow },
];

export default function BgComparePage() {
  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <h1 className="text-white text-xl font-bold mb-8 text-center">Hintergrund-Vergleich · "Warum jetzt"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {options.slice(0, 3).map(({ label, desc, Bg }) => (
          <div key={label} className="flex flex-col gap-2">
            <Bg className="h-56 rounded-2xl border border-zinc-800 bg-zinc-900" />
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className="text-xs text-zinc-500">{desc}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {options.slice(3).map(({ label, desc, Bg }) => (
          <div key={label} className="flex flex-col gap-2">
            <Bg className="h-56 rounded-2xl border border-zinc-800 bg-zinc-900" />
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className="text-xs text-zinc-500">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
