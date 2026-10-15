/**
 * Provider-agnostic analytics. Events are sent only if a provider script is
 * configured (see components/analytics/analytics-scripts.tsx); otherwise they are
 * dropped. No values are fabricated and no personal form data is ever sent.
 */
export type AnalyticsEvent =
  | "cta_clicked"
  | "project_inquiry_started"
  | "project_inquiry_submitted"
  | "partnership_application_started"
  | "partnership_application_step"
  | "partnership_application_submitted"
  | "service_page_viewed"
  | "form_submission_failed";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
    gtag?: (command: "event", event: string, params?: Props) => void;
  }
}

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  const clean = Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined));
  try {
    window.plausible?.(event, { props: clean });
    window.gtag?.("event", event, clean);
  } catch {
    // Analytics must never break the page.
  }
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", event, clean);
}
