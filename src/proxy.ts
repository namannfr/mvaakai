import { NextResponse, type NextRequest } from "next/server";
import { articles } from "@/content/articles";
import { dataTypePages } from "@/content/data-types";

/**
 * With Cache Components, unknown dynamic params render at request time and the
 * not-found UI streams in with a 200 status. Rejecting unknown slugs here, before
 * rendering, returns a proper 404 so search engines never see soft-404s.
 */
const known = {
  blog: new Set(articles.map((a) => a.slug)),
  services: new Set([...dataTypePages.map((p) => p.slug), "egocentric-video-data"]),
};

export function proxy(request: NextRequest) {
  const [, section, slug, extra] = request.nextUrl.pathname.split("/");
  const set = known[section as keyof typeof known];
  if (set && slug && (extra !== undefined || !set.has(slug))) {
    return NextResponse.rewrite(new URL("/_unknown", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:slug+", "/services/:slug+"],
};
