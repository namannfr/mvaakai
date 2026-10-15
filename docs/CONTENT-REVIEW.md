# Content review before launch

Everything on the site comes from one of two sources: the live mvaak.com site (October 2026) or the brochure *Mvaak AI Data Services*. Nothing was invented. The items below come from the brochure, or are commercial and legal statements. Each needs sign-off from someone at Mvaak before the site is public.

For each item: confirm it, edit it, or remove it. The **Where** column gives the file to change.

## 1. Partnership programme terms (must decide)

None of these terms has been decided. The site shows **"Confirmed during evaluation"** for each one until a value is set.

| Term | Current state | Where |
|---|---|---|
| Initial project / onboarding fee: amount, purpose, when payable | Not set. The site says it *may* apply, is disclosed in writing before any payment, and is never collected online | `src/config/partnership.ts` (`fee`) |
| Minimum dedicated working hours | Not set. The FAQ says hours are agreed per project | `partnership.ts` (`hours`) |
| Equipment provision, ownership, care, return | Not set. The site says "where agreed and available" | `partnership.ts` (`equipment`) |
| Training format and duration | Not set | `partnership.ts` (`training`) |
| Compensation / commercial structure | Not set. Applicants state a preference only | `partnership.ts` (`commercial`) |
| Eligibility criteria | Not set. The site says eligibility depends on each project | `partnership.ts` (`eligibility`) |
| Payment terms | Not set | `partnership.ts` (`payment`) |

When you set a value, it appears in the "Programme terms" table. Fee, hours, equipment, training and commercial values also replace the matching FAQ answer. Write each value as a plain statement of fact: what it is, what it covers, and when it applies.

These policies are already stated on the site. Confirm Mvaak is comfortable committing to them:
- Applying is free.
- No payment is collected through the website.
- A fee, if any, is tied to a defined project and disclosed in writing before payment.
- Submitting an application does not guarantee acceptance, a project, equipment or income.

## 2. Institutional names

The brochure lists these under **"Backed by"**: IIT Kanpur · MeitY, Government of India · Startup India · MIT · NTU Singapore · SMU.

On the site they appear under a neutral heading, **"Institutional support & associations"**. They are shown as names only, with no logos, because permission to use the logos has not been confirmed.

- Confirm the exact relationship with each one (for example incubated at, a grant from, recognised under, a research collaboration).
- Set the wording in `src/config/site.ts` (`institutions[].relationship`), or hide an entry with `show: false`.
- Add official logos only after written permission.

## 3. Company and capacity claims (from the brochure)

| Claim | Where it appears | Where to change it |
|---|---|---|
| Operating since 2023; 100+ client engagements across India, UAE, Singapore | Home "Why Mvaak", About | `src/config/site.ts` (`credentials`) |
| Own AI/ML team, including government-funded deep-tech work | Home, About | `site.ts` (`credentials`) |
| Capacity as of August 2026: 6 → 18 states, 250 trained collectors, 40+ environment types, 12+ languages | About "The network behind the hours" | `site.ts` (`capacity`); set `showOnSite: false` to hide the whole block |
| Offices in New Delhi, Ajman (UAE), Singapore; address Moti Nagar, New Delhi 110015 | Footer, About, Contact | `site.ts` |

Brochure figures left off the site on purpose: 800–1,200 accepted hours a month (scaling past 5,000), the "2,000+ collectors within 90 days" ramp, market price ranges, and third-party statistics (the NVIDIA +50% result, "~50% of footage rejected", "billions of hours"). Add any of them only with a source.

## 4. Quality and commercial commitments (from the brochure)

| Statement | Where |
|---|---|
| 15–25% of captured hours budgeted to fail QA and **never invoiced** | Home: quality section |
| Target acceptance ≥ 85%, defined contractually per programme | Home: quality section |
| Rejected hours are not invoiced; priced per accepted hour by tier and annotation depth | Home: engagement models |
| Batches below the agreed threshold are re-collected | Egocentric page: quality checks (`src/content/egocentric-collection.ts` → `qualityChecks`) |
| Pilot Sprint: 30 days, 100–250 accepted hours, governance pack included | Home, Egocentric page |
| "Send us one task": we return a capture brief, object matrix, rubric and costed pilot before you commit. The brochure's promises of "within five working days" and "no fee" were left off | Contact page |
| Stereo + IMU capture runs about 50–120 GB per hour | Egocentric page |

## 5. Governance statements (from the brochure)

The egocentric page shows a shortened version (consent, permissions, secure handling, retention and transfer) in `src/content/egocentric-collection.ts` → `governanceItems`. Confirm each one matches what Mvaak actually does today:

- Worker-level consent, signed directly with the camera wearer in their own language, revocable
- A bystander and household protocol; no capture of minors without guardian consent; a right to stop recording at any time
- Face and identifier redaction on request; deletion on revocation carried through to delivered batches
- **Fair-wage policy**: a pay floor above prevailing local rates. The brochure calls this a *published* charter. The site says "policy" because no published document was supplied.
- **DPDP Act 2023**: the site says consent processes are *designed around* the Act's standard. It does not claim compliance or certification. Have counsel confirm this wording.
- Chain of title and a defined commercial licence. The brochure also promises an *indemnity*; that was left off the site.

## 6. Privacy notice

`src/app/privacy/page.tsx` describes only how the website forms handle data. Before launch:
- Add a retention period for inquiries and applications.
- Name the processors you use, such as your email and CRM providers.
- Have counsel review it.

## 7. Imagery

Every visual on the site is a technical illustration made for it: first-person capture frames with hand-keypoint skeletons, synchronised streams, and pipelines. There are no stock photos, no customer logos and no product screenshots. You can swap in real photographs from Mvaak's own field operations, taken with consent, by replacing the illustrated frames in `src/components/egocentric/environment-explorer.tsx` and the hero.

## 8. Illustrative sample data

The site shows sample data so visitors can see what the work produces. Every example is labelled on the page as illustrative, and none of it describes an actual Mvaak dataset, client or result. Confirm the examples reflect how Mvaak actually structures its data.

| Example | Where | Label shown |
|---|---|---|
| "Pick up a cup" episode record (task, actions, timestamp, object, status) | Home hero (`src/components/visuals/demo-record.tsx`) | "Illustrative example — not an actual Mvaak dataset." |
| Raw / annotated / structured views of the same recording, including a JSON task record | Home pipeline → Annotation (`src/components/home/annotation-compare.tsx`) | "Illustrative example" |
| Capture brief (task, include, consent) | Home pipeline → Human Demonstration (`src/components/visuals/pipeline-visuals.tsx`) | "Illustrative example of the human demonstration stage." |
| Batch review with four quality checks, one flagged | Home "Quality that matters" (`src/components/home/quality-checks.tsx`) | "Illustrative example" |
| Deliverable examples: file list, IDs, metadata record, annotation layers, quality report | Egocentric page → deliverables explorer (`src/components/egocentric/deliverables-explorer.tsx`) | "Illustrative example" |
| Quality-check walkthroughs (what is reviewed, example issue, handling) | Egocentric page → quality (`src/content/egocentric-collection.ts` → `qualityChecks`) | "Illustrative example" |
| Partner field team and capture kit | Home Partnerships section (`src/components/visuals/team-kit.tsx`) | "Illustration: a partner field team and its capture kit." |

**Photography.** The current visuals are custom illustrations. Unsplash blocks automated downloads, so licensed stock photos could not be added here. If Mvaak has its own consented field photography (smart glasses, capture sessions, real environments), ask a developer to swap it into the hero or the environment selector.

## 9. Egocentric Data Collection page — capability labels

The page separates what Mvaak’s brochure describes from what still needs confirming:

- **Environments.** Household, Commercial, Warehouse and Agricultural are labelled “In Mvaak’s scope” (from the brochure). **Industrial** is labelled “Confirm in scoping” and shows a placeholder visual. Confirm or change both in `environmentOptions`.
- **Standard deliverables.** This list comes from the brochure’s “What arrives with every episode”. Confirm it is truly standard for every project, or move items into **Optional extras**.
- **Capture categories.** Each category ends with “Confirm during project scoping.” No camera models, frame rates, durations or capacity figures are stated.
- **Samples.** “Request a Sample” never promises one. The page and FAQ say availability depends on the data and requirements. Decide what can actually be shared as a sample.
