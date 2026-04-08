import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="de">
      <body className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center gap-6 text-center px-6">
          <p className="font-mono text-7xl font-bold text-emerald-500/30">404</p>
          <h1 className="text-2xl font-bold">Seite nicht gefunden</h1>
          <p className="text-sm text-zinc-400 max-w-md">
            Die angeforderte Seite existiert nicht oder wurde verschoben.
          </p>
          <Link
            href="/de"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            ← Zur Startseite
          </Link>
        </div>
      </body>
    </html>
  );
}
