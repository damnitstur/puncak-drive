import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { HugeiconsIcon } from "@/components/ui/icon"
import {
  ArrowLeft01Icon,
  UserGroupIcon,
  Clock01Icon,
  CheckmarkCircle02Icon,
  CancelCircleIcon,
  Tick01Icon,
  UserCheck01Icon,
  Fuel01Icon,
  SentIcon,
  InformationCircleIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"
import type { CarItem } from "./Catalog"
import { getCarAvailabilityStatus } from "@/lib/availability"

interface CarDetailPageProps {
  car: CarItem
  onBack: () => void
  onProceedToBooking: (car: CarItem) => void
}

const CAR_IMAGES_MAP: Record<string, string> = {
  avanza: "/katalog1.webp",
  inova: "/inova.webp",
  invova: "/inova.webp",
  innova: "/inova.webp",
  hiace: "/hiace.webp",
  calya: "/calya.webp",
  rush: "/rush.webp",
}

function getCarImage(carName: string, carId: string): string {
  const key = carId.toLowerCase()
  const nameKey = carName.toLowerCase()
  for (const [k, img] of Object.entries(CAR_IMAGES_MAP)) {
    if (key.includes(k) || nameKey.includes(k)) return img
  }
  return "/katalog1.webp"
}

export default function CarDetailPage({
  car,
  onBack,
  onProceedToBooking,
}: CarDetailPageProps) {
  const { t } = useTranslation()
  const dailyPrice = parseInt(car.price) || 0
  const availStatus = getCarAvailabilityStatus(car.id)

  return (
    <div className="min-h-screen bg-background text-foreground py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Button */}
        <div>
          <Button
            variant="ghost"
            onClick={onBack}
            className="group gap-2 text-muted-foreground hover:text-foreground pl-0 text-xs font-semibold"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            />
            {t("detail.back")}
          </Button>
        </div>

        {/* CRITICAL ANNOUNCEMENT BANNER: Strictly With Driver (No Lepas Kunci) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-amber-500">
          <div className="p-2.5 bg-amber-500/20 rounded-xl shrink-0">
            <HugeiconsIcon icon={InformationCircleIcon} className="w-6 h-6 text-amber-500" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-extrabold uppercase tracking-wider">
              {t("detail.noticeTitle")}
            </h4>
            <p className="text-xs text-amber-500/90 leading-relaxed">
              {t("detail.noticeDesc")}
            </p>
          </div>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Car Image Showcase (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="bg-card border-border rounded-2xl overflow-hidden shadow-xl">
              <div className="relative aspect-[16/10] bg-muted/60 flex items-center justify-center p-8 border-b border-border">
                <img
                  src={getCarImage(car.name, car.id)}
                  alt={car.name}
                  className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                />

                {/* Status Badge */}
                <Badge
                  variant="outline"
                  className={`absolute top-4 left-4 text-[10px] font-bold ${
                    availStatus.isAvailable
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                  }`}
                >
                  {availStatus.isAvailable ? "Tersedia Hari Ini" : "Tersewa (Booked)"}
                </Badge>

                {/* Driver Included Badge */}
                <Badge
                  variant="default"
                  className="absolute top-4 right-4 text-[10px] font-bold bg-primary text-primary-foreground gap-1"
                >
                  <HugeiconsIcon icon={UserCheck01Icon} className="w-3 h-3" />
                  + Driver Included
                </Badge>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      Kategori Armada
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground capitalize">
                      {car.name}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      Tarif / 12 - 24 Jam
                    </span>
                    <p className="text-2xl font-black text-primary">
                      Rp {dailyPrice.toLocaleString("id-ID")}.000
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Kendaraan dalam kondisi prima, selalu dibersihkan dan disemprot disinfektan sebelum pengantaran. Didampingi driver lokal ramah yang menguasai rute jalan alternatif Puncak.
                </p>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions Card */}
            <Card className="bg-card border-border rounded-2xl p-5 space-y-4 shadow-md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-primary" />
                Rincian Fasilitas Paket Sewa
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Included */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                    Termasuk Dalam Harga:
                  </span>
                  <ul className="space-y-1.5 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Unit Mobil Siap Pakai</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Jasa Driver Professional</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Kenyamanan AC Double Blower</span>
                    </li>
                  </ul>
                </div>

                {/* Excluded */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                    Tidak Termasuk:
                  </span>
                  <ul className="space-y-1.5 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <HugeiconsIcon icon={CancelCircleIcon} className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>BBM (Bahan Bakar Minyak)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <HugeiconsIcon icon={CancelCircleIcon} className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Tol & Parkir Wisata</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <HugeiconsIcon icon={CancelCircleIcon} className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Makan Driver</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: Technical Specs & Action (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <Card className="bg-card border-border rounded-2xl p-6 space-y-6 shadow-xl">
              <div>
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary text-[10px] tracking-widest uppercase font-bold mb-2"
                >
                  Spesifikasi Kendaraan
                </Badge>
                <h3 className="text-xl font-extrabold text-foreground">
                  Fitur Utama {car.name}
                </h3>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/60 rounded-xl border border-border space-y-1">
                  <HugeiconsIcon icon={UserCheck01Icon} className="w-5 h-5 text-primary" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Layanan Driver</p>
                  <p className="text-xs font-bold text-foreground">Termasuk Driver</p>
                </div>

                <div className="p-4 bg-muted/60 rounded-xl border border-border space-y-1">
                  <HugeiconsIcon icon={UserGroupIcon} className="w-5 h-5 text-primary" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Kapasitas Kursi</p>
                  <p className="text-xs font-bold text-foreground">{car.capacity} Penumpang</p>
                </div>

                <div className="p-4 bg-muted/60 rounded-xl border border-border space-y-1">
                  <HugeiconsIcon icon={Clock01Icon} className="w-5 h-5 text-primary" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Tipe Transmisi</p>
                  <p className="text-xs font-bold text-foreground capitalize">{car.transmission}</p>
                </div>

                <div className="p-4 bg-muted/60 rounded-xl border border-border space-y-1">
                  <HugeiconsIcon icon={Fuel01Icon} className="w-5 h-5 text-primary" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Kondisi Kebersihan</p>
                  <p className="text-xs font-bold text-foreground">100% Bersih & Harum</p>
                </div>
              </div>

              <Separator />

              {/* Service Commitments */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("detail.advantagesTitle")}
                </h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2.5">
                    <HugeiconsIcon icon={SparklesIcon} className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{t("detail.adv1")}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <HugeiconsIcon icon={SparklesIcon} className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{t("detail.adv2")}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <HugeiconsIcon icon={SparklesIcon} className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{t("detail.adv3")}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Action Proceed Button */}
              <div className="space-y-3 pt-2">
                <Button
                  onClick={() => onProceedToBooking(car)}
                  className="w-full h-12 uppercase tracking-widest text-xs font-black shadow-lg shadow-primary/25 gap-2"
                >
                  <HugeiconsIcon icon={SentIcon} className="w-4 h-4" />
                  {t("detail.proceedBtn")}
                </Button>
                
                <p className="text-[10px] text-center text-muted-foreground">
                  🔒 {t("detail.noPrepayment")}
                </p>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
