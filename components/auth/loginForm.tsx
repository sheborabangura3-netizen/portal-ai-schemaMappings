"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-heading text-[13px] font-medium text-white/60">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          disabled={isPending}
          className="h-11 rounded-[8px] border px-3 font-heading text-[15px] text-white outline-none transition-colors focus:border-[var(--pai-blue)] disabled:opacity-50"
          style={{ backgroundColor: "var(--pai-input-bg)", borderColor: "var(--pai-border)" }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="font-heading text-[13px] font-medium text-white/60">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          disabled={isPending}
          className="h-11 rounded-[8px] border px-3 font-heading text-[15px] text-white outline-none transition-colors focus:border-[var(--pai-blue)] disabled:opacity-50"
          style={{ backgroundColor: "var(--pai-input-bg)", borderColor: "var(--pai-border)" }}
        />
      </div>

      {state.error && (
        <p className="rounded-[8px] border border-red-500/30 bg-red-500/10 px-3 py-2 font-heading text-[13px] text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 h-11 rounded-[8px] font-heading text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: "var(--pai-blue)" }}
      >
        {isPending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
