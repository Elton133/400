"use client";

import { ArrowRight02Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { motion, MotionConfig } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Confirm } from "@/components/Confirm";
import { Icon } from "@/components/Icon";
import { FlatPhone } from "@/components/phone/FlatPhone";
import { PhoneStage } from "@/components/phone/PhoneStage";
import { type Project, statusLabel } from "@/content/projects";

const arrive = {
  initial: { x: -140, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  viewport: { once: true, margin: "-15% 0px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

/** PRODUCTS → TRANSIT. Rows pull in like vehicles; the phone follows along. */
export function ProductLanes({ products }: { products: Project[] }) {
  const [active, setActive] = useState(products[0].slug);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = list.current?.querySelectorAll<HTMLElement>("[data-slug]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.getAttribute("data-slug")!)),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = products.find((p) => p.slug === active) ?? products[0];

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,36%)]">
        <ol ref={list} className="relative">
          {/* the route line */}
          <span aria-hidden className="absolute top-3 bottom-3 left-[6px] w-0.5 bg-line-strong" />
          {products.map((p) => (
            <motion.li
              key={p.slug}
              data-slug={p.slug}
              {...arrive}
              className="relative pb-24 pl-10 sm:pl-12 lg:min-h-[64vh] lg:pb-0"
            >
              <span
                aria-hidden
                className={`absolute top-2.5 left-0 h-3.5 w-3.5 rounded-full border-2 transition-colors duration-300 ${
                  active === p.slug ? "border-fg bg-fg" : "border-line-strong bg-bg"
                }`}
              />
              <p className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] tracking-[0.14em] uppercase">
                <span className="status-light" data-status={p.status} />
                {statusLabel[p.status]}
                <span className="text-muted">· {p.platforms.join(" · ")}</span>
              </p>
              <h3 className="display mt-5 text-[clamp(2rem,9vw,5rem)]">
                <Link href={`/work/${p.slug}`} className="transition-colors hover:text-muted">
                  {p.name}
                </Link>
              </h3>
              <p className="lede mt-5 max-w-lg text-fg/80">{p.tagline}</p>
              {p.route && (
                <p className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  <span aria-hidden className="h-0.5 w-6 bg-orange" />
                  Connects to {p.route}
                </p>
              )}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={`/work/${p.slug}`} className="btn btn-secondary btn-sm">
                  Inspect
                  <Icon icon={ArrowRight02Icon} size={16} />
                </Link>
                {p.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-sm text-muted hover:text-fg">
                    {l.label}
                    <Icon icon={ArrowUpRight01Icon} size={16} />
                  </a>
                ))}
                <Confirm items={p.confirm} />
              </div>
              {/* phones: flat on small screens, the pinned one handles desktop */}
              <div className="mt-8 flex justify-center lg:hidden">
                <FlatPhone project={p} className="max-w-[220px]" />
              </div>
            </motion.li>
          ))}
        </ol>
        <div className="hidden lg:block">
          <div className="sticky top-20 h-[calc(100svh-7rem)]">
            <PhoneStage project={current} />
            <p className="label -mt-6 text-center">Drag to spin</p>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
