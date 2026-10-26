/** Every inner page opens the same way: label, big title, one line of context. */
export function PageHead({
  kicker,
  title,
  id,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  id: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-16 pb-14 md:pt-24 md:pb-20">
      <p className="label">{kicker}</p>
      <h1 id={id} className="display t-page mt-8">
        {title}
      </h1>
      {children && <div className="lede mt-8 max-w-xl text-fg/80">{children}</div>}
    </header>
  );
}
