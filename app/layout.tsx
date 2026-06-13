import type { Metadata, Viewport } from "next";
import { Syne, Archivo } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticles, getCategories } from "@/lib/api";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tunis Wire — Le fil qui ne dort jamais",
    template: "%s — Tunis Wire",
  },
  description:
    "Tunis Wire : l'actualité tunisienne en continu — politique, économie, société, sport, culture et tech, en direct de Tunis.",
  openGraph: {
    siteName: "Tunis Wire",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f14",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const [latest, categories] = await Promise.all([getArticles({ limit: 8 }), getCategories()]);
  const headlines = latest.articles.map((a) => ({ title: a.title, slug: a.slug }));

  return (
    <html lang="fr" className={`${syne.variable} ${archivo.variable}`}>
      <body className="bg-void font-body text-fog antialiased">
        <Header headlines={headlines} categories={categories} />
        <main>{children}</main>
        <Footer categories={categories} />
        {adsenseClient && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
