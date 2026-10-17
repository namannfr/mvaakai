/**
 * Server-only lead delivery. Never import from a client component.
 *
 * Channels (any combination; a submission succeeds only if at least one channel
 * actually accepts it — the site never reports success otherwise):
 *   1. Email via Resend        RESEND_API_KEY + LEADS_FROM_EMAIL
 *   2. Webhook (CRM, Sheets…)  LEADS_WEBHOOK_URL (+ optional LEADS_WEBHOOK_SECRET)
 *   3. Local JSONL file        LEADS_LOCAL_DIR — for local development and
 *                              self-hosted servers with persistent disks only.
 */
import { createHmac } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type LeadKind = "inquiry" | "partnership";

export type Lead = {
  kind: LeadKind;
  id: string;
  subject: string;
  replyTo: string;
  /** Ordered label/value pairs for the human-readable email. */
  sections: { heading: string; rows: [string, string][] }[];
  /** Validated payload, forwarded as-is to webhooks and the local store. */
  data: Record<string, unknown>;
};

type Channel = "email" | "webhook" | "local";

const env = (k: string) => process.env[k]?.trim() || undefined;

export function configuredChannels(): Channel[] {
  const channels: Channel[] = [];
  if (env("RESEND_API_KEY") && env("LEADS_FROM_EMAIL")) channels.push("email");
  if (env("LEADS_WEBHOOK_URL")) channels.push("webhook");
  if (env("LEADS_LOCAL_DIR")) channels.push("local");
  return channels;
}

function recipients(kind: LeadKind) {
  const fallback = env("LEADS_TO_EMAIL") ?? "team@mvaak.com";
  const value = kind === "partnership" ? (env("PARTNERSHIP_TO_EMAIL") ?? fallback) : fallback;
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function renderText(lead: Lead, submittedAt: string) {
  const lines = [`${lead.subject}`, `Reference: ${lead.id}`, `Submitted: ${submittedAt}`, ""];
  for (const s of lead.sections) {
    lines.push(s.heading.toUpperCase());
    for (const [k, v] of s.rows) lines.push(`${k}: ${v || "—"}`);
    lines.push("");
  }
  return lines.join("\n");
}

function renderHtml(lead: Lead, submittedAt: string) {
  const sections = lead.sections
    .map(
      (s) => `<h3 style="font:600 13px/1.4 system-ui;letter-spacing:.08em;text-transform:uppercase;color:#315bea;margin:24px 0 8px">${escapeHtml(s.heading)}</h3>
<table style="border-collapse:collapse;width:100%;font:14px/1.5 system-ui;color:#0b1220">${s.rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px 6px 0;color:#545d6e;vertical-align:top;width:38%">${escapeHtml(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v || "—")}</td></tr>`,
        )
        .join("")}</table>`,
    )
    .join("");
  return `<div style="max-width:640px"><p style="font:600 18px/1.3 system-ui;color:#0b1220;margin:0 0 4px">${escapeHtml(lead.subject)}</p><p style="font:13px/1.4 system-ui;color:#7a8291;margin:0">Reference ${escapeHtml(lead.id)} · ${escapeHtml(submittedAt)}</p>${sections}</div>`;
}

async function sendEmail(lead: Lead, submittedAt: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env("LEADS_FROM_EMAIL"),
      to: recipients(lead.kind),
      reply_to: lead.replyTo,
      subject: lead.subject,
      text: renderText(lead, submittedAt),
      html: renderHtml(lead, submittedAt),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

async function sendWebhook(lead: Lead, submittedAt: string) {
  const body = JSON.stringify({ kind: lead.kind, id: lead.id, submittedAt, data: lead.data });
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const secret = env("LEADS_WEBHOOK_SECRET");
  if (secret) headers["X-Mvaak-Signature"] = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
  const res = await fetch(env("LEADS_WEBHOOK_URL")!, {
    method: "POST",
    headers,
    body,
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

async function storeLocally(lead: Lead, submittedAt: string) {
  const dir = path.resolve(/*turbopackIgnore: true*/ env("LEADS_LOCAL_DIR")!);
  await mkdir(dir, { recursive: true });
  const line = JSON.stringify({ kind: lead.kind, id: lead.id, submittedAt, data: lead.data }) + "\n";
  await appendFile(path.join(dir, `${lead.kind}.jsonl`), line, "utf8");
}

export type DeliveryResult =
  | { status: "delivered"; channels: Channel[] }
  | { status: "not_configured" }
  | { status: "failed"; errors: string[] };

export async function deliverLead(lead: Lead, submittedAt: string): Promise<DeliveryResult> {
  const channels = configuredChannels();
  if (channels.length === 0) return { status: "not_configured" };

  const run: Record<Channel, () => Promise<void>> = {
    email: () => sendEmail(lead, submittedAt),
    webhook: () => sendWebhook(lead, submittedAt),
    local: () => storeLocally(lead, submittedAt),
  };

  const results = await Promise.allSettled(channels.map((c) => run[c]()));
  const delivered = channels.filter((_, i) => results[i].status === "fulfilled");
  const errors = results.flatMap((r, i) =>
    r.status === "rejected" ? [`${channels[i]}: ${r.reason instanceof Error ? r.reason.message : String(r.reason)}`] : [],
  );
  if (errors.length) console.error(`[leads] ${lead.kind} ${lead.id} delivery errors:`, errors);
  return delivered.length ? { status: "delivered", channels: delivered } : { status: "failed", errors };
}
