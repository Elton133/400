export function SectionHead({
  kicker,
  title,
  id,
  children,
  className = "",
}: {
  kicker: string;
  title: React.ReactNode;
  id?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={`mb-16 ${className}`}>
      <p className="label">{kicker}</p>
      <h2 id={id} className="display t-section mt-6">
        {title}
      </h2>
      {children && <div className="lede mt-6 max-w-xl text-muted">{children}</div>}
    </header>
  );
}
