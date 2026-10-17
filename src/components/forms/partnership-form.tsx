"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { lookingForOptions, partnershipFields } from "@/lib/forms/partnership-schema";
import { track } from "@/lib/analytics";
import { buttonClass } from "@/components/ui/button";
import { Honeypot, SelectField, TextField } from "./fields";
import { FormSubmitError } from "./form-alerts";
import { useSubmission } from "./use-submission";

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
    // Submitted to /api/partnership, which reports success only once delivery is confirmed
    // (the Partnership Leads sheet, when configured).
    const result = await submit(values);
    if (result.status === "success") {
      track("partnership_application_submitted", { looking_for: values.lookingFor });
      setValues(EMPTY);
    } else if (result.status === "error") {
      track("form_submission_failed", { form: "partnership", reason: result.kind });
      if (process.env.NODE_ENV !== "production") console.warn("[partnership form] submission failed:", result.kind);
      if (result.kind === "validation" && result.fieldErrors) showErrors(result.fieldErrors);
    }
  }

  if (state.status === "success") {
    return (
      <div
        ref={rootRef}
        role="status"
        aria-live="polite"
        className="scroll-mt-24 rounded-card border border-accent-line bg-accent-soft p-6 sm:p-10"
      >
        <CheckCircle2 aria-hidden className="size-10 text-accent" />
        <h3 ref={successRef} tabIndex={-1} className="mt-5 max-w-xl text-xl leading-snug font-semibold text-pretty text-ink outline-none sm:text-2xl">
          Thank you for applying to partner with Mvaak! Your application has been submitted successfully. Our team will review
          your details.
        </h3>
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
          <FormSubmitError state={state} noun="application" />
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
                  <Loader2 aria-hidden className="size-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  Submit Form <Send aria-hidden className="size-4" />
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
