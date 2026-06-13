import Link from "next/link";

export default function CategoryChip({ name, active = false }: { name: string; active?: boolean }) {
  return (
    <Link
      href={`/category/${encodeURIComponent(name)}`}
      className={`inline-block border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
        active
          ? "border-signal bg-signal text-void"
          : "border-edge text-dim hover:border-signal hover:text-signal"
      }`}
    >
      {name}
    </Link>
  );
}
