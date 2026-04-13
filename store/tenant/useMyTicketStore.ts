import { create } from "zustand";

export type TicketStatus = "Menunggu" | "Diproses" | "Selesai";
export type TicketCategory = "Kerusakan" | "Kebersihan" | "Keamanan" | "Lainnya";

export interface Ticket {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: TicketCategory;
  status: TicketStatus;
  tanggal: string;
  foto: string | null;
}

interface MyTicketState {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, "id" | "status" | "tanggal">) => void;
}

const MOCK_TICKETS: Ticket[] = [
  { id: "tk1", judul: "AC di kamar bocor air", deskripsi: "AC menetes air saat dinyalakan", kategori: "Kerusakan", status: "Selesai", tanggal: "2 April 2026", foto: null },
  { id: "tk2", judul: "Lampu kamar mandi mati", deskripsi: "Lampu kamar mandi tidak menyala sejak kemarin", kategori: "Kerusakan", status: "Diproses", tanggal: "11 April 2026", foto: null },
];

export const useMyTicketStore = create<MyTicketState>((set) => ({
  tickets: MOCK_TICKETS,
  addTicket: (ticketData) =>
    set((state) => ({
      tickets: [
        ...state.tickets,
        {
          ...ticketData,
          id: `tk${Date.now()}`,
          status: "Menunggu",
          tanggal: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
        },
      ],
    })),
}));
