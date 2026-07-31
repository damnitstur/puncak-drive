import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@/components/ui/icon"
import { WhatsappIcon } from "@hugeicons/core-free-icons"
import type { CarItem } from "./Catalog"

interface CarDetailWhatsAppBarProps {
  car: CarItem
}

export default function CarDetailWhatsAppBar({ car }: CarDetailWhatsAppBarProps) {
  const dailyPrice = car.pricePerDay || 0

  const waMessage = `Halo Puncak Drive, saya berminat sewa unit ${car.name}. Mohon info ketersediaan armada.`
  const waUrl = `https://wa.me/6289611384407?text=${encodeURIComponent(waMessage)}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl p-3 sm:p-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
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
          <Button
            asChild
          >
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <HugeiconsIcon icon={WhatsappIcon} className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Chat admin</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
