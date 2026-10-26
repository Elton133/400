import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { AccraLabel } from "./AccraLabel";

const links = [
  { href: "/work", label: "Work" },
  { href: "/crew", label: "Crew" },
  { href: "/story", label: "Story" },
  { href: "/track-record", label: "Track record", wide: true },
];

export function Nav() {
  return (
    <header style={{ viewTransitionName: "site-header" }} className="sticky top-0 z-50 border-b border-line bg-bg">
      <nav className="wrap flex h-16 items-center gap-6 sm:gap-10" aria-label="Main">
        <Link href="/" className="display text-[26px] tracking-[-0.06em] text-orange" aria-label="400, home">
          400
        </Link>
        <ul className="flex items-center gap-5 text-[15px] sm:gap-7">
          {links.map((l) => (
            <li key={l.href} className={"wide" in l ? "hidden md:block" : ""}>
              <Link href={l.href} className="py-3 text-muted transition-colors hover:text-fg">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <AccraLabel className="ml-auto hidden lg:inline" />
        <Link href="/request" className="btn btn-primary btn-sm ml-auto lg:ml-0">
          <span className="hidden sm:inline">Send a request</span>
          <span className="sm:hidden">Request</span>
          <Icon icon={ArrowRight02Icon} size={16} />
        </Link>
      </nav>
    </header>
  );
}
