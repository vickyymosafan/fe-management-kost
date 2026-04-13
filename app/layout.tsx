import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistem Manajemen Kost",
  description: "SaaS Manajemen Kost End-to-End",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} h-full antialiased`}>
      <body className="font-sans min-h-full flex flex-col bg-background/95">
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <TooltipProvider>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="flex w-full flex-col bg-background/40">
                  <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur-md px-6 sticky top-0 z-10 transition-all">
                    <SidebarTrigger />
                    <div className="flex-1" />
                    {/* Placeholder for top bar user avatar / search */}
                  </header>
                  <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                  </main>
                </SidebarInset>
              </SidebarProvider>
            </TooltipProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

