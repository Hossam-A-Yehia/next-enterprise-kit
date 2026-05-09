import type { ReactNode } from "react";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SkipLink } from "./skip-link";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <div className="relative flex min-h-full flex-col">
        <SiteHeader />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
