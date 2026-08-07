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
    <header className="relative flex h-[72px] shrink-0 items-center justify-between border-b border-[#353030] bg-[#0b0e14] px-7">
      <div className="flex items-center gap-3">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          <circle cx="14" cy="14" r="5" fill="rgba(255,255,255,0.7)" />
        </svg>
        <span className="font-heading text-[20px] font-medium tracking-wide text-white/80">
          PORTAL AI
        </span>
      </div>

      <span className="absolute left-1/2 -translate-x-1/2 font-heading text-[28px] font-medium tracking-widest text-white/90">
        ADMIN DASHBOARD
      </span>

      <form action={logout}>
        <button
          type="submit"
          className="opacity-80 transition-opacity hover:opacity-100"
          aria-label="Sign out"
          title="Sign out"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="13" r="6" stroke="white" strokeWidth="1.8" />
            <path
              d="M4 33c0-7.732 6.268-14 14-14s14 6.268 14 14"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </form>
    </header>
  );
}
