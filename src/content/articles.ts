/**
 * Published Mvaak articles. Content, slugs, categories, dates and reading times
 * are preserved verbatim from mvaak.com/blog (extracted October 2026) so existing
 * indexed URLs keep working. Add new articles to articles.json in the same shape.
 */
import data from "./articles.json";

export type ArticleBlock =
  | { type: "p" | "h2" | "h3" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** ISO date (YYYY-MM-DD) as published. */
  date: string;
  readingTime: number;
  blocks: ArticleBlock[];
};

export const articles: Article[] = (data as Article[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

export const articleCategories = Array.from(new Set(articles.map((a) => a.category)));

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Deterministic date formatting (no Date/Intl at render time). */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Related = same category first, then most recent; never the article itself. */
export function relatedArticles(slug: string, count = 3) {
  const current = articleBySlug(slug);
  const others = articles.filter((a) => a.slug !== slug);
  const same = others.filter((a) => a.category === current?.category);
  const rest = others.filter((a) => a.category !== current?.category);
  return [...same, ...rest].slice(0, count);
}
