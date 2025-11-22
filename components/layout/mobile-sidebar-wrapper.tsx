"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function MobileSidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Botón hamburguesa visible solamente en mobile */}
      <SheetTrigger asChild>
        <button className="p-2 md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>

      {/* Contenido del sidebar móvil */}
      <SheetContent side="left" className="w-64 p-0">
        {/* Título accesible*/}
        <SheetHeader className="flex h-16 items-center px-6 border-b">
          <SheetTitle className="text-xl font-semibold">Dashboard</SheetTitle>
        </SheetHeader>

        <aside className="flex h-full flex-col bg-white">
          <nav className="flex flex-col p-4 gap-2">
            <a
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
            >
              Inicio
            </a>
            <a
              href="/events"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
            >
              Eventos
            </a>
          </nav>
        </aside>
      </SheetContent>

      {/* Header original envuelto */}
      {children}
    </Sheet>
  );
}
