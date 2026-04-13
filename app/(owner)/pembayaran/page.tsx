"use client";

import { CreditCard, History, RefreshCcw, Search } from "lucide-react";
import { usePaymentStore, PaymentStatusFilter } from "@/store/owner/usePaymentStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

export default function PembayaranPage() {
  const { payments, filterTab, setFilterTab } = usePaymentStore();
  const [searchInvoice, setSearchInvoice] = useState("");

  const filteredPayments = payments.filter((p) => {
    // Filter status via tabs
    if (filterTab !== "Semua" && p.status !== filterTab) return false;
    // Search invoice
    if (searchInvoice && !p.invoice.toLowerCase().includes(searchInvoice.toLowerCase()) && !p.nama.toLowerCase().includes(searchInvoice.toLowerCase())) {
      return false;
    }
    return true;
  });

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Lunas":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm border-none">Lunas</Badge>;
      case "Telat":
         // Merah/Orange
        return <Badge className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm border-none">Telat</Badge>;
      case "Belum Bayar":
         // Abu-abu - Reddish indicating pending
        return <Badge variant="outline" className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800">Belum Bayar</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <CreditCard className="w-6 h-6 sm:w-8 sm:h-8" />
          Pembayaran
        </h1>
        <div className="relative w-full sm:w-[280px] md:w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari Invoice atau Nama..."
            className="pl-9 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md"
            value={searchInvoice}
            onChange={(e) => setSearchInvoice(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Riwayat Transaksi
          </CardTitle>
          <CardDescription>
            Pantau semua pembayaran sewa kos berdasarkan status invoicenya.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="Semua"
            className="w-full"
            value={filterTab}
            onValueChange={(v) => setFilterTab(v as PaymentStatusFilter)}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="Semua">Semua</TabsTrigger>
              <TabsTrigger value="Lunas">Lunas</TabsTrigger>
              <TabsTrigger value="Belum Bayar">Belum Bayar</TabsTrigger>
              <TabsTrigger value="Telat">Telat</TabsTrigger>
            </TabsList>

            <TabsContent value={filterTab} className="focus-visible:outline-none">
              <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-background/50 overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Penyewa</TableHead>
                      <TableHead>No Kamar</TableHead>
                      <TableHead>Tanggal Bayar</TableHead>
                      <TableHead>Nominal</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.length > 0 ? (
                      filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-mono font-medium text-xs text-muted-foreground">
                            {payment.invoice}
                          </TableCell>
                          <TableCell className="font-semibold">{payment.nama}</TableCell>
                          <TableCell>{payment.kamar}</TableCell>
                          <TableCell>{payment.tanggal !== "-" ? payment.tanggal : <span className="text-slate-400 italic">N/A</span>}</TableCell>
                          <TableCell className="font-medium text-primary">
                            {formatRupiah(payment.nominal)}
                          </TableCell>
                          <TableCell className="text-right">
                            {getStatusBadge(payment.status)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <RefreshCcw className="w-6 h-6 mb-2 opacity-20" />
                            <p>Transaksi tidak ditemukan.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
