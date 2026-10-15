"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, Mail, Pencil, Send } from "lucide-react";
import {
  arrangements,
  capabilities,
  dedicatedMembers,
  durations,
  equipmentInterest,
  feeWillingness,
  partnershipSteps,
  stages,
  teamSizes,
  weeklyHours,
  yesNoDiscuss,
} from "@/lib/forms/partnership-schema";
import { labelFor } from "@/lib/forms/inquiry-schema";
import { track } from "@/lib/analytics";
import { site } from "@/config/site";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { ChoiceGroup, ConsentCheckbox, Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { EmailHandoff, SubmitError } from "./form-alerts";
import { isTruncated, mailtoHref, openEmail, summaryText, useDeliveryStatus, useSubmission } from "./use-submission";

type Values = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  linkedin: string;
  companyName: string;
  companyWebsite: string;
  teamSize: string;
  stage: string;
  teamDescription: string;
  expertise: string;
  capabilities: string[];
  capabilitiesOther: string;
  experience: string;
  equipment: string;
  accessibleEnvironments: string;
  portfolioUrl: string;
  dedicatedMembers: string;
  weeklyHours: string;
  duration: string;
  startDate: string;
  followProtocols: string;
  trainingWillingness: string;
  equipmentInterest: string;
  constraints: string;
  feeWillingness: string;
  arrangement: string;
  commercialQuestions: string;
  consentAccurate: boolean;
  consentContact: boolean;
  consentNoGuarantee: boolean;
  consentAgreement: boolean;
  website: string;
};

const EMPTY: Values = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  country: "India",
  linkedin: "",
  companyName: "",
  companyWebsite: "",
  teamSize: "",
  stage: "",
  teamDescription: "",
  expertise: "",
  capabilities: [],
  capabilitiesOther: "",
  experience: "",
  equipment: "",
  accessibleEnvironments: "",
  portfolioUrl: "",
  dedicatedMembers: "",
  weeklyHours: "",
  duration: "",
  startDate: "",
  followProtocols: "",
  trainingWillingness: "",
  equipmentInterest: "",
  constraints: "",
  feeWillingness: "",
  arrangement: "",
  commercialQuestions: "",
  consentAccurate: false,
  consentContact: false,
  consentNoGuarantee: false,
  consentAgreement: false,
  website: "",
};

const DRAFT_KEY = "mvaak-partnership-draft-v1";
const CONSENTS = ["consentAccurate", "consentContact", "consentNoGuarantee", "consentAgreement"] as const;
const NOT_PERSISTED = new Set(["consentAccurate", "consentContact", "consentNoGuarantee", "consentAgreement", "website"]);

function readDraft(): Partial<Values> | null {
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Partial<Values>) : null;
  } catch {
    return null;
  }
}

function writeDraft(v: Values | null) {
  try {
    if (v === null) window.sessionStorage.removeItem(DRAFT_KEY);
    else {
      // Acknowledgements are always re-confirmed, so they are never persisted.
      const rest = Object.fromEntries(Object.entries(v).filter(([k]) => !NOT_PERSISTED.has(k)));
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(rest));
    }
  } catch {
    // Storage unavailable (private mode, blocked) — the form still works.
  }
}

export function PartnershipForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [today, setToday] = useState<string | undefined>();
  const [restored, setRestored] = useState(false);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const live = useDeliveryStatus();
  /** Online delivery is unavailable on this deployment: the final step continues by email instead. */
  const emailMode = live === false;
  const [handedOff, setHandedOff] = useState(false);
  const { state, submit } = useSubmission("/api/partnership");

  useEffect(() => {
    // Client-only: restore an in-progress draft and compute today's date for the date picker.
    const draft = readDraft();
    const d = new Date();
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    queueMicrotask(() => {
      setToday(iso);
      if (draft && Object.keys(draft).length) {
        setValues((v) => ({ ...v, ...draft }));
        setRestored(true);
      }
    });
  }, []);

  useEffect(() => {
    if (state.status === "success") return;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    writeDraft(values);
  }, [values, state.status]);

  // Move to the confirmation once it has replaced the (much taller) form.
  const successRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (state.status !== "success") return;
    rootRef.current?.scrollIntoView({ block: "start" });
    successRef.current?.focus({ preventScroll: true });
  }, [state.status]);

  useEffect(() => {
    if (step === 0 && maxStep === 0) return;
    headingRef.current?.focus({ preventScroll: true });
    rootRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [step, maxStep]);

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

  function validateStep(index: number) {
    const result = partnershipSteps[index].schema.safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
    requestAnimationFrame(() => {
      const el = rootRef.current?.querySelector<HTMLElement>(`#f-${Object.keys(next)[0]}`);
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
    return false;
  }

  function goTo(index: number) {
    setErrors({});
    setStep(index);
    setMaxStep((m) => Math.max(m, index));
    track("partnership_application_step", { step: partnershipSteps[index].id });
  }

  function next() {
    if (!validateStep(step)) return;
    goTo(step + 1);
  }

  // Most decision-relevant fields first, in case a long application has to be shortened for email.
  const lines: [string, string][] = [
    ["Name", values.fullName],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Location", [values.city, values.country].filter(Boolean).join(", ")],
    ["Company / team", values.companyName],
    ["Team size", values.teamSize ? labelFor(teamSizes, values.teamSize) : ""],
    ["Stage", values.stage ? labelFor(stages, values.stage) : ""],
    ["Primary expertise", values.expertise],
    ["Capabilities", values.capabilities.map((c) => (c === "other" && values.capabilitiesOther ? `Other: ${values.capabilitiesOther}` : labelFor(capabilities, c))).join(", ")],
    ["Dedicated members", values.dedicatedMembers ? labelFor(dedicatedMembers, values.dedicatedMembers) : ""],
    ["Hours per week (team)", values.weeklyHours ? labelFor(weeklyHours, values.weeklyHours) : ""],
    ["Preferred duration", values.duration ? labelFor(durations, values.duration) : ""],
    ["Earliest start", values.startDate],
    ["Follows structured protocols", values.followProtocols ? labelFor(yesNoDiscuss, values.followProtocols) : ""],
    ["Willing to train", values.trainingWillingness ? labelFor(yesNoDiscuss, values.trainingWillingness) : ""],
    ["Equipment-supported projects", values.equipmentInterest ? labelFor(equipmentInterest, values.equipmentInterest) : ""],
    ["Initial fee, if applicable", values.feeWillingness ? labelFor(feeWillingness, values.feeWillingness) : ""],
    ["Preferred arrangement", values.arrangement ? labelFor(arrangements, values.arrangement) : ""],
    ["Environments accessible", values.accessibleEnvironments],
    ["Equipment available", values.equipment],
    ["Relevant experience", values.experience],
    ["Team description", values.teamDescription],
    ["Website", values.companyWebsite],
    ["LinkedIn", values.linkedin],
    ["Portfolio", values.portfolioUrl],
    ["Constraints", values.constraints],
    ["Commercial questions", values.commercialQuestions],
    ["Acknowledgements", CONSENTS.every((k) => values[k]) ? "All four confirmed" : ""],
  ];
  const mailto = mailtoHref(site.email, `Partnership application — ${values.companyName || values.fullName || "Mvaak website"}`, lines);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step !== partnershipSteps.length - 1) return next();
    if (state.status === "submitting") return;
    // Re-validate every step so nothing invalid slips through after edits.
    for (let i = 0; i < partnershipSteps.length; i++) {
      if (!partnershipSteps[i].schema.safeParse(values).success) {
        setStep(i);
        requestAnimationFrame(() => validateStep(i));
        return;
      }
    }
    if (emailMode) {
      track("partnership_application_submitted", { team_size: values.teamSize, stage: values.stage, channel: "email_handoff" });
      openEmail(mailto);
      setHandedOff(true);
      return;
    }
    const result = await submit(values);
    if (result.status === "success") {
      writeDraft(null);
      track("partnership_application_submitted", {
        team_size: values.teamSize,
        stage: values.stage,
        capabilities: values.capabilities.join(","),
      });
    } else if (result.status === "error") {
      track("form_submission_failed", { form: "partnership", reason: result.kind });
      if (result.kind === "validation" && result.fieldErrors) {
        setErrors(result.fieldErrors);
        const field = Object.keys(result.fieldErrors)[0];
        const owner = partnershipSteps.findIndex((s) => field in s.schema.shape);
        if (owner >= 0) setStep(owner);
      }
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
      <div ref={rootRef} role="status" className="scroll-mt-24 rounded-card border border-line bg-surface p-8 sm:p-12">
        <CheckCircle2 aria-hidden className="size-11 text-success" />
        <h3 ref={successRef} tabIndex={-1} className="mt-6 text-h2 font-semibold text-ink outline-none">
          Application Received.
        </h3>
        <p className="mt-4 max-w-2xl text-lead text-muted">
          Thank you for your interest in partnering with Mvaak. Our team will review your details and contact you if your
          capabilities align with an upcoming requirement.
        </p>
        <p className="mt-6 inline-flex rounded-lg border border-line bg-subtle px-3 py-2 font-mono text-sm text-ink-2">
          Reference: {state.reference}
        </p>
        <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
          Submitting an application does not guarantee acceptance or a project assignment. If you are shortlisted, scope, hours,
          equipment, training and any commercial terms are discussed with you and documented in writing before any work or
          payment.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/partnerships#faq" className={buttonClass("secondary")}>
            Read the partnership FAQ
          </Link>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Partnership application ${state.reference}`)}`} className={buttonClass("ghost")}>
            Email a follow-up question
          </a>
        </div>
      </div>
    );
  }

  const current = partnershipSteps[step];
  const isLast = step === partnershipSteps.length - 1;
  const submitting = state.status === "submitting";

  return (
    <div ref={rootRef} className="scroll-mt-24">
      {/* Progress */}
      <nav aria-label="Application progress" className="mb-6">
        <p className="mb-3 flex items-center justify-between gap-4 text-sm text-muted" aria-live="polite">
          <span>
            <span className="font-medium text-ink">Step {step + 1} of {partnershipSteps.length}</span>
            <span className="sm:hidden"> · {current.title}</span>
          </span>
          <span>
            {partnershipSteps.length - 1 - step === 0
              ? "Final step"
              : `${partnershipSteps.length - 1 - step} ${partnershipSteps.length - 1 - step === 1 ? "step" : "steps"} remaining`}
          </span>
        </p>
        <div className="h-1 overflow-hidden rounded-full bg-sunken sm:hidden" aria-hidden>
          <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${((step + 1) / partnershipSteps.length) * 100}%` }} />
        </div>
        <ol className="hidden grid-cols-6 gap-2 sm:grid">
          {partnershipSteps.map((s, i) => {
            const done = i !== step && i < maxStep;
            const reachable = i <= maxStep;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  disabled={!reachable || submitting}
                  onClick={() => {
                    if (i > step && !validateStep(step)) return;
                    goTo(i);
                  }}
                  aria-current={i === step ? "step" : undefined}
                  className="group flex w-full flex-col items-start gap-2 rounded-lg pb-1 text-left disabled:cursor-not-allowed"
                >
                  <span className={cn("h-1 w-full rounded-full transition-colors", i <= step ? "bg-accent" : reachable ? "bg-accent/40" : "bg-sunken")} />
                  <span className={cn("flex items-center gap-1.5 text-[0.8125rem]", i === step ? "font-medium text-ink" : reachable ? "text-ink-2 group-hover:text-accent" : "text-faint")}>
                    {done && i !== step ? <Check aria-hidden className="size-3.5 text-accent" /> : <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>}
                    {s.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <form
        noValidate
        onSubmit={onSubmit}
        onFocusCapture={onFirstInteraction}
        className="relative rounded-card border border-line bg-surface p-5 sm:p-8"
        aria-labelledby="partnership-step-title"
      >
        <div className="space-y-4 empty:hidden">
          {restored && step === 0 && (
            <p role="status" className="rounded-lg border border-line bg-subtle px-3 py-2 text-sm text-muted">
              We restored your unsent answers from this browser session.{" "}
              <button
                type="button"
                className="font-medium text-accent underline underline-offset-2"
                onClick={() => {
                  writeDraft(null);
                  setValues(EMPTY);
                  setRestored(false);
                }}
              >
                Start over
              </button>
            </p>
          )}
        </div>

        <div key={step} className="animate-reveal">
          <p className="mt-6 font-mono text-xs tracking-[0.14em] text-accent uppercase">
            Step {step + 1} of {partnershipSteps.length}
          </p>
          <h3 id="partnership-step-title" ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-semibold tracking-tight text-ink outline-none">
            {STEP_HEADINGS[step]}
          </h3>
          <p className="mt-2 text-[0.9375rem] text-muted">
            Fields marked <span className="text-danger">*</span> are required.
          </p>

          <div className="mt-8 space-y-6">
            {step === 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField name="fullName" label="Full name" required autoComplete="name" value={values.fullName} onChange={(v) => set("fullName", v)} error={errors.fullName} className="sm:col-span-2" />
                <TextField name="email" label="Work email" type="email" inputMode="email" required autoComplete="email" value={values.email} onChange={(v) => set("email", v)} error={errors.email} />
                <TextField name="phone" label="Phone number" type="tel" inputMode="tel" required autoComplete="tel" placeholder="+91 98765 43210" hint="Include the country code." value={values.phone} onChange={(v) => set("phone", v)} error={errors.phone} />
                <TextField name="city" label="City" required autoComplete="address-level2" value={values.city} onChange={(v) => set("city", v)} error={errors.city} />
                <TextField name="country" label="Country" required autoComplete="country-name" value={values.country} onChange={(v) => set("country", v)} error={errors.country} />
                <TextField name="linkedin" label="LinkedIn profile" type="url" inputMode="url" placeholder="https://linkedin.com/in/…" value={values.linkedin} onChange={(v) => set("linkedin", v)} error={errors.linkedin} className="sm:col-span-2" />
              </div>
            )}

            {step === 1 && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField name="companyName" label="Company, startup or team name" required autoComplete="organization" value={values.companyName} onChange={(v) => set("companyName", v)} error={errors.companyName} />
                  <TextField name="companyWebsite" label="Website" type="url" inputMode="url" placeholder="https://" hint="If you have one." value={values.companyWebsite} onChange={(v) => set("companyWebsite", v)} error={errors.companyWebsite} />
                  <SelectField name="teamSize" label="Team size" required options={teamSizes} value={values.teamSize} onChange={(v) => set("teamSize", v)} error={errors.teamSize} />
                  <TextField name="expertise" label="Primary area of expertise" required placeholder="e.g. field operations, computer vision, hardware" value={values.expertise} onChange={(v) => set("expertise", v)} error={errors.expertise} />
                </div>
                <ChoiceGroup name="stage" legend="Stage" required options={stages} value={values.stage} onChange={(v) => set("stage", v as string)} error={errors.stage} columns="auto" />
                <TextAreaField name="teamDescription" label="Team description" required rows={4} maxLength={1500} hint="Who is on the team, how you work together, and what you have delivered before." value={values.teamDescription} onChange={(v) => set("teamDescription", v)} error={errors.teamDescription} />
              </>
            )}

            {step === 2 && (
              <>
                <ChoiceGroup name="capabilities" legend="Capabilities" hint="Select all that apply." multiple required options={capabilities} value={values.capabilities} onChange={(v) => set("capabilities", v as string[])} error={errors.capabilities} />
                {values.capabilities.includes("other") && (
                  <TextField name="capabilitiesOther" label="Other capabilities" required value={values.capabilitiesOther} onChange={(v) => set("capabilitiesOther", v)} error={errors.capabilitiesOther} />
                )}
                <TextAreaField name="experience" label="Relevant experience" required rows={4} maxLength={2000} hint="Data collection, annotation, field work, hardware or AI projects — with scale where you can." value={values.experience} onChange={(v) => set("experience", v)} error={errors.experience} />
                <TextAreaField name="equipment" label="Equipment currently available" required rows={2} maxLength={1000} hint="Cameras, smart glasses, XR headsets, computers, storage — or write “None”." value={values.equipment} onChange={(v) => set("equipment", v)} error={errors.equipment} />
                <TextAreaField name="accessibleEnvironments" label="Environments or locations you can access" required rows={3} maxLength={1000} hint="e.g. homes in your city, a commercial kitchen, retail stores, farms — and in which states or regions." value={values.accessibleEnvironments} onChange={(v) => set("accessibleEnvironments", v)} error={errors.accessibleEnvironments} />
                <TextField name="portfolioUrl" label="Example project or portfolio" type="url" inputMode="url" placeholder="https://" value={values.portfolioUrl} onChange={(v) => set("portfolioUrl", v)} error={errors.portfolioUrl} />
              </>
            )}

            {step === 3 && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField name="dedicatedMembers" label="Team members you could dedicate" required options={dedicatedMembers} value={values.dedicatedMembers} onChange={(v) => set("dedicatedMembers", v)} error={errors.dedicatedMembers} />
                  <SelectField name="weeklyHours" label="Estimated hours available per week" hint="Combined, across the dedicated members." required options={weeklyHours} value={values.weeklyHours} onChange={(v) => set("weeklyHours", v)} error={errors.weeklyHours} />
                  <SelectField name="duration" label="Preferred engagement duration" required options={durations} value={values.duration} onChange={(v) => set("duration", v)} error={errors.duration} />
                  <TextField name="startDate" label="Earliest start date" type="date" required min={today} value={values.startDate} onChange={(v) => set("startDate", v)} error={errors.startDate} />
                </div>
                <ChoiceGroup name="followProtocols" legend="Can your team follow structured capture or annotation protocols exactly?" required options={yesNoDiscuss} value={values.followProtocols} onChange={(v) => set("followProtocols", v as string)} error={errors.followProtocols} />
                <ChoiceGroup name="trainingWillingness" legend="Is the team willing to take part in training before work begins?" required options={yesNoDiscuss} value={values.trainingWillingness} onChange={(v) => set("trainingWillingness", v as string)} error={errors.trainingWillingness} />
                <ChoiceGroup name="equipmentInterest" legend="Interest in equipment-supported projects" required options={equipmentInterest} value={values.equipmentInterest} onChange={(v) => set("equipmentInterest", v as string)} error={errors.equipmentInterest} columns="1" hint="Equipment is provided only where agreed and available for an approved project." />
                <TextAreaField name="constraints" label="Constraints or requirements" rows={3} maxLength={1500} hint="Availability limits, travel, languages, accessibility or anything else we should plan around." value={values.constraints} onChange={(v) => set("constraints", v)} error={errors.constraints} />
              </>
            )}

            {step === 4 && (
              <>
                <div className="rounded-xl border border-line bg-subtle p-4 text-[0.9375rem] leading-relaxed text-ink-2">
                  Some collaborations may involve an initial project or onboarding fee. <strong className="font-medium text-ink">No amount is set on this website</strong>, the
                  application is free, and you are not agreeing to any payment by answering. If a fee applies to a project, its exact
                  amount and what it covers are disclosed in writing before you decide.
                </div>
                <ChoiceGroup name="feeWillingness" legend="Would you be willing to discuss a clearly defined initial project fee, if one applies?" required options={feeWillingness} value={values.feeWillingness} onChange={(v) => set("feeWillingness", v as string)} error={errors.feeWillingness} columns="1" />
                <ChoiceGroup name="arrangement" legend="Preferred commercial arrangement" required options={arrangements} value={values.arrangement} onChange={(v) => set("arrangement", v as string)} error={errors.arrangement} />
                <TextAreaField name="commercialQuestions" label="Questions or concerns" rows={4} maxLength={2000} hint="About equipment, training, scope, hours or commercial terms." value={values.commercialQuestions} onChange={(v) => set("commercialQuestions", v)} error={errors.commercialQuestions} />
              </>
            )}

            {step === 5 && (
              <>
                <ReviewSummary values={values} onEdit={(i) => goTo(i)} />
                <fieldset className="space-y-4 rounded-xl border border-line p-4 sm:p-5">
                  <legend className="px-1 text-[0.9375rem] font-medium text-ink">Acknowledgements</legend>
                  <ConsentCheckbox name="consentAccurate" checked={values.consentAccurate} onChange={(v) => set("consentAccurate", v)} error={errors.consentAccurate}>
                    The information in this application is accurate.
                  </ConsentCheckbox>
                  <ConsentCheckbox name="consentContact" checked={values.consentContact} onChange={(v) => set("consentContact", v)} error={errors.consentContact}>
                    Mvaak may contact me about this application.
                  </ConsentCheckbox>
                  <ConsentCheckbox name="consentNoGuarantee" checked={values.consentNoGuarantee} onChange={(v) => set("consentNoGuarantee", v)} error={errors.consentNoGuarantee}>
                    I understand that submitting an application does not guarantee acceptance or a project assignment.
                  </ConsentCheckbox>
                  <ConsentCheckbox name="consentAgreement" checked={values.consentAgreement} onChange={(v) => set("consentAgreement", v)} error={errors.consentAgreement}>
                    I understand that final participation depends on evaluation and a written agreement.
                  </ConsentCheckbox>
                </fieldset>
                <p className="text-sm leading-relaxed text-muted">
                  We use your details only to evaluate this application and contact you about it. We don’t ask for identity documents,
                  financial details or other sensitive personal information. See our{" "}
                  <Link href="/privacy" className="text-accent underline underline-offset-2">
                    privacy notice
                  </Link>
                  .
                </p>
              </>
            )}
          </div>
        </div>

        <Honeypot value={values.website} onChange={(v) => set("website", v)} />

        <div className="mt-8 space-y-4 border-t border-line pt-6">
          {isLast && <SubmitError state={state} mailto={mailto} />}
          {isLast && emailMode && (
            <p className="text-sm text-muted">
              This opens a pre-filled email to {site.email} in your mail app — your application is sent when you press send.
            </p>
          )}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {step > 0 ? (
              <button type="button" onClick={() => goTo(step - 1)} disabled={submitting} className={buttonClass("secondary", "lg", "w-full sm:w-auto")}>
                <ArrowLeft aria-hidden className="size-4" /> Previous
              </button>
            ) : (
              <span className="hidden sm:block" />
            )}
            {isLast ? (
              <button type="submit" disabled={submitting} className={buttonClass("primary", "lg", "w-full sm:w-auto sm:shrink-0 sm:whitespace-nowrap")}>
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
                    Submit application <Send aria-hidden className="size-4" />
                  </>
                )}
              </button>
            ) : (
              <button type="submit" className={buttonClass("primary", "lg", "w-full sm:w-auto")}>
                Continue to {partnershipSteps[step + 1].title} <ArrowRight aria-hidden className="size-4" />
              </button>
            )}
          </div>
          <p aria-live="polite" className="sr-only">
            {submitting ? "Submitting your application" : ""}
          </p>
        </div>
      </form>
      <p className="mt-4 text-center text-sm text-muted">
        Prefer email? Write to{" "}
        <a href={`mailto:${site.email}?subject=Partnership%20application`} className="text-accent underline underline-offset-2">
          {site.email}
        </a>
        . Applying is free.
      </p>
    </div>
  );
}

const STEP_HEADINGS = [
  "About you",
  "Your team or startup",
  "What your team can do",
  "Your commitment",
  "Commercial readiness",
  "Review and submit",
];

function ReviewSummary({ values: v, onEdit }: { values: Values; onEdit: (step: number) => void }) {
  const sections: { step: number; title: string; rows: [string, string][] }[] = [
    {
      step: 0,
      title: "Applicant",
      rows: [
        ["Name", v.fullName],
        ["Email", v.email],
        ["Phone", v.phone],
        ["Location", [v.city, v.country].filter(Boolean).join(", ")],
        ["LinkedIn", v.linkedin],
      ],
    },
    {
      step: 1,
      title: "Team",
      rows: [
        ["Company / team", v.companyName],
        ["Website", v.companyWebsite],
        ["Team size", labelFor(teamSizes, v.teamSize)],
        ["Stage", labelFor(stages, v.stage)],
        ["Expertise", v.expertise],
        ["Description", v.teamDescription],
      ],
    },
    {
      step: 2,
      title: "Capabilities",
      rows: [
        ["Capabilities", v.capabilities.map((c) => (c === "other" && v.capabilitiesOther ? `Other: ${v.capabilitiesOther}` : labelFor(capabilities, c))).join(", ")],
        ["Experience", v.experience],
        ["Equipment", v.equipment],
        ["Environments", v.accessibleEnvironments],
        ["Portfolio", v.portfolioUrl],
      ],
    },
    {
      step: 3,
      title: "Commitment",
      rows: [
        ["Dedicated members", labelFor(dedicatedMembers, v.dedicatedMembers)],
        ["Hours per week", labelFor(weeklyHours, v.weeklyHours)],
        ["Duration", labelFor(durations, v.duration)],
        ["Earliest start", v.startDate],
        ["Follows protocols", labelFor(yesNoDiscuss, v.followProtocols)],
        ["Training", labelFor(yesNoDiscuss, v.trainingWillingness)],
        ["Equipment-supported", labelFor(equipmentInterest, v.equipmentInterest)],
        ["Constraints", v.constraints],
      ],
    },
    {
      step: 4,
      title: "Commercial",
      rows: [
        ["Initial fee, if applicable", labelFor(feeWillingness, v.feeWillingness)],
        ["Arrangement", labelFor(arrangements, v.arrangement)],
        ["Questions", v.commercialQuestions],
      ],
    },
  ];
  return (
    <div className="divide-y divide-line rounded-xl border border-line">
      {sections.map((s) => (
        <section key={s.title} className="p-4 sm:p-5" aria-label={`${s.title} summary`}>
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-mono text-xs tracking-[0.14em] text-faint uppercase">{s.title}</h4>
            <button type="button" onClick={() => onEdit(s.step)} className="inline-flex min-h-9 items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong">
              <Pencil aria-hidden className="size-3.5" /> Edit <span className="sr-only">{s.title}</span>
            </button>
          </div>
          <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-[10rem_1fr]">
            {s.rows.map(([k, val]) => (
              <div key={k} className="contents">
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="text-sm break-words whitespace-pre-line text-ink">{val || <span className="text-faint">—</span>}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
