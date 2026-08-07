"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/queue", label: "Mapping Queue" },
  { href: "/vocabulary", label: "Canonical Fields" },
];

function isLinkActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Fixed-width sidebar (no hover-expand like the dashboard's — this app
 * only ever has two-and-a-bit destinations, so there's nothing to save
 * space for). Active state derives from the URL via usePathname, so
 * /queue and /queue/[userId] both light up "Mapping Queue".
 */
export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[280px] shrink-0 flex-col border-r border-[#353030] bg-[#0b0e14]">
      <nav className="flex flex-col pt-4">
        {navLinks.map((link) => {
          const active = isLinkActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`mx-2 rounded-[10px] px-6 py-4 font-heading text-[18px] font-normal text-white/85 transition-colors ${
                active ? "bg-[#161b22]" : "hover:bg-[#161b22]/70"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <div className="mx-4 my-2 border-t border-[#353030]" />

        {/* Help Requests ships later — present but inert so the nav shape
            doesn't shift when it's built. */}
        <span
          aria-disabled="true"
          title="Coming soon"
          className="mx-2 flex cursor-not-allowed items-center gap-3 rounded-[10px] px-6 py-4 font-heading text-[18px] font-normal text-white/35"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="opacity-70">
            <circle cx="11" cy="11" r="10" stroke="white" strokeWidth="1.5" />
            <text x="11" y="16" textAnchor="middle" fill="white" fontSize="13">
              ?
            </text>
          </svg>
          Help Requests
        </span>
      </nav>
    </aside>
  );
}
