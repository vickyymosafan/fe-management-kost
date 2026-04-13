"use client";

import { useState } from "react";
import { Receipt, Upload, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useMyBillStore, Bill } from "@/store/tenant/useMyBillStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TagihanPage() {
  const { bills, uploadBukti } = useMyBillStore();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const formatRupiah = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  const statusMeta = (status: Bill["status"]) => {
    switch (status) {
      case "Lunas":
        return { icon: <CheckCircle2 className="w-4 h-4" />, cls: "bg-emerald-500 border-none text-white", label: "Lunas" };
      case "Menunggu Verifikasi":
        return { icon: <Clock className="w-4 h-4" />, cls: "bg-amber-500 border-none text-white", label: "Verifikasi" };
      default:
        return { icon: <AlertCircle className="w-4 h-4" />, cls: "bg-red-500 border-none text-white", label: "Belum Bayar" };
    }
  };

  const handleOpenUpload = (bill: Bill) => {
    setSelectedBill(bill);
    setFilePreview(null);
    setIsUploadOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const mockUrl = URL.createObjectURL(file);
      setFilePreview(mockUrl);
    }
  };

  const handleSubmitBukti = () => {
    if (selectedBill && filePreview) {
      uploadBukti(selectedBill.id, filePreview);
      setIsUploadOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-primary flex items-center gap-2">
          <Receipt className="w-6 h-6" /> Tagihan & Pembayaran
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Riwayat invoice bulanan Anda</p>
      </div>

      {/* Bills List */}
      <div className="space-y-4">
        {bills.map((bill) => {
          const meta = statusMeta(bill.status);
          return (
            <Card
              key={bill.id}
              className="border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm overflow-hidden"
            >
              <div className={`h-1 w-full ${bill.status === "Lunas" ? "bg-emerald-400" : bill.status === "Menunggu Verifikasi" ? "bg-amber-400" : "bg-red-400"}`} />
              <CardHeader className="pb-2 pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base font-bold">{bill.bulan}</CardTitle>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">{bill.invoice}</p>
                  </div>
                  <Badge className={`${meta.cls} flex items-center gap-1 text-xs`}>
                    {meta.icon}
                    {meta.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Nominal Sewa</p>
                    <p className="text-xl font-black text-foreground">{formatRupiah(bill.nominal)}</p>
                    {bill.tanggalBayar && (
                      <p className="text-xs text-emerald-600 mt-1">Dibayar: {bill.tanggalBayar}</p>
                    )}
                  </div>
                  {bill.status === "Belum Bayar" && (
                    <Button
                      size="sm"
                      className="gap-2 bg-primary hover:bg-primary/90"
                      onClick={() => handleOpenUpload(bill)}
                    >
                      <Upload className="w-4 h-4" />
                      Upload Bukti
                    </Button>
                  )}
                  {bill.status === "Menunggu Verifikasi" && (
                    <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700 text-xs">
                      Menunggu Owner
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>Batal</Button>
            <Button disabled={!filePreview} onClick={handleSubmitBukti}>Kirim Bukti</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
