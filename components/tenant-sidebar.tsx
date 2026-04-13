"use client";

import { useEffect } from "react";
import { Home, Receipt, Wrench, User, LogOut } from "lucide-react";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const tenantMenuItems = [
  { title: "Beranda", url: "/tenant/dashboard", icon: Home },
  { title: "Tagihan", url: "/tenant/tagihan",   icon: Receipt },
  { title: "Laporan", url: "/tenant/tiket",     icon: Wrench },
  { title: "Profil",  url: "/tenant/profil",    icon: User },
];

function TenantNavItems() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  // Auto-close mobile sheet on navigation
  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <SidebarMenu>
      {tenantMenuItems.map((item) => {
        const isActive =
          pathname === item.url ||
          (item.url !== "/tenant/dashboard" && pathname.startsWith(item.url));
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              render={<Link href={item.url} />}
              tooltip={item.title}
              isActive={isActive}
              className={`transition-all duration-200 mt-1 ${
                isActive
                  ? "bg-primary/10 text-primary font-medium shadow-sm"
                  : "hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

function TenantFooterItems() {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          render={<Link href="/" onClick={() => setOpenMobile(false)} />}
          tooltip="Kembali ke Beranda"
          className="hover:bg-primary/5 hover:text-primary transition-all mb-1"
        >
          <Home className="w-5 h-5 text-muted-foreground" />
          <span>Beranda Utama</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-all">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function TenantSidebar() {
  return (
    // offcanvas: mobile → Sheet drawer, desktop → collapsible (hide/expand)
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarHeader className="flex justify-center h-16 pt-4 items-center">
        <Link
          href="/tenant/dashboard"
          className="font-bold text-xl text-primary flex items-center gap-2"
        >
          <Home className="w-6 h-6 text-primary shrink-0" />
          <span className="tracking-tight">KostHub</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Portal Penyewa
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <TenantNavItems />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <TenantFooterItems />
      </SidebarFooter>
    </Sidebar>
  );
}
