"use client";

import { CreditCard, Droplets, MapPin, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TenantDashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      {/* Page Heading */}
      <div>
        <p className="text-sm text-muted-foreground font-medium">Selamat Siang,</p>
        <h1 className="text-3xl font-black text-primary">Ahmad Rifai</h1>
      </div>

      {/* Hero Card : Kamar Info */}
      <Card className="bg-linear-to-br from-primary to-rose-400 text-white border-none shadow-xl overflow-hidden relative">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg viewBox="0 0 100 100" className="w-32 h-32 fill-current">
            <path d="M50 0L100 50L50 100L0 50L50 0Z" />
          </svg>
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <Badge className="bg-white/20 text-white hover:bg-white/30 border-none">
              <MapPin className="w-3 h-3 mr-1" />
              Kamar 105
            </Badge>
            <span className="text-sm font-semibold tracking-wider opacity-80">VIP ROOM</span>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-white/70 uppercase">Masa Sewa Aktif</p>
            <h2 className="text-xl font-bold">10 Apr - 10 Mei 2026</h2>
          </div>
        </CardContent>
      </Card>

      {/* Bill Reminder (Bento Style) */}
      <div>
        <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-200">
          <CreditCard className="w-4 h-4 text-primary" />
          Tagihan Bulan Ini
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-none shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                <Droplets className="w-4 h-4" />
              </div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Air (PDAM)</p>
              <p className="font-bold text-sm">Rp 45.000</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-none shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-2">
                <Zap className="w-4 h-4" />
              </div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Listrik</p>
              <p className="font-bold text-sm text-orange-500">Unpaid</p>
            </CardContent>
          </Card>
          <Card className="col-span-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-xs text-emerald-600/80 dark:text-emerald-400 font-bold uppercase tracking-wider">Sewa Kamar</p>
                <p className="font-black text-lg text-emerald-700 dark:text-emerald-400 mt-1">Rp 2.200.000</p>
              </div>
              <Badge className="bg-emerald-500 border-none shadow-sm rounded-full">Lunas</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
