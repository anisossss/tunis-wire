# Tunis Wire — « Le fil qui ne dort jamais »

Site d'actualité tunisien en français, identité « terminal breaking-news » sombre : void/panel, lime signal, rouge alerte, ticker en marquee CSS et horodatages relatifs. Next.js 16 (App Router) + Tailwind CSS v4, consomme l'API publique du backend Tunisia News (`/api/public/tunis-wire/...`).

## Variables d'environnement (`.env.local`)

| Clé | Valeur |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` |
| `NEXT_PUBLIC_SITE_SLUG` | `tunis-wire` |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3002` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | id client AdSense (vide = placeholders « Publicité ») |
| `NEXT_PUBLIC_ADSENSE_SLOT_TOP` | slot in-feed sur l'accueil |
| `NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE` | réservé (non utilisé sur ce site) |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | slot latéral collant sur les articles |

## Démarrer

```bash
npm install
npm run dev   # http://localhost:3002
```
