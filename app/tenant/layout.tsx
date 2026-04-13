import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { TenantSidebar } from "@/components/tenant-sidebar";

export default function TenantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <TenantSidebar />
      <SidebarInset className="flex w-full flex-col bg-background/40 min-w-0">
        <header className="flex h-14 md:h-16 shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur-md px-3 md:px-6 sticky top-0 z-10 transition-all">
          <SidebarTrigger />
          <div className="flex-1" />
          {/* Tenant badge in topbar */}
          <span className="hidden sm:inline-flex text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            Portal Penyewa
          </span>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
