"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { projectTypes } from "@/content/services";
import {
  annotationLayerOptions,
  engagementOptions,
  requestTypes,
  environments,
  inquirySchema,
  labelFor,
  modalities,
  timelines,
} from "@/lib/forms/inquiry-schema";
import { track } from "@/lib/analytics";
import { site } from "@/config/site";
import { buttonClass } from "@/components/ui/button";
import { ChoiceGroup, ConsentCheckbox, FormGroup, Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { EmailHandoff, SubmitError } from "./form-alerts";
import { isTruncated, mailtoHref, openEmail, summaryText, useDeliveryStatus, useSubmission } from "./use-submission";

type FormValues = {
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  projectType: string;
  engagementModel: string;
  requestType: string;
  aiApplication: string;
  annotationLayers: string[];
  deliveryFormat: string;
  modalities: string[];
  environments: string[];
  taskFamilies: string;
  existingData: string;
  description: string;
  scale: string;
  timeline: string;
  requirements: string;
  specUrl: string;
  consent: boolean;
  website: string;
};

const DEFAULT_MODALITIES: Record<string, string[]> = {
  "egocentric-video": ["rgb-video", "imu"],
  "audio-annotation": ["audio"],
  "video-annotation": ["rgb-video"],
  "text-annotation": ["text"],
};

const HOLDS_DATA = ["annotation-rescue", "video-annotation", "audio-annotation", "text-annotation", "quality-assurance"];
const COLLECTS_IN_FIELD = ["egocentric-video", "data-collection"];

function initialValues(params: URLSearchParams): FormValues {
  const type = params.get("type") ?? "";
  const model = params.get("model") ?? "";
  const projectType = projectTypes.some((p) => p.id === type) ? type : "";
  const intent = params.get("intent") === "sample" ? "sample" : "project";
  const env = params.get("env") ?? "";
  return {
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    projectType,
    engagementModel: engagementOptions.some((m) => m.id === model) ? model : "undecided",
    modalities: DEFAULT_MODALITIES[projectType] ?? [],
    environments: environments.some((e) => e.id === env) ? [env] : [],
    taskFamilies: "",
    requestType: intent,
    aiApplication: "",
    annotationLayers: [],
    deliveryFormat: "",
    existingData: "",
    description: "",
    scale: "",
    timeline: "",
    requirements: "",
    specUrl: "",
    consent: false,
    website: "",
  };
}

export function InquiryForm() {
  const params = useSearchParams();
  const [values, setValues] = useState<FormValues>(() => initialValues(params));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [handedOff, setHandedOff] = useState(false);
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const live = useDeliveryStatus();
  const { state, submit } = useSubmission("/api/inquiry");
  /** Online delivery is unavailable on this deployment: the form continues by email instead. */
  const emailMode = live === false;

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
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
    track("project_inquiry_started", { project_type: values.projectType || "unset" });
  };

  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status !== "success") return;
    successRef.current?.scrollIntoView({ block: "center" });
    successRef.current?.focus({ preventScroll: true });
  }, [state.status]);

  const showEnvironments = COLLECTS_IN_FIELD.includes(values.projectType);
  const showExistingData = HOLDS_DATA.includes(values.projectType);
  const isEgo = values.projectType === "egocentric-video";

  const lines: [string, string][] = [
    ["Name", values.name],
    ["Work email", values.email],
    ["Company", values.company],
    ["Job title", values.jobTitle],
    ["Project type", labelFor(projectTypes, values.projectType)],
    ["Engagement model", labelFor(engagementOptions, values.engagementModel)],
    ["Modalities", values.modalities.map((m) => labelFor(modalities, m)).join(", ")],
    ["Environments", showEnvironments ? values.environments.map((e) => labelFor(environments, e)).join(", ") : ""],
    ["Task families", showEnvironments ? values.taskFamilies : ""],
    ["Intended AI application", isEgo ? values.aiApplication : ""],
    ["Annotation layers", isEgo ? values.annotationLayers.map((a) => labelFor(annotationLayerOptions, a)).join(", ") : ""],
    ["Delivery format", isEgo ? values.deliveryFormat : ""],
    ["Data already held", showExistingData ? values.existingData : ""],
    ["Project description", values.description],
    ["Expected scale", values.scale],
    ["Timeline", values.timeline ? labelFor(timelines, values.timeline) : ""],
    ["Additional requirements", values.requirements],
    ["Specification link", values.specUrl],
  ];
  const subject = `${values.requestType === "sample" ? "Sample request" : "Project inquiry"} — ${values.company || values.name || "Mvaak website"}`;
  const mailto = mailtoHref(site.email, subject, lines);

  function validate(payload: Record<string, unknown>) {
    const parsed = inquirySchema.safeParse({ ...payload, submissionId: "client-validation" });
    if (parsed.success) return true;
    const next: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
    const first = formRef.current?.querySelector<HTMLElement>(`#f-${Object.keys(next)[0]}`);
    first?.focus();
    first?.scrollIntoView({ block: "center", behavior: "smooth" });
    return false;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state.status === "submitting") return;
    const payload = {
      ...values,
      environments: showEnvironments ? values.environments : [],
      taskFamilies: showEnvironments ? values.taskFamilies : "",
      aiApplication: isEgo ? values.aiApplication : "",
      annotationLayers: isEgo ? values.annotationLayers : [],
      deliveryFormat: isEgo ? values.deliveryFormat : "",
      existingData: showExistingData ? values.existingData : "",
      source: window.location.pathname + window.location.search,
    };
    if (!validate(payload)) return;

    if (emailMode) {
      track("project_inquiry_submitted", { project_type: values.projectType, channel: "email_handoff" });
      openEmail(mailto);
      setHandedOff(true);
      return;
    }

    const result = await submit(payload);
    if (result.status === "success") {
      track("project_inquiry_submitted", { project_type: values.projectType, engagement_model: values.engagementModel });
    } else if (result.status === "error") {
      track("form_submission_failed", { form: "inquiry", reason: result.kind });
      if (result.kind === "validation" && result.fieldErrors) setErrors(result.fieldErrors);
    }
  }

  if (handedOff) {
    return (
      <EmailHandoff
        title="Finish sending your inquiry"
        mailto={mailto}
        summary={summaryText(lines)}
        truncated={isTruncated(lines)}
        onBack={() => setHandedOff(false)}
      />
    );
  }

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="scroll-mt-28 rounded-card border border-line bg-surface p-6 outline-none sm:p-10">
        <CheckCircle2 aria-hidden className="size-10 text-success" />
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink">Thank you — your inquiry has been received.</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-muted">
          We’ll review your requirements and reply to <span className="font-medium text-ink">{values.email}</span>, usually with a
          few clarifying questions or a proposed next step. If something is urgent, email{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2">
            {site.email}
          </a>{" "}
          and quote your reference.
        </p>
        <p className="mt-6 inline-flex rounded-lg border border-line bg-subtle px-3 py-2 font-mono text-sm text-ink-2">
          Reference: {state.reference}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/services/egocentric-video-data" className={buttonClass("secondary")}>
            Explore egocentric data
          </Link>
          <Link href="/blog" className={buttonClass("ghost")}>
            Read our insights
          </Link>
        </div>
      </div>
    );
  }

  const submitting = state.status === "submitting";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onFocusCapture={onFirstInteraction}
      aria-labelledby="inquiry-form-title"
      aria-describedby="inquiry-required-note"
      className="relative overflow-hidden rounded-card border border-line bg-surface shadow-[0_1px_2px_rgb(21_26_33/0.04),0_24px_48px_-32px_rgb(21_26_33/0.25)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b border-line bg-subtle px-5 py-5 sm:px-8">
        <h2 id="inquiry-form-title" className="text-lg font-semibold text-ink">
          Project inquiry
        </h2>
        <p id="inquiry-required-note" className="text-sm text-muted">
          About 3 minutes · <span className="text-danger" aria-hidden>*</span> required
        </p>
      </div>

      <FormGroup n="01" title="About you" description="So we know who to reply to.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="name" label="Name" required autoComplete="name" value={values.name} onChange={(v) => set("name", v)} error={errors.name} />
          <TextField name="email" label="Work email" type="email" inputMode="email" required autoComplete="email" value={values.email} onChange={(v) => set("email", v)} error={errors.email} />
          <TextField name="company" label="Company or organisation" required autoComplete="organization" value={values.company} onChange={(v) => set("company", v)} error={errors.company} />
          <TextField name="jobTitle" label="Job title" autoComplete="organization-title" value={values.jobTitle} onChange={(v) => set("jobTitle", v)} error={errors.jobTitle} />
        </div>
      </FormGroup>

      <FormGroup n="02" title="The project" description="What you need and what the model should learn.">
        <ChoiceGroup
          name="requestType"
          legend="What would you like to do?"
          required
          options={requestTypes}
          value={values.requestType}
          onChange={(v) => set("requestType", v as string)}
          error={errors.requestType}
          columns="2"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            name="projectType"
            label="Project type"
            required
            placeholder="Select the closest match"
            options={projectTypes}
            value={values.projectType}
            onChange={(v) => {
              set("projectType", v);
              if (values.modalities.length === 0 && DEFAULT_MODALITIES[v]) set("modalities", DEFAULT_MODALITIES[v]);
            }}
            error={errors.projectType}
          />
          <SelectField
            name="engagementModel"
            label="Engagement model"
            hint={
              <>
                See <Link href="/#engagement-models" className="text-accent underline underline-offset-2">the four models</Link>.
              </>
            }
            options={engagementOptions}
            value={values.engagementModel}
            onChange={(v) => set("engagementModel", v)}
            error={errors.engagementModel}
          />
        </div>

        <ChoiceGroup
          name="modalities"
          legend="Data modalities required"
          multiple
          required
          options={modalities}
          value={values.modalities}
          onChange={(v) => set("modalities", v as string[])}
          error={errors.modalities}
          hint="Some modalities depend on the capture rig and agreed scope — select what you need and we’ll confirm feasibility."
        />

        {showEnvironments && (
          <div className="space-y-5 rounded-xl border border-accent-line bg-accent-soft/50 p-4 sm:p-5">
            <ChoiceGroup
              name="environments"
              legend="Collection environments"
              multiple
              required={values.projectType === "egocentric-video"}
              options={environments}
              value={values.environments}
              onChange={(v) => set("environments", v as string[])}
              error={errors.environments}
            />
            <TextAreaField
              name="taskFamilies"
              label="Task families or skills the model needs to learn"
              rows={3}
              maxLength={600}
              placeholder="e.g. folding garments, restocking shelves, transplanting seedlings — including failure and recovery cases"
              value={values.taskFamilies}
              onChange={(v) => set("taskFamilies", v)}
              error={errors.taskFamilies}
            />
            {isEgo && (
              <>
                <TextAreaField
                  name="aiApplication"
                  label="Intended AI application"
                  rows={2}
                  maxLength={600}
                  placeholder="e.g. a manipulation policy for a household robot"
                  value={values.aiApplication}
                  onChange={(v) => set("aiApplication", v)}
                  error={errors.aiApplication}
                />
                <ChoiceGroup
                  name="annotationLayers"
                  legend="Desired annotation layers"
                  multiple
                  options={annotationLayerOptions}
                  value={values.annotationLayers}
                  onChange={(v) => set("annotationLayers", v as string[])}
                  error={errors.annotationLayers}
                  hint="Annotation depth is agreed during scoping — pick what you think you need."
                />
                <TextField
                  name="deliveryFormat"
                  label="Expected delivery format"
                  placeholder="e.g. LeRobot, RLDS, MCAP — or leave blank"
                  value={values.deliveryFormat}
                  onChange={(v) => set("deliveryFormat", v)}
                  error={errors.deliveryFormat}
                />
                <p className="rounded-lg bg-surface px-3 py-2 text-sm text-muted">
                  Not sure about the technical details? Describe the task and we can identify the requirements to discuss.
                </p>
              </>
            )}
          </div>
        )}

        {showExistingData && (
          <TextAreaField
            name="existingData"
            label="Data you already hold"
            rows={3}
            maxLength={600}
            hint="Approximate volume, current format and label schema, if any."
            value={values.existingData}
            onChange={(v) => set("existingData", v)}
            error={errors.existingData}
          />
        )}

        <TextAreaField
          name="description"
          label="Project description"
          required
          rows={5}
          maxLength={4000}
          hint="What are you building, and what does the model currently get wrong?"
          value={values.description}
          onChange={(v) => set("description", v)}
          error={errors.description}
        />
      </FormGroup>

      <FormGroup n="03" title="Scale and requirements" description="Rough figures are fine — leave blank if unknown.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="scale" label="Expected scale" placeholder="e.g. 200 hours, 50k utterances" value={values.scale} onChange={(v) => set("scale", v)} error={errors.scale} />
          <SelectField name="timeline" label="Timeline" placeholder="Select a timeline" options={timelines} value={values.timeline} onChange={(v) => set("timeline", v)} error={errors.timeline} />
        </div>
        <TextAreaField
          name="requirements"
          label="Additional requirements"
          rows={3}
          maxLength={2000}
          hint="Delivery format, languages, redaction, exclusivity, security or anything else we should know."
          value={values.requirements}
          onChange={(v) => set("requirements", v)}
          error={errors.requirements}
        />
        <TextField
          name="specUrl"
          label="Link to a specification or brief"
          type="url"
          inputMode="url"
          placeholder="https://"
          hint="A shared-drive link works. This form doesn’t accept file uploads."
          value={values.specUrl}
          onChange={(v) => set("specUrl", v)}
          error={errors.specUrl}
        />
      </FormGroup>

      <div className="space-y-5 border-t border-line bg-subtle px-5 py-7 sm:px-8">
        <ConsentCheckbox name="consent" checked={values.consent} onChange={(v) => set("consent", v)} error={errors.consent}>
          I agree that Mvaak may use these details to respond to my inquiry, as described in the{" "}
          <Link href="/privacy" className="text-accent underline underline-offset-2">
            privacy notice
          </Link>
          .
        </ConsentCheckbox>
        <Honeypot value={values.website} onChange={(v) => set("website", v)} />
        <SubmitError state={state} mailto={mailto} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" disabled={submitting} className={buttonClass("primary", "lg", "w-full sm:w-auto sm:shrink-0 sm:whitespace-nowrap")}>
            {submitting ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin" /> Sending…
              </>
            ) : emailMode ? (
              <>
                <Mail aria-hidden className="size-4" /> Continue in your email app
              </>
            ) : (
              <>
                Send inquiry <Send aria-hidden className="size-4" />
              </>
            )}
          </button>
          <p className="text-sm text-muted sm:text-right">
            {emailMode ? (
              <>Opens a pre-filled email to {site.email} — it’s sent when you press send.</>
            ) : (
              <>
                Prefer email?{" "}
                <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2">
                  {site.email}
                </a>
              </>
            )}
          </p>
        </div>
        <p aria-live="polite" className="sr-only">
          {submitting ? "Sending your inquiry" : ""}
        </p>
      </div>
    </form>
  );
}
