import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BedDouble, Users, CreditCard, Banknote, LayoutDashboard } from "lucide-react"
import { DUMMY_DASHBOARD, DUMMY_ROOMS } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Dashboard() {
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(angka)
  }

  // Calculate percentage
  const percentage = Math.round((DUMMY_DASHBOARD.pendapatan.bulanIni / DUMMY_DASHBOARD.pendapatan.target) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 sm:w-8 sm:h-8" />
          General Overview
        </h1>
      </div>

      {/* Bento Grid Top Metrics */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <Card className="hover:shadow-lg transition-shadow border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Kamar</CardTitle>
            <BedDouble className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_DASHBOARD.kamar.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Kapasitas Maksimal</p>
          </CardContent>
        </Card>

        {/* Metric 2 */}
        <Card className="hover:shadow-lg transition-shadow border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Kamar Terisi</CardTitle>
            <Users className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{DUMMY_DASHBOARD.kamar.terisi}</div>
            <p className="text-xs text-muted-foreground mt-1">Penyewa aktif</p>
          </CardContent>
        </Card>

        {/* Metric 3 */}
        <Card className="hover:shadow-lg transition-shadow border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Kamar Kosong</CardTitle>
            <BedDouble className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-600 dark:text-slate-300">{DUMMY_DASHBOARD.kamar.kosong}</div>
            <p className="text-xs text-muted-foreground mt-1">Siap disewakan</p>
          </CardContent>
        </Card>

        {/* Metric 4 */}
        <Card className="border-none shadow-md bg-linear-to-br from-primary to-rose-400 text-white hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Pendapatan Bulan Ini</CardTitle>
            <Banknote className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(DUMMY_DASHBOARD.pendapatan.bulanIni)}</div>
            <p className="text-xs text-white/80 mt-1">{percentage}% dari target bulanan</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid Layout - Lists */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Status Kamar Terbaru</CardTitle>
            <CardDescription>Ringkasan kondisi ruangan secara instan.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No. Kamar</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DUMMY_ROOMS.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-semibold">{room.nomor}</TableCell>
                    <TableCell>{room.tipe}</TableCell>
                    <TableCell>{formatRupiah(room.harga)}</TableCell>
                    <TableCell className="text-right">
                      {room.status === "Tersedia" && <Badge variant="outline" className="text-slate-500">{room.status}</Badge>}
                      {room.status === "Terisi" && <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none text-white">{room.status}</Badge>}
                      {room.status === "Maintenance" && <Badge variant="secondary" className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">{room.status}</Badge>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary"/> Tagihan Tertunda</CardTitle>
            <CardDescription>Penyewa yang belum melunasi tagihannya bulan ini.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col gap-4">
                {/* Dummy Item Pending Payment */}
                <div className="flex items-center space-x-4 p-3 rounded-lg border border-destructive/20 bg-destructive/5 dark:bg-destructive/10">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive font-bold">SA</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Siti Aminah</p>
                    <p className="text-xs text-muted-foreground">Kamar 104</p>
                  </div>
                  <div className="text-sm font-medium text-destructive">
                    {formatRupiah(1500000)}
                  </div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
