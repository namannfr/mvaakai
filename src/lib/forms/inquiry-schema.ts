import { z } from "zod";
import { engagementModels, projectTypes } from "@/content/services";

/** Shared by the client form and the /api/inquiry route. */

export const modalities = [
  { id: "rgb-video", label: "RGB video" },
  { id: "stereo-video", label: "Stereo video" },
  { id: "imu", label: "IMU / motion" },
  { id: "hand-pose", label: "Hand tracking / pose" },
  { id: "eye-tracking", label: "Eye tracking / gaze" },
  { id: "exocentric", label: "Paired third-person views" },
  { id: "audio", label: "Audio / speech" },
  { id: "text", label: "Text" },
  { id: "unsure", label: "Not sure yet" },
] as const;

export const environments = [
  { id: "household", label: "Household" },
  { id: "commercial", label: "Commercial" },
  { id: "agricultural", label: "Agricultural" },
  { id: "warehouse", label: "Warehouse" },
  { id: "industrial", label: "Industrial" },
  { id: "other", label: "Other" },
] as const;

export const requestTypes = [
  { id: "project", label: "Discuss a project", hint: "Scope a collection or annotation project with us." },
  { id: "sample", label: "Request a sample", hint: "Availability depends on the data and your requirements — we’ll confirm." },
] as const;

export const annotationLayerOptions = [
  { id: "actions", label: "Action labels" },
  { id: "sub-actions", label: "Sub-action labels" },
  { id: "objects", label: "Object references" },
  { id: "segmentation", label: "Task segmentation" },
  { id: "hand-pose", label: "Hand pose" },
  { id: "unsure", label: "Not sure yet" },
] as const;

export const timelines = [
  { id: "asap", label: "As soon as possible" },
  { id: "1-3-months", label: "Within 1–3 months" },
  { id: "3-6-months", label: "Within 3–6 months" },
  { id: "exploring", label: "Exploring / no fixed date" },
] as const;

export const engagementOptions = [
  ...engagementModels.map((m) => ({ id: m.id, label: m.name })),
  { id: "undecided", label: "Not sure yet" },
] as const;

const ids = <T extends readonly { id: string }[]>(list: T) =>
  list.map((x) => x.id) as unknown as [T[number]["id"], ...T[number]["id"][]];

const optionalText = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`).optional().or(z.literal(""));

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i.test(v), "Enter a full URL starting with https://")
  .optional();

export const inquirySchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name.").max(120),
    email: z.string().trim().email("Enter a valid work email address.").max(200),
    company: z.string().trim().min(1, "Please enter your company or organisation.").max(160),
    jobTitle: optionalText(120),
    requestType: z.enum(ids(requestTypes)).default("project"),
    projectType: z.enum(ids(projectTypes), { error: "Choose the closest project type." }),
    engagementModel: z.enum(ids(engagementOptions)).default("undecided"),
    modalities: z.array(z.enum(ids(modalities))).min(1, "Select at least one modality, or “Not sure yet”."),
    environments: z.array(z.enum(ids(environments))).default([]),
    taskFamilies: optionalText(600),
    aiApplication: optionalText(600),
    annotationLayers: z.array(z.enum(ids(annotationLayerOptions))).default([]),
    deliveryFormat: optionalText(200),
    existingData: optionalText(600),
    description: z
      .string()
      .trim()
      .min(20, "A sentence or two helps us respond usefully (20 characters minimum).")
      .max(4000, "Please keep this under 4,000 characters."),
    scale: optionalText(200),
    timeline: z.enum(ids(timelines)).optional().or(z.literal("")),
    requirements: optionalText(2000),
    specUrl: optionalUrl,
    consent: z.literal(true, { error: "Please confirm we may use these details to respond." }),
    /** Honeypot — any value is silently discarded by the API. */
    website: z.string().max(500).optional(),
    submissionId: z.string().min(8).max(64),
    source: z.string().max(200).optional(),
  })
  .superRefine((v, ctx) => {
    if (v.projectType === "egocentric-video" && v.environments.length === 0) {
      ctx.addIssue({ code: "custom", path: ["environments"], message: "Select at least one environment." });
    }
  });

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;

export const labelFor = <T extends readonly { id: string; label: string }[]>(list: T, id?: string) =>
  list.find((x) => x.id === id)?.label ?? id ?? "";
