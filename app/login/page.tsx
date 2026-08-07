import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0e14] px-4">
      <div className="flex w-full max-w-[360px] flex-col items-center">
        <div className="mb-8 flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="5" fill="rgba(255,255,255,0.7)" />
          </svg>
          <span className="font-heading text-[20px] font-medium tracking-wide text-white/80">
            PORTAL AI
          </span>
        </div>

        <h1 className="mb-6 self-start font-heading text-[22px] font-medium text-white/90">
          Reviewer Sign In
        </h1>

        <LoginForm />
      </div>
    </div>
  );
}
