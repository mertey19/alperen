"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

import type { ActionResult } from "@/lib/cms/actions";

export const inputClass =
  "w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-ink outline-none transition focus:border-clay";

export const areaClass = `${inputClass} min-h-32`;

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</span>
      {children}
      {hint ? <span className="block text-sm leading-relaxed text-muted">{hint}</span> : null}
    </label>
  );
}

export function SubmitButton({
  children,
  pendingLabel = "Kaydediliyor…",
}: {
  children: ReactNode;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper transition hover:bg-ink-2 disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export function ActionForm({
  action,
  children,
  className,
  success,
}: {
  action: (formData: FormData) => Promise<ActionResult>;
  children: ReactNode;
  className?: string;
  success?: string;
}) {
  const [state, formAction] = useActionState(
    async (_prev: ActionResult | null, formData: FormData) => action(formData),
    null,
  );

  return (
    <form action={formAction} className={className}>
      {children}
      {state && !state.ok ? (
        <p className="text-sm text-clay-strong" role="alert">
          {state.error}
        </p>
      ) : null}
      {state?.ok && success ? <p className="text-sm text-muted">{success}</p> : null}
    </form>
  );
}
