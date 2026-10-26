import Image from "next/image";
import { type Project, statusLabel } from "@/content/projects";
import { brandOf, textOn } from "./screen";

/** The no-WebGL / mobile / low-power phone: just the screen, no bezel, same content. */
export function FlatPhone({ project, className = "" }: { project: Project; className?: string }) {
  const bg = brandOf(project);
  const fg = textOn(bg);
  return (
    <div
      className={`relative aspect-[9/19.5] w-full max-w-[260px] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgb(20_20_20/0.45)] transition-colors duration-500 ${className}`}
      style={{ background: bg, color: fg }}
    >
      <div className="relative h-full">
        {project.screens?.[0] ? (
          <Image src={project.screens[0]} alt={`${project.name} screenshot`} fill sizes="260px" className="object-cover" />
        ) : (
          <div className="flex h-full flex-col p-5">
            <p className="font-mono text-[10px] tracking-wider uppercase opacity-70">
              400 · {project.platforms.join(" · ")}
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[10px] font-semibold tracking-wider">
              <span className="status-light" data-status={project.status} />
              {statusLabel[project.status]}
            </p>
            <p className="display mt-auto text-[2.6rem]">
              {project.name}
            </p>
            <p className="mt-3 text-sm leading-snug">{project.tagline}</p>
            <p className="mt-8 font-mono text-[9px] tracking-wider uppercase opacity-60">Screenshots coming</p>
          </div>
        )}
      </div>
    </div>
  );
}
