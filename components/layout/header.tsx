"use client";

import { Bell, User } from "lucide-react";
import { MobileSidebarWrapper } from "./mobile-sidebar-wrapper";

export function Header() {
  return (
    <MobileSidebarWrapper>
      <header className="flex h-16 items-center justify-between border-b bg-white p-4 md:px-6">

        {/* Este botón ahora viene del wrapper */}
        
        <h2 className="text-lg font-medium">Panel de control</h2>

        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-slate-600" />
          <User className="w-5 h-5 text-slate-600" />
        </div>
      </header>
    </MobileSidebarWrapper>
  );
}