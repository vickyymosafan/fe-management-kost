"use client";

import { Home, Receipt, Wrench, User, LogOut, Home as HomeIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const tenantMenuItems = [
  { title: "Beranda", url: "/tenant/dashboard", icon: Home },
  { title: "Tagihan", url: "/tenant/tagihan", icon: Receipt },
  { title: "Laporan", url: "/tenant/tiket", icon: Wrench },
  { title: "Profil", url: "/tenant/profil", icon: User },
];

export function TenantSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex justify-center h-16 pt-4 items-center">
        <Link href="/tenant/dashboard" className="font-bold text-xl text-primary flex items-center gap-2">
          <HomeIcon className="w-6 h-6 text-primary" />
          <span className="group-data-[collapsible=icon]:hidden tracking-tight">KostHub</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Portal Penyewa
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tenantMenuItems.map((item) => {
                const isActive =
                  pathname === item.url ||
                  (item.url !== "/tenant/dashboard" && pathname.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`transition-all duration-200 mt-1 ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium shadow-sm"
                          : "hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      <Link href={item.url} className="flex items-center gap-2 w-full">
                        <item.icon
                          className={`w-5 h-5 ${
                            isActive ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Kembali ke Beranda"
              className="hover:bg-primary/5 hover:text-primary transition-all mb-1"
            >
              <Link href="/" className="flex items-center gap-2 w-full">
                <Home className="w-5 h-5 text-muted-foreground" />
                <span>Beranda Utama</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-all">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
