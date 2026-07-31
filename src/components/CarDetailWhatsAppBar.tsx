import * as React from "react"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@/components/ui/icon"
import { WhatsappIcon, SentIcon } from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"
import type { CarItem } from "./Catalog"

interface CarDetailWhatsAppBarProps {
  car: CarItem
  onProceedToBooking?: (car: CarItem) => void
}

export default function CarDetailWhatsAppBar({ car, onProceedToBooking }: CarDetailWhatsAppBarProps) {
  const { t } = useTranslation()
  const dailyPrice = car.pricePerDay || 0

  const waMessage = `Halo Puncak Drive, saya berminat sewa unit ${car.name} (${car.transmission}). Mohon info ketersediaan armada.`
  const waUrl = `https://wa.me/6289611384407?text=${encodeURIComponent(waMessage)}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl p-3 sm:p-4 shadow-2xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Price & Unit Info */}
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider truncate">
            {car.name}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-xl font-black text-primary">
              Rp {dailyPrice.toLocaleString("id-ID")}.000
            </span>
            <span className="text-[10px] text-muted-foreground font-semibold">
              / 12 Jam
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {onProceedToBooking && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onProceedToBooking(car)}
              className="hidden sm:inline-flex text-xs font-bold gap-1.5"
            >
              <HugeiconsIcon icon={SentIcon} className="w-3.5 h-3.5" />
              {t("detail.proceedBtn")}
            </Button>
          )}

          <Button
            asChild
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 h-auto rounded-xl shadow-lg shadow-emerald-600/25 gap-2"
          >
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <HugeiconsIcon icon={WhatsappIcon} className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Sewa via WhatsApp</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
