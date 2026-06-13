import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import CategoryChip from "@/components/CategoryChip";
import EmptyState from "@/components/EmptyState";
import { getArticles, getCategories } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const category = decodeURIComponent(name);
  return {
    title: `Rubrique ${category}`,
    description: `Toutes les dépêches Tunis Wire de la rubrique ${category}, en continu.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { name } = await params;
  const { page: pageParam } = await searchParams;
  const category = decodeURIComponent(name);
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);

  const [{ articles, total, pages }, categories] = await Promise.all([
    getArticles({ category, page, limit: 12 }),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <header className="mt-8 border border-edge bg-panel px-6 py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-signal">Rubrique</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
          {category}
        </h1>
        <p className="mt-2 text-sm text-dim tabular-nums">
          {total} dépêche{total > 1 ? "s" : ""} sur le fil
        </p>
      </header>

      {categories.length > 0 && (
        <nav
          aria-label="Naviguer par rubrique"
          className="mt-6 flex flex-wrap items-center gap-2 border-y border-edge py-3"
        >
          {categories.map((c) => (
            <CategoryChip key={c} name={c} active={c === category} />
          ))}
        </nav>
      )}

      {articles.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="Rien sur le fil…"
            message={`Aucune dépêche publiée dans la rubrique « ${category} » pour le moment.`}
          />
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>

          {pages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-10 flex items-center justify-between gap-4 border-t border-edge pt-5 text-xs font-semibold uppercase tracking-[0.25em]"
            >
              {page > 1 ? (
                <Link
                  href={`/category/${encodeURIComponent(category)}?page=${page - 1}`}
                  className="border border-edge px-4 py-2 text-fog transition-colors hover:border-signal hover:text-signal"
                >
                  ← Précédent
                </Link>
              ) : (
                <span className="border border-edge px-4 py-2 text-dim opacity-40">← Précédent</span>
              )}
              <span className="text-dim tabular-nums">
                Page {page} / {pages}
              </span>
              {page < pages ? (
                <Link
                  href={`/category/${encodeURIComponent(category)}?page=${page + 1}`}
                  className="border border-edge px-4 py-2 text-fog transition-colors hover:border-signal hover:text-signal"
                >
                  Suivant →
                </Link>
              ) : (
                <span className="border border-edge px-4 py-2 text-dim opacity-40">Suivant →</span>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
