import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
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
  Calendar02Icon,
} from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"
import type { CarItem } from "./Catalog"
import { getCarAvailabilityStatus, getBookedDates } from "@/lib/availability"

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
  const dailyPrice = car.pricePerDay || 0
  const availStatus = getCarAvailabilityStatus(car.id)
  const bookedDates = getBookedDates(car.id)

  return (
    <div className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <Button
            variant="ghost"
            onClick={onBack}
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
            />
            {t("detail.back")}
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[0.5fr_1fr_0.5fr] h-full relative mx-auto gap-8 items-start">
          <div className="hidden lg:block h-full relative">
            <div className="sticky top-4 grid gap-4">
              <div className="flex rounded-xl aspect-square bg-muted w-full border justify-center items-center">
                <p>
                  banner space
                </p>
              </div>
              <div className="flex rounded-xl aspect-square bg-muted w-full border justify-center items-center">
                <p>
                  space ads is Available
                </p>
              </div>
            </div>
          </div>
          {/* LEFT COLUMN: Car Image Showcase (6 Cols) */}
          <div className="lg:col-2/2 space-y-4 grid gap-4 relative h-full">
            <div className="sticky top-0 p-4 sm:p-5 rounded bg-red-50 z-50 border border-destructive/30 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-destructive">
              <div className="p-2.5 bg-destructive/20 rounded-xl shrink-0">
                <HugeiconsIcon icon={InformationCircleIcon} className="w-6 h-6 text-destructive" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  {t("detail.noticeTitle")}
                </h4>
                <p className="text-xs text-destructive leading-relaxed">
                  {t("detail.noticeDesc")}
                </p>
              </div>
            </div>

            <Card className="overflow-hidden">
              <div className="relative aspect-[16/10] bg-muted/60 flex items-center justify-center p-8 border-b border-border">
                <img
                  src={getCarImage(car.name, car.id)}
                  alt={car.name}
                  className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                />

                {/* Status Badge */}
                <Badge
                  variant="outline"
                  className={`absolute top-4 left-4 text-[10px] font-bold ${availStatus.isAvailable
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                    : "bg-destructive/10 text-destructive border-destructive/30"
                    }`}
                >
                  {availStatus.isAvailable ? t("catalog.available") : t("catalog.booked")}
                </Badge>

                {/* Driver Included Badge */}
                <Badge
                  variant="default"
                  className="absolute top-4 right-4 text-[10px] font-bold bg-primary text-primary-foreground gap-1"
                >
                  <HugeiconsIcon icon={UserCheck01Icon} className="w-3 h-3" />
                  {t("detail.driverIncluded")}
                </Badge>
              </div>

              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      {t("detail.categoryTitle")}
                    </span>
                    <h2 className="text-xl font-bold text-foreground capitalize">
                      {car.name}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      {t("detail.rateTitle")}
                    </span>
                    <p className="text-2xl font-black text-primary">
                      Rp {dailyPrice.toLocaleString("id-ID")}.000
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("detail.description")}
                </p>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions Card */}
            <div className="space-y-4">
              <div className="flex gap-3 justify-between">
                <h3 className="text-xl font-bold text-foreground">
                  {t("detail.inclusionsTitle")}
                </h3>
                <Badge
                  variant="outline"
                >
                  {t("detail.serviceArea")}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Included */}
                <div className="space-y-2.5 flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                    {t("detail.includedHeading")}
                  </span>
                  <ul className="space-y-1.5 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{t("detail.incCar")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{t("detail.incDriver")}</span>
                    </li>
                  </ul>
                </div>

                {/* Excluded */}
                <div className="space-y-2.5 flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-destructive">
                    {t("detail.excludedHeading")}
                  </span>
                  <ul className="space-y-1.5 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <HugeiconsIcon icon={CancelCircleIcon} className="w-4 h-4 text-destructive shrink-0" />
                      <span>{t("detail.excFuel")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <HugeiconsIcon icon={CancelCircleIcon} className="w-4 h-4 text-destructive shrink-0" />
                      <span>{t("detail.excToll")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3 justify-between">
                <h3 className="text-xl font-bold text-foreground">
                  {t("detail.featuresTitle", { name: car.name })}
                </h3>
                <Badge
                  variant="outline"
                >
                  {t("detail.specTitle")}
                </Badge>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className='p-4 space-y-1 border rounded-xl'>
                  <HugeiconsIcon icon={UserCheck01Icon} className="w-5 h-5 text-primary" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">{t("detail.driverService")}</p>
                  <p className="text-xs font-bold text-foreground">{t("detail.driverIncludedVal")}</p>
                </div>

                <div className='p-4 space-y-1 border rounded-xl'>
                  <HugeiconsIcon icon={UserGroupIcon} className="w-5 h-5 text-primary" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">{t("detail.capacity")}</p>
                  <p className="text-xs font-bold text-foreground">{car.capacity} {t("detail.passengers")}</p>
                </div>

                <div className='p-4 space-y-1 border rounded-xl'>
                  <HugeiconsIcon icon={Clock01Icon} className="w-5 h-5 text-primary" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">{t("detail.transmission")}</p>
                  <p className="text-xs font-bold text-foreground capitalize">{car.transmission}</p>
                </div>

                <div className='p-4 space-y-1 border rounded-xl'>
                  <HugeiconsIcon icon={Fuel01Icon} className="w-5 h-5 text-primary" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">{t("detail.hygiene")}</p>
                  <p className="text-xs font-bold text-foreground">{t("detail.hygieneVal")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Technical Specs & Action (6 Cols) */}
          <div className="lg:col-3/3 space-y-6 lg:sticky top-0">
            <div className="py-4 space-y-6">
              {/* Availability Calendar */}
              <div className="space-y-3">
                <h4 className="text-xl font-bold tracking-wider text-foreground flex items-center gap-2">
                  <HugeiconsIcon icon={Calendar02Icon} className="w-6 h-6 text-primary" />
                  {t("detail.availabilityTitle")}
                </h4>

                <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
                  <Calendar
                    mode="single"
                    showOutsideDays={false}
                    disabled={[
                      { before: new Date() },
                      ...bookedDates,
                    ]}
                    modifiers={{ booked: bookedDates }}
                    modifiersClassNames={{
                      booked: "!bg-red-500/15 !text-red-400 !rounded-md line-through",
                    }}
                    className="w-full [--cell-size:--spacing(9)]"
                  />
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-primary inline-block" />
                    <span>{t("detail.legendAvailable")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-red-500/30 inline-block" />
                    <span>{t("detail.legendBooked")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-muted inline-block opacity-50" />
                    <span>{t("detail.legendPast")}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Action Proceed Button */}
              <div className="space-y-3 pt-2">
                <Button
                  onClick={() => onProceedToBooking(car)}
                  className="w-full"
                >
                  <HugeiconsIcon icon={SentIcon} className="w-4 h-4" />
                  {t("detail.proceedBtn")}
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
