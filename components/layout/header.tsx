/**
 * Static top bar for the reviewer app. No institution context to render
 * (unlike the dashboard's Header) — this is an internal tool, so it's a
 * plain Server Component with nothing to fetch. The account icon signs
 * out directly via the Server Action as its form action — no client JS
 * needed for that.
 */
import { logout } from "@/lib/actions/auth";

export default function Header() {
  return (
    <header className="relative flex h-[62px] shrink-0 items-center justify-between border-b border-border bg-[#212121] px-3 sm:px-4 lg:h-[68px] lg:px-5">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-[#2a2a2a] sm:h-8 sm:w-8">
          <svg width="15" height="15" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="sm:h-4 sm:w-4">
            <circle cx="14" cy="14" r="11" stroke="#a7bbff" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="4" fill="#a7bbff" />
          </svg>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-text-muted sm:text-[10px]">
            Portal
          </span>
          <span className="text-[13px] font-semibold tracking-[0.08em] text-text sm:text-[15px]">AI</span>
        </div>
      </div>

      <div className="absolute left-1/2 hidden -translate-x-1/2 rounded-full border border-border bg-[#2a2a2a] px-2.5 py-1.5 sm:block">
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-text-soft sm:text-[10px]">
          Admin Dashboard
        </span>
      </div>

      <form action={logout}>
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-[#2a2a2a] px-2 py-1.5 text-text-soft transition-colors hover:border-border-strong hover:text-text sm:gap-2 sm:px-2.5"
          aria-label="Sign out"
          title="Sign out"
        >
          <svg width="14" height="14" viewBox="0 0 36 36" fill="none" aria-hidden="true" className="sm:h-4 sm:w-4">
            <circle cx="18" cy="13" r="6" stroke="currentColor" strokeWidth="1.8" />
            <path d="M4 33c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="text-[9px] font-medium uppercase tracking-[0.14em] sm:text-[10px]">Sign out</span>
        </button>
      </form>
    </header>
  );
}
