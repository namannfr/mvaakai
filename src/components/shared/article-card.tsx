import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, type Article } from "@/content/articles";
import { cn } from "@/components/ui/cn";

export function ArticleCard({ article, className, headingLevel = "h3" }: { article: Article; className?: string; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article data-reveal className={cn("group relative flex flex-col rounded-card border border-line bg-surface p-6 transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-[0_12px_32px_-16px_rgb(21_26_33/0.25)]", className)}>
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.06em] text-accent uppercase">
          {article.category}
        </span>
        <ArrowUpRight aria-hidden className="size-5 text-faint transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
      </div>
      <H className="mt-5 text-lg leading-snug font-semibold tracking-tight text-ink text-balance">
        <Link href={`/blog/${article.slug}`} className="after:absolute after:inset-0 after:rounded-card">
          {article.title}
        </Link>
      </H>
      <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted">{article.description}</p>
      <p className="mt-auto pt-6 text-sm text-faint">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span aria-hidden> · </span>
        {article.readingTime} min read
      </p>
    </article>
  );
}
