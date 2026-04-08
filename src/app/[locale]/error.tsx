'use client';

import { Container } from '@/components/ui/Container';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Container className="flex flex-col items-center gap-6 text-center">
        <p className="font-mono text-7xl font-bold text-red-500/30">500</p>
        <h1 className="text-2xl font-bold text-white">
          Ein Fehler ist aufgetreten
        </h1>
        <p className="text-sm text-zinc-400 max-w-md">
          Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
        >
          Erneut versuchen
        </button>
      </Container>
    </div>
  );
}
