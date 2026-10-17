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
  /** Addresses shown in the footer, exactly as supplied by Mvaak. */
  footerAddresses: [
    "Sector 62, Noida, Ghaziabad, Uttar Pradesh 201309",
    "Diksharth Center, Hanpuram, Kanpur, Uttar Pradesh, 208021",
  ],
  legalName: "Narottam Innovations Pvt Ltd",
  social: [
    { name: "Instagram", href: "https://instagram.com/mvaak.ai" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/mvaak/" },
    { name: "YouTube", href: "https://www.youtube.com/@mvaak-ai" },
  ],
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

/**
 * Header navigation. Every link points at an existing page or section — no empty
 * pages exist just to fill a menu. Solutions map to existing service pages that
 * already describe those applications.
 */
export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavLink[]; footer?: NavLink };
export type NavEntry = NavLink | NavGroup;
export const isNavGroup = (e: NavEntry): e is NavGroup => "items" in e;

export const solutionLinks: NavLink[] = [
  { label: "Robotics & Physical AI", href: "/solutions/physical-ai", description: "From real-world action to AI data" },
  { label: "Computer Vision", href: "/services/video-annotated-data", description: "Detection, tracking, activity" },
  { label: "Speech & Voice AI", href: "/services/audio-annotated-data", description: "Transcription and diarisation" },
  { label: "NLP & LLM Data", href: "/services/text-annotated-data", description: "Classification, entities, intent" },
];

/** Header order: Home · Solutions ▾ · Resources ▾ · About Us · Partner Us, then the Contact Us button. */
export const mainNav: NavEntry[] = [
  { label: "Solutions", items: solutionLinks },
  {
    label: "Resources",
    items: [
      { label: "Insights & Articles", href: "/blog", description: "Specification, annotation and quality" },
      { label: "How to scope a first dataset", href: "/blog/how-to-scope-a-first-dataset" },
      { label: "What makes training data usable", href: "/blog/what-makes-training-data-usable" },
    ],
    footer: { label: "All articles", href: "/blog" },
  },
  { label: "About Us", href: "/about" },
  { label: "Partner Us", href: "/partnerships" },
];
