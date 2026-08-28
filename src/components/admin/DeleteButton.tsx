"use client";

import { useTransition } from "react";

export function DeleteButton({
  label = "Sil",
  confirmText,
  action,
}: {
  label?: string;
  confirmText: string;
  action: () => Promise<void>;
}) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(confirmText)) return;
        start(async () => {
          await action();
        });
      }}
      className="text-sm font-semibold text-clay-strong transition hover:text-ink disabled:opacity-60"
    >
      {pending ? "Siliniyor…" : label}
    </button>
  );
}
