"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ArticleCard } from "@/components/shared/article-card";
import type { Article } from "@/content/articles";
import { cn } from "@/components/ui/cn";

type Summary = Omit<Article, "blocks">;

export function ArticleBrowser({ articles, categories }: { articles: Summary[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (!category || a.category === category) &&
        (!q || `${a.title} ${a.description} ${a.category}`.toLowerCase().includes(q)),
    );
  }, [articles, query, category]);

  const counts = (c: string) => articles.filter((a) => a.category === c).length;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-1 flex flex-wrap gap-2">
          {[null, ...categories].map((c) => {
            const active = category === c;
            return (
              <button
                key={c ?? "all"}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c)}
                className={cn(
                  "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors",
                  active ? "border-ink bg-ink text-white" : "border-line-strong bg-surface text-ink-2 hover:border-ink/40",
                )}
              >
                {c ?? "All"}
                <span className={cn("font-mono text-xs", active ? "text-white/70" : "text-faint")}>{c ? counts(c) : articles.length}</span>
              </button>
            );
          })}
        </div>
        <div className="relative w-full lg:w-72">
          <label htmlFor="article-search" className="sr-only">
            Search articles
          </label>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-faint" />
          <input
            id="article-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="min-h-11 w-full rounded-full border border-line-strong bg-surface pr-10 pl-10 text-base outline-none placeholder:text-faint focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-1.5 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-faint hover:text-ink"
            >
              <X aria-hidden className="size-4" />
            </button>
          )}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-muted">
        {results.length} {results.length === 1 ? "article" : "articles"}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <ArticleCard key={a.slug} article={{ ...a, blocks: [] }} headingLevel="h3" />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-card border border-dashed border-line-strong p-10 text-center">
          <p className="font-medium text-ink">No articles match.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory(null);
            }}
            className="mt-2 text-sm text-accent underline underline-offset-2"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
