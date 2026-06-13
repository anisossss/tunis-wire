import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/api";
import { timeAgo } from "@/lib/format";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex h-full flex-col border border-edge bg-panel transition-colors duration-200 hover:border-signal">
      <div className="relative aspect-video overflow-hidden border-b border-edge">
        {article.coverImage?.url ? (
          <Image
            src={article.coverImage.url}
            alt={article.coverImage.alt || article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-void font-display text-3xl font-extrabold uppercase text-edge">
            TW_
          </div>
        )}
        {article.category && (
          <span className="absolute left-3 top-3 z-10 border border-signal bg-void/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-signal">
            {article.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-bold leading-snug">
          <Link
            href={`/article/${article.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-signal"
          >
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <p className="line-clamp-2 text-sm leading-relaxed text-dim">{article.excerpt}</p>
        )}
        <p className="mt-auto pt-2 text-[11px] uppercase tracking-[0.2em] text-dim tabular-nums">
          <span className="text-signal" aria-hidden="true">
            ▸{" "}
          </span>
          {timeAgo(article.publishedAt)}
        </p>
      </div>
    </article>
  );
}
