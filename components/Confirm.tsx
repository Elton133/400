// A reminder chip for facts the crew still needs to confirm.
// Visible in development only; renders nothing in production.

export function Confirm({ items, className = "" }: { items?: string[]; className?: string }) {
  if (process.env.NODE_ENV === "production" || !items?.length) return null;
  return (
    <span
      className={`inline-flex flex-wrap items-center gap-1 rounded-sm border border-dashed border-pink px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-pink-text ${className}`}
      title="Visible in development only"
    >
      confirm: {items.join(" · ")}
    </span>
  );
}

/** Placeholder for a real photograph or screenshot that hasn't been supplied yet. */
export function PhotoSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`grid place-items-center rounded-2xl border border-line bg-raise p-6 text-center font-mono text-[11px] leading-relaxed tracking-[0.14em] text-muted uppercase ${className}`}
    >
      <span>
        Real photo only
        <br />
        <span className="normal-case tracking-normal">{label}</span>
      </span>
    </div>
  );
}
