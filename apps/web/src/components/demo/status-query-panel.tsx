"use client";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { useContactDemoStore } from "@/stores/demo-ui-store";

type HealthPayload = {
  status: string;
  service: string;
  time: string;
};

async function fetchHealth(): Promise<HealthPayload> {
  const res = await fetch("/api/health");
  if (!res.ok) {
    throw new Error(`Request failed with ${res.status}`);
  }
  return res.json();
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function StatusQueryPanel() {
  const lastContactSubmitAt = useContactDemoStore((s) => s.lastContactSubmitAt);

  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
  });

  return (
    <Card
      className="w-full max-w-lg"
      size="sm"
      role="region"
      aria-labelledby="status-heading"
    >
      <CardHeader>
        <h2
          id="status-heading"
          className="font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm"
        >
          Service status
        </h2>
        <CardDescription>
          TanStack Query demo hitting{" "}
          <code className="font-mono text-xs">GET /api/health</code>. Refetches show
          stale-while-revalidate behavior.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        {lastContactSubmitAt != null && (
          <p className="text-muted-foreground" role="status" aria-live="polite">
            Last contact form success:{" "}
            {formatTime(new Date(lastContactSubmitAt).toISOString())} (from Zustand
            store)
          </p>
        )}

        {isPending && (
          <p className="text-muted-foreground" aria-live="polite">
            Loading status…
          </p>
        )}

        {isError && (
          <p className="text-destructive" role="alert">
            {error instanceof Error ? error.message : "Could not load status."}
          </p>
        )}

        {data && !isPending && (
          <dl className="grid gap-2 text-muted-foreground">
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-foreground">Service</dt>
              <dd className="text-right">{data.service}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-foreground">Status</dt>
              <dd className="text-right uppercase">{data.status}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-foreground">Server time</dt>
              <dd className="text-right tabular-nums">{formatTime(data.time)}</dd>
            </div>
          </dl>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => refetch()}
          disabled={isFetching}
          aria-busy={isFetching}
        >
          {isFetching ? "Refreshing…" : "Refresh status"}
        </Button>
      </CardContent>
    </Card>
  );
}
