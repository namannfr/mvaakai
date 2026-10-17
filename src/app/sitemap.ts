import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { articles } from "@/content/articles";
import { dataTypePages } from "@/content/data-types";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    changeFrequency,
    priority,
  });

  return [
    page("", 1, "weekly"),
    page("/services", 0.9),
    page("/services/egocentric-video-data", 0.9),
    ...dataTypePages.map((p) => page(`/services/${p.slug}`, 0.7)),
    page("/solutions/physical-ai", 0.8),
    page("/partnerships", 0.8),
    page("/about", 0.6),
    page("/contact", 0.7),
    page("/blog", 0.7, "weekly"),
    ...articles.map((a) => ({ ...page(`/blog/${a.slug}`, 0.5, "yearly"), lastModified: a.date })),
    page("/privacy", 0.2, "yearly"),
  ];
}
