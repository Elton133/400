"use client";

import { useAccraTime } from "@/lib/accra";

export function AccraLabel({ className = "" }: { className?: string }) {
  const t = useAccraTime();
  return (
    <span className={`label tabular-nums ${className}`} aria-live="off">
      Accra <span className="text-fg">{t ? t.label : "--:--"}</span> · {t ? (t.push ? "2AM push" : "Office hours") : "…"}
    </span>
  );
}
