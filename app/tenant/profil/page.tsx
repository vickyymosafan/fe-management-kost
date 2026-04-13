"use client";

import { User, Phone, CreditCard, Shield, MapPin, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const MOCK_PROFILE = {
  nama: "Ahmad Rifai",
  noHp: "081345678123",
  email: "ahmad.rifai@email.com",
  kamar: "105",
  tipeKamar: "VIP Room",
  avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  ktp: "3271041112990005",
  alamatKtp: "Jl. Merdeka No. 45, Bandung, Jawa Barat",
  kontakDarurat: { nama: "Siti Rahayu (Ibu)", noHp: "081287654321" },
  bergabungSejak: "Oktober 2025",
};

export default function ProfilPage() {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <User className="w-6 h-6 sm:w-8 sm:h-8" />
          Profil Saya
        </h1>
      </div>

      {/* Profile Summary Card — stacks on mobile */}
      <Card className="border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 pb-4">
          <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/20 shadow-sm shrink-0">
            <AvatarImage src={MOCK_PROFILE.avatar} alt={MOCK_PROFILE.nama} />
            <AvatarFallback className="bg-primary/10 text-primary font-black text-2xl">
              {MOCK_PROFILE.nama.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-bold">{MOCK_PROFILE.nama}</h2>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary/10 text-primary font-semibold hover:bg-primary/20 border-none">
                <MapPin className="w-3 h-3 mr-1" />
                Kamar {MOCK_PROFILE.kamar} — {MOCK_PROFILE.tipeKamar}
              </Badge>
              <Badge variant="secondary">Bergabung {MOCK_PROFILE.bergabungSejak}</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Info Grid — 1 col mobile, 2 col tablet+ */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        {/* Informasi Pribadi */}
        <Card className="border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <User className="w-5 h-5 text-primary" /> Informasi Pribadi
            </CardTitle>
            <CardDescription>Kontak dan data diri penyewa.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-sm bg-black/5 dark:bg-white/5 p-3 rounded-lg gap-3">
              <Phone className="w-4 h-4 text-primary/70 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">No. HP</p>
                <p className="font-semibold truncate">{MOCK_PROFILE.noHp}</p>
              </div>
            </div>
            <div className="flex items-center text-sm bg-black/5 dark:bg-white/5 p-3 rounded-lg gap-3">
              <Mail className="w-4 h-4 text-primary/70 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-semibold truncate">{MOCK_PROFILE.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kontak Darurat */}
        <Card className="border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Phone className="w-5 h-5 text-primary" /> Kontak Darurat
            </CardTitle>
            <CardDescription>Orang yang dapat dihubungi dalam keadaan darurat.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-sm bg-black/5 dark:bg-white/5 p-3 rounded-lg gap-3">
              <User className="w-4 h-4 text-primary/70 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Nama</p>
                <p className="font-semibold truncate">{MOCK_PROFILE.kontakDarurat.nama}</p>
              </div>
            </div>
            <div className="flex items-center text-sm bg-black/5 dark:bg-white/5 p-3 rounded-lg gap-3">
              <Phone className="w-4 h-4 text-primary/70 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">No. HP</p>
                <p className="font-semibold truncate">{MOCK_PROFILE.kontakDarurat.noHp}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Identitas KTP — full width */}
      <Card className="border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <CreditCard className="w-5 h-5 text-primary" /> Identitas (KTP)
          </CardTitle>
          <CardDescription>Data kependudukan sesuai kartu tanda penduduk.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="flex items-start text-sm bg-black/5 dark:bg-white/5 p-3 rounded-lg gap-3">
              <Shield className="w-4 h-4 text-primary/70 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">No. KTP</p>
                <p className="font-mono font-semibold break-all">{MOCK_PROFILE.ktp}</p>
              </div>
            </div>
            <div className="flex items-start text-sm bg-black/5 dark:bg-white/5 p-3 rounded-lg gap-3">
              <MapPin className="w-4 h-4 text-primary/70 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Alamat KTP</p>
                <p className="font-semibold leading-snug">{MOCK_PROFILE.alamatKtp}</p>
              </div>
            </div>
          </div>
          <Separator />
          {/* KTP Card Visual */}
          <div className="rounded-xl bg-linear-to-br from-slate-700 to-slate-900 p-4 md:p-5 text-white relative overflow-hidden shadow-md">
            <div className="absolute inset-0 opacity-5">
              <div className="w-48 h-48 rounded-full border-30 border-white absolute -right-12 -top-12" />
            </div>
            <p className="font-bold uppercase tracking-widest text-white/60 text-[10px] mb-3">
              Kartu Tanda Penduduk
            </p>
            <p className="font-black text-base md:text-xl font-mono tracking-wider break-all">{MOCK_PROFILE.ktp}</p>
            <p className="mt-1.5 text-white/70 font-medium text-sm md:text-base">{MOCK_PROFILE.nama}</p>
            <p className="mt-0.5 text-white/50 text-xs">{MOCK_PROFILE.alamatKtp}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
