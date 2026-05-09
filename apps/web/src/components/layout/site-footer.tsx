import { APP_NAME } from "@scale-kit/utils";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t py-10">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground sm:px-6">
        <p>
          © {year} {APP_NAME}. UI foundation (Phase 2).
        </p>
      </div>
    </footer>
  );
}
