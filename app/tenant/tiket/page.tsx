"use client";

import { useState } from "react";
import { Wrench, Plus, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { useMyTicketStore, TicketCategory, Ticket } from "@/store/tenant/useMyTicketStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TiketPage() {
  const { tickets, addTicket } = useMyTicketStore();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ judul: "", deskripsi: "", kategori: "Kerusakan" as TicketCategory, foto: null as string | null });

  const statusMeta = (status: Ticket["status"]) => {
    switch (status) {
      case "Selesai":
        return { icon: <CheckCircle2 className="w-3.5 h-3.5" />, cls: "bg-emerald-500 border-none text-white" };
      case "Diproses":
        return { icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />, cls: "bg-blue-500 border-none text-white" };
      default:
        return { icon: <Clock className="w-3.5 h-3.5" />, cls: "bg-amber-500 border-none text-white" };
    }
  };

  const handleSubmit = () => {
    if (!form.judul || !form.deskripsi) return;
    addTicket({ judul: form.judul, deskripsi: form.deskripsi, kategori: form.kategori, foto: form.foto });
    setForm({ judul: "", deskripsi: "", kategori: "Kerusakan", foto: null });
    setIsOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-2">
            <Wrench className="w-6 h-6" /> Laporan & Tiket
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Laporkan keluhan atau kerusakan</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button size="sm" className="gap-1.5">
              <Plus className="w-4 h-4" /> Buat Tiket
            </Button>
          </DialogTrigger>
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
                <Input placeholder="cth: AC bocor, lampu mati..." value={form.judul} onChange={(e) => setForm((f) => ({ ...f, judul: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Deskripsi</Label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  placeholder="Ceritakan lebih detail..."
                  value={form.deskripsi}
                  onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Foto (opsional)</Label>
                <Input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setForm((f) => ({ ...f, foto: URL.createObjectURL(file) }));
                }} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
              <Button disabled={!form.judul || !form.deskripsi} onClick={handleSubmit}>Kirim Laporan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Ticket List */}
      <div className="space-y-4">
        {tickets.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Wrench className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Belum ada laporan.</p>
          </div>
        )}
        {[...tickets].reverse().map((ticket) => {
          const meta = statusMeta(ticket.status);
          return (
            <Card key={ticket.id} className="border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-sm font-bold leading-snug flex-1">{ticket.judul}</CardTitle>
                  <Badge className={`${meta.cls} flex items-center gap-1 text-xs shrink-0`}>
                    {meta.icon}
                    {ticket.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs font-medium">{ticket.kategori}</Badge>
                  <span className="text-xs text-muted-foreground">{ticket.tanggal}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{ticket.deskripsi}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
