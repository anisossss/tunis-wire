import Image from "next/image";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import ArticleCard from "@/components/ArticleCard";
import CategoryChip from "@/components/CategoryChip";
import EmptyState from "@/components/EmptyState";
import ListRow from "@/components/ListRow";
import { getArticles, getCategories } from "@/lib/api";
import { timeAgo } from "@/lib/format";

export default async function HomePage() {
  const [latestRes, featuredRes, categories] = await Promise.all([
    getArticles({ limit: 13 }),
    getArticles({ featured: true, limit: 1 }),
    getCategories(),
  ]);

  const lead = featuredRes.articles[0] ?? latestRes.articles[0];

  if (!lead) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <EmptyState />
      </div>
    );
  }

  const rest = latestRes.articles.filter((a) => a.slug !== lead.slug);
  const gridArticles = rest.slice(0, 6);
  const listArticles = rest.slice(6, 12);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <section aria-label="À la une" className="mt-8 border border-edge bg-panel lg:grid lg:grid-cols-5">
        <figure className="scanlines relative aspect-video overflow-hidden border-b border-edge lg:col-span-3 lg:aspect-auto lg:min-h-[420px] lg:border-b-0 lg:border-r">
          {lead.coverImage?.url ? (
            <Image
              src={lead.coverImage.url}
              alt={lead.coverImage.alt || lead.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center bg-void font-display text-6xl font-extrabold uppercase text-edge">
              TW_
            </div>
          )}
        </figure>

        <div className="flex flex-col justify-center gap-4 p-6 lg:col-span-2 lg:p-10">
          <p className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em]">
            <span className="bg-alert px-2 py-0.5 font-bold text-void">À la une</span>
            {lead.category && <CategoryChip name={lead.category} />}
          </p>
          <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            <Link href={`/article/${lead.slug}`} className="transition-colors hover:text-signal">
              {lead.title}
            </Link>
          </h1>
          {lead.excerpt && <p className="text-base leading-relaxed text-dim">{lead.excerpt}</p>}
          <p className="text-[11px] uppercase tracking-[0.2em] text-dim tabular-nums">
            <span className="text-signal" aria-hidden="true">
              ▸{" "}
            </span>
            {timeAgo(lead.publishedAt)} · {lead.author?.name || "Rédaction"}
          </p>
          <Link
            href={`/article/${lead.slug}`}
            className="mt-2 inline-flex w-fit items-center gap-2 border border-signal px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-signal transition-colors hover:bg-signal hover:text-void"
          >
            Lire la dépêche <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {categories.length > 0 && (
        <nav
          aria-label="Naviguer par rubrique"
          className="mt-8 flex flex-wrap items-center gap-2 border-y border-edge py-3"
        >
          <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-signal">
            Rubriques
          </span>
          {categories.map((c) => (
            <CategoryChip key={c} name={c} />
          ))}
        </nav>
      )}

      {gridArticles.length > 0 && (
        <section aria-label="Dernières dépêches" className="mt-10">
          <h2 className="section-title">Dernières dépêches</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gridArticles.slice(0, 3).map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
            <AdSlot
              slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP}
              label="Publicité"
              className="h-full min-h-[240px]"
            />
            {gridArticles.slice(3).map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        </section>
      )}

      {listArticles.length > 0 && (
        <section aria-label="En continu" className="mt-12">
          <h2 className="section-title">En continu</h2>
          <div className="mt-4 grid gap-x-10 md:grid-cols-2">
            {listArticles.map((a) => (
              <ListRow key={a._id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
