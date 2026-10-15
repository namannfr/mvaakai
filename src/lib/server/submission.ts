/**
 * Shared request handling for the form endpoints: body parsing, honeypot,
 * per-IP rate limiting and idempotent replays of the same submission.
 *
 * The in-memory maps are per server instance. That is enough to stop accidental
 * double submits and casual abuse; put a WAF or edge rate limit in front for more.
 */
import type { ZodType } from "zod";
import { deliverLead, type Lead } from "./deliver";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();
const completed = new Map<string, { at: number; reference: string }>();

function rateLimited(key: string, now: number) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export function referenceFor(prefix: string, submissionId: string) {
  return `${prefix}-${submissionId.replace(/[^a-z0-9]/gi, "").slice(0, 8).toUpperCase()}`;
}

export async function handleSubmission<T extends { submissionId: string; website?: string }>(
  request: Request,
  options: {
    kind: Lead["kind"];
    schema: ZodType<T>;
    toLead: (data: T, reference: string) => Lead;
    prefix: string;
  },
) {
  const now = Date.now();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";

  if (rateLimited(`${options.kind}:${ip}`, now)) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const parsed = options.schema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return json({ ok: false, error: "validation", fieldErrors }, 400);
  }

  const data = parsed.data;
  const reference = referenceFor(options.prefix, data.submissionId);

  // Honeypot filled: respond like success without delivering, so bots learn nothing.
  if (data.website) return json({ ok: true, reference });

  const previous = completed.get(data.submissionId);
  if (previous) return json({ ok: true, reference: previous.reference, duplicate: true });

  const submittedAt = new Date(now).toISOString();
  const result = await deliverLead(options.toLead(data, reference), submittedAt);

  if (result.status === "not_configured") {
    return json({ ok: false, error: "not_configured" }, 503);
  }
  if (result.status === "failed") {
    return json({ ok: false, error: "delivery_failed" }, 502);
  }

  completed.set(data.submissionId, { at: now, reference });
  for (const [k, v] of completed) if (now - v.at > 24 * 60 * 60 * 1000) completed.delete(k);

  return json({ ok: true, reference });
}
