"use client";

import { useActionState } from "react";

import { loginAction, type ActionResult } from "@/lib/cms/actions";
import { inputClass, SubmitButton } from "@/components/admin/ui";

export function LoginForm({ disabled }: { disabled: boolean }) {
  const [state, formAction] = useActionState(
    async (prev: ActionResult | null, formData: FormData) => loginAction(prev, formData),
    null,
  );

  return (
    <form action={formAction} className="space-y-5">
      <label className="block space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Yönetim şifresi
        </span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          disabled={disabled}
          className={inputClass}
        />
      </label>
      {state && !state.ok ? (
        <p className="text-sm text-clay-strong" role="alert">
          {state.error}
        </p>
      ) : null}
      <SubmitButton pendingLabel="Giriş yapılıyor…">{disabled ? "Panel kapalı" : "Giriş yap"}</SubmitButton>
    </form>
  );
}
