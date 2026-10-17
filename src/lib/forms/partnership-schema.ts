import { z } from "zod";

/** Shared by the single-page partnership form and the /api/partnership route. */

export const lookingForOptions = [
  { id: "acquiring-data", label: "Acquiring Data" },
  { id: "selling-data", label: "Selling Data" },
] as const;

const ids = <T extends readonly { id: string }[]>(list: T) =>
  list.map((x) => x.id) as unknown as [T[number]["id"], ...T[number]["id"][]];

const text = (min: number, max: number, message: string) =>
  z.string().trim().min(min, message).max(max, `Please keep this under ${max.toLocaleString("en-US")} characters.`);

/** The seven approved fields. */
export const partnershipFields = z.object({
  fullName: text(2, 160, "Please enter your full name or business name."),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Enter a valid phone number, e.g. +91 98765 43210.")
    .refine((v) => v.replace(/\D/g, "").length >= 7, "Enter a valid phone number, e.g. +91 98765 43210."),
  city: text(2, 80, "Please enter your city."),
  country: text(2, 80, "Please enter your country."),
  linkedin: z
    .string()
    .trim()
    .max(500)
    .refine((v) => v === "" || /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i.test(v), "Enter a full URL starting with https://")
    .optional(),
  lookingFor: z.enum(ids(lookingForOptions), { error: "Select what you are looking for." }),
});

export const partnershipSchema = partnershipFields.extend({
  /** Honeypot — must stay empty. */
  website: z.string().max(500).optional(),
  submissionId: z.string().min(8).max(64),
});

export type PartnershipApplication = z.output<typeof partnershipSchema>;
