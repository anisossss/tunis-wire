import { getArticles } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";

const XML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&apos;",
  '"': "&quot;",
};

function escapeXml(value: string): string {
  return value.replace(/[&<>'"]/g, (char) => XML_ENTITIES[char]);
}

export async function GET() {
  const { articles } = await getArticles({ limit: 20 });

  const items = articles
    .map((a) => {
      const link = `${siteUrl}/article/${a.slug}`;
      const pubDate = a.publishedAt ? new Date(a.publishedAt).toUTCString() : new Date().toUTCString();
      const description = a.excerpt ? `      <description>${escapeXml(a.excerpt)}</description>\n` : "";
      const category = a.category ? `      <category>${escapeXml(a.category)}</category>\n` : "";
      return [
        "    <item>",
        `      <title>${escapeXml(a.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `${description}${category}    </item>`,
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Tunis Wire</title>
    <link>${siteUrl}</link>
    <description>Le fil qui ne dort jamais — l'actualité tunisienne en continu.</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
