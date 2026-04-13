"use client";

import { useState } from "react";
import { BedDouble, Edit3, Settings2 } from "lucide-react";
import { useRoomStore, RoomStatus, Room } from "@/store/owner/useRoomStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function KamarPage() {
  const { rooms, filterStatus, setFilterStatus, updateHargaKamar } =
    useRoomStore();
  
  // Local state for Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [editHarga, setEditHarga] = useState<number>(0);

  // Derived state: Filtered Rooms
  const filteredRooms =
    filterStatus === "Semua"
      ? rooms
      : rooms.filter((room) => room.status === filterStatus);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const openEditModal = (room: Room) => {
    setSelectedRoom(room);
    setEditHarga(room.harga);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedRoom) {
      updateHargaKamar(selectedRoom.id, editHarga);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <BedDouble className="w-8 h-8" />
          Manajemen Kamar
        </h1>
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-muted-foreground hidden sm:block" />
          <Select
            value={filterStatus}
            onValueChange={(val) => {
              if (val) setFilterStatus(val as RoomStatus);
            }}
          >
            <SelectTrigger className="w-[180px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Semua">Semua Kamar</SelectItem>
              <SelectItem value="Tersedia">Tersedia</SelectItem>
              <SelectItem value="Terisi">Terisi</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid View */}
      {filteredRooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-white/30 dark:bg-slate-900/30">
          <BedDouble className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">Tidak ada kamar ditemukan</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Coba ubah status filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRooms.map((room) => (
            <Card
              key={room.id}
              className="group hover:shadow-lg transition-all duration-300 border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md relative overflow-hidden"
            >
              {/* Decorative side border highlight based on status */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  room.status === "Tersedia"
                    ? "bg-slate-400"
                    : room.status === "Terisi"
                    ? "bg-emerald-500"
                    : "bg-orange-500"
                }`}
              />

              <CardHeader className="pb-3 pl-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-black text-foreground">
                      {room.nomor}
                    </CardTitle>
                    <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mt-1">
                      {room.tipe}
                    </p>
                  </div>
                  {/* Status Badge */}
                  {room.status === "Tersedia" && (
                    <Badge variant="outline" className="text-slate-500">
                      Tersedia
                    </Badge>
                  )}
                  {room.status === "Terisi" && (
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none text-white shadow-sm">
                      Terisi
                    </Badge>
                  )}
                  {room.status === "Maintenance" && (
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 shadow-sm"
                    >
                      Maintenance
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pl-6 pb-2">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">
                    Harga sewa bulanan
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {formatRupiah(room.harga)}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="pl-6 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-primary/10 text-primary hover:bg-primary/20"
                  onClick={() => openEditModal(room)}
                >
                  <Edit3 className="w-4 h-4" />
                  Atur Harga
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Dialog Edit Harga */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Atur Harga Kamar</DialogTitle>
            <DialogDescription>
              Ubah harga sewa per bulan untuk kamar{" "}
              <span className="font-bold text-foreground">
                {selectedRoom?.nomor}
              </span>
              .
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="harga" className="text-left font-semibold">
                Harga Sewa (Rupiah)
              </Label>
              <Input
                id="harga"
                type="number"
                value={editHarga}
                onChange={(e) => setEditHarga(Number(e.target.value))}
                className="col-span-3 text-lg font-medium"
              />
              <p className="text-sm text-primary font-bold text-right">
                {formatRupiah(editHarga)}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveEdit}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
