import { Section, SectionHeader } from "@/components/ui/section";

/** "See Mvaak in Action" — the official Mvaak YouTube video (ID sygn0mAgeZU), responsive 16:9 embed. */
const VIDEO_ID = "sygn0mAgeZU";

export function VideoSection() {
  return (
    <Section id="see-mvaak" tone="navy" labelledBy="video-title" className="overflow-hidden">
      <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative">
        <SectionHeader
          dark
          align="center"
          id="video-title"
          eyebrow="See Mvaak in action"
          title="IndiaAI grant support for Mvaak."
          lead="Coverage by NewsStation, from Mvaak’s YouTube channel."
          className="mx-auto"
        />
        <div data-reveal className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[1.25rem] border border-navy-line-strong bg-navy-3 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]">
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
      </div>
    </Section>
  );
}
