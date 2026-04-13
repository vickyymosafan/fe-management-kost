"use client";

import { User, Phone, MapPin, CreditCard, Shield, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const MOCK_PROFILE = {
  nama: "Ahmad Rifai",
  noHp: "081345678123",
  email: "ahmad.rifai@email.com",
  kamar: "105",
  avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  ktp: "3271041112990005",
  alamatKtp: "Jl. Merdeka No. 45, Bandung, Jawa Barat",
  kontakDarurat: { nama: "Siti Rahayu (Ibu)", noHp: "081287654321" },
  bergabungSejak: "Oktober 2025",
};

export default function ProfilPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="relative inline-block">
          <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-lg mx-auto">
            <AvatarImage src={MOCK_PROFILE.avatar} alt={MOCK_PROFILE.nama} />
            <AvatarFallback className="bg-primary/10 text-primary font-black text-2xl">
              {MOCK_PROFILE.nama.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 w-8 h-8 rounded-full shadow-md">
            <Camera className="w-4 h-4" />
          </Button>
        </div>
        <div>
          <h1 className="text-2xl font-black">{MOCK_PROFILE.nama}</h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <Badge className="bg-primary/10 text-primary font-semibold hover:bg-primary/20">
              <MapPin className="w-3 h-3 mr-1" />
              Kamar {MOCK_PROFILE.kamar}
            </Badge>
            <Badge variant="outline" className="text-xs">Bergabung {MOCK_PROFILE.bergabungSejak}</Badge>
          </div>
        </div>
      </div>

      {/* Info Kontak */}
      <Card className="border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Informasi Pribadi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <InfoRow icon={<Phone className="w-4 h-4 text-primary/70" />} label="No. HP" value={MOCK_PROFILE.noHp} />
          <Separator />
          <InfoRow icon={<span className="text-primary/70 text-sm">@</span>} label="Email" value={MOCK_PROFILE.email} />
        </CardContent>
      </Card>

      {/* KTP Section */}
      <Card className="border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" /> Identitas (KTP)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <InfoRow icon={<Shield className="w-4 h-4 text-primary/70" />} label="No. KTP" value={MOCK_PROFILE.ktp} mono />
          <Separator />
          <InfoRow icon={<MapPin className="w-4 h-4 text-primary/70" />} label="Alamat KTP" value={MOCK_PROFILE.alamatKtp} />
          {/* KTP Placeholder Preview */}
          <div className="mt-3 rounded-xl bg-linear-to-br from-slate-700 to-slate-900 p-4 text-white text-xs relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 opacity-5">
              <div className="w-40 h-40 rounded-full border-20 border-white absolute -right-10 -top-10" />
            </div>
            <p className="font-bold uppercase tracking-widest opacity-70 text-[10px] mb-2">Kartu Tanda Penduduk</p>
            <p className="font-black text-lg font-mono tracking-wider">{MOCK_PROFILE.ktp}</p>
            <p className="mt-1 opacity-70">{MOCK_PROFILE.nama}</p>
          </div>
        </CardContent>
      </Card>

      {/* Kontak Darurat */}
      <Card className="border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" /> Kontak Darurat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow icon={<User className="w-4 h-4 text-primary/70" />} label="Nama" value={MOCK_PROFILE.kontakDarurat.nama} />
          <Separator className="my-3" />
          <InfoRow icon={<Phone className="w-4 h-4 text-primary/70" />} label="No. HP" value={MOCK_PROFILE.kontakDarurat.noHp} />
        </CardContent>
      </Card>
    </div>
  );
}

function InfoRow({ icon, label, value, mono = false }: { icon: React.ReactNode; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-sm font-semibold truncate ${mono ? "font-mono" : ""}`}>{value}</p>
      </div>
    </div>
  );
}
