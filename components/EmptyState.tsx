export default function EmptyState({
  title = "Le journal arrive bientôt…",
  message = "Le fil est silencieux pour le moment. La rédaction prépare les prochaines dépêches — revenez très vite.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 border border-edge bg-panel px-6 py-16 text-center">
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-alert">
        <span className="live-dot inline-block h-2 w-2 rounded-full bg-alert" aria-hidden="true" />
        Signal en attente
      </span>
      <h2 className="font-display text-3xl font-extrabold uppercase leading-tight">
        {title}
        <span className="cursor-blink text-signal">_</span>
      </h2>
      <p className="max-w-md text-sm leading-relaxed text-dim">{message}</p>
    </div>
  );
}
