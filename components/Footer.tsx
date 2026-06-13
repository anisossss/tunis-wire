import Link from "next/link";

export default function Footer({ categories }: { categories: string[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-edge bg-panel">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-extrabold uppercase tracking-tight">
            Tunis<span className="text-signal">Wire</span>
            <span className="text-alert">_</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-dim">
            Le fil qui ne dort jamais — l&apos;actualité tunisienne en continu, de Tunis au Sahel.
          </p>
        </div>

        <nav aria-label="Rubriques du pied de page">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-signal">Rubriques</p>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.length > 0 ? (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    href={`/category/${encodeURIComponent(c)}`}
                    className="text-dim transition-colors hover:text-signal"
                  >
                    {c}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-dim">Bientôt sur le fil</li>
            )}
          </ul>
        </nav>

        <nav aria-label="Liens utiles">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-signal">Le fil</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-dim transition-colors hover:text-signal">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/feed.xml" className="text-dim transition-colors hover:text-signal">
                Flux RSS
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="text-dim transition-colors hover:text-signal">
                Plan du site
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-edge">
        <p className="mx-auto max-w-7xl px-4 py-4 text-[11px] uppercase tracking-[0.2em] text-dim">
          © {year} Tunis Wire — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
