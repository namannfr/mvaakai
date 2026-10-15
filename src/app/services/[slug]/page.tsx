import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Bullets } from "@/components/ui/bullets";
import { FaqList, faqJsonLd } from "@/components/ui/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { ContactCta } from "@/components/shared/contact-cta";
import { TrackView } from "@/components/analytics/track-view";
import { dataTypeBySlug, dataTypePages, qualityGates } from "@/content/data-types";
import { serviceById } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

/**
 * Every part of this page depends on the slug, so there is no URL-independent shell
 * worth streaming — and every valid slug is prerendered by generateStaticParams
 * (unknown slugs get a real 404 from src/proxy.ts). Navigation therefore waits for the
 * complete prerendered page instead of flashing an empty placeholder.
 */
export const instant = false;

export function generateStaticParams() {
  return dataTypePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const page = dataTypeBySlug(slug);
  if (!page) return {};
  return pageMetadata({ title: page.seoTitle, description: page.seoDescription, path: `/services/${page.slug}` });
}

const others = [
  { slug: "egocentric-video-data", n: "01", title: "Egocentric Video Data", summary: "First-person human demonstrations for Physical AI and robotics." },
  ...dataTypePages.map((p) => ({ slug: p.slug, n: p.number, title: p.title, summary: p.summary })),
];

export default async function DataTypePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const page = dataTypeBySlug(slug);
  if (!page) notFound();
  const service = serviceById(page.projectType);
  const Icon = service?.icon;

  return (
    <>
      <TrackView event="service_page_viewed" props={{ page: page.slug }} />
      <section aria-labelledby="dt-title" className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="container-page relative pt-10 pb-14 sm:pt-12 lg:pt-14 lg:pb-20">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: page.title }]} />
          <div className="flex items-center gap-3">
            {Icon && (
              <span className="inline-flex size-11 items-center justify-center rounded-xl border border-accent-line bg-accent-soft text-accent">
                <Icon aria-hidden className="size-5" />
              </span>
            )}
            <span className="font-mono text-sm text-faint">{page.number} — Data type</span>
          </div>
          <h1 id="dt-title" className="mt-6 max-w-3xl text-h1 font-semibold text-balance text-ink">
            {page.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-muted">{page.summary}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/contact?type=${page.projectType}`} size="lg" arrow trackAs={`dt_hero_${page.slug}`}>
              Discuss Your Requirements
            </ButtonLink>
            <ButtonLink href="/contact?type=annotation-rescue&model=annotation-rescue" size="lg" variant="secondary" trackAs={`dt_rescue_${page.slug}`}>
              Fix data you already hold
            </ButtonLink>
          </div>
        </div>
      </section>

      <Section labelledBy="dt-what">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeader id="dt-what" eyebrow="What it is" title={page.what.heading}>
            <div className="mt-6 space-y-4 text-lead text-muted">
              {page.what.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </SectionHeader>
          <div>
            <h2 className="font-mono text-xs tracking-[0.14em] text-faint uppercase">Three things that decide whether it trains well</h2>
            <ol className="mt-6 space-y-4">
              {page.why.map((w, i) => (
                <li key={w.title} data-reveal className="rounded-card border border-line bg-surface p-6">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-semibold text-ink">{w.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{w.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="surface" bordered labelledBy="dt-sources">
        <SectionHeader
          id="dt-sources"
          eyebrow="Where the data comes from"
          title="Annotate what you hold. Collect where coverage is thin."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {page.sources.map((s) => (
            <div key={s.title} data-reveal className="rounded-card border border-line bg-canvas p-6">
              <h3 className="font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div data-reveal>
            <h3 className="font-mono text-xs tracking-[0.14em] text-faint uppercase">Annotation operations</h3>
            <p className="mt-2 text-[0.9375rem] text-muted">Scoped to the project, not sold as a bundle.</p>
            <ol className="mt-5 grid gap-2 sm:grid-cols-2">
              {page.operations.map((o, i) => (
                <li key={o} className="flex items-center gap-3 rounded-xl border border-line bg-canvas px-4 py-3 text-ink-2">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {o}
                </li>
              ))}
            </ol>
          </div>
          <div data-reveal>
            <h3 className="font-mono text-xs tracking-[0.14em] text-faint uppercase">What arrives at the end</h3>
            <p className="mt-2 text-[0.9375rem] text-muted">The output is agreed before work starts.</p>
            <Bullets items={page.arrives} check className="mt-5" />
          </div>
        </div>
        <div className="mt-10">
          <h3 className="font-mono text-xs tracking-[0.14em] text-faint uppercase">What this data trains</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {page.applications.map((a) => (
              <li key={a} className="rounded-full border border-line bg-subtle px-3 py-1 text-sm text-ink-2">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="dt-gates">
        <SectionHeader
          id="dt-gates"
          eyebrow="Quality workflow"
          title="Six gates between raw input and delivery."
          lead="The process does not change per data type, so a corpus assembled across categories holds together."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {qualityGates.map((g, i) => (
            <li key={g.title} data-reveal className="bg-surface p-6">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-semibold text-ink">{g.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{g.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface" bordered labelledBy="dt-faq">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader id="dt-faq" eyebrow="FAQ" title={`${page.title} questions.`} />
          <FaqList items={page.faqs} />
        </div>
      </Section>

      <Section labelledBy="dt-others">
        <h2 id="dt-others" className="text-h3 font-semibold text-ink">
          Other data types
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {others
            .filter((o) => o.slug !== page.slug)
            .map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 transition-colors hover:border-line-strong">
                  <span className="flex items-center justify-between font-mono text-sm text-faint">
                    {o.n}
                    <ArrowUpRight aria-hidden className="size-4 transition-colors group-hover:text-accent" />
                  </span>
                  <span className="mt-3 font-semibold text-ink">{o.title}</span>
                  <span className="mt-1.5 text-[0.9375rem] text-muted">{o.summary}</span>
                </Link>
              </li>
            ))}
        </ul>
      </Section>

      <ContactCta href={`/contact?type=${page.projectType}`} cta="Discuss a Project" trackAs={`dt_final_${page.slug}`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: page.title,
          serviceType: page.seoTitle,
          description: page.summary,
          provider: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
      <JsonLd data={faqJsonLd(page.faqs)} />
    </>
  );
}
