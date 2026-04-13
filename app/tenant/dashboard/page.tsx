"use client";

import { LayoutDashboard, BedDouble, CreditCard, Droplets, Zap, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const riwayatTagihan = [
  { bulan: "April 2026", invoice: "INV-APR-2026", nominal: 2200000, status: "Lunas", tanggal: "5 Apr 2026" },
  { bulan: "Maret 2026", invoice: "INV-MAR-2026", nominal: 2200000, status: "Lunas", tanggal: "2 Mar 2026" },
  { bulan: "Mei 2026",   invoice: "INV-MEI-2026", nominal: 2200000, status: "Belum Bayar", tanggal: "-" },
];

const tagiBulanIni = [
  { label: "Sewa Kamar", nominal: 2200000, status: "Lunas",       icon: BedDouble, color: "text-emerald-500" },
  { label: "Air (PDAM)", nominal: 45000,   status: "Lunas",       icon: Droplets,  color: "text-blue-500" },
  { label: "Listrik",    nominal: null,     status: "Belum Bayar", icon: Zap,       color: "text-yellow-500" },
];

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

export default function TenantDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <LayoutDashboard className="w-8 h-8" />
          Beranda Penyewa
        </h1>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">No. Kamar</CardTitle>
            <BedDouble className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">105</div>
            <p className="text-xs text-muted-foreground mt-1">Tipe VIP Room</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Masa Sewa Aktif</CardTitle>
            <CalendarDays className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">10 Apr – 10 Mei 2026</div>
            <p className="text-xs text-muted-foreground mt-1">Sisa 27 hari</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-linear-to-br from-primary to-rose-400 text-white hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Tagihan Bulan Ini</CardTitle>
            <CreditCard className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(2200000)}</div>
            <p className="text-xs text-white/80 mt-1">Sewa kamar — Lunas</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Riwayat Tagihan Table */}
        <Card className="lg:col-span-4 border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Riwayat Tagihan</CardTitle>
            <CardDescription>3 tagihan terakhir kamar Anda.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-background/50 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                  <TableRow>
                    <TableHead>Bulan</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Nominal</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {riwayatTagihan.map((t) => (
                    <TableRow key={t.invoice}>
                      <TableCell className="font-semibold">{t.bulan}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{t.invoice}</TableCell>
                      <TableCell className="font-medium text-primary">{formatRupiah(t.nominal)}</TableCell>
                      <TableCell className="text-right">
                        {t.status === "Lunas"
                          ? <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none">Lunas</Badge>
                          : <Badge variant="outline" className="text-slate-500 bg-slate-100 dark:bg-slate-800">Belum Bayar</Badge>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Tagihan Bulan Ini Detail */}
        <Card className="lg:col-span-3 border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" /> Rincian Bulan Ini
            </CardTitle>
            <CardDescription>Breakdown tagihan April 2026.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {tagiBulanIni.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center space-x-4 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-background/50">
                    <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm font-medium leading-none">{item.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.nominal ? formatRupiah(item.nominal) : "Menunggu tagihan"}
                      </p>
                    </div>
                    {item.status === "Lunas"
                      ? <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none shadow-sm">Lunas</Badge>
                      : <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/5">Belum</Badge>
                    }
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
