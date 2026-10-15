# mvaak.com

The Mvaak website: egocentric and human-demonstration data for Physical AI, plus audio, video and text annotation, data quality assurance, and the Mvaak Partnerships programme.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Zod and Lucide.

> Before launch, work through **[docs/CONTENT-REVIEW.md](docs/CONTENT-REVIEW.md)**. It lists the brochure claims and partnership terms that need Mvaak's sign-off.

## Run locally

Requires Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local      # then set at least one lead-delivery channel
npm run dev                     # http://localhost:3000
```

To try the forms end to end without email credentials, set `LEADS_LOCAL_DIR=./data/leads`. Each submission is then appended to `data/leads/inquiry.jsonl` or `data/leads/partnership.jsonl`.

```bash
npm run lint
npx tsc --noEmit
npm run build && npm start      # production build on http://localhost:3000
```

## Routes

| Route | Notes |
|---|---|
| `/` | Homepage |
| `/services` | All services, each with an inquiry link that pre-selects it |
| `/services/egocentric-video-data` | Egocentric / Physical AI page (existing URL kept) |
| `/services/audio-annotated-data`, `/video-annotated-data`, `/text-annotated-data` | Existing URLs kept, with the original copy |
| `/partnerships` | Partnerships programme and six-step application (`#apply`) |
| `/about` | Company page |
| `/blog`, `/blog/<slug>` | Insights. All 9 existing articles kept at their original URLs and dates |
| `/contact` | Project inquiry. Pre-fill with `?type=<project-type>&model=<engagement-model>` |
| `/privacy` | Website privacy notice |
| `/api/inquiry`, `/api/partnership` | Form endpoints (POST) |
| `/api/forms/status` | Reports whether a delivery channel is configured (no secrets) |

Redirects (in `next.config.ts`): `/insights` → `/blog`, `/services/egocentric-video` → `/services/egocentric-video-data`, `/partners` → `/partnerships`, `/apply` → `/partnerships#apply`, and similar. Unknown blog or service slugs return a real 404 (see `src/proxy.ts`).

`type` values: `egocentric-video`, `data-collection`, `audio-annotation`, `video-annotation`, `text-annotation`, `quality-assurance`, `annotation-rescue`, `other`.
`model` values: `pilot-sprint`, `managed-corpus`, `capture-cell`, `annotation-rescue`.

## Where to edit content

| What | File |
|---|---|
| Contact details, offices, institutions, credentials, capacity figures, navigation | `src/config/site.ts` |
| **Partnership commercial terms** (fee, hours, equipment, training…) | `src/config/partnership.ts` |
| Services, project types, engagement models | `src/content/services.ts` |
| Egocentric Data Collection page: capture categories, environments, deliverables, workflow, quality checks, governance, FAQ | `src/content/egocentric-collection.ts` |
| Audio, video and text service pages | `src/content/data-types.ts` |
| Articles | `src/content/articles.json` (blocks: `p`, `h2`, `h3`, `ul`, `ol`, `quote`, `callout`) |

## Forms and lead routing

Both forms validate in the browser and again on the server, using the shared Zod schemas in `src/lib/forms/`. Each request is also checked for a honeypot field, rate-limited per IP, and de-duplicated by a submission ID.

A submission counts as delivered only when at least one configured channel accepts it:

1. **Email (Resend).** Set `RESEND_API_KEY` and `LEADS_FROM_EMAIL` (on a domain verified in Resend). Mail goes to `LEADS_TO_EMAIL`, default `team@mvaak.com`. Partnership applications can go to a separate inbox via `PARTNERSHIP_TO_EMAIL`. The reply-to is the applicant's address.
2. **Webhook.** Set `LEADS_WEBHOOK_URL` to receive JSON `{ kind, id, submittedAt, data }`. If `LEADS_WEBHOOK_SECRET` is set, requests carry an `X-Mvaak-Signature: sha256=<HMAC>` header. Use this for a CRM, Google Sheets, Zapier/Make or Slack.
3. **Local file.** Set `LEADS_LOCAL_DIR`. This is for development or a server with a persistent disk only.

If no channel is configured, the forms switch to **email hand-off** automatically. There is no warning banner: the submit button reads "Continue in your email app", with one line explaining what happens. After validation it opens a pre-filled email to team@mvaak.com, and the next screen states that the inquiry or application is sent only when the visitor presses send. That screen also offers a copy button for anyone without a mail app. If the API itself fails, the visitor sees an explicit "not sent" error with the same email fallback. No success message is ever shown unless delivery was confirmed. The site never collects payment, and the forms have no file upload.

Secrets are read only on the server, in `src/lib/server/`. Nothing secret is exposed to the browser.

## Analytics

`src/lib/analytics.ts` exposes `track()`. It sends events to Plausible (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) and/or GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`), and does nothing if neither is set. Form contents are never sent.

Events: `cta_clicked`, `project_inquiry_started`, `project_inquiry_submitted`, `partnership_application_started`, `partnership_application_step`, `partnership_application_submitted`, `service_page_viewed`, `form_submission_failed`.

## Deploy

The site needs a **Node.js runtime** for the form API routes and `src/proxy.ts`. A static export won't work.

- **Vercel (simplest).** Import the repository, add the environment variables from `.env.example`, and deploy. Point the `mvaak.com` DNS at Vercel.
- **Any Node host** (a VPS, Hostinger Node.js hosting, Render, Railway, Docker): run `npm ci && npm run build`, then `npm start` (set `PORT` if needed) behind your reverse proxy. Set the same environment variables.

mvaak.com is currently served by LiteSpeed. Shared LiteSpeed hosting can serve this site only if the plan supports Node.js applications. Otherwise use one of the options above.

After deploying, check `/api/forms/status` returns `{"live":true}`, then send one test inquiry and one test partnership application and confirm both arrive.
