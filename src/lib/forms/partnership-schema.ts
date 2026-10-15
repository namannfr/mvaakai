import { z } from "zod";

/** Shared by the multi-step client form and the /api/partnership route. */

export const teamSizes = [
  { id: "1", label: "1 person" },
  { id: "2", label: "2 people" },
  { id: "3-4", label: "3–4 people" },
  { id: "5-10", label: "5–10 people" },
  { id: "11+", label: "11 or more" },
] as const;

export const stages = [
  { id: "individual-team", label: "Individual team" },
  { id: "idea", label: "Idea stage" },
  { id: "early-stage", label: "Early-stage startup" },
  { id: "established", label: "Established startup" },
  { id: "service-provider", label: "Existing service provider" },
] as const;

export const capabilities = [
  { id: "egocentric-capture", label: "Egocentric video capture" },
  { id: "hardware", label: "Hardware and device handling" },
  { id: "robotics", label: "Robotics" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "annotation", label: "Data annotation" },
  { id: "qa", label: "Quality assurance" },
  { id: "field-ops", label: "Field operations" },
  { id: "coordination", label: "Project coordination" },
  { id: "other", label: "Other" },
] as const;

export const dedicatedMembers = [
  { id: "1", label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
  { id: "4", label: "4" },
  { id: "5+", label: "5 or more" },
] as const;

export const weeklyHours = [
  { id: "under-10", label: "Under 10 hours" },
  { id: "10-20", label: "10–20 hours" },
  { id: "20-40", label: "20–40 hours" },
  { id: "40-80", label: "40–80 hours" },
  { id: "80+", label: "More than 80 hours" },
] as const;

export const durations = [
  { id: "under-1-month", label: "Under 1 month" },
  { id: "1-3-months", label: "1–3 months" },
  { id: "3-6-months", label: "3–6 months" },
  { id: "6-months-plus", label: "6 months or longer" },
  { id: "flexible", label: "Flexible" },
] as const;

export const yesNoDiscuss = [
  { id: "yes", label: "Yes" },
  { id: "discuss", label: "Would like to discuss" },
  { id: "no", label: "No" },
] as const;

export const equipmentInterest = [
  { id: "yes", label: "Yes — interested in equipment-supported projects" },
  { id: "own-equipment", label: "We prefer to use our own equipment" },
  { id: "unsure", label: "Not sure yet" },
] as const;

export const feeWillingness = [
  {
    id: "open",
    label: "Open to discussing it",
    hint: "Only if the amount and exactly what it covers are documented before any payment.",
  },
  { id: "need-information", label: "Need more information first", hint: "We would want to understand the terms before deciding." },
  {
    id: "no-upfront-fee",
    label: "Prefer arrangements without an upfront fee",
    hint: "We are still interested in being considered.",
  },
] as const;

export const arrangements = [
  { id: "per-project", label: "Fixed fee per project or deliverable" },
  { id: "per-hour", label: "Rate per accepted hour or unit of work" },
  { id: "revenue-share", label: "Revenue share" },
  { id: "retainer", label: "Monthly retainer" },
  { id: "open", label: "Open to discussion" },
] as const;

const ids = <T extends readonly { id: string }[]>(list: T) =>
  list.map((x) => x.id) as unknown as [T[number]["id"], ...T[number]["id"][]];

const choose = <T extends readonly { id: string }[]>(list: T, message: string) =>
  z.enum(ids(list), { error: message });

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i.test(v), "Enter a full URL starting with https://")
  .optional();

const text = (min: number, max: number, message: string) =>
  z.string().trim().min(min, message).max(max, `Please keep this under ${max.toLocaleString("en-US")} characters.`);

export const applicantStep = z.object({
  fullName: text(2, 120, "Please enter your full name."),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .regex(/^\+\d[\d\s-]{6,18}\d$/, "Include your country code, e.g. +91 98765 43210."),
  city: text(2, 80, "Please enter your city."),
  country: text(2, 80, "Please enter your country."),
  linkedin: optionalUrl,
});

export const teamStep = z.object({
  companyName: text(2, 160, "Enter your company, startup or team name."),
  companyWebsite: optionalUrl,
  teamSize: choose(teamSizes, "Select your team size."),
  stage: choose(stages, "Select the stage that fits best."),
  teamDescription: text(30, 1500, "Tell us a little about the team (30 characters minimum)."),
  expertise: text(2, 160, "What is the team's primary area of expertise?"),
});

const capabilitiesBase = z.object({
    capabilities: z.array(z.enum(ids(capabilities))).min(1, "Select at least one capability."),
    capabilitiesOther: z.string().trim().max(200).optional(),
    experience: text(30, 2000, "Describe relevant experience (30 characters minimum)."),
    equipment: text(2, 1000, "List equipment you have, or write “None”."),
    accessibleEnvironments: text(10, 1000, "Describe the environments or locations you can access."),
    portfolioUrl: optionalUrl,
});

const requireOtherDetail = (v: { capabilities: string[]; capabilitiesOther?: string }, ctx: z.RefinementCtx) => {
  if (v.capabilities.includes("other") && !v.capabilitiesOther?.trim()) {
    ctx.addIssue({ code: "custom", path: ["capabilitiesOther"], message: "Tell us what “Other” covers." });
  }
};

export const capabilitiesStep = capabilitiesBase.superRefine(requireOtherDetail);

export const commitmentStep = z.object({
  dedicatedMembers: choose(dedicatedMembers, "How many team members could be dedicated?"),
  weeklyHours: choose(weeklyHours, "Estimate the team's available hours per week."),
  duration: choose(durations, "Select a preferred engagement duration."),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose your earliest start date."),
  followProtocols: choose(yesNoDiscuss, "Please answer this question."),
  trainingWillingness: choose(yesNoDiscuss, "Please answer this question."),
  equipmentInterest: choose(equipmentInterest, "Please answer this question."),
  constraints: z.string().trim().max(1500).optional(),
});

export const commercialStep = z.object({
  feeWillingness: choose(feeWillingness, "Please choose the option that fits best."),
  arrangement: choose(arrangements, "Select a preferred commercial arrangement."),
  commercialQuestions: z.string().trim().max(2000).optional(),
});

const mustAccept = (message: string) => z.literal(true, { error: message });

export const consentStep = z.object({
  consentAccurate: mustAccept("Please confirm the information is accurate."),
  consentContact: mustAccept("Please confirm Mvaak may contact you about this application."),
  consentNoGuarantee: mustAccept("Please confirm you understand submission does not guarantee acceptance."),
  consentAgreement: mustAccept("Please confirm participation depends on evaluation and a written agreement."),
});

export const partnershipSteps = [
  { id: "applicant", title: "Applicant", schema: applicantStep },
  { id: "team", title: "Team", schema: teamStep },
  { id: "capabilities", title: "Capabilities", schema: capabilitiesStep },
  { id: "commitment", title: "Commitment", schema: commitmentStep },
  { id: "commercial", title: "Commercial", schema: commercialStep },
  { id: "review", title: "Review", schema: consentStep },
] as const;

export const partnershipSchema = applicantStep
  .extend(teamStep.shape)
  .extend(capabilitiesBase.shape)
  .extend(commitmentStep.shape)
  .extend(commercialStep.shape)
  .extend(consentStep.shape)
  .extend({
    website: z.string().max(500).optional(),
    submissionId: z.string().min(8).max(64),
  })
  .superRefine(requireOtherDetail);

export type PartnershipApplication = z.output<typeof partnershipSchema>;
