"use client";

import { Home, Receipt, Wrench, User, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TenantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const navItems = [
    { name: "Beranda", href: "/tenant/dashboard", icon: Home },
    { name: "Tagihan", href: "/tenant/tagihan", icon: Receipt },
    { name: "Laporan", href: "/tenant/tiket", icon: Wrench },
    { name: "Profil", href: "/tenant/profil", icon: User },
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-background/40">
      {/* Sticky Top Header — mirip owner layout */}
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/80 backdrop-blur-md px-6 sticky top-0 z-10 transition-all">
        <div className="flex items-center gap-2">
          <span className="text-primary font-black text-lg tracking-tight">KostHub</span>
          <span className="text-xs font-medium text-muted-foreground bg-primary/10 text-primary px-2 py-0.5 rounded-full">Penyewa</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
          </button>
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">AR</span>
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-3xl mx-auto p-6 md:p-8">
          {children}
        </div>
      </main>

      {/* Fixed Bottom Navigation — full width */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-lg border-t border-border flex items-center justify-around px-4 z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 ${
                  isActive ? "bg-primary/10" : ""
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? "scale-110" : ""
                  }`}
                />
              </div>
              <span className="text-[10px] font-semibold tracking-wide">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
