import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { crew } from "@/content/crew";
import { visibleProjects } from "@/content/projects";
import { chatStats } from "@/content/site";

const live = visibleProjects.filter((p) => p.status === "live").length;

const doors = [
  { href: "/work", kicker: "The work", title: "Every app, every lane", meta: `${visibleProjects.length} projects · ${live} live` },
  { href: "/crew", kicker: "The crew", title: "Four stops on one route", meta: "Joyce · Leslie · Elton · Efo" },
  { href: "/track-record", kicker: "The receipts", title: "Dated, checkable proof", meta: "App Store · first client · first school" },
  {
    href: "/story",
    kicker: "The story",
    title: "Database 2 to 400",
    meta: `${chatStats[0].value.toLocaleString("en-GB")} messages and counting`,
  },
];

/** The homepage is the trailer. These are the doors to the full pages. */
export function Doors() {
  return (
    <nav aria-label="Go deeper" className="border-t border-line">
      <ul>
        {doors.map((d) => (
          <li key={d.href} className="border-b border-line">
            <Link href={d.href} className="group block transition-colors hover:bg-surface">
              <span className="wrap flex flex-wrap items-center gap-x-10 gap-y-3 py-10 md:py-12">
                <span className="label w-28">{d.kicker}</span>
                <span className="display t-title transition-transform duration-300 group-hover:translate-x-2">{d.title}</span>
                <span className="ml-auto inline-flex items-center gap-3 text-sm text-muted transition-colors group-hover:text-fg">
                  {d.href === "/crew" && (
                    <span aria-hidden className="flex -space-x-1.5">
                      {crew.map((m) => (
                        <span key={m.id} className="h-4 w-4 rounded-full ring-2 ring-bg" style={{ background: m.color }} />
                      ))}
                    </span>
                  )}
                  {d.meta}
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
                    <Icon icon={ArrowRight02Icon} size={16} />
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
