import { connection } from "next/server";
import { configuredChannels } from "@/lib/server/deliver";

/** Lets the forms tell visitors whether online submission is live. Never exposes secrets. */
export async function GET() {
  await connection();
  return Response.json(
    { live: configuredChannels().length > 0 },
    { headers: { "Cache-Control": "no-store" } },
  );
}
