import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import Link from "next/link";
import { recognitionPhotos } from "@/content/recognition";

/**
 * Homepage "Awards & Recognitions": the IndiaAI grant-support video (official Mvaak YouTube video
 * sygn0mAgeZU, NewsStation coverage) beside the two award photographs. Attribution follows what the
 * photos show — see docs/CONTENT-REVIEW.md §2b.
 */
const VIDEO_ID = "sygn0mAgeZU";

export function AwardsRecognition({
  id = "recognition",
  moreLink = true,
}: {
  id?: string;
  moreLink?: boolean;
}) {
  return (
    <Section
      id={id}
      tone="navy"
      labelledBy={`${id}-title`}
      className="overflow-hidden"
    >
      <div
        aria-hidden
        className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />
      <div className="relative">
        <SectionHeader dark id={`${id}-title`} title="Awards & Recognitions" />

        <div className="mt-10 grid items-start gap-6 lg:mt-12 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-8">
          {/* Featured video — about 63% of the content width on desktop */}
          <div
            data-reveal
            className="overflow-hidden rounded-[1.25rem] border border-navy-line-strong bg-navy-3 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]"
          >
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
                title="IndiaAI Grant Support for Mvaak, coverage by NewsStation (YouTube)"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* Recognition photographs */}
          <div data-reveal>
            <ul className="mx-auto grid max-w-xs grid-cols-1 gap-4 min-[360px]:max-w-lg min-[360px]:grid-cols-2 lg:max-w-none">
              {recognitionPhotos.map((p) => (
                <li key={p.src} className="flex">
                  <figure className="flex w-full flex-col overflow-hidden rounded-card border border-navy-line-strong bg-navy-3">
                    <div className="relative aspect-[4/7]">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(min-width: 1024px) 16vw, (min-width: 360px) 16rem, 20rem"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="flex-1 px-3 py-2.5 text-xs leading-snug text-on-navy-muted sm:text-sm">
                      {p.caption}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-4 max-w-lg text-sm text-on-navy-muted lg:max-w-none">
              Awarded to Narottam Innovations Pvt Ltd, presented with the mvaak
              AI name.
              {moreLink && (
                <>
                  {" "}
                  <Link
                    href="/about#recognition"
                    className="font-medium text-brand-light underline-offset-4 hover:text-white hover:underline"
                  >
                    More about Mvaak
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
