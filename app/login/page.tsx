import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b1420] px-4">
      <div className="w-full max-w-[400px] rounded-2xl border border-border bg-[#101d2d] p-6 shadow-[var(--shadow-soft)]">
        <div className="mb-7 flex items-center justify-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-[#152338]">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <circle cx="14" cy="14" r="11" stroke="#8aa7ff" strokeWidth="1.5" />
              <circle cx="14" cy="14" r="4" fill="#8aa7ff" />
            </svg>
          </div>
          <span className="text-[18px] font-semibold tracking-[0.14em] text-text">PORTAL AI</span>
        </div>

        <div className="mb-5 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-text-muted">
            Reviewer access
          </p>
          <h1 className="mt-2 text-[28px] font-medium text-text">Sign In</h1>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
