import { ArrowRight02Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { crew } from "@/content/crew";
import { contact } from "@/content/site";
import { LastSeenLine } from "./LastSeenLine";

export function LastSeen() {
  return (
    <footer className="border-t border-line bg-surface" aria-labelledby="last-seen">
      <div className="wrap pt-28 pb-10 md:pt-40">
        <h2 id="last-seen" className="display t-page max-w-[12ch]">
          Your idea is one message away<span className="text-orange">.</span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link href="/request" className="btn btn-primary">
            Send us a request
            <Icon icon={ArrowRight02Icon} size={18} />
          </Link>
          <a href={`mailto:${contact.email}`} className="btn btn-secondary">
            <Icon icon={Mail01Icon} size={18} />
            {contact.email}
          </a>
        </div>

        <LastSeenLine />

        <nav aria-label="Footer" className="mt-20 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["The work", [["All projects", "/work"], ["Trofficient", "/work/trofficient"], ["Beagine", "/work/beagine"], ["Skill Academy", "/work/skill-academy"]]],
            ["The crew", crew.map((m) => [m.name, `/crew/${m.id}`])],
            ["About", [["Story", "/story"], ["Track record", "/track-record"]]],
            ["Talk to us", [["Send a request", "/request"], [contact.email, `mailto:${contact.email}`]]],
          ].map(([title, items]) => (
            <div key={title as string}>
              <p className="label">{title as string}</p>
              <ul className="mt-4 flex flex-col gap-2 text-[15px]">
                {(items as string[][]).map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-muted transition-colors hover:text-fg">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-8">
          <p className="sign text-4xl">Built by 400 in Accra.</p>
          <div className="flex flex-col items-end gap-3">
            <ul className="flex flex-wrap gap-4 text-sm">
              {crew.map((m) => (
                <li key={m.id}>
                  <Link href={`/crew/${m.id}`} className="inline-flex items-center gap-2 hover:underline">
                    <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: m.color }} />
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="label">Probably after midnight</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
