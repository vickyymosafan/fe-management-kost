"use client";

import { Users, Search, Phone, CreditCard, Home } from "lucide-react";
import { useTenantStore } from "@/store/owner/useTenantStore";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TenantPage() {
  const { tenants, searchQuery, setSearchQuery } = useTenantStore();

  // Filter tenants based on search UI state
  const filteredTenants = tenants.filter((tenant) =>
    tenant.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tenant.kamar.includes(searchQuery)
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Users className="w-6 h-6 sm:w-8 sm:h-8" />
          Data Penyewa
        </h1>
        <div className="relative w-full sm:w-[280px] md:w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama / No. Kamar..."
            className="pl-9 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid List View */}
      {filteredTenants.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-white/30 dark:bg-slate-900/30">
          <Users className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">Penyewa Tidak Ditemukan</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Coba gunakan nama atau nomor kamar yang lain.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTenants.map((tenant) => (
            <Card
              key={tenant.id}
              className="group hover:shadow-lg transition-all duration-300 border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md relative overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-sm">
                  <AvatarImage src={tenant.avatar} alt={tenant.nama} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{tenant.nama.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-lg font-bold leading-none">{tenant.nama}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold hover:bg-primary/20">
                       <Home className="w-3 h-3 mr-1" />
                       Kamar {tenant.kamar}
                     </Badge>
                     {tenant.statusPembayaran === "Lunas" ? (
                        <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm border-none">Lunas</Badge>
                     ) : (
                        <Badge className="bg-destructive hover:bg-destructive shadow-sm border-none">Belum Bayar</Badge>
                     )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                 <div className="flex items-center text-sm text-muted-foreground bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                    <CreditCard className="w-4 h-4 mr-3 text-primary/70" />
                    <span className="font-mono">{tenant.ktp}</span>
                 </div>
                 <div className="flex items-center text-sm text-muted-foreground bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                    <Phone className="w-4 h-4 mr-3 text-primary/70" />
                    <span>{tenant.noHp}</span>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
