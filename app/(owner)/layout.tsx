import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function OwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex w-full flex-col bg-background/40 min-w-0">
        <header className="flex h-14 md:h-16 shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur-md px-3 md:px-6 sticky top-0 z-10 transition-all">
          <SidebarTrigger />
          <div className="flex-1" />
          {/* Placeholder for top bar user avatar / search */}
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
