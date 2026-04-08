'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="de">
      <body className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center gap-6 text-center px-6">
          <p className="font-mono text-7xl font-bold text-red-500/30">500</p>
          <h1 className="text-2xl font-bold">Ein Fehler ist aufgetreten</h1>
          <p className="text-sm text-zinc-400 max-w-md">
            Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  );
}
