"use client";

import { ArrowRight02Icon, Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { crew } from "@/content/crew";
import { AccraLabel } from "./AccraLabel";

/** Phones only: the nav links don't fit beside the logo and the request button. */
export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line-strong md:hidden"
      >
        <Icon icon={open ? Cancel01Icon : Menu01Icon} size={18} />
      </button>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-bg md:hidden">
          <nav aria-label="Menu" className="wrap flex min-h-full flex-col py-6">
            <ul className="divide-y divide-line border-y border-line">
              {[{ href: "/", label: "Home" }, ...links].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={close} className="flex items-center justify-between py-5">
                    <span className="display text-4xl">{l.label}</span>
                    <Icon icon={ArrowRight02Icon} size={20} className="text-muted" />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="label mt-8">The crew</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {crew.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/crew/${m.id}`}
                    onClick={close}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-[15px]"
                  >
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: m.color }} />
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              <Link href="/request" onClick={close} className="btn btn-primary w-full">
                Send us a request
                <Icon icon={ArrowRight02Icon} size={18} />
              </Link>
              <AccraLabel className="mt-5 block text-center" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
