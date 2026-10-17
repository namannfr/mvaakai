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

### 2a. "We are backed by" logo strip (homepage, and `/about#recognition`), must confirm

The client supplied a screenshot showing six logos: IIT Kanpur · IIT Kanpur Incubation & Innovation · Startup India · IndiaAI · MeitY · JSS AHER Mysuru. JSS was removed at the client’s request, so five logos now appear on the site, in `src/components/shared/backed-by.tsx`, with the image files in `public/images/recognition/logo-*.png`.

- **The logos were cropped from that screenshot, so they are low resolution.** Replace them with the original logo files.
- **The two sources list different backers.** The brochure lists MIT, NTU Singapore and SMU; the screenshot adds IndiaAI and JSS. Confirm which list is current.
- **Confirm Mvaak's relationship with each organisation, and its permission to use the logo.** If any one cannot be confirmed, remove it from `backers`.

### 2b. Recognition photos (homepage `#recognition`, and `/about#recognition`), must confirm

The client supplied two photos, now in `public/images/recognition/award-ceremony.jpg` and `award-cheque.jpg`.

- **What the photos show:** the slide reads *IndiaAI Application Development Pillar · IndiaAI Innovation Challenge · Narottam Innovations Pvt Ltd · Adaptive Learning and Detection for SLDs* and carries the **mvaak AI** logo. The cheque is made out to **Narottam Innovations Pvt Ltd**.
- **How the site describes it:** the copy says the award went to Narottam Innovations Pvt Ltd and was presented with the mvaak AI name. It does not say that Mvaak itself received the award.
- **To confirm:** Narottam Innovations Pvt Ltd's relationship to Mvaak (for example, the legal entity behind it), and whether the award can be presented as Mvaak's. If so, the copy can be strengthened in `src/components/shared/recognition.tsx`. If not, remove the section.
- **Not published:** the India News screenshot. It covers TaknikAI and its founder Shivam Pal, not Mvaak, so it is not used anywhere. It can be added only if the TaknikAI–Mvaak link is confirmed and the coverage concerns Mvaak.

### 2c. Video (homepage "Awards & Recognitions", `#recognition`)

The site embeds YouTube video `sygn0mAgeZU`, using the privacy-enhanced `youtube-nocookie.com` player, which loads lazily. The video is titled "IndiaAI Grant Support for Mvaak, Coverage by NewsStation" on the Mvaak channel, and it now sits beside the award photos in the "Awards & Recognitions" section. Confirm that the grant wording is accurate, which ties in with 2b.

### 2d. Founder profile (`/about#founder`), must confirm

The client asked for Shivam Pal, Founder & Managing Director, to be featured. The profile is in `src/components/about/founder-profile.tsx`.

- **The photo is cropped from a screenshot of another website's founder card, so it is low resolution.** The baked-in "Founder" label was blended out. Replace `public/images/about/founder-shivam-pal.jpg` with the original high-resolution portrait, square or close to it.
- **There is no approved biography.** The section shows only the name, the title and one line of Mvaak's own published positioning. Supply an approved bio to replace that line.
- **The reference statistics are deliberately left out:** 8+ years, 100+ founders mentored, $10M+ fundraising, $5M+ revenue. The sector chips (AI, SaaS, EdTech and so on) are left out too. They come from a different website and are not verified Mvaak facts; add them only with written approval and a source. The chips shown instead are Mvaak's own services.
- **The India News / TaknikAI coverage (2b) is still unpublished.**

### 2e. Homepage egocentric photos

The homepage's illustrated egocentric frames have been replaced with realistic photos, cropped from the client-supplied reference composite. The image files are in `public/images/egocentric/`:

| File | Where it is used |
|---|---|
| `ego-cup.jpg` | Hero |
| `ego-screwdriver.jpg` | What We Do › Egocentric Data card, and the Industrial tab on `/services/egocentric-video-data` |
| `ego-drawer.jpg` and `ego-package.jpg` | Egocentric section |

- **The site labels them "Illustrative".** They carry baked-in overlays, including a session ID "MVA-0087". Confirm that they are licensed for use, and confirm whether any of them is real Mvaak footage. If one is, the "Illustrative" label can be dropped from that image.
- **Replace them with higher-resolution originals if available.** The crops are 765–879 px wide.
- **The inner pages still use the SVG illustration system**, as requested: `/solutions/physical-ai` and `/services/egocentric-video-data`.

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

## 10. Navigation and footer update (header, footer, homepage), to confirm

- **Header:** Home · Solutions ▾ · Resources ▾ · About Us · Partner Us, followed by the Contact Us button. Services is no longer a top-level item.
  - `/services` and `/services/egocentric-video-data` still exist and are still linked from the homepage, `/solutions/physical-ai`, the contact form and the 404 page.
  - Neither page is in the header or footer any more. Confirm this is intended.
- **Addresses differ across the site.** The footer shows the two supplied addresses (Sector 62, Noida, and Diksharth Center, Kanpur). The Contact page now shows only the email address, and the About page's "Where we are" section (New Delhi, Ajman and Singapore) has been removed. The Privacy notice and the structured data (`site.address`) still show Moti Nagar, New Delhi. Confirm which address is current.
- **Legal entity.** The footer now reads "© 2026 Mvaak | All rights reserved | Narottam Innovations Pvt Ltd", which indicates that Narottam Innovations is Mvaak's legal entity. If so, the recognition wording in 2b can be strengthened, once confirmed.
- **Privacy Policy.** The footer links to the existing `/privacy` page, which is a website privacy notice drafted from the brochure (see section 6). It still needs legal review and approval as the official Privacy Policy.
- **"Start Here" column.** It shows only the supplied text, "Good to go".
- **MeitY logo.** `logo-meity.png` has a mouse pointer baked in from the source screenshot. Replace it with the original logo file.

## 11. Partnership application form, approval needed

The six-step application has been replaced with a single-page form. It has the seven approved fields: Full Name / Business Name, Email, Phone Number, City, Country, LinkedIn Profile (optional) and Looking For (Acquiring Data / Selling Data).

- **Backend.** The endpoint (`/api/partnership`) and the delivery channels (Resend, webhook and the local store) are unchanged. What changed is the payload and the lead email layout (`src/lib/forms/partnership-schema.ts`, `src/app/api/partnership/route.ts`).
  - Any external automation that reads the webhook's `data` object and expects the old fields (team size, capabilities, commercial readiness and so on) needs updating.
  - New records contain `fullName`, `email`, `phone`, `city`, `country`, `linkedin` and `lookingFor` (`acquiring-data` / `selling-data`).
- **Acknowledgements.** The four checkbox acknowledgements were removed with the multi-step flow. In their place is a single line above the submit button: "By submitting, you agree that Mvaak may contact you about this application", with a link to the Privacy Policy. Confirm this is acceptable.
- **Wording.** The "Looking For" options read as data buyers and sellers. The rest of the Partnerships page still describes field-team collaborations, so confirm the page copy and the form's purpose match.

## 12. Contact form → Google Sheets, action required before it works live

The Contact Us form now sends each lead to the "Contact Leads" Apps Script, through the site's server at `/api/inquiry` (`src/lib/server/contact-sheet.ts`). The visitor sees success only when the script confirms the write. Two things are needed on the Apps Script side:

1. **Deployment access.** The supplied URL (originally `/a/macros/first500days.com/…/exec`, now `/macros/s/AKfycbyenula…/exec`, which is public) is restricted to first500days.com accounts. Anonymous requests are redirected to Google sign-in, so website submissions cannot reach the script. Redeploy the web app with *Execute as: Me* and *Who has access: Anyone*. If that produces a new `/exec` URL, set it in `CONTACT_SHEETS_URL`.
2. **Confirmation response.** `doPost` must return a success reply after `appendRow`, for example `ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON)`. Any other reply, such as an error page or no output, is treated as a failure.
3. **Spreadsheet binding.** `SpreadsheetApp.getActiveSpreadsheet()` works only if the script is bound to the Contact Leads sheet (created from Extensions → Apps Script inside that sheet). If it is a standalone script, use `SpreadsheetApp.openById("<Contact Leads sheet ID>")` and select the tab by name.

**Field mapping**

| Script property | Contact form field |
|---|---|
| name | Name |
| email | Work email |
| company | Company |
| jobTitle | Job title (optional) |
| inquiryType | Request type and project type, e.g. "Discuss a project — Egocentric video & human-demonstration data" |
| projectDetails | The description, followed by every other answered field ("Engagement model: …", "Environments: …" and so on), then the reference number and the page the lead was submitted from |
