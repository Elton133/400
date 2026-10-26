"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import type { Project } from "@/content/projects";
import { useReducedMotion } from "@/lib/motion";
import { FlatPhone } from "./FlatPhone";

const Phone3D = dynamic(() => import("./Phone3D"), { ssr: false });

let webgl: boolean | undefined;
function canRender3D() {
  if (webgl === undefined) {
    try {
      const c = document.createElement("canvas");
      const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4 || "connection" in navigator && (navigator as { connection?: { saveData?: boolean } }).connection?.saveData;
      webgl = !lowPower && !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
  }
  return webgl;
}

const noop = () => () => {};

/** Picks the 3D phone when the device can take it; otherwise the flat frame. */
export function PhoneStage({ project }: { project: Project }) {
  const capable = useSyncExternalStore(noop, canRender3D, () => false);
  const reduced = useReducedMotion();

  if (!capable || reduced) {
    return (
      <div className="flex h-full items-center justify-center">
        <FlatPhone project={project} />
      </div>
    );
  }
  return <Phone3D project={project} />;
}
