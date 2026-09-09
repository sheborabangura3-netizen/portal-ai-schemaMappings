"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
  icon: string;
}

const navLinks: NavLink[] = [
  { href: "/queue", label: "Mapping Queue", icon: "▣" },
  { href: "/vocabulary", label: "Canonical Fields", icon: "◫" },
];

function isLinkActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-border bg-[#232323] lg:w-[220px] lg:border-b-0 lg:border-r">
      <div className="px-3 pb-3 pt-3 lg:px-4 lg:pb-3 lg:pt-4">
        <div className="rounded-xl border border-border bg-[#2a2a2a] p-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-text-muted lg:text-[10px]">
            Workspace
          </p>
          <p className="mt-1.5 text-[15px] font-medium text-text lg:text-[16px]">Schema Review</p>
        </div>
      </div>

      <nav className="flex flex-row gap-2 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:px-3 lg:pb-4">
        {navLinks.map((link) => {
          const active = isLinkActive(pathname, link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`group flex min-w-fit items-center gap-2.5 rounded-xl border px-3 py-2 transition-colors ${
                active
                  ? "border-[#5f72ff]/40 bg-[#2d3347] text-text"
                  : "border-transparent bg-transparent text-text-soft hover:border-border hover:bg-[#2a2a2a]"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-medium ${
                  active ? "bg-[#404d8a] text-[#dfe9ff]" : "bg-[#303030] text-text-muted"
                }`}
              >
                {link.icon}
              </span>
              <span className="text-[13px] font-medium lg:text-[14px]">{link.label}</span>
            </Link>
          );
        })}

        <div className="hidden my-2 border-t border-border lg:block" />

        <span
          aria-disabled="true"
          title="Coming soon"
          className="hidden cursor-not-allowed items-center gap-2.5 rounded-xl border border-dashed border-border px-3 py-2 text-text-muted lg:flex"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#303030] text-[11px] font-medium">
            ?
          </span>
          <span className="text-[13px] font-medium lg:text-[14px]">Help Requests</span>
        </span>
      </nav>
    </aside>
  );
}
