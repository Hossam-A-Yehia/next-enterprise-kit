import { APP_NAME } from "@scale-kit/utils";

import { ContactForm } from "@/components/contact/contact-form";
import { StatusQueryPanel } from "@/components/demo/status-query-panel";
import { AppShell } from "@/components/layout/app-shell";

export default function Home() {
  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-4 py-12 sm:px-6">
        <section aria-labelledby="intro-heading" className="max-w-2xl space-y-4">
          <h1
            id="intro-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl"
          >
            {APP_NAME} — UI foundation
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This phase introduces shared primitives (design tokens, layout shell,
            accessible forms, and client data patterns) so later features stay
            consistent and fast.
          </p>
        </section>

        <section
          aria-label="Phase 2 demos"
          className="grid gap-8 lg:grid-cols-2 lg:items-start"
        >
          <StatusQueryPanel />
          <ContactForm />
        </section>
      </div>
    </AppShell>
  );
}
