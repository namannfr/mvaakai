"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { lookingForOptions, partnershipFields } from "@/lib/forms/partnership-schema";
import { labelFor } from "@/lib/forms/inquiry-schema";
import { track } from "@/lib/analytics";
import { site } from "@/config/site";
import { buttonClass } from "@/components/ui/button";
import { Honeypot, SelectField, TextField } from "./fields";
import { EmailHandoff, SubmitError } from "./form-alerts";
import { isTruncated, mailtoHref, openEmail, summaryText, useDeliveryStatus, useSubmission } from "./use-submission";

type Values = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  linkedin: string;
  lookingFor: string;
  website: string;
};

const EMPTY: Values = { fullName: "", email: "", phone: "", city: "", country: "", linkedin: "", lookingFor: "", website: "" };

/** Single-page partnership application: seven fields, one submit. */
export function PartnershipForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const started = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const live = useDeliveryStatus();
  /** Online delivery is unavailable on this deployment: submitting continues by email instead. */
  const emailMode = live === false;
  const [handedOff, setHandedOff] = useState(false);
  const { state, submit } = useSubmission("/api/partnership");
  const submitting = state.status === "submitting";

  useEffect(() => {
    if (state.status !== "success") return;
    rootRef.current?.scrollIntoView({ block: "start" });
    successRef.current?.focus({ preventScroll: true });
  }, [state.status]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key])
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
  };

  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    track("partnership_application_started");
  };

  const showErrors = (next: Record<string, string>) => {
    setErrors(next);
    requestAnimationFrame(() => rootRef.current?.querySelector<HTMLElement>(`#f-${Object.keys(next)[0]}`)?.focus());
  };

  const lines: [string, string][] = [
    ["Full name / business name", values.fullName],
    ["Email", values.email],
    ["Phone", values.phone],
    ["City", values.city],
    ["Country", values.country],
    ["LinkedIn", values.linkedin],
    ["Looking for", values.lookingFor ? labelFor(lookingForOptions, values.lookingFor) : ""],
  ];
  const mailto = mailtoHref(site.email, `Partnership application — ${values.fullName || "Mvaak website"}`, lines);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const parsed = partnershipFields.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      showErrors(next);
      return;
    }
    setErrors({});
    if (emailMode) {
      track("partnership_application_submitted", { looking_for: values.lookingFor, channel: "email_handoff" });
      openEmail(mailto);
      setHandedOff(true);
      return;
    }
    const result = await submit(values);
    if (result.status === "success") {
      track("partnership_application_submitted", { looking_for: values.lookingFor });
    } else if (result.status === "error") {
      track("form_submission_failed", { form: "partnership", reason: result.kind });
      if (result.kind === "validation" && result.fieldErrors) showErrors(result.fieldErrors);
    }
  }

  if (handedOff) {
    return (
      <EmailHandoff
        title="Finish sending your application"
        mailto={mailto}
        summary={summaryText(lines)}
        truncated={isTruncated(lines)}
        onBack={() => setHandedOff(false)}
      />
    );
  }

  if (state.status === "success") {
    return (
      <div ref={rootRef} role="status" className="scroll-mt-24 rounded-card border border-line bg-surface p-8 sm:p-10">
        <CheckCircle2 aria-hidden className="size-11 text-success" />
        <h3 ref={successRef} tabIndex={-1} className="mt-6 text-h2 font-semibold text-ink outline-none">
          Application received.
        </h3>
        <p className="mt-4 max-w-2xl text-lead text-muted">
          Thank you for your interest in partnering with Mvaak. Our team will review your details and get in touch if there is a
          fit.
        </p>
        <p className="mt-6 inline-flex rounded-lg border border-line bg-subtle px-3 py-2 font-mono text-sm text-ink-2">
          Reference: {state.reference}
        </p>
        <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
          Submitting an application does not guarantee acceptance or a project. Any collaboration is agreed in writing first.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/partnerships#faq" className={buttonClass("secondary")}>
            Read the partnership FAQ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="scroll-mt-24">
      <form
        noValidate
        onSubmit={onSubmit}
        onFocusCapture={onFirstInteraction}
        aria-label="Partnership application"
        className="rounded-card border border-line bg-surface p-5 sm:p-8"
      >
        <p className="text-sm text-muted">
          Fields marked <span className="text-danger">*</span> are required.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <TextField
            name="fullName"
            label="Full Name / Business Name"
            required
            autoComplete="name"
            value={values.fullName}
            onChange={(v) => set("fullName", v)}
            error={errors.fullName}
            className="sm:col-span-2"
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(v) => set("email", v)}
            error={errors.email}
          />
          <TextField
            name="phone"
            label="Phone Number"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+91 98765 43210"
            value={values.phone}
            onChange={(v) => set("phone", v)}
            error={errors.phone}
          />
          <TextField
            name="city"
            label="City"
            autoComplete="address-level2"
            required
            value={values.city}
            onChange={(v) => set("city", v)}
            error={errors.city}
          />
          <TextField
            name="country"
            label="Country"
            autoComplete="country-name"
            required
            value={values.country}
            onChange={(v) => set("country", v)}
            error={errors.country}
          />
          <TextField
            name="linkedin"
            label="LinkedIn Profile"
            type="url"
            inputMode="url"
            placeholder="https://www.linkedin.com/in/…"
            value={values.linkedin}
            onChange={(v) => set("linkedin", v)}
            error={errors.linkedin}
          />
          <SelectField
            name="lookingFor"
            label="Looking For"
            required
            placeholder="Select an option"
            options={lookingForOptions}
            value={values.lookingFor}
            onChange={(v) => set("lookingFor", v)}
            error={errors.lookingFor}
          />
        </div>

        <Honeypot value={values.website} onChange={(v) => set("website", v)} />

        <div className="mt-8 space-y-4 border-t border-line pt-6">
          <SubmitError state={state} mailto={mailto} />
          {emailMode && (
            <p className="text-sm text-muted">
              This opens a pre-filled email to {site.email} in your mail app — your application is sent when you press send.
            </p>
          )}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              By submitting, you agree that Mvaak may contact you about this application. See our{" "}
              <Link href="/privacy" className="text-accent underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
            <button type="submit" disabled={submitting} className={buttonClass("primary", "lg", "w-full sm:w-auto sm:shrink-0")}>
              {submitting ? (
                <>
                  <Loader2 aria-hidden className="size-4 animate-spin" /> Submitting…
                </>
              ) : emailMode ? (
                <>
                  <Mail aria-hidden className="size-4" /> Continue in your email app
                </>
              ) : (
                <>
                  Submit Application <Send aria-hidden className="size-4" />
                </>
              )}
            </button>
          </div>
          <p aria-live="polite" className="sr-only">
            {submitting ? "Submitting your application" : ""}
          </p>
        </div>
      </form>
    </div>
  );
}
