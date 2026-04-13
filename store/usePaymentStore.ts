import { create } from "zustand";
import { DUMMY_PAYMENTS } from "@/lib/mock-data";

export interface Payment {
  id: string;
  nama: string;
  kamar: string;
  nominal: number;
  status: string;
  tanggal: string;
  invoice: string;
}

export type PaymentStatusFilter = "Semua" | "Lunas" | "Belum Bayar" | "Telat";

interface PaymentState {
  payments: Payment[];
  filterTab: PaymentStatusFilter;
  setFilterTab: (tab: PaymentStatusFilter) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  payments: DUMMY_PAYMENTS,
  filterTab: "Semua",
  setFilterTab: (tab) => set({ filterTab: tab }),
}));
