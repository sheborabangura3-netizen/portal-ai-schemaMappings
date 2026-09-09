"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[12px] font-medium text-text-soft">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          disabled={isPending}
          className="h-10 rounded-lg border border-border bg-[var(--input)] px-3 text-[14px] text-text outline-none transition-colors focus:border-[#6076d7] disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-[12px] font-medium text-text-soft">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          disabled={isPending}
          className="h-10 rounded-lg border border-border bg-[var(--input)] px-3 text-[14px] text-text outline-none transition-colors focus:border-[#6076d7] disabled:opacity-50"
        />
      </div>

      {state.error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[12px] text-red-200">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 h-10 rounded-lg bg-[#4f73ff] text-[14px] font-medium text-white transition-colors hover:bg-[#4468ea] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
