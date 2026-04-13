import { create } from "zustand";
import { DUMMY_TENANTS } from "@/lib/mock-data";

export interface Tenant {
  id: string;
  nama: string;
  kamar: string;
  noHp: string;
  statusPembayaran: string;
  ktp: string;
  avatar: string;
}

interface TenantState {
  tenants: Tenant[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  tenants: DUMMY_TENANTS,
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
