import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Privacy Notice",
  description: "How Mvaak handles information submitted through the mvaak.com project inquiry and partnership application forms.",
  path: "/privacy",
});

/*
 * Website privacy notice. It describes only what this website does. It must be
 * reviewed by Mvaak (and counsel) before launch — see docs/CONTENT-REVIEW.md.
 */
const sections = [
  {
    h: "What this notice covers",
    p: [
      "This notice explains how Mvaak handles information you submit through this website — the project inquiry form at /contact and the partnership application at /partnerships. It does not cover data collected during client projects, which is governed by the agreement for each project.",
    ],
  },
  {
    h: "What we collect",
    p: [
      "Project inquiries: your name, work email, company, optional job title, and the project details you choose to share.",
      "Partnership applications: your name, email, phone number, city and country, optional LinkedIn and website links, and information about your team, capabilities, availability and commercial preferences.",
      "We do not ask for identity documents, financial or payment details, or other sensitive personal information through these forms, and no payment is collected through this website.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "Only to respond to your inquiry, to evaluate your partnership application, and to contact you about it. We do not sell your information or use it for unrelated marketing.",
    ],
  },
  {
    h: "How it is delivered and stored",
    p: [
      "When you submit a form, the information is sent from our server to Mvaak’s business inbox and, where configured, to an internal system used to track inquiries and applications. Service providers that operate these systems process the information on our behalf.",
    ],
  },
  {
    h: "Analytics",
    p: [
      "If website analytics are enabled, we record aggregate events such as page views and whether a form was started or submitted. The contents of form fields are never sent to analytics providers.",
    ],
  },
  {
    h: "Your choices",
    p: [
      `You can ask us to access, correct or delete the information you submitted, or withdraw your application, by emailing ${site.email}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="container-page py-12 sm:py-16 lg:py-20">
      <Breadcrumbs items={[{ label: "Privacy notice" }]} />
      <div className="max-w-[68ch]">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 text-h1 font-semibold text-ink">Privacy notice</h1>
        <p className="mt-4 text-sm text-faint">Website forms · Last updated October 2026</p>
        {sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-ink">{s.h}</h2>
            {s.p.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
          </section>
        ))}
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-ink">Contact</h2>
          <p className="mt-3 leading-relaxed text-ink-2">
            Mvaak, {site.address.line}.{" "}
            <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2">
              {site.email}
            </a>
          </p>
        </section>
        <p className="mt-12">
          <Link href="/" className="text-accent underline underline-offset-2">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
