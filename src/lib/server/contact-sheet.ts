/**
 * Server-only: forwards Contact Us leads to the Google Apps Script "Contact Leads" web app,
 * which appends them to the Contact Leads spreadsheet. Never import from a client component.
 *
 * Why server-side: the Apps Script web app does not answer CORS preflights, so browsers
 * cannot read its response — and an unreadable response cannot confirm a write. From the
 * server we can follow Google's redirect and read what the script actually returned.
 *
 * Success is reported ONLY when the script's response says so, e.g. {"status":"success"},
 * {"result":"success"}, {"ok":true} or a plain-text "success". A Google sign-in page,
 * a script error page, a non-2xx status or a timeout all count as failure.
 */

/** Contact Leads endpoint supplied by Mvaak. Override with CONTACT_SHEETS_URL; set it to "off" to disable. */
const DEFAULT_CONTACT_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbxcQWWr_8869W1m0KrxF16VcSHthCMW_Yid1FeWPecps4XVtVenYMktyU4D5-lJ2IA0rw/exec";

export type ContactSheetRow = {
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  inquiryType: string;
  projectDetails: string;
};

export function contactSheetUrl(): string | undefined {
  const v = process.env.CONTACT_SHEETS_URL?.trim();
  if (v?.toLowerCase() === "off") return undefined;
  return v || DEFAULT_CONTACT_SHEETS_URL;
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

export async function appendContactLead(row: ContactSheetRow): Promise<void> {
  const url = contactSheetUrl();
  if (!url) throw new Error("Contact sheet endpoint is disabled");
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
