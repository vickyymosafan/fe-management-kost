"use client";

import { useState } from "react";
import { Receipt, History, Search, Upload, CheckCircle2, Clock, AlertCircle, RefreshCcw } from "lucide-react";
import { useMyBillStore, Bill } from "@/store/tenant/useMyBillStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function TagihanPage() {
  const { bills, uploadBukti } = useMyBillStore();
  const [tab, setTab] = useState<string>("Semua");
  const [search, setSearch] = useState("");
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const formatRupiah = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  const filtered = bills.filter((b) => {
    if (tab !== "Semua" && b.status !== tab) return false;
    if (search && !b.invoice.toLowerCase().includes(search.toLowerCase()) && !b.bulan.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: Bill["status"]) => {
    switch (status) {
      case "Lunas":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm border-none"><CheckCircle2 className="w-3 h-3 mr-1" />Lunas</Badge>;
      case "Menunggu Verifikasi":
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white shadow-sm border-none"><Clock className="w-3 h-3 mr-1" />Verifikasi</Badge>;
      default:
        return <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/5"><AlertCircle className="w-3 h-3 mr-1" />Belum Bayar</Badge>;
    }
  };

  const handleOpenUpload = (bill: Bill) => {
    setSelectedBill(bill);
    setFilePreview(null);
    setIsUploadOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFilePreview(URL.createObjectURL(file));
  };

  const handleSubmitBukti = () => {
    if (selectedBill && filePreview) {
      uploadBukti(selectedBill.id, filePreview);
      setIsUploadOpen(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Receipt className="w-6 h-6 sm:w-8 sm:h-8" />
          Tagihan & Pembayaran
        </h1>
        <div className="relative w-full sm:w-[280px] md:w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari invoice / bulan..."
            className="pl-9 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Main Card */}
      <Card className="border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" /> Riwayat Invoice
          </CardTitle>
          <CardDescription>Pantau status pembayaran sewa bulanan Anda.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-4 flex flex-wrap h-auto gap-1 sm:h-10">
              <TabsTrigger value="Semua">Semua</TabsTrigger>
              <TabsTrigger value="Lunas">Lunas</TabsTrigger>
              <TabsTrigger value="Belum Bayar">Belum Bayar</TabsTrigger>
              <TabsTrigger value="Menunggu Verifikasi">Verifikasi</TabsTrigger>
            </TabsList>
            <TabsContent value={tab} className="focus-visible:outline-none">
              <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-background/50 overflow-x-auto">
                <Table className="min-w-[520px]">
                  <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Periode</TableHead>
                      <TableHead>Nominal</TableHead>
                      <TableHead className="hidden md:table-cell">Tgl Bayar</TableHead>
                      <TableHead className="text-right">Status / Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length > 0 ? (
                      filtered.map((bill) => (
                        <TableRow key={bill.id}>
                          <TableCell className="font-mono font-medium text-xs text-muted-foreground">{bill.invoice}</TableCell>
                          <TableCell className="font-semibold">{bill.bulan}</TableCell>
                          <TableCell className="font-medium text-primary">{formatRupiah(bill.nominal)}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {bill.tanggalBayar ? bill.tanggalBayar : <span className="text-slate-400 italic">N/A</span>}
                          </TableCell>
                          <TableCell className="text-right">
                            {bill.status === "Belum Bayar" ? (
                              <Button size="sm" className="gap-1.5 h-8 text-xs" onClick={() => handleOpenUpload(bill)}>
                                <Upload className="w-3 h-3" /> Upload
                              </Button>
                            ) : (
                              getStatusBadge(bill.status)
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <RefreshCcw className="w-6 h-6 mb-2 opacity-20" />
                            <p>Invoice tidak ditemukan.</p>
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

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Bukti Pembayaran</DialogTitle>
            <DialogDescription>
              Invoice: <span className="font-mono font-bold">{selectedBill?.invoice}</span> — {selectedBill?.bulan}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="foto-bukti" className="font-semibold">Foto Transfer / Struk</Label>
              <Input id="foto-bukti" type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            {filePreview && (
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={filePreview} alt="preview bukti" className="w-full h-40 object-cover" />
                <p className="text-xs text-center py-2 text-emerald-600 font-semibold">✓ File siap dikirim</p>
              </div>
            )}
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsUploadOpen(false)}>Batal</Button>
            <Button disabled={!filePreview} className="w-full sm:w-auto" onClick={handleSubmitBukti}>Kirim Bukti</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
