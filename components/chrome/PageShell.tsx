import { ViewTransition } from "react";

/** Wraps each page so navigations swipe the old page away like a message. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-swipe" exit="page-swipe" default="none">
      <main id="main">{children}</main>
    </ViewTransition>
  );
}
