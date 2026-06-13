const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const SITE = process.env.NEXT_PUBLIC_SITE_SLUG || "tunis-wire";

export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: { url?: string; alt?: string };
  category?: string;
  tags?: string[];
  author?: { name?: string };
  status?: "draft" | "published" | "scheduled";
  publishedAt?: string;
  featured?: boolean;
  views?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
}

export interface ArticleList {
  articles: Article[];
  total: number;
  page: number;
  pages: number;
}

export async function getArticles(
  opts: { page?: number; limit?: number; category?: string; featured?: boolean; exclude?: string } = {}
): Promise<ArticleList> {
  try {
    const qs = new URLSearchParams();
    if (opts.page) qs.set("page", String(opts.page));
    if (opts.limit) qs.set("limit", String(opts.limit));
    if (opts.category) qs.set("category", opts.category);
    if (opts.featured) qs.set("featured", "true");
    if (opts.exclude) qs.set("exclude", opts.exclude);
    const res = await fetch(`${API}/api/public/${SITE}/articles?${qs}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error();
    return (await res.json()) as ArticleList;
  } catch {
    return { articles: [], total: 0, page: 1, pages: 0 };
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${API}/api/public/${SITE}/articles/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error();
    return (await res.json()) as Article;
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${API}/api/public/${SITE}/categories`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error();
    return (await res.json()) as string[];
  } catch {
    return [];
  }
}
