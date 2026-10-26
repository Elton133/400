"use client";

import { TickDouble02Icon } from "@hugeicons/core-free-icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";

// A chat bubble in the corner on every navigation: typing… then read.

type Phase = "idle" | "typing" | "seen";

export function TransitionBubble() {
  const pathname = usePathname();
  const [prev, setPrev] = useState(pathname);
  const [phase, setPhase] = useState<Phase>("idle");

  if (pathname !== prev) {
    setPrev(pathname);
    setPhase("typing");
  }

  useEffect(() => {
    if (phase === "idle") return;
    const id = window.setTimeout(() => setPhase(phase === "typing" ? "seen" : "idle"), phase === "typing" ? 380 : 700);
    return () => window.clearTimeout(id);
  }, [phase]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed right-5 bottom-5 z-60 flex h-9 items-center rounded-2xl rounded-br-md bg-fg px-3.5 text-bg shadow-lg transition-all duration-200 ${
        phase === "idle" ? "translate-y-3 scale-90 opacity-0" : "translate-y-0 scale-100 opacity-100"
      }`}
    >
      {phase === "seen" ? (
        <Icon icon={TickDouble02Icon} size={16} className="text-green" />
      ) : (
        <span className="typing-dots text-[9px]">
          <span />
          <span />
          <span />
        </span>
      )}
    </div>
  );
}
