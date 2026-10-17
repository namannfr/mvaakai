"use client";

import { useId, type ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/components/ui/cn";

/**
 * Accessible form primitives. Every control gets a visible label, a required
 * indicator, optional hint text, and an error message wired up via
 * aria-describedby / aria-invalid.
 */

const control =
  "block w-full rounded-xl border bg-surface px-3.5 py-2.5 text-base text-ink placeholder:text-faint transition-[border-color,box-shadow] outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 disabled:opacity-60";

const controlState = (error?: string) => (error ? "border-danger ring-4 ring-danger/10" : "border-line-strong hover:border-ink/30");

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  children: (a11y: { id: string; "aria-invalid": boolean; "aria-describedby"?: string; "aria-required"?: boolean }) => ReactNode;
  className?: string;
};

export function Field({ id, label, required, hint, error, children, className }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className="flex items-baseline gap-1.5 text-[0.9375rem] font-medium text-ink">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden>
            *
          </span>
        ) : (
          <span className="text-sm font-normal text-faint">(optional)</span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="mt-1 text-sm leading-snug text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">
        {children({
          id,
          "aria-invalid": !!error,
          "aria-describedby": [hintId, errorId].filter(Boolean).join(" ") || undefined,
          "aria-required": required || undefined,
        })}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

type BaseInput = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  className?: string;
  placeholder?: string;
};

export function TextField({
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
  min,
  ...p
}: BaseInput & {
  type?: "text" | "email" | "tel" | "url" | "date";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "url" | "numeric";
  maxLength?: number;
  min?: string;
}) {
  return (
    <Field id={`f-${p.name}`} label={p.label} required={p.required} hint={p.hint} error={p.error} className={p.className}>
      {(a11y) => (
        <input
          {...a11y}
          name={p.name}
          type={type}
          value={p.value}
          placeholder={p.placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          min={min}
          onChange={(e) => p.onChange(e.target.value)}
          className={cn(control, controlState(p.error), "min-h-12")}
        />
      )}
    </Field>
  );
}

export function TextAreaField({ rows = 4, maxLength, ...p }: BaseInput & { rows?: number; maxLength?: number }) {
  return (
    <Field id={`f-${p.name}`} label={p.label} required={p.required} hint={p.hint} error={p.error} className={p.className}>
      {(a11y) => (
        <>
          <textarea
            {...a11y}
            name={p.name}
            rows={rows}
            value={p.value}
            placeholder={p.placeholder}
            maxLength={maxLength}
            onChange={(e) => p.onChange(e.target.value)}
            className={cn(control, controlState(p.error), "resize-y leading-relaxed")}
          />
          {maxLength && (
            <p className="mt-1 text-right text-xs text-faint" aria-hidden>
              {p.value.length.toLocaleString("en-US")} / {maxLength.toLocaleString("en-US")}
            </p>
          )}
        </>
      )}
    </Field>
  );
}

export function SelectField({
  options,
  ...p
}: BaseInput & { options: readonly { id: string; label: string }[] }) {
  return (
    <Field id={`f-${p.name}`} label={p.label} required={p.required} hint={p.hint} error={p.error} className={p.className}>
      {(a11y) => (
        <select
          {...a11y}
          name={p.name}
          value={p.value}
          onChange={(e) => p.onChange(e.target.value)}
          className={cn(
            control,
            controlState(p.error),
            "min-h-12 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23545d6e%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[position:right_0.9rem_center] bg-no-repeat pr-10",
            !p.value && "text-faint",
          )}
        >
          <option value="" disabled>
            {p.placeholder ?? "Select…"}
          </option>
          {options.map((o) => (
            <option key={o.id} value={o.id} className="text-ink">
              {o.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

/** Group of checkboxes or radios presented as selectable chips/cards, inside a fieldset. */
export function ChoiceGroup({
  name,
  legend,
  options,
  value,
  onChange,
  multiple = false,
  required,
  hint,
  error,
  columns = "auto",
  className,
}: {
  name: string;
  legend: string;
  options: readonly { id: string; label: string; hint?: string }[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  columns?: "auto" | "1" | "2" | "3";
  className?: string;
}) {
  const uid = useId();
  const hintId = hint ? `${uid}-hint` : undefined;
  const errorId = error ? `${uid}-error` : undefined;
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const toggle = (id: string) => {
    if (!multiple) return onChange(id);
    if (id === "unsure") return onChange(selected.includes("unsure") ? [] : ["unsure"]);
    const next = selected.includes(id) ? selected.filter((v) => v !== id) : [...selected.filter((v) => v !== "unsure"), id];
    onChange(next);
  };
  const hasHints = options.some((o) => o.hint);

  return (
    <fieldset
      className={cn("min-w-0", className)}
      aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
      // Single choice is a radiogroup, which supports required/invalid states.
      // Multi-select groups keep the visible marker and the linked error text instead.
      role={multiple ? undefined : "radiogroup"}
      aria-invalid={!multiple && error ? true : undefined}
      aria-required={!multiple && required ? true : undefined}
      id={`f-${name}`}
      tabIndex={-1}
    >
      <legend className="flex items-baseline gap-1.5 text-[0.9375rem] font-medium text-ink">
        {legend}
        {required ? (
          <span className="text-danger" aria-hidden>
            *
          </span>
        ) : (
          <span className="text-sm font-normal text-faint">(optional)</span>
        )}
      </legend>
      {hint && (
        <p id={hintId} className="mt-1 text-sm leading-snug text-muted">
          {hint}
        </p>
      )}
      <div
        className={cn(
          "mt-3 grid gap-2",
          columns === "auto" && !hasHints && "flex flex-wrap",
          columns === "2" && "sm:grid-cols-2",
          columns === "3" && "sm:grid-cols-3",
        )}
      >
        {options.map((o) => {
          const checked = selected.includes(o.id);
          return (
            <label
              key={o.id}
              className={cn(
                "relative flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-2.5 text-[0.9375rem] transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/20",
                checked ? "border-accent bg-accent-soft text-ink" : "border-line-strong bg-surface text-ink-2 hover:border-ink/30",
                error && !checked && "border-danger/50",
              )}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={o.id}
                checked={checked}
                onChange={() => toggle(o.id)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex size-[1.125rem] shrink-0 items-center justify-center border transition-colors",
                  multiple ? "rounded-[5px]" : "rounded-full",
                  checked ? "border-accent bg-accent text-white" : "border-line-strong bg-surface",
                )}
              >
                {checked && (multiple ? <Check className="size-3" strokeWidth={3} /> : <span className="size-1.5 rounded-full bg-white" />)}
              </span>
              <span>
                <span className="block leading-snug">{o.label}</span>
                {o.hint && <span className="mt-0.5 block text-sm leading-snug text-muted">{o.hint}</span>}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function ConsentCheckbox({
  name,
  checked,
  onChange,
  error,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-required
          className="mt-1 size-[1.125rem] shrink-0 cursor-pointer rounded accent-[var(--color-accent)]"
        />
        <span>
          {children} <span className="text-danger" aria-hidden>*</span>
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1 ml-7 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Off-screen honeypot field; real users never see or fill it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input tabIndex={-1} autoComplete="off" name="website" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

/** A numbered group of related fields with a title, short helper text and a divider above. */
export function FormGroup({
  n,
  title,
  description,
  children,
}: {
  n: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="min-w-0 border-t border-line px-5 py-8 first-of-type:border-t-0 sm:px-8">
      <legend className="sr-only">{title}</legend>
      <div className="mb-6 flex items-start gap-3" aria-hidden>
        <span className="mt-0.5 inline-flex h-6 min-w-8 items-center justify-center rounded-md bg-accent-soft px-1.5 font-mono text-xs font-medium text-accent">
          {n}
        </span>
        <div>
          <p className="font-semibold text-ink">{title}</p>
          {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
        </div>
      </div>
      <div className="space-y-6">{children}</div>
    </fieldset>
  );
}
