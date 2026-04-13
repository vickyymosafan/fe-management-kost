"use client";

import { Home, Receipt, Wrench, User } from "lucide-react";
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
    <div className="flex justify-center bg-slate-50 dark:bg-black min-h-dvh">
      {/* Mobile Constraint Wrapper */}
      <div className="w-full max-w-md bg-white dark:bg-slate-950 min-h-dvh relative shadow-2xl flex flex-col overflow-hidden">
         {/* Main Scrollable Content */}
         <main className="flex-1 overflow-y-auto pb-24 p-6">
            {children}
         </main>

         {/* Bottom Navigation Bar */}
         <nav className="absolute bottom-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 py-4 z-50">
            {navItems.map((item) => {
               const isActive = pathname === item.href;
               const Icon = item.icon;
               return (
                  <Link 
                     key={item.name} 
                     href={item.href}
                     className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                        isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
                     }`}
                  >
                     <Icon className={`w-6 h-6 ${isActive ? "fill-primary/20" : ""}`} />
                     <span className="text-[10px] font-semibold tracking-wide">{item.name}</span>
                  </Link>
               );
            })}
         </nav>
      </div>
    </div>
  );
}
