import Link from "next/link";

import { APP_NAME } from "@scale-kit/utils";

import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-heading text-sm font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {APP_NAME}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-3">
          <a
            href="#contact"
            className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Contact
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
