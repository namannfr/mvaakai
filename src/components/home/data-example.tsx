import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { AnnotationCompare } from "./annotation-compare";

/** Homepage "Explore our data": the same recording as raw footage, annotated footage and structured data. */
export function DataExample() {
  return (
    <Section id="data-example" labelledBy="data-example-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
        <div>
          <SectionHeader
            id="data-example-title"
            eyebrow="Explore our data"
            title="One recording, three views."
            lead="Switch between raw footage, annotations and structured task data to see what turns video into training data."
          />
          <dl data-reveal className="mt-8 space-y-4">
            {[
              ["Raw footage", "What the camera recorded — useful, but not yet learnable."],
              ["Annotated", "Hands, the object and the current action are marked."],
              ["Structured data", "The same moment as a machine-readable record."],
            ].map(([k, v]) => (
              <div key={k} className="border-l-2 border-accent-line pl-4">
                <dt className="font-semibold text-ink">{k}</dt>
                <dd className="mt-0.5 text-[0.9375rem] text-muted">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <ButtonLink href="/services/egocentric-video-data" variant="secondary" arrow trackAs="home_data_example_egocentric">
              Egocentric Data Collection
            </ButtonLink>
          </div>
        </div>
        <div data-reveal>
          <AnnotationCompare dark={false} />
        </div>
      </div>
    </Section>
  );
}
