import Link from "next/link";
import LiveClock from "@/components/LiveClock";
import Ticker from "@/components/Ticker";

interface Headline {
  title: string;
  slug: string;
}

export default function Header({
  headlines,
  categories,
}: {
  headlines: Headline[];
  categories: string[];
}) {
  const today = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="bg-void">
      <div className="border-b border-edge bg-panel">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em]">
          <span className="flex items-center gap-2 text-alert">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-alert" aria-hidden="true" />
            En direct
          </span>
          <span className="hidden text-dim sm:inline">{today}</span>
          <LiveClock />
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-5">
        <Link href="/" className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
          Tunis<span className="text-signal">Wire</span>
          <span className="cursor-blink text-alert">_</span>
        </Link>
        <nav
          aria-label="Rubriques"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em]"
        >
          <Link href="/" className="text-fog transition-colors hover:text-signal">
            Accueil
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/category/${encodeURIComponent(c)}`}
              className="text-dim transition-colors hover:text-signal"
            >
              {c}
            </Link>
          ))}
          <Link href="/feed.xml" className="text-dim transition-colors hover:text-signal">
            RSS
          </Link>
        </nav>
      </div>

      <Ticker headlines={headlines} />
    </header>
  );
}
