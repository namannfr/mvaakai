import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArticleBrowser } from "@/components/blog/article-browser";
import { ContactCta } from "@/components/shared/contact-cta";
import { articleCategories, articles, formatDate } from "@/content/articles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Insights on AI Training Data",
  description:
    "Articles on dataset quality, annotation guidelines, egocentric video, inter-annotator agreement and scoping AI training data — written for the people who make these decisions.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const [featured, ...rest] = articles;
  const summaries = rest.map(({ blocks, ...a }) => {
    void blocks;
    return a;
  });

  return (
    <>
      <section aria-labelledby="blog-title" className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="container-page relative pt-10 pb-14 sm:pt-12 lg:pt-14 lg:pb-16">
          <Breadcrumbs items={[{ label: "Insights" }]} />
          <p className="eyebrow">Insights</p>
          <h1 id="blog-title" className="mt-5 max-w-3xl text-h1 font-semibold text-balance text-ink">
            Thinking about AI data.
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-muted">
            What we have learned about specification, annotation and quality — written for the people who have to make these
            decisions.
          </p>

          <article className="group relative mt-12 grid overflow-hidden rounded-card border border-navy-line bg-navy text-on-navy lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
            <div className="p-6 sm:p-10">
              <p className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.1em] uppercase">
                <span className="rounded-full bg-brand px-2.5 py-1 text-navy">Latest</span>
                <span className="text-brand-light">{featured.category}</span>
              </p>
              <h2 className="mt-5 text-h2 font-semibold text-balance text-white">
                <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-2xl text-lead text-on-navy-muted">{featured.description}</p>
              <p className="mt-8 flex items-center gap-2 text-sm text-on-navy-muted">
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                <span aria-hidden>·</span>
                {featured.readingTime} min read
              </p>
            </div>
            <div className="hidden items-end border-l border-navy-line bg-navy-2 p-10 lg:flex">
              <p className="inline-flex items-center gap-2 font-medium text-white">
                Read the article <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          </article>
        </div>
      </section>

      <Section labelledBy="all-articles">
        <h2 id="all-articles" className="sr-only">
          All articles
        </h2>
        <ArticleBrowser articles={summaries} categories={articleCategories} />
      </Section>

      <ContactCta
        title="Need AI training data?"
        body="Tell us what you are building and what the model keeps getting wrong. That is usually enough to say what the dataset would have to cover."
        cta="Talk to Mvaak"
        trackAs="blog_index_cta"
      />
    </>
  );
}
