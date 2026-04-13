import { create } from "zustand";

export interface Bill {
  id: string;
  bulan: string;
  nominal: number;
  status: "Lunas" | "Belum Bayar" | "Menunggu Verifikasi";
  tanggalBayar: string | null;
  invoice: string;
  buktiPembayaran: string | null;
}

interface MyBillState {
  bills: Bill[];
  uploadBukti: (billId: string, fileUrl: string) => void;
}

const MOCK_BILLS: Bill[] = [
  { id: "b1", bulan: "April 2026", nominal: 2200000, status: "Lunas", tanggalBayar: "5 April 2026", invoice: "INV-APR-2026", buktiPembayaran: null },
  { id: "b2", bulan: "Maret 2026", nominal: 2200000, status: "Lunas", tanggalBayar: "2 Maret 2026", invoice: "INV-MAR-2026", buktiPembayaran: null },
  { id: "b3", bulan: "Mei 2026", nominal: 2200000, status: "Belum Bayar", tanggalBayar: null, invoice: "INV-MEI-2026", buktiPembayaran: null },
];

export const useMyBillStore = create<MyBillState>((set) => ({
  bills: MOCK_BILLS,
  uploadBukti: (billId, fileUrl) =>
    set((state) => ({
      bills: state.bills.map((b) =>
        b.id === billId
          ? { ...b, buktiPembayaran: fileUrl, status: "Menunggu Verifikasi" }
          : b
      ),
    })),
}));
