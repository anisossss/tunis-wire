import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const { articles } = await getArticles({ limit: 200 });
    return [
      { url: siteUrl, lastModified: new Date() },
      ...articles.map((a) => ({
        url: `${siteUrl}/article/${a.slug}`,
        lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
      })),
    ];
  } catch {
    return [{ url: siteUrl, lastModified: new Date() }];
  }
}
