"use client";

import { useState } from "react";
import { Wrench, Plus, RefreshCcw, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { useMyTicketStore, TicketCategory, Ticket } from "@/store/tenant/useMyTicketStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TiketPage() {
  const { tickets, addTicket } = useMyTicketStore();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    kategori: "Kerusakan" as TicketCategory,
    foto: null as string | null,
  });

  const getStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "Selesai":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none shadow-sm"><CheckCircle2 className="w-3 h-3 mr-1" />Selesai</Badge>;
      case "Diproses":
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-none shadow-sm"><Loader2 className="w-3 h-3 mr-1 animate-spin" />Diproses</Badge>;
      default:
        return <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-950/20"><Clock className="w-3 h-3 mr-1" />Menunggu</Badge>;
    }
  };

  const handleSubmit = () => {
    if (!form.judul || !form.deskripsi) return;
    addTicket({ judul: form.judul, deskripsi: form.deskripsi, kategori: form.kategori, foto: form.foto });
    setForm({ judul: "", deskripsi: "", kategori: "Kerusakan", foto: null });
    setIsOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Wrench className="w-8 h-8" />
          Laporan & Tiket
        </h1>
        <Button className="gap-2" onClick={() => setIsOpen(true)}>
          <Plus className="w-4 h-4" /> Buat Tiket
        </Button>
      </div>

      {/* Tiket Table Card */}
      <Card className="border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5" /> Riwayat Laporan
          </CardTitle>
          <CardDescription>Semua tiket keluhan dan kerusakan yang pernah Anda ajukan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-background/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...tickets].reverse().length > 0 ? (
                  [...tickets].reverse().map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-semibold">{ticket.judul}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-medium">{ticket.kategori}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{ticket.tanggal}</TableCell>
                      <TableCell className="text-muted-foreground text-sm max-w-[240px] truncate">{ticket.deskripsi}</TableCell>
                      <TableCell className="text-right">{getStatusBadge(ticket.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <RefreshCcw className="w-6 h-6 mb-2 opacity-20" />
                        <p>Belum ada laporan.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Tiket Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Laporan Baru</DialogTitle>
            <DialogDescription>Deskripsikan masalah secara jelas agar tim kami segera menindaklanjuti.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="font-semibold">Kategori</Label>
              <Select value={form.kategori} onValueChange={(v) => setForm((f) => ({ ...f, kategori: v as TicketCategory }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kerusakan">Kerusakan</SelectItem>
                  <SelectItem value="Kebersihan">Kebersihan</SelectItem>
                  <SelectItem value="Keamanan">Keamanan</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Judul Masalah</Label>
              <Input
                placeholder="cth: AC bocor, lampu mati..."
                value={form.judul}
                onChange={(e) => setForm((f) => ({ ...f, judul: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Deskripsi</Label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                placeholder="Ceritakan lebih detail..."
                value={form.deskripsi}
                onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Foto (opsional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setForm((f) => ({ ...f, foto: URL.createObjectURL(file) }));
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
            <Button disabled={!form.judul || !form.deskripsi} onClick={handleSubmit}>Kirim Laporan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
