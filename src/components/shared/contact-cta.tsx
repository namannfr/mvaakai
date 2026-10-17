import { ButtonLink } from "@/components/ui/button";
import { site } from "@/config/site";

export function ContactCta({
  title = "What Does Your AI Need to Learn?",
  body = "Tell us about your data requirements, and let’s explore the right approach.",
  href = "/contact",
  cta = "Start a Conversation",
  trackAs = "final_cta_start_conversation",
}: {
  title?: string;
  body?: string;
  href?: string;
  cta?: string;
  trackAs?: string;
}) {
  return (
    <section aria-labelledby="contact-cta-title" className="relative overflow-hidden border-b border-navy-line bg-navy text-on-navy">
      <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-page relative py-[var(--spacing-section)]">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="eyebrow text-brand-light">Start a project</p>
          <h2 id="contact-cta-title" className="mt-4 text-h2 font-semibold text-balance text-white">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-pretty text-on-navy-muted">{body}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={href} size="lg" variant="light" arrow trackAs={trackAs}>
              {cta}
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} size="lg" variant="outline-light" trackAs="final_cta_email">
              {site.email}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
