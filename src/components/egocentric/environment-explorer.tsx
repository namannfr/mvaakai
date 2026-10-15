"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { CheckCircle2, Factory, Info } from "lucide-react";
import { environmentOptions, type EnvironmentOption } from "@/content/egocentric-collection";
import { CaptureFrame } from "@/components/visuals/capture-frame";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

function EnvVisual({ env }: { env: EnvironmentOption }) {
  if (!env.scene) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-navy-3 p-6 text-center">
        <Factory aria-hidden className="size-10 text-lime" />
        <p className="font-mono text-xs tracking-[0.1em] text-on-navy-muted uppercase">Visual placeholder</p>
        <p className="max-w-xs text-sm text-on-navy-muted">Industrial example footage to be added once a project is scoped.</p>
      </div>
    );
  }
  return (
    <CaptureFrame
      scene={env.scene}
      uid={`env-${env.id}`}
      episode={`ex_${env.id.slice(0, 4)}`}
      className="h-full w-full"
      title={`Illustrative first-person ${env.title.toLowerCase()} capture frame with hand keypoints and a labelled object.`}
    />
  );
}

/** Environment selector: choosing a category updates the highlighted card and its task examples. */
export function EnvironmentExplorer() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const env = environmentOptions[active];

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: environmentOptions.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = (map[e.key] + environmentOptions.length) % environmentOptions.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="radiogroup" aria-label="Filter by environment" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {environmentOptions.map((e, i) => {
          const selected = i === active;
          return (
            <button
              key={e.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(ev) => onKeyDown(ev, i)}
              className={cn(
                "flex min-h-14 flex-col items-start justify-center rounded-xl border px-4 py-2.5 text-left transition-colors",
                selected ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink hover:border-line-strong",
              )}
            >
              <span className="text-[0.9375rem] font-semibold">{e.title}</span>
              <span className={cn("mt-0.5 text-xs", selected ? "text-lime" : "text-faint")}>
                {e.inMaterials ? "In Mvaak’s scope" : "Confirm in scoping"}
              </span>
            </button>
          );
        })}
      </div>

      <div key={env.id} className="mt-4 grid animate-reveal overflow-hidden rounded-[1.25rem] border border-line bg-surface lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]" aria-live="polite">
        <div className="aspect-[16/10] bg-navy">
          <EnvVisual env={env} />
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <p className="font-mono text-xs tracking-[0.12em] text-accent uppercase">Environment</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{env.title}</h3>
          <p className="mt-2 text-muted">{env.summary}</p>
          <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.12em] text-faint uppercase">Example tasks</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {env.tasks.map((t) => (
              <li key={t} className="rounded-full border border-line bg-canvas px-3 py-1 text-sm text-ink-2">
                {t}
              </li>
            ))}
          </ul>
          <p
            className={cn(
              "mt-5 flex items-start gap-2 rounded-lg px-3 py-2 text-sm",
              env.inMaterials ? "bg-accent-soft text-ink-2" : "bg-warning-soft text-ink-2",
            )}
          >
            {env.inMaterials ? (
              <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
            ) : (
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-warning" />
            )}
            {env.inMaterials
              ? "Described in Mvaak’s service scope. Site and task specifics are confirmed during project scoping."
              : "Availability confirmed during project scoping."}
          </p>
          <div className="mt-auto pt-6">
            <ButtonLink
              href={`/contact?type=egocentric-video&env=${env.id}#inquiry`}
              variant="secondary"
              arrow
              trackAs={`ego_env_${env.id}`}
            >
              Scope a {env.title.toLowerCase()} project
            </ButtonLink>
          </div>
          <p className="mt-3 text-xs text-faint">Example tasks are illustrative, not completed projects.</p>
        </div>
      </div>
    </div>
  );
}
