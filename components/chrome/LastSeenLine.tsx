"use client";

import { useAccraTime } from "@/lib/accra";

export function LastSeenLine() {
  const t = useAccraTime();
  return (
    <p className="mt-16 inline-flex items-center gap-3 rounded-full border border-line bg-bg px-4 py-2.5 font-chat text-[15px]">
      <span className="status-light" data-status="live" aria-hidden />
      <span>
        <strong className="font-semibold">400</strong>
        <span className="text-muted"> · last seen today at </span>
        <span className="tabular-nums">{t ? t.label : "--:--"}</span>
        {t?.push && <span className="text-muted"> (yes, we&apos;re still up)</span>}
      </span>
    </p>
  );
}
