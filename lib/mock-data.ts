export const DUMMY_DASHBOARD = {
  kamar: {
    total: 30,
    terisi: 24,
    kosong: 4,
    maintenance: 2,
  },
  pendapatan: {
    bulanIni: 48000000,
    target: 50000000,
  },
};

export const DUMMY_ROOMS = [
  { id: "101", nomor: "101", tipe: "VIP", harga: 2500000, status: "Tersedia" },
  { id: "102", nomor: "102", tipe: "Standard", harga: 1500000, status: "Terisi" },
  { id: "103", nomor: "103", tipe: "Standard", harga: 1500000, status: "Maintenance" },
];

export const DUMMY_TENANTS = [
  { id: "t1", nama: "Budi Santoso", kamar: "102", noHp: "081234567890", statusPembayaran: "Lunas", ktp: "3271042801990001", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
  { id: "t2", nama: "Siti Aminah", kamar: "104", noHp: "081298765432", statusPembayaran: "Belum Bayar", ktp: "3271045204980002", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { id: "t3", nama: "Ahmad Rifai", kamar: "105", noHp: "081345678123", statusPembayaran: "Lunas", ktp: "3271041112990005", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
];

export const DUMMY_PAYMENTS = [
  { id: "p1", nama: "Budi Santoso", kamar: "102", nominal: 1500000, status: "Lunas", tanggal: "2026-04-10" },
  { id: "p2", nama: "Siti Aminah", kamar: "104", nominal: 1500000, status: "Belum Bayar", tanggal: "-" },
];
