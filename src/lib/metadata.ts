import type { Metadata } from "next";
import { site } from "@/config/site";

/** Per-page metadata with canonical URL and Open Graph/Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · Mvaak`,
      description,
      url: path,
      type,
      siteName: site.name,
      locale: "en_IN",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} · Mvaak`, description },
  };
}
