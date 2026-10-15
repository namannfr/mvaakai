import { Bot, BrainCircuit, FlaskConical, Workflow } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";

/** Who Mvaak serves — audiences described in Mvaak's existing materials; no client names. */
const audiences = [
  { icon: Bot, title: "Robotics & Physical AI teams", need: "Human demonstrations of real manipulation tasks." },
  { icon: BrainCircuit, title: "AI & ML companies", need: "Training and evaluation data specified around model failures." },
  { icon: FlaskConical, title: "Research labs", need: "Well-documented datasets with consent and provenance." },
  { icon: Workflow, title: "Data operations leads", need: "Extra capacity without renegotiating quality." },
];

export function WhoWeServe() {
  return (
    <Section id="who-we-serve" tone="surface" labelledBy="serve-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start lg:gap-16">
        <SectionHeader
          id="serve-title"
          eyebrow="Who we serve"
          title="Built for teams training AI on the real world."
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {audiences.map((a) => (
            <li key={a.title} data-reveal className="flex gap-4 rounded-card border border-line bg-canvas p-5 transition-colors hover:border-line-strong">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-ink text-lime">
                <a.icon aria-hidden className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold text-ink">{a.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{a.need}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
