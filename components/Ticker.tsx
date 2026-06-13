import Link from "next/link";

interface Headline {
  title: string;
  slug: string;
}

export default function Ticker({ headlines }: { headlines: Headline[] }) {
  const items =
    headlines.length > 0
      ? headlines
      : [{ title: "Tunis Wire — le fil de l'actualité tunisienne, en continu", slug: "" }];

  const strip = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((h, i) => (
        <span key={`${h.slug}-${i}`} className="flex items-center whitespace-nowrap text-sm">
          <span className="px-4 font-display font-bold text-signal" aria-hidden="true">
            +++
          </span>
          {h.slug && !hidden ? (
            <Link href={`/article/${h.slug}`} className="text-dim transition-colors hover:text-signal">
              {h.title}
            </Link>
          ) : (
            <span className="text-dim">{h.title}</span>
          )}
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-edge bg-panel py-2">
      <div className="ticker-track">
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}
