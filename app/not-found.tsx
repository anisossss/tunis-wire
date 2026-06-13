import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-alert">
        <span className="live-dot inline-block h-2 w-2 rounded-full bg-alert" aria-hidden="true" />
        Erreur 404
      </p>
      <h1 className="mt-4 font-display text-5xl font-extrabold uppercase leading-tight sm:text-6xl">
        Signal perdu
        <span className="cursor-blink text-signal">_</span>
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-dim">
        La dépêche que vous cherchez a été déplacée, dépubliée ou n&apos;a jamais existé sur le fil.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 border border-signal px-5 py-2.5 text-xs font-bold uppercase tracking-[0.25em] text-signal transition-colors hover:bg-signal hover:text-void"
      >
        ← Retour au fil
      </Link>
    </div>
  );
}
