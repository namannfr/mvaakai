/**
 * Company facts used across the site. Sources:
 *  - mvaak.com (live site, Oct 2026)
 *  - "Mvaak AI Data Services" brochure (capacity position as of August 2026)
 *
 * Anything marked `reviewBeforeLaunch` is taken from the brochure but should be
 * confirmed by Mvaak before public launch. See docs/CONTENT-REVIEW.md.
 */

export const site = {
  name: "Mvaak",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mvaak.com").replace(/\/$/, ""),
  tagline: "Real-world demonstrations. Training-ready data.",
  description:
    "Mvaak designs, collects, annotates and validates real-world data for AI teams — egocentric human-demonstration video for Physical AI, plus audio, video and text annotation with multi-stage quality assurance.",
  email: "team@mvaak.com",
  phoneDisplay: "+91 73880 73490",
  phoneHref: "tel:+917388073490",
  address: {
    line: "Moti Nagar, New Delhi 110015, India",
    locality: "New Delhi",
    postalCode: "110015",
    country: "IN",
  },
  offices: [
    { city: "New Delhi", country: "India", note: "Headquarters" },
    { city: "Ajman", country: "UAE" },
    { city: "Singapore", country: "Singapore" },
  ],
  copyrightYear: 2026,
} as const;

/**
 * Institutional support / associations listed in the brochure under "Backed by".
 * The precise relationship (funding, incubation, programme, research association)
 * has not been verified for public use, so the site uses the neutral heading
 * "Institutional support & associations" and names only — no logos.
 * Set `relationship` once confirmed (e.g. "Incubated at", "Recognised under").
 * Set `show: false` to hide an entry.
 */
export const institutions: { name: string; relationship?: string; show: boolean }[] = [
  { name: "IIT Kanpur", show: true },
  { name: "MeitY, Government of India", show: true },
  { name: "Startup India", show: true },
  { name: "MIT", show: true },
  { name: "NTU Singapore", show: true },
  { name: "SMU", show: true },
];

/** Brochure capacity figures — "Capacity position as of August 2026". reviewBeforeLaunch. */
export const capacity = {
  asOf: "August 2026",
  showOnSite: true,
  figures: [
    { value: "6 → 18", label: "States covered", note: "Live today, with a defined ramp toward pan-India coverage" },
    { value: "250", label: "Trained collectors onboarded", note: "Network designed to scale within 90 days of programme start" },
    { value: "40+", label: "Environment types", note: "Household, commercial and agricultural settings" },
    { value: "12+", label: "Languages", note: "For paired audio, narration and instruction capture" },
  ],
};

export const credentials = [
  {
    title: "Operating since 2023",
    body: "A venture studio and execution partner with 100+ client engagements delivered across India, the UAE and Singapore.",
  },
  {
    title: "Deep-tech in house",
    body: "Our own AI/ML team builds and ships production systems, including government-funded deep-tech work. We understand what a training pipeline needs because we run them.",
  },
  {
    title: "Distributed operations is the core skill",
    body: "Recruiting, training, supervising and paying dispersed field teams across Indian states is the operational muscle the business runs on.",
  },
  {
    title: "Governance as a design choice",
    body: "Consent, wage floors and provenance were built into the operating model from the start rather than retrofitted.",
  },
];

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Egocentric Data", href: "/services/egocentric-video-data" },
  { label: "About", href: "/about" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Insights", href: "/blog" },
] as const;
