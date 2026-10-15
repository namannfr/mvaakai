import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { ArticleCard } from "@/components/shared/article-card";
import { articleBySlug, articles, formatDate, relatedArticles, slugify, type ArticleBlock } from "@/content/articles";
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
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.description, path: `/blog/${a.slug}`, type: "article", publishedTime: a.date });
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 id={slugify(block.text)} className="mt-14 scroll-mt-28 text-2xl font-semibold tracking-tight text-ink first:mt-0">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-10 text-xl font-semibold text-ink">{block.text}</h3>;
    case "p":
      return <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink-2">{block.text}</p>;
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-accent pl-6 text-xl leading-relaxed font-medium text-balance text-ink">
          {block.text}
        </blockquote>
      );
    case "ul":
    case "ol": {
      const List = block.type;
      return (
        <List className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-4 text-[1.0625rem] leading-[1.75] text-ink-2">
              <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </List>
      );
    }
    case "callout":
      return (
        <aside className="mt-10 rounded-card border border-accent-line bg-accent-soft/60 p-6">
          <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">{block.title}</p>
          <p className="mt-3 leading-relaxed text-ink">{block.text}</p>
        </aside>
      );
  }
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();
  const toc = article.blocks.filter((b): b is { type: "h2"; text: string } => b.type === "h2");
  const related = relatedArticles(article.slug);

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="container-page relative pt-10 pb-14 sm:pt-12 lg:pt-14 lg:pb-16">
          <Breadcrumbs items={[{ label: "Insights", href: "/blog" }, { label: article.title }]} />
          <p className="inline-flex rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs tracking-[0.06em] text-accent uppercase">
            {article.category}
          </p>
          <h1 className="mt-5 max-w-3xl text-h1 font-semibold text-balance text-ink">{article.title}</h1>
          <p className="mt-5 max-w-2xl text-lead text-muted">{article.description}</p>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-faint">
            <span className="text-muted">Mvaak</span>
            <span aria-hidden>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden>·</span>
            <span>{article.readingTime} min read</span>
          </p>
        </div>
      </header>

      <div className="container-page py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <article className="max-w-[68ch] min-w-0">
            {article.blocks.map((b, i) => (
              <Block key={i} block={b} />
            ))}
            <p className="mt-16 border-t border-line pt-8 text-sm text-faint">Written by Mvaak — AI Data Services.</p>
          </article>

          <aside className="order-first lg:order-none">
            <div className="space-y-8 lg:sticky lg:top-28">
              {toc.length > 0 && (
                <nav aria-label="On this page">
                  <p className="font-mono text-xs tracking-[0.14em] text-faint uppercase">On this page</p>
                  <ul className="mt-4 space-y-2 border-l border-line">
                    {toc.map((h) => (
                      <li key={h.text}>
                        <a href={`#${slugify(h.text)}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-sm text-muted hover:border-accent hover:text-ink">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <div className="hidden rounded-card border border-line bg-surface p-5 lg:block">
                <p className="font-semibold text-ink">Need AI training data?</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Tell us what you are building and what the model keeps getting wrong.
                </p>
                <ButtonLink href="/contact" className="mt-4 w-full" trackAs={`article_sidebar_${article.slug}`}>
                  Talk to Mvaak
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section aria-labelledby="related-title" className="border-t border-line bg-surface">
        <div className="container-page py-16 lg:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 id="related-title" className="text-h3 font-semibold text-ink">
              Related reading
            </h2>
            <TextLink href="/blog" trackAs="article_all_articles">
              All articles
            </TextLink>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-canvas">
        <div className="container-page flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Need AI training data?</h2>
            <p className="mt-2 max-w-xl text-muted">
              Tell us what you are building and what the model keeps getting wrong. That is usually enough to say what the dataset
              would have to cover.
            </p>
          </div>
          <ButtonLink href="/contact" size="lg" arrow trackAs={`article_footer_${article.slug}`}>
            Talk to Mvaak
          </ButtonLink>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.date,
          articleSection: article.category,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/brand/favicon.svg` } },
          mainEntityOfPage: `${site.url}/blog/${article.slug}`,
        }}
      />
    </>
  );
}
