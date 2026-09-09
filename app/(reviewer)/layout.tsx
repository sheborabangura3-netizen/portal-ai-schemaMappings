import type { ReactNode } from "react";
import Header from "@/components/layout/header";
import SidebarNav from "@/components/layout/sidebarNav";

export default function ReviewerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#1b1b1b]">
      <Header />
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden lg:flex-row">
        <SidebarNav />
        <main className="flex min-h-0 flex-1 overflow-hidden border-t border-border bg-[#212121] lg:border-l lg:border-t-0">
          {children}
        </main>
      </div>
    </div>
  );
}
