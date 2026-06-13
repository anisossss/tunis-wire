import Link from "next/link";
import type { Article } from "@/lib/api";
import { timeAgo } from "@/lib/format";

export default function ListRow({ article }: { article: Article }) {
  return (
    <article className="group relative border-l-2 border-edge py-3 pl-4 transition-colors hover:border-signal">
      <p className="flex flex-wrap items-baseline gap-x-3 text-[11px] uppercase tracking-[0.2em]">
        <span className="text-signal tabular-nums">{timeAgo(article.publishedAt)}</span>
        {article.category && <span className="text-dim">{article.category}</span>}
      </p>
      <h3 className="mt-1 font-display text-base font-bold leading-snug">
        <Link
          href={`/article/${article.slug}`}
          className="transition-colors after:absolute after:inset-0 group-hover:text-signal"
        >
          {article.title}
        </Link>
      </h3>
    </article>
  );
}
