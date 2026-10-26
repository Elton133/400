import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

// One icon family (Hugeicons), one stroke weight, everywhere.

export function Icon({ icon, size = 18, className = "" }: { icon: IconSvgElement; size?: number; className?: string }) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={1.75} className={`flex-none ${className}`} aria-hidden />;
}
