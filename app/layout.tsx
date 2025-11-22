import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";


import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MainWrapper } from "@/components/layout/main-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Real-time dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex bg-slate-50`}>
        <Sidebar />

        <div className="flex flex-1 flex-col min-h-screen">
          <Header />
          <MainWrapper>{children}</MainWrapper>
        </div>

        <Toaster richColors closeButton />
      </body>
    </html>
  );
}