/**
 * Mvaak Partnerships — commercial terms.
 *
 * IMPORTANT: none of these terms has been finalised by Mvaak. Every value below is
 * `null` on purpose, and the page renders "Confirmed during evaluation" for any
 * null value. Do NOT fill a value in until it is approved in writing, and keep
 * the wording factual (what it is, what it covers, when it is payable).
 *
 * The application itself is always free; the site never collects payment.
 */

export type PartnershipTerm = {
  key: string;
  label: string;
  /** Approved public wording. `null` = not yet finalised. */
  value: string | null;
};

export const partnershipTerms: PartnershipTerm[] = [
  { key: "fee", label: "Initial project or onboarding fee", value: null },
  { key: "hours", label: "Minimum dedicated working hours", value: null },
  { key: "equipment", label: "Equipment provision, ownership and return", value: null },
  { key: "training", label: "Training format and duration", value: null },
  { key: "commercial", label: "Compensation or commercial structure", value: null },
  { key: "eligibility", label: "Eligibility criteria", value: null },
  { key: "payment", label: "Payment terms", value: null },
];

export const PENDING_TERM_LABEL = "Confirmed during evaluation";

/** Set to true once an approved partnership agreement template exists. */
export const partnershipAgreementPublished = false;
