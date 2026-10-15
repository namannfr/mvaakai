import { Section, SectionHeader } from "@/components/ui/section";
import { PipelineExplorer } from "./pipeline-explorer";

/** Homepage workflow: an interactive, connected five-stage pipeline on a dark band. */
export function Process() {
  return (
    <Section id="pipeline" tone="navy" labelledBy="process-title" className="overflow-hidden">
      <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="relative">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-14">
          <SectionHeader
            dark
            id="process-title"
            eyebrow="How it works"
            title="From Real-World Action to AI Data."
          />
          <p data-reveal className="max-w-md leading-relaxed text-on-navy-muted lg:pb-2">
            Select a stage to see what happens to a recording on its way to becoming training data.
          </p>
        </div>
        <div className="mt-12">
          <PipelineExplorer />
        </div>
      </div>
    </Section>
  );
}
