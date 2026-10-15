import { Check } from "lucide-react";
import { cn } from "./cn";

export function Bullets({
  items,
  className,
  dark = false,
  check = false,
}: {
  items: string[];
  className?: string;
  dark?: boolean;
  check?: boolean;
}) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex gap-3 leading-relaxed", dark ? "text-on-navy-muted" : "text-muted")}>
          {check ? (
            <Check aria-hidden className={cn("mt-1 size-4 shrink-0", dark ? "text-brand-light" : "text-accent")} />
          ) : (
            <span aria-hidden className={cn("mt-2.5 size-1.5 shrink-0 rounded-full", dark ? "bg-brand" : "bg-accent")} />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
