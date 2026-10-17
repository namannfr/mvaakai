import { site } from "@/config/site";
import { cn } from "@/components/ui/cn";

/* Official brand marks (Simple Icons paths) — lucide-react no longer ships brand icons. */
const paths: Record<(typeof site.social)[number]["name"], string> = {
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  YouTube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)} aria-label="Mvaak on social media">
      {site.social.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Mvaak on ${s.name} (opens in a new tab)`}
            title={`Mvaak on ${s.name}`}
            className="inline-flex size-10 items-center justify-center rounded-full border border-navy-line-strong text-on-navy-muted transition-colors hover:border-brand-light hover:bg-accent hover:text-white"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-[1.125rem]" fill="currentColor">
              <path d={paths[s.name]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
