import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import ArticleCard from "@/components/ArticleCard";
import CategoryChip from "@/components/CategoryChip";
import ListRow from "@/components/ListRow";
import { getArticle, getArticles, type ArticleList } from "@/lib/api";
import { formatDate, timeAgo } from "@/lib/format";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) {
    return { title: "Dépêche introuvable" };
  }

  const title = article.seo?.metaTitle || article.title;
  const description = article.seo?.metaDescription || article.excerpt || "";
  const url = `${siteUrl}/article/${article.slug}`;
  const image = article.seo?.ogImage || article.coverImage?.url;

  return {
    title,
    description,
    alternates: {
      canonical: article.seo?.canonicalUrl || url,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "Tunis Wire",
      locale: "fr_FR",
      images: image ? [image] : undefined,
      publishedTime: article.publishedAt,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: { index: !article.seo?.noIndex },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const emptyList: ArticleList = { articles: [], total: 0, page: 1, pages: 0 };
  const [relatedRes, latestRes] = await Promise.all([
    article.category
      ? getArticles({ category: article.category, exclude: article.slug, limit: 3 })
      : Promise.resolve(emptyList),
    getArticles({ limit: 5, exclude: article.slug }),
  ]);
  const related = relatedRes.articles.slice(0, 3);
  const latest = latestRes.articles.slice(0, 5);

  const url = `${siteUrl}/article/${article.slug}`;
  const image = article.seo?.ogImage || article.coverImage?.url;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.seo?.metaDescription || article.excerpt || "",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    articleSection: article.category,
    keywords: article.tags && article.tags.length > 0 ? article.tags.join(", ") : undefined,
    inLanguage: "fr",
    author: [{ "@type": "Person", name: article.author?.name || "Rédaction" }],
    publisher: {
      "@type": "Organization",
      name: "Tunis Wire",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon.svg` },
    },
  };
  if (image) {
    jsonLd.image = [image];
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mt-8 gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_300px]">
        <article>
          <header>
            <p className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em]">
              {article.category && <CategoryChip name={article.category} />}
              <span className="text-dim tabular-nums">{formatDate(article.publishedAt)}</span>
              <span className="text-signal tabular-nums">{timeAgo(article.publishedAt)}</span>
            </p>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-4 text-lg leading-relaxed text-dim">{article.excerpt}</p>
            )}
            <p className="mt-5 border-y border-edge py-2 text-[11px] uppercase tracking-[0.2em] text-dim">
              Par <span className="text-fog">{article.author?.name || "Rédaction"}</span> · Tunis Wire
            </p>
          </header>

          {article.coverImage?.url && (
            <figure className="scanlines relative mt-6 aspect-video overflow-hidden border border-edge">
              <Image
                src={article.coverImage.url}
                alt={article.coverImage.alt || article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </figure>
          )}

          <div className="article-body mt-8" dangerouslySetInnerHTML={{ __html: article.content || "" }} />

          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-edge pt-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-signal">
                Mots-clés
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-edge px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-dim"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>

        <aside className="mt-12 space-y-8 lg:mt-0" aria-label="Colonne latérale">
          {latest.length > 0 && (
            <section className="border border-edge bg-panel p-4">
              <h2 className="section-title">En continu</h2>
              <div className="mt-2">
                {latest.map((a) => (
                  <ListRow key={a._id} article={a} />
                ))}
              </div>
            </section>
          )}
          <div className="sticky top-6">
            <AdSlot
              slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR}
              label="Publicité"
              className="min-h-[420px]"
            />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-label="À lire aussi" className="mt-16">
          <h2 className="section-title">À lire aussi</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
