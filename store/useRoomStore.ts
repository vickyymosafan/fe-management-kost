import { create } from "zustand";
import { DUMMY_ROOMS } from "@/lib/mock-data";

export type RoomStatus = "Semua" | "Tersedia" | "Terisi" | "Maintenance";

export interface Room {
  id: string;
  nomor: string;
  tipe: string;
  harga: number;
  status: string;
}

interface RoomState {
  rooms: Room[];
  filterStatus: RoomStatus;
  setFilterStatus: (status: RoomStatus) => void;
  updateHargaKamar: (id: string, newHarga: number) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: DUMMY_ROOMS,
  filterStatus: "Semua",
  setFilterStatus: (status) => set({ filterStatus: status }),
  updateHargaKamar: (id, newHarga) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === id ? { ...room, harga: newHarga } : room
      ),
    })),
}));
