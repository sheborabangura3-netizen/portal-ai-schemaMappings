import type { ReactNode } from "react";
import Header from "@/components/layout/header";
import SidebarNav from "@/components/layout/sidebarNav";

export default function ReviewerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0b0e14]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SidebarNav />
        <main className="flex flex-1 overflow-hidden border-l border-[#353030]">
          {children}
        </main>
      </div>
    </div>
  );
}
