/**
 * Server-only: forwards leads to Google Apps Script web apps that append them to Google Sheets.
 * Never import from a client component.
 *
 *   Contact Us form   → "Contact Leads" script      CONTACT_SHEETS_URL     (default below)
 *   Partnership form  → "Partnerships" script       PARTNERSHIP_SHEETS_URL (default below)
 *
 * Why server-side: Apps Script web apps do not answer CORS preflights, so browsers cannot
 * read their response — and an unreadable response cannot confirm a write. From the
 * server we follow Google's redirect and read what the script actually returned.
 *
 * Success is reported ONLY when the script's response says so, e.g. {"status":"success"},
 * {"result":"success"}, {"ok":true} or a plain-text "success". A Google sign-in page,
 * a script error page, a non-2xx status or a timeout all count as failure.
 */
import type { LeadKind } from "./deliver";

/** Contact Leads endpoint supplied by Mvaak (public deployment, verified with a live test row). */
const DEFAULT_CONTACT_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbyenulaOIKX8UX8xmS-jcRRBpI0Wm72MtfzOXKnKDwtPe2Z2njBN7nM-MBMlT9Hr3I5/exec";

/** Partnerships endpoint supplied by Mvaak (public deployment). */
const DEFAULT_PARTNERSHIP_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbzZYx0LxS2bhx9S4tza3hZuhsAIE83245nzBnA40bynLpOBeynJHHf58ndxu2i-m6qe/exec";

const ENDPOINTS: Record<LeadKind, { env: string; fallback?: string }> = {
  inquiry: { env: "CONTACT_SHEETS_URL", fallback: DEFAULT_CONTACT_SHEETS_URL },
  partnership: { env: "PARTNERSHIP_SHEETS_URL", fallback: DEFAULT_PARTNERSHIP_SHEETS_URL },
};

/** Row sent to the script — flat string properties the script reads by name. */
export type SheetRow = Record<string, string>;

/** The endpoint for a form, or undefined when none is set (or it is set to "off"). */
export function sheetUrl(kind: LeadKind): string | undefined {
  const { env, fallback } = ENDPOINTS[kind];
  const v = process.env[env]?.trim();
  if (v?.toLowerCase() === "off") return undefined;
  return v || fallback;
}

const SUCCESS = new Set(["success", "ok", "saved", "created"]);

function confirmsWrite(contentType: string, body: string) {
  const text = body.trim();
  if (contentType.includes("json") || text.startsWith("{")) {
    try {
      const j = JSON.parse(text) as Record<string, unknown>;
      const word = String(j.status ?? j.result ?? "").toLowerCase();
      return SUCCESS.has(word) || j.ok === true || j.success === true;
    } catch {
      return false;
    }
  }
  return /^success\b/i.test(text);
}

/** Describes a failed response for logs without including any lead data. */
function describe(res: Response, body: string) {
  const host = (() => {
    try {
      return new URL(res.url).host;
    } catch {
      return "unknown";
    }
  })();
  if (/accounts\.google\.com|\/ServiceLogin|AccountChooser/.test(res.url) || /<title>Sign in/i.test(body)) {
    return `endpoint requires Google sign-in (deployment access is not "Anyone") — final host ${host}`;
  }
  const type = res.headers.get("content-type") ?? "unknown";
  if (type.includes("html")) {
    const title = body.match(/<title>([^<]{0,80})/i)?.[1] ?? "untitled";
    return `HTML page instead of a confirmation (status ${res.status}, title "${title}")`;
  }
  return `unconfirmed response (status ${res.status}, ${type}, ${body.length} bytes)`;
}

export async function appendSheetRow(kind: LeadKind, row: SheetRow): Promise<void> {
  const url = sheetUrl(kind);
  if (!url) throw new Error(`No sheet endpoint configured for ${kind}`);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row),
    // Apps Script answers with a 302 to script.googleusercontent.com, where the script's output is served.
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  const body = await res.text().catch(() => "");
  if (!res.ok || !confirmsWrite(res.headers.get("content-type") ?? "", body)) {
    throw new Error(`Google Sheets: ${describe(res, body)}`);
  }
}
