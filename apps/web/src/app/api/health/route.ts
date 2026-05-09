import { NextResponse } from "next/server";

import { APP_NAME } from "@scale-kit/utils";

export async function GET() {
  return NextResponse.json(
    { status: "ok" as const, service: APP_NAME, time: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
